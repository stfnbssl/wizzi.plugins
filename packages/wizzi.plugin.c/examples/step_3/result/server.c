#undef UNICODE
#define WIN32_LEAN_AND_MEAN
#undef _WIN32_WINNT
#define _WIN32_WINNT 0x501
/* 
    The sample "accept" winsock server implementation
    see https://github.com/microsoft/Windows-classic-samples/tree/main/Samples/Win7Samples/netds/winsock/accept
*/

#include <errno.h>
#include <stdlib.h>
#include <winsock2.h>   // for Winsock API
#include <windows.h>    // for Win32 APIs and types
#include <wspiapi.h>    // for IPv6 support
#include <ws2tcpip.h>   // for IPv6 support
#include <strsafe.h>    // for safe versions of string functions
#include <stdio.h>      // for printing to stdout.

/* 
    This is the number of clients that can be accomodated in the FD_SETs that are used in the select command.
    In spite of the name referring to the max number of clients,
    the actual number of clients that will be accomodated will be a little less
    because the select will also include the server interfaces on which the app is listening.
    If you want to increase this value, first undefine FD_SETSIZE and redefine FD_SETSIZE to the required value before including winsock2.h
*/
#define MAX_CLIENTS             FD_SETSIZE

/* 
    This is the default size of the data buffer that'll be used in recv each time.
    In real apps, this value will be much higher.
*/
#define RECV_DATA_SIZE          4096

// Different types of accepts that are supported by the server.
// This flag indicates the server to use select() and do a non-blocking accept with single thread.
// const BYTE NON_BLOCKING_ACCEPT = 1;
#define NON_BLOCKING_ACCEPT 1
// This flag indicates the server to use WSAAsyncSelect() to get Window messages and call accept on receiving FD_ACCEPT event.
// const BYTE ASYNC_SELECT_ACCEPT = 2;
#define ASYNC_SELECT_ACCEPT 2

/* 
    This is the message that'll be sent to the server by winsock if  any of the registered socket events happen in the AsyncSelect case.
    Any value above the WM_USER can be used to avoid collision with the standard Windows messages.
*/
#define WM_USER_ASYNCSELECT_MSG     WM_USER + 1

// default values for various command-line options
// The default address family to bind to.
#define DEFAULT_ADDRESS_FAMILY          AF_UNSPEC

// The default interface to listen to.
#define DEFAULT_INTERFACE               NULL

// The default port to listen to.
#define DEFAULT_PORT                    "7243"

// The default type of accept to be done.
#define DEFAULT_TYPE_OF_ACCEPT          NON_BLOCKING_ACCEPT

/* 
    This structure defines the contents of the data buffer
    that'll be used to store the messages that are received from and sent to the client.
*/
typedef struct _DATA_BUFFER
{ 
    char buf[RECV_DATA_SIZE];  // the data buffer
    int dataSize;             // length of the actual data present
    int sendOffset;           // position of the next byte in buf to be sent
    BOOL bufNotFullySent;      // TRUE if buf has been fully sent
} DATA_BUFFER;

/* 
    This structure holds the information for each socket the server creates.
    The server maintains a list of these structures and operates on them.
*/
typedef struct _SOCK_INFO
{ 
    SOCKET sock;                // socket handle
    BOOL isSocketListening;   // TRUE if the socket is listening
    struct _SOCK_INFO *prev,    // previous structure in the list
        *next; // next structure in the list
    DATA_BUFFER recdData;       // details of data buffer that's recd/sent
    int nTotalRecd;         // total number of bytes recd so far
    int nTotalSent;         // total number of bytes sent so far
    BOOL isFdCloseRecd;      // TRUE if FD_CLOSE event was received
} SOCK_INFO, *PSOCK_INFO;

/* 
    This structure bundles all the global variables needed between different functions into a global context.
*/
typedef struct _AcceptContext
{ 
    BYTE addressFamily;      // Address Family requested
    char *szInterface;       // Interface to listen on
    char *szPort;            // Port to listen on
    BYTE typeOfAccept;       // Which type of accept should be done
    SOCK_INFO *pSockList;       // List of the listening/accepted sockets
    HWND hAcceptWindow;      // Handle to the hidden accept window
} AcceptContext;


// g_AcceptContext will hold all the global variables used across all the files.
AcceptContext g_AcceptContext;

/* 
    Allocates a SOCK_INFO structure on the heap
    and initializes the contents with suitable initial values
    and returns the allocated memory.
*/
PSOCK_INFO AllocAndInitSockInfo() {
    PSOCK_INFO pNewSockInfo;
    /* 
        allocate a new structure.
        this should be freed by calling FreeSockInfo by the caller of this function.
    */
    pNewSockInfo = (PSOCK_INFO)malloc(sizeof(SOCK_INFO));
    if (pNewSockInfo == NULL) {
        printf("AllocAndInitSockInfo: malloc returned NULL.\n"); printf("\n");
        goto CLEANUP;
    }
    
    printf("Allocated SockInfo at %p\n", pNewSockInfo);printf("\n");
    // Initialize the SOCK_INFO structure with the suitable initial values for each field.
    memset (pNewSockInfo,0,sizeof(SOCK_INFO));
    pNewSockInfo->sock = INVALID_SOCKET;
    CLEANUP:
        return pNewSockInfo;
}

/* 
    Frees the SOCK_INFO structure allocated by AllocAndInitSockInfo.
*/
void FreeSockInfo(PSOCK_INFO pSockInfo) {
    // free the SOCK_INFO structure allocated earlier by AllocAndInitSockInfo
    free (pSockInfo);
    printf("Freed SockInfo at %p\n", pSockInfo);printf("\n");
    return; 
}

