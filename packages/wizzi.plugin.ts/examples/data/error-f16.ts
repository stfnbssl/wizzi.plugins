export function useIsPending({
    formAction, 
    formMethod='POST', 
    state='non-idle', 
    
 }: { 
    formAction?: string;
    formMethod?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
    state?: 'submitting' | 'loading' | 'non-idle';
} = {}) {

}
