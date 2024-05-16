var x = {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
};