/* 
    Adds a given sockinfo structure to head of the given list.
*/
void AddSockInfoToList(PSOCK_INFO *ppHead, PSOCK_INFO pNewSockInfo) {
    /* 
        add the new sock info at the head,
        for sake of simiplicity
        as we don't care about the order of these structures.
    */
    // this is going to be the first node.
    pNewSockInfo->prev = NULL;
    // the earlier list follows this node.
    pNewSockInfo->next = *ppHead;
    // this node is the previous node for the earlier head node.
    if (*ppHead != NULL) {
        (*ppHead)->prev = pNewSockInfo;
    }
    // the new head is this new node, as we inserted at the head.
    *ppHead = pNewSockInfo;
    
    printf("Added SockInfo %p to list\n", pNewSockInfo);printf("\n");
    return; 
}

/* 
    Removes a given sockinfo structure from the given list and frees the memory also.
*/
void DeleteSockInfoFromList(PSOCK_INFO *ppHead, PSOCK_INFO pDelSockInfo) {
    /* 
        make the previous and the next nodes to point to each other,
        instead of pointing to pDelSockInfo.
    */
    if (pDelSockInfo->prev != NULL) {
        pDelSockInfo->prev->next = pDelSockInfo->next;
    }
    if (pDelSockInfo->next != NULL) {
        pDelSockInfo->next->prev = pDelSockInfo->prev;
    }
    // if the head node is being deleted, make the next node as the head.
    if (*ppHead == pDelSockInfo) {
        *ppHead = pDelSockInfo->next;
    }
    // now, pDelSockInfo can be safely deleted as nobody points to it.
    FreeSockInfo (pDelSockInfo);
    
    printf("Deleted and freed SockInfo %p\n", pDelSockInfo);printf("\n");
    return; 
}
#pragma warning (disable: 4267)
/* 
    Prints the given socket address in a printable string format.
*/
void __PrintAddressString(LPSOCKADDR pSockAddr, DWORD dwSockAddrLen) {
    /* 
        INET6_ADDRSTRLEN is the maximum size of a valid IPv6 address
        including port,colons,NULL,etc.
    */
    char buf[INET6_ADDRSTRLEN];
    DWORD dwBufSize = 0;
    
    memset (buf,0,sizeof(buf));
    dwBufSize = sizeof(buf);
    // Converts the pSockAddr to a printable format into buf.
    if (WSAAddressToString(pSockAddr, dwSockAddrLen, NULL, buf, &dwBufSize) == SOCKET_ERROR) {
        printf("ERROR: WSAAddressToString failed %d \n", WSAGetLastError()); printf("\n");
        goto CLEANUP;
    }
    printf("%s\n", buf);printf("\n");
    CLEANUP:
        return; 
}

/* 
    This function creates a list of sockets for each of the interfaces on which the server is supposed to listen.
    For each socket, it binds it to the requested port and sets up for listening on the socket.
*/
void CreateListeningSockets() {
    struct addrinfo hints;
    struct addrinfo *res;
    struct addrinfo *pAddr;
    SOCKET newSock;
    PSOCK_INFO pNewSockInfo;
    int i;
    unsigned long nonBlocking = 1;
    
    printf("Entering CreateListeningSockets()\n");printf("\n");
    
    printf("Creating the list of sockets to listen for ...\n");printf("\n");
    
    // prepare the hints for the type of socket we are interested in.
    memset (&hints, 0, sizeof(hints));
    hints.ai_family = g_AcceptContext.addressFamily;
    hints.ai_protocol = IPPROTO_TCP;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE; // since we're going to bind on this socket.
    
    // getaddrinfo is the protocol independent version of GetHostByName.
    // the res contains the result.
    if (getaddrinfo(g_AcceptContext.szInterface, g_AcceptContext.szPort, &hints, &res) != NO_ERROR) {
        printf("getaddrinfo failed. Error = %d\n", WSAGetLastError()); printf("\n");
        goto CLEANUP;
    }
    
    if (res == NULL) {
        printf("getaddrinfo returned res = NULL\n"); printf("\n");
        goto CLEANUP;
    }
    
    printf("getaddrinfo successful.Enumerating the returned addresses ...\n\n");printf("\n");
    
    // for each returned interface, create a listening socket.
    for (pAddr = res, i = 1; pAddr != NULL; pAddr = pAddr->ai_next, i++) {
        printf("Processing Address %d returned by getaddrinfo : ", i);printf("\n");
        __PrintAddressString (pAddr->ai_addr, pAddr->ai_addrlen);
        
        // create a suitable socket for this interface.
        newSock = WSASocket(pAddr->ai_family, pAddr->ai_socktype, pAddr->ai_protocol, NULL, 0, 0);
        if (newSock == INVALID_SOCKET) {
            printf("WSASocket failed. Error = %d\n", WSAGetLastError()); printf("\n");
            printf("Ignoring this address and continuing with the next. \n\n");printf("\n");
            // anyway, let's continue with other addresses.
            continue; 
        }
        
        printf("Created socket with handle = %d\n", newSock);printf("\n");
        
        // bind the socket.
        if (bind(newSock, pAddr->ai_addr, pAddr->ai_addrlen) != NO_ERROR) {
            printf("bind failed. Error = %d\n", WSAGetLastError()); printf("\n");
            closesocket (newSock);
            continue; 
        }
        
        printf("Socket bound successfully\n");printf("\n");
        
        // listen for upto MAX_CLIENTS number of clients.
        if (listen(newSock, MAX_CLIENTS) != NO_ERROR) {
            printf("listen failed. Error = %d\n", WSAGetLastError()); printf("\n");
            closesocket (newSock);
            continue; 
        }
        
        printf("Listen successful\n");printf("\n");
        
        /* 
            for non-blocking select,
            we need to explicitly make the socket non-blocking by this call,
            whereas for WSAAsyncSelect this is not required
            as WSAAsyncSelect itself makes the socket non-blocking.
        */
        if (g_AcceptContext.typeOfAccept == NON_BLOCKING_ACCEPT) {
            if (ioctlsocket(newSock, FIONBIO, &nonBlocking) == SOCKET_ERROR) {
                printf("Can't put socket into non-blocking mode. Error = %d\n", WSAGetLastError()); printf("\n");
            }
        }
        
        // allocate a socket info and store this socket.
        pNewSockInfo = AllocAndInitSockInfo();
        if (pNewSockInfo == NULL) {
            printf("AllocAndInitSockInfo failed.\n"); printf("\n");
            closesocket (newSock);
            continue; 
        }
        
        pNewSockInfo->sock = newSock;
        pNewSockInfo->isSocketListening = TRUE;
        
        // all went well. add this to the list of listening sockets.
        AddSockInfoToList (&g_AcceptContext.pSockList, pNewSockInfo);
        printf("Added socket to list of listening sockets\n\n");printf("\n");
    }
    CLEANUP:
        // if getaddrinfo was successful, it would have allocated memory for the res pointer which needs to be freed.
        if (res) {
            freeaddrinfo (res);
            printf("Freed the memory allocated for res by getaddrinfo\n");printf("\n");
        }
        
        printf("Exiting CreateListeningSockets()\n");printf("\n");
        return; 
}

