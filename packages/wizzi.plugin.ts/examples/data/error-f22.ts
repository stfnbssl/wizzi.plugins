const request = {
    get: async <T>(url: string) => axios.get<T>(url).then(responseBody),
};