/* 
    Frees all the resources inside the socket list.
*/
void DestroyListeningSockets() {
    PSOCK_INFO pSockInfo, pNextSockInfo;
    
    printf("Entering DestroyListeningSockets()\n");printf("\n");
    
    // iterate through all the listening sockets and free one by one.
    pSockInfo = g_AcceptContext.pSockList;
    while (pSockInfo != NULL) {
        // if the socket hasn't been closed already, close it.
        if (pSockInfo->sock != INVALID_SOCKET) {
            closesocket (pSockInfo->sock);
            printf("Closed socket with handle %d\n", pSockInfo->sock);printf("\n");
        }
        
        // free this socket and go to the next.
        pNextSockInfo = pSockInfo->next;
        FreeSockInfo (pSockInfo);
        pSockInfo = pNextSockInfo;
    }
    
    printf("Exiting DestroyListeningSockets()\n");printf("\n");
    return; 
}

/* 
    This function does a accept on the socket in which an accept event has been signalled.
    It also adds the accepted socket to the global list of sockets.
*/
PSOCK_INFO ProcessAcceptEvent(PSOCK_INFO pSockInfo) {
    SOCKADDR_STORAGE clientAddress;
    int clientAddressLen = sizeof(clientAddress);
    SOCKET newSock;
    PSOCK_INFO pNewSockInfo = NULL;
    unsigned long nonBlocking = 1;
    
    printf("Entering ProcessAcceptEvent() on socket %d\n", pSockInfo->sock);printf("\n");
    
    // accept the new connection.
    newSock = WSAAccept(pSockInfo->sock, (LPSOCKADDR)&clientAddress, &clientAddressLen, NULL, 0);
    if (newSock == INVALID_SOCKET) {
        printf("ERROR: WSAAccept failed. Error = %d\n", WSAGetLastError()); printf("\n");
        goto CLEANUP;
    }
    
    printf("Accepted connection from client:");printf("\n");
    __PrintAddressString ((LPSOCKADDR) &clientAddress, clientAddressLen);
    
    // set the connected socket to non-blocking mode.
    if (ioctlsocket(pSockInfo->sock, FIONBIO, &nonBlocking) == SOCKET_ERROR) {
        printf("Can't put socket into non-blocking mode. Error = %d\n", WSAGetLastError()); printf("\n");
    }
    
    // add this socket to the global sockets list.
    pNewSockInfo = AllocAndInitSockInfo();
    if (pNewSockInfo == NULL) {
        printf("AllocAndInitSockInfo failed.\n");printf("\n");
        closesocket (newSock);
        goto CLEANUP;
    }
    pNewSockInfo->sock = newSock;
    pNewSockInfo->isSocketListening = FALSE;
    AddSockInfoToList (&g_AcceptContext.pSockList, pNewSockInfo);
    printf("Added accepted socket %d to list of sockets\n", newSock);printf("\n");
    
    CLEANUP:
        printf("Exiting ProcessAcceptEvent()\n");printf("\n");
        return pNewSockInfo;
}

/* 
    Reads incoming data on the given socket in which a read event has been signalled.
    It read new data only if the previously received data has been fully sent.
*/
BOOL ProcessReadEvent(PSOCK_INFO pSockInfo) {
    BOOL bSocketError = FALSE;
    int nBytesRecd;
    int err;
    
    printf("Entering ProcessReadEvent() on socket %d\n", pSockInfo->sock);printf("\n");
    
    // check if the previously received data has been fully sent or not.
    if (pSockInfo->recdData.bufNotFullySent) {
        printf("Previously recd data not yet fully sent.\n");printf("\n");
        /* 
            here, since we are using only a fixed buffer size for outstanding sends,
            we're not reading the data and hence there might be a deadlock if the remote side only sends but doesn't receive at all.
            also, if the remote side has closed without reading all the data in the pipe,
            we may not know about it as we might get the FD_CLOSE event only after all the FD_READ events have been processed.
            so, to avoid these, the app should implement a timeout on each socket
            so that malicious clients don't make the server run out of resources
            and do a denial-of-service attack.
        */
        /* 
            on the other hand, if we dynamically allocated memory for each  recv and queued it,
            we may not hit this deadlock,
            but still such malicious clients can send too many data and not read at all
            and thus perform a denial-of-service attack by making server run out of memory.
            so, there has to be a upper limit for per-socket memory usage
            or timeout to avoid such attacks.
        */
        Sleep (2000);
        goto CLEANUP;
    }
    
    // previous data fully sent, now, recv the new data.
    memset (&pSockInfo->recdData,0,sizeof(pSockInfo->recdData));
    nBytesRecd = recv(pSockInfo->sock, pSockInfo->recdData.buf, RECV_DATA_SIZE - 1, 0);
    if (nBytesRecd < 0) {
        err = WSAGetLastError();
        if (err == WSAEWOULDBLOCK) {
            printf("recv got WSAEWOULDBLOCK. Will retry recv later ...\n");printf("\n");
            bSocketError = FALSE; // not a real error.
        }
        else {
            printf("ERROR: recv failed. error = %d\n", err); printf("\n");
            bSocketError = TRUE;
        }
        goto CLEANUP;
    }
    if (nBytesRecd == 0) {
        printf("recv returned 0. Remote side has closed gracefully. Good.\n");printf("\n");
        bSocketError = TRUE;
        goto CLEANUP;
    }
    
    // update the stats.
    pSockInfo->recdData.dataSize = nBytesRecd;
    pSockInfo->nTotalRecd += nBytesRecd;
    pSockInfo->recdData.bufNotFullySent = TRUE;
    
    printf("Received data = %s, length = %d\n", pSockInfo->recdData.buf, nBytesRecd);printf("\n");
    
    CLEANUP:
        printf("Exiting ProcessReadEvent()\n");printf("\n");
        return bSocketError;
}

/* 
    This functions sends data on the socket in which a write event has been signalled.
    It sends only if the socket has some newly received data to send.
    In case the entire data in the recdData buffer could not be sent,
    this function remembers the offset at which to resume the next send.
    It signals that the data has been "fully" sent only after sending all of the data in the buffer.
*/
BOOL SendData(PSOCK_INFO pSockInfo) {
    BOOL bSocketError = FALSE;
    int nBytesSent;
    int err;
    
    printf("Entering SendData() on socket %d\n", pSockInfo->sock);printf("\n");
    
    // check if there's any data received in the buffer after the last one we sent out.
    if (!pSockInfo->recdData.bufNotFullySent || pSockInfo->recdData.dataSize <= 0) {
        printf("No data pending to be sent.\n");printf("\n");
        goto CLEANUP;
    }
    
    // if the data buffer contains new data, begin sending from the start
    // otherwise, begin sending from the point we left in the last call.
    nBytesSent = send(pSockInfo->sock, pSockInfo->recdData.buf + pSockInfo->recdData.sendOffset, pSockInfo->recdData.dataSize, 0);
    if (nBytesSent == SOCKET_ERROR) {
        err = WSAGetLastError();
        if (err == WSAEWOULDBLOCK) {
            printf("send got WSAEWOULDBLOCK. Will retry send later ...\n");printf("\n");
            bSocketError = FALSE; // not a real error.
        }
        else {
            printf("ERROR: send failed. error = %d\n", err); printf("\n");
            bSocketError = TRUE;
        }
        goto CLEANUP;
    }
    
    // update the stats.
    pSockInfo->recdData.sendOffset += nBytesSent;
    pSockInfo->recdData.dataSize -= nBytesSent;
    
    // consider data as "fully" sent only when the entire buf has been sent.
    if (pSockInfo->recdData.dataSize == 0) {
        pSockInfo->recdData.bufNotFullySent = FALSE;
    }
    pSockInfo->nTotalSent += nBytesSent;
    
    printf("Sent %d bytes. Remaining = %d bytes.\n", nBytesSent, pSockInfo->recdData.dataSize);printf("\n");
    
    CLEANUP:
        printf("Exiting SendData()\n");printf("\n");
        return bSocketError;
}

/* 
    Converts the FD_XXX events into a printable string.
    As the returned strings are static strings, they must not be modified.
*/
const char *__FDImage(long lEvent) {
    const char *szRetVal;
    
    switch (lEvent) {
        case FD_READ:
            szRetVal = "FD_READ";
            break; 
        case FD_WRITE:
            szRetVal = "FD_WRITE";
            break; 
        case FD_ACCEPT:
            szRetVal = "FD_ACCEPT";
            break; 
        case FD_CLOSE:
            szRetVal = "FD_CLOSE";
            break; 
        default: {
            szRetVal = "Unexpected";
            break; 
        }
    }
    return szRetVal;
}
/* 
    The call back function for the WSAAsyncSelect call.
    This is called by winsock whenever a event is available on a AsyncSelect-ed socket to be processed.
    wParam contains the socket handle.
    lParam contains the signalled event as well as error code, if any.
*/
void __ProcessAsyncSelectMessage(WPARAM wParam, LPARAM lParam) {
    // get the socket handle from wParam.
    SOCKET sock = (SOCKET) wParam;
    
    // get the type of event using the macro below.
    long event = WSAGETSELECTEVENT(lParam);
    
    // get the error associated with the event, if any, using the macro below.
    int error = WSAGETSELECTERROR(lParam);
    
    BOOL bSocketToBeClosed = FALSE;
    PSOCK_INFO pSockInfo;
    int rc;
    
    printf("Entering ProcessAsyncSelectMessage() for Sock = %d, Event = %s, Error = %d\n", sock, __FDImage(event), error);printf("\n");
    
    /* 
        first, get the SockInfo object corresponding to the signalled socket
        to retrieve the context of this socket.
    */
    for (pSockInfo = g_AcceptContext.pSockList;pSockInfo; pSockInfo = pSockInfo->next) {
        if (sock == pSockInfo->sock) {
            break; // found.
        }
    }
    
    // check if we found one.
    if (!pSockInfo) {
        /* 
            no, we couldn't find one.
            This will happen usually because of dummy FD_READs that we are posting
            which might show up even after we closed the socket and removed the SockInfo structure from the global sockets list.
            This condition is not an error, but a normal timing condition.
            So, we don't have to do anything with this socket.
        */
        printf("Couldn't find SockInfo. Socket might have been closed.\n");printf("\n");
        goto CLEANUP;
    }
    
    /* 
        if we were signalled an error event instead of a positive event
        then we don't have to process the socket.
    */
    if (error) {
        // some error has happened on this socket. need to close the socket.
        bSocketToBeClosed = TRUE;
        goto CLEANUP;
    }
    
    // take the corresponding action depending on the event signalled.
    switch (event) {
        case FD_ACCEPT:
            // Accept the new connection.
            pSockInfo = ProcessAcceptEvent(pSockInfo);
            if (pSockInfo == NULL) {
                printf("some error in accepting the connection or allocating resources for the new socket."); printf("\n");
                break; 
            }
            // request the specified events to be notified asynchronously to the hAcceptWindow for the given sock.
            rc = WSAAsyncSelect(pSockInfo->sock, g_AcceptContext.hAcceptWindow, WM_USER_ASYNCSELECT_MSG, FD_READ | FD_WRITE | FD_CLOSE);
            // check if the request went through.
            if (rc == SOCKET_ERROR) {
                printf("ERROR: WSAAsyncSelect failed on sock %d. Error = %d\n", pSockInfo->sock, WSAGetLastError()); printf("\n");
                bSocketToBeClosed = TRUE;
            }
            break; 
        case FD_READ:
            // Read data from the socket, if there's room for the new data.
            bSocketToBeClosed = ProcessReadEvent(pSockInfo);
            // check if the recv call indicated that the remote side has closed the socket and that we should also close it.
            if (bSocketToBeClosed == FALSE) {
                // no, it didn't. so, go ahead and echo the received data back if possible.
                bSocketToBeClosed = SendData(pSockInfo);
                // check if the echo was successful.
                if (bSocketToBeClosed == FALSE) {
                    /* 
                        yes it was.
                        now, if this happens to be the last piece of the incoming data,
                        and a FD_CLOSE was already notified to us,
                        we may not receive any more FD_READ notifications.
                        So, we need to post a dummy FD_READ notification to this socket
                        so that we again do a recv until we get a 0 from recv,
                        which means graceful disconnect from other side
                        or until we receive an error from recv.
                    */
                    if (pSockInfo->isFdCloseRecd) {
                        // post ourselves another FD_READ in case there's no data left.
                        printf("Posting a dummy FD_READ \n");printf("\n");
                        PostMessage(g_AcceptContext.hAcceptWindow, WM_USER_ASYNCSELECT_MSG, pSockInfo->sock, FD_READ);
                    }
                }
            }
            break; 
        case FD_WRITE:
            /* 
                since we usually echo the data immediately after receiving it in the FD_READ case above,
                we may not need this case,
                except for one important condition:
                when send fails with WSAEWOULDBLOCK then we'll be notified with this event
                once the remote side has started consuming the data and we can continue our send.
            */
            bSocketToBeClosed = SendData(pSockInfo);
            /* 
                in this case, most likely, while the previous data wasn't sent,
                there would have been a FD_READ which didn't result in a recv call.
                Hence, there won't be another FD_READ posted unless we call recv.
                So, we post a dummy FD_READ ourselves to allow the FD_READ handling code to be explicitly called.
            */
            /* 
                Note: In a real implementation,
                we would have to maintain more elaborate state
                to avoid posting these possibly redundant window messages.
            */
            printf("Posting a dummy FD_READ \n");printf("\n");
            PostMessage(g_AcceptContext.hAcceptWindow, WM_USER_ASYNCSELECT_MSG, pSockInfo->sock, FD_READ);
            break; 
        case FD_CLOSE:
            /* 
                even though the remote side has closed the socket,
                there might still be data that's left to read.
                so, we should just remember that we received a FD_CLOSE
                but not close the socket until we have read all the data.
            */
            pSockInfo->isFdCloseRecd = TRUE;
            /* 
                post ourselves another FD_READ in case there's no data left
                in which case, we'll actually close the socket when recv returns 0.
            */
            printf("Posting a dummy FD_READ \n");printf("\n");
            PostMessage(g_AcceptContext.hAcceptWindow, WM_USER_ASYNCSELECT_MSG, pSockInfo->sock, FD_READ);
            break; 
        default: {
            printf("Unexpected event: 0x%x for socket %d\n", event, sock); printf("\n");
            bSocketToBeClosed = TRUE;
            break; 
        }
    }
    
    CLEANUP:
        /* 
            if we were told in any of the above cases to close the socket,
            e.g. remote side closed and we got an error or recv returned 0,etc.
            then we close our socket.
        */
        if (bSocketToBeClosed) {
            // make sure we cancel the WSAAsyncSelect event with the event mask 0.
            WSAAsyncSelect (pSockInfo->sock, g_AcceptContext.hAcceptWindow, 0, 0);
            // shutdown the socket so as not to hang the client just in case it expects us to send any more data.
            if (shutdown(pSockInfo->sock, SD_SEND) == SOCKET_ERROR) {
                printf("ERROR: Shutdown failed. Error = %d\n", WSAGetLastError()); printf("\n");
            }
            // close the socket.
            closesocket (pSockInfo->sock);
            printf ("Closed socket %d. "
                "Total Bytes Recd = %d, "
                "Total Bytes Sent = %d\n",
                pSockInfo->sock, 
                pSockInfo->nTotalRecd, 
                pSockInfo->nTotalSent 
            ); 
            // delete it from the global list and free the memory.
            DeleteSockInfoFromList (&g_AcceptContext.pSockList, pSockInfo);
        }
        printf("Exiting ProcessAsyncSelectMessage()\n");printf("\n");
        return; 
}

/* 
    This is the Windows procedure for handling all the messages for the given window.
    We are interested in only one message.
    The rest of them will be passed on to the default windows procedure.
*/
LRESULT CALLBACK MainWndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam) {
    LRESULT res = 0;
    switch (message) {
        case WM_DESTROY:
            PostQuitMessage (0);
            break; 
        /* 
            the message that we gave in WSAAsyncSelect
            which winsock will send us back for notifying us of socket events
        */
        case WM_USER_ASYNCSELECT_MSG:
            __ProcessAsyncSelectMessage (wParam, lParam);
            break; 
        default: {
            res = DefWindowProc(hWnd, message, wParam, lParam);
            break; 
        }
    }
    return res;
}
/* 
    This function creates a hidden window
    to receive the async select messages sent by winsock for socket events.
*/
HWND CreateAcceptWindow(void) {
    
    WNDCLASS window;
    HWND windowHandle = NULL;
    
    // set the window properties.
    memset (&window, 0, sizeof(WNDCLASS));
    window.lpszClassName = "Accept Window";
    window.hInstance = NULL;
    window.lpfnWndProc = (WNDPROC) MainWndProc;
    window.hCursor = NULL;
    window.hIcon = NULL;
    window.lpszMenuName = NULL;
    window.hbrBackground = NULL;
    window.style = 0;
    window.cbClsExtra = 0;
    window.cbWndExtra = 0;
    
    // register the window class.
    if (!RegisterClass(&window)) {
        printf("Registerclass failed %d\n", GetLastError()); printf("\n");
        goto CLEANUP;
    }
    
    // create the window.
    windowHandle = CreateWindow("Accept Window",
        "Accept Window",
        WS_OVERLAPPEDWINDOW, //WS_MINIMIZE,
        CW_USEDEFAULT, 
        CW_USEDEFAULT, 
        CW_USEDEFAULT, 
        CW_USEDEFAULT, 
        (HWND) NULL,
        (HMENU) NULL,
        (HINSTANCE) NULL,
        (LPVOID) NULL);
    // check if a window was created.
    if (windowHandle == NULL) {
        printf("CreateWindow failed %d\n", GetLastError()); printf("\n");
        return NULL;
    }
    // uncomment the line below to see the window on the taskbar.
    // ShowWindow(windowHandle, SW_MINIMIZE);
    CLEANUP:
        return windowHandle;
}
// Entry point for the AsyncSelect Accept implementation.
void AsyncSelectAcceptMain() {
    PSOCK_INFO pSockInfo;
    int rc;
    MSG msg;
    
    printf("Entering AsyncSelectAcceptMain()\n");printf("\n");
    
    // Create a dummy hidden window to receive the async select messages.
    g_AcceptContext.hAcceptWindow = CreateAcceptWindow();
    if (g_AcceptContext.hAcceptWindow == NULL) {
        printf("Error in creating the accept window.\n"); printf("\n");
        goto CLEANUP;
    }
    
    // Set for all the listening sockets to be signalled on FD_ACCEPT event.
    for (pSockInfo = g_AcceptContext.pSockList; pSockInfo != NULL; pSockInfo = pSockInfo->next) {
        /* 
            Request asynchronous notifications for the FD_ACCEPT and FD_CLOSE events
            to be sent to the hAcceptWindow for this sock.
        */
        rc = WSAAsyncSelect(pSockInfo->sock,
            g_AcceptContext.hAcceptWindow, 
            WM_USER_ASYNCSELECT_MSG, 
            FD_ACCEPT | FD_CLOSE);
        if (rc == SOCKET_ERROR) {
            printf("ERROR: WSAAsyncSelect failed for sock %d. Error = %d\n", pSockInfo->sock, WSAGetLastError()); printf("\n");
            continue; 
        }
    }
    
    /* 
        Main message loop to process messages to the Accept Window.
        This will indirectly call MainWndProc
        which will in turn call ProcessAsyncSelectMessage.
    */
    while (GetMessage(&msg, (HWND) NULL, 0, 0)) {
        TranslateMessage (&msg);
        DispatchMessage (&msg);
    }
    
    CLEANUP:
        printf("Exiting AsyncSelectAcceptMain()\n");printf("\n");
        return; 
}
#pragma warning (disable: 4127)
/* 
    This function is the entry point for the Non-blocking Accept implementation.
    It waits on select for each of the listening/accepted sockets until any event is signalled.
    If a listening socket gets signalled, it performs accept.
    If an accepted socket gets signalled, it performs read and echoes back the data.
*/
void NonBlockingAcceptMain() {
    // prints a "i am still awake" message every few seconds.
    const long HEART_BEAT_INTERVAL = 30;
    PSOCK_INFO pSockInfo, pNextSock;
    fd_set readFDSet;
    struct timeval interval;
    int nReady;
    BOOL bSocketError;
    int nSocksInFDSet;
    
    printf("Entering NonBlockingAcceptMain()\n");printf("\n");
    
    // process the available sockets in the global socket list.
    while (g_AcceptContext.pSockList) {
        // first, prepare the FD_SET for passing to select.
        // initialize the FD_SET
        FD_ZERO (&readFDSet);
        nSocksInFDSet = 0;
        /* 
            include each socket in the FD_SET.
            For listening sockets, read means a new connection is available.
        */
        for (pSockInfo = g_AcceptContext.pSockList; pSockInfo != NULL; pSockInfo = pSockInfo->next) {
            /* 
                the FD_SET will take only upto FD_SETSIZE number of sockets.
                so, we signal an error if we exceed the MAX_CLIENTS which is less than or equal to FD_SETSIZE.
                If more clients need to be supported,
                then FD_SETSIZE can be redefined before including winsock2.h
            */
            if (nSocksInFDSet < MAX_CLIENTS) {
                FD_SET (pSockInfo->sock, &readFDSet);
                nSocksInFDSet++; 
            }
            else {
                printf("ERROR: Number of sockets in FD Set exceeds MAX_CLIENTS (%d)\n", MAX_CLIENTS); printf("\n");
                break; 
            }
        }
        
        printf("Num sockets in FD_SET: %d\n", nSocksInFDSet);printf("\n");
        
        // wait on select for HEART_BEAT_INTEVAL seconds to see if any of the sockets are signalled.
        interval.tv_sec = HEART_BEAT_INTERVAL;
        interval.tv_usec = 0;
        printf("Waiting in select for data/connections ...\n");printf("\n");
        
        /* 
            currently we use only the read set,
            which signals all the three events required:
            accept for listening sockets,
            read for connected sockets and
            close for both type of sockets on error.
        */
        nReady = select(0, &readFDSet, NULL, NULL, &interval);
        if (nReady == SOCKET_ERROR) {
            printf("ERROR: select failed. Error = %d\n", WSAGetLastError()); printf("\n");
            // pause so as not to output frequently in case of repeated errors.
            Sleep (3000);
            continue; 
        }
        // check if some socket was signalled.
        if (nReady == 0) {
            printf("No connections/data in the last %d seconds. \n", HEART_BEAT_INTERVAL);printf("\n");
            continue; 
        }
        /* 
            find out which socket was signalled and process that socket.
            since nReady indicates how many sockets are in the signalled state,
            we don't need to loop if we have already processed that many sockets.
        */
        pSockInfo = g_AcceptContext.pSockList;
        while (pSockInfo != NULL && nReady > 0) {
            // check if this socket is set.
            if (FD_ISSET(pSockInfo->sock, &readFDSet)) {
                nReady--; 
                /* 
                    for listening sockets,
                    signalling on a read set
                    means a new connection is available.
                */
                if (pSockInfo->isSocketListening) {
                    /* 
                        accept the connection
                        and add the new socket to the beginning of the list
                        (not the end, so that we won't come across the newly added sockets
                        before they are included in the next select call later).
                    */
                    ProcessAcceptEvent (pSockInfo);
                }
                else {
                    /* 
                        this read event for a connected socket
                        means data is available or socket is closed.
                    */
                    // read data if available and if we have buffer space.
                    bSocketError = ProcessReadEvent(pSockInfo);
                    /* 
                        if we already found that the socket is closed due to some errors,
                        we don't need to send the data
                    */
                    if (!bSocketError) {
                        // so far no error, so try echoing the data back.
                        bSocketError = SendData(pSockInfo);
                    }
                    // if there was an error in recv/send, close the socket.
                    if (bSocketError) {
                        // close the socket
                        closesocket (pSockInfo->sock);
                        printf("Closed socket %d. Total Bytes Recd = %d, Total Bytes Sent = %d\n", pSockInfo->sock, pSockInfo->nTotalRecd, pSockInfo->nTotalSent);printf("\n");
                        // delete the SockInfo structure and free the memory.
                        pNextSock = pSockInfo->next;
                        DeleteSockInfoFromList (&g_AcceptContext.pSockList, pSockInfo);
                        pSockInfo = pNextSock;
                        continue; 
                    }
                }
            }
            
            /* 
                move on to the next socket.
                as mentioned earlier,
                since new sockets are added only in the beginning of the list
                we won't be processing them until they are included in the next select call.
            */
            pSockInfo = pSockInfo->next;
        }
    }
    
    printf("Exiting NonBlockingAcceptMain()\n");printf("\n");
    return; 
}
/* 
    Converts a given address family into its corresponding string representation for display purposes.
*/
const char *__AFImage(BYTE addressFamily) {
    char *szRetVal;
    // return the printable string equivalent of the corresponding address family.
    switch (addressFamily) {
        case AF_UNSPEC:
            szRetVal = "AF_UNSPEC";
            break; 
        case AF_INET:
            szRetVal = "AF_INET";
            break; 
        case AF_INET6:
            szRetVal = "AF_INET6";
            break; 
        default: {
            szRetVal = "Unrecognized";
            break; 
        }
    }
    return szRetVal;
}

/* 
    This function converts a given type of accept into its corresponding string representation for display purposes.
*/
const char *__AcceptTypeImage(BYTE typeOfAccept) {
    char *szRetVal;
    // return a string equivalent of the accept type for displaying to the user of his choices.
    switch (typeOfAccept) {
        case NON_BLOCKING_ACCEPT:
            szRetVal = "NON_BLOCKING_ACCEPT";
            break; 
        case ASYNC_SELECT_ACCEPT:
            szRetVal = "ASYNC_SELECT_ACCEPT";
            break; 
        default: {
            szRetVal = "Unrecognized";
            break; 
        }
    }
    return szRetVal;
}

/* 
    This function prints the available command-line options,
    the arguments expected by each of them
    and the valid input values
    and the default values for each them.
*/
void PrintUsage(char *szProgramName) {
    printf ("\n\n"
        "Usage:\n" 
        "------\n" 
        " %s <options> \n\n"
        "where <options> is one or more of the following: \n\n"
        " -a <0|4|6>      Address Family: 0 for Either\n"
        " 4 for IPv4\n"
        " 6 for IPv6\n"
        " Default: %d\n\n"
        " -i <interface>  Interface address\n"
        " Default: %s\n\n"
        " -e <endpoint>   Port number\n"
        " Default: %s\n\n"
        " -t <1|2>        Type of Accept: 1 for Non-blocking accept\n"
        " 2 for Accept with WSAAsyncSelect\n"
        " Default: %d\n\n"
        "\n", 
        szProgramName, 
        DEFAULT_ADDRESS_FAMILY, 
        ( DEFAULT_INTERFACE == NULL ? "NULL" : DEFAULT_INTERFACE),
        DEFAULT_PORT, 
        DEFAULT_TYPE_OF_ACCEPT 
    ); 
    return; 
}

/* 
    Parses the given input arguments
    and fills up the corresponding fields in the g_AcceptContext structure.
*/
BOOL ParseArguments(int argc, char *argv[]) {
    /* 
        holds the return value from this function.
        TRUE indicates that all the supplied arguments are valid.
        FALSE indicates incorrect or insufficient number of arguments.
    */
    BOOL retVal = FALSE;
    
    // loop index to go over the command-line arguments one by one.
    int i;
    
    printf("Entering ParseArguments()\n");printf("\n");
    
    // fill up the default arguments and let the user options override these.
    g_AcceptContext.addressFamily = DEFAULT_ADDRESS_FAMILY;
    g_AcceptContext.szInterface = DEFAULT_INTERFACE;
    g_AcceptContext.szPort = DEFAULT_PORT;
    g_AcceptContext.typeOfAccept = DEFAULT_TYPE_OF_ACCEPT;
    
    // process each argument in the argv list.
    for (i = 1; i < argc ; i++) {
        char firstChar = argv[i][0];
        // make sure the option begins with a hyphen or a forward slash.
        if (!(firstChar == '-' || firstChar == '/')) {
            printf("ERROR: Option has to begin with - or / : %s\n", argv[i]); printf("\n");
            PrintUsage (argv[0]);
            goto CLEANUP;
        }
        // process the option.
        switch (argv[i][1]) {
            case 'a':
                // Address Family.
                // should be -a 0 or -a 4 or -a 6
                // first check if there's one more argument.
                if (i + 1 >= argc) {
                    printf("ERROR: Argument 0/4/6 needed for -a option\n"); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                // extract and validate the AF number.
                switch (atoi(argv[i+1])) {
                    // Unspecified.
                    case 0:
                        g_AcceptContext.addressFamily = AF_UNSPEC;
                        break; 
                    // IPv4.
                    case 4:
                        g_AcceptContext.addressFamily = AF_INET;
                        break; 
                    // IPv6.
                    case 6:
                        g_AcceptContext.addressFamily = AF_INET6;
                        break; 
                    // Invalid value.
                    default: {
                        printf("ERROR: Invalid address family. Must be 0/4/6\n"); printf("\n");
                        PrintUsage (argv[0]);
                        goto CLEANUP;
                    }
                }
                // indicate that we have processed the next argument as well.
                i++; 
                // AF was fine. continue.
                break; 
            case 'i':
                // Interface to listen on.
                // should be -i <interface>
                // first check if there's one more argument.
                if (i + 1 >= argc) {
                    printf("ERROR: Interface needed for -i option\n"); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                // make sure the input string length is less than
                // the INET6_ADDRSTRLEN, the maximum valid IP address length.
                if (FAILED(StringCchLength(argv[i+1],INET6_ADDRSTRLEN, NULL))) {
                    printf("ERROR: Interface string too long. can't exceed %d characters\n", INET6_ADDRSTRLEN); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                
                // remember the interface string.
                g_AcceptContext.szInterface = argv[i+1];
                // indicate that we have processed the next argument as well.
                i++; 
                // continue.
                break; 
            case 'e':
                // Endpoint or Port.
                // should be -e <port number>
                // first check if there's one more argument.
                if (i + 1 >= argc) {
                    printf("ERROR: Port number needed for -e option\n"); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                // make sure the input string length is less than the maximum length for a service name.
                if (FAILED(StringCchLength(argv[i+1], NI_MAXSERV, NULL))) {
                    printf("ERROR: Port number too long. can't exceed %d characters\n", NI_MAXSERV); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                
                // remember the port number string.
                g_AcceptContext.szPort = argv[i+1];
                // indicate that we have processed the next argument as well.
                i++; 
                // continue.
                break; 
            case 't':
                // Type of Accept.
                // should be -t 1 or -t 2
                // first check if there's one more argument.
                if (i + 1 >= argc) {
                    printf("ERROR: Argument 1 or 2 needed for -t option\n"); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                // extract the type value
                g_AcceptContext.typeOfAccept = (BYTE) atoi(argv[i+1]);
                // indicate that we have processed the next argument as well.
                i++; 
                // validate the accept type.
                if (!(g_AcceptContext.typeOfAccept == 1 || g_AcceptContext.typeOfAccept == 2)) {
                    printf("ERROR: Invalid accept type: %d. Must be 1 or 2\n", g_AcceptContext.typeOfAccept); printf("\n");
                    PrintUsage (argv[0]);
                    goto CLEANUP;
                }
                // Accept type was fine. continue.
                break; 
            // help
            case 'h':
            case '?':
                PrintUsage (argv[0]);
                goto CLEANUP;
            default: {
                printf("ERROR: Unrecognized option: %s\n", argv[i]); printf("\n");
                PrintUsage (argv[0]);
                goto CLEANUP;
            }
        }
    }
    /* 
        echo the final list of values that'll be used.
        remember, these need not be the same as the input arguments.
        rather, this is what we'll use inside our program.
    */
    printf("Parsed input arguments. The following values will be used : \n");printf("\n");
    printf("\tAddress Family = %s\n", __AFImage(g_AcceptContext.addressFamily));printf("\n");
    printf("\tInterface = %s\n",g_AcceptContext.szInterface);printf("\n");
    printf("\tPort = %s\n", g_AcceptContext.szPort);printf("\n");
    printf("\tType of Accept = %s\n", __AcceptTypeImage(g_AcceptContext.typeOfAccept));printf("\n");
    // all went well, signal that we can proceed.
    retVal = TRUE;
    
    CLEANUP:
        printf("Exiting ParseArguments()\n");printf("\n");
        return retVal;
}


/* 
    This function is the entry point for this program.
    Based on the command-line arguments, it invokes the suitable functions.
*/
int __cdecl main(int argc, char *argv[]) {
    // holds the return value from this function.
    // 0 indicates success, non-zero indicates failure.
    int retVal;
    
    WSADATA wsaData;
    
    printf("Entering main()\n");printf("\n");
    
    /* 
        parse and validate the given arguments and determine if we should continue the execution or return error.
    */
    if (ParseArguments(argc, argv) == FALSE) {
        // error input. return a non-zero error code.
        retVal = 1;
        goto CLEANUP;
    }
    
    // call WSAStartup before calling any of the Winsock API functions.
    retVal = WSAStartup(MAKEWORD(2,2), &wsaData);
    if (retVal != 0) {
        printf("WSAStartup failed. Error = %d\n", retVal); printf("\n");
        goto CLEANUP;
    }
    
    /* 
        Depending on the command-line options given,
        create one or more listening sockets on the requested interface(s).
    */
    CreateListeningSockets ();
    
    // Depending on the type of accept requested, call the suitable function.
    switch (g_AcceptContext.typeOfAccept) {
        case NON_BLOCKING_ACCEPT:
            NonBlockingAcceptMain ();
            break; 
        case ASYNC_SELECT_ACCEPT:
            AsyncSelectAcceptMain ();
            break; 
        default: 
            // some error. return a non-zero error code.
            retVal = 1;
            break; 
    }
    /* 
        we may not come here as per the current implementation
        since the XXXAcceptMain functions themselves are waiting forever for connections or data.
        But in case we add a timeout option in future
        we might come here and so we'll cleanup everything properly.
    */
    
    /* 
        Close all the listening sockets and remove them from the global list.
        In case there are some accepted sockets still in the list, (due to some error),
        they'll also be closed as well.
    */
    DestroyListeningSockets ();
    
    // Inform Winsock that we're done with all the Winsock APIs.
    WSACleanup ();
    
    CLEANUP:
        printf("Exiting main()\n");printf("\n");
        return retVal;
}
