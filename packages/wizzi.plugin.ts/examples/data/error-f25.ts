const responseBody = <T>(response: AxiosResponse<T>) => 
    response.data
;
const request = {
    get: async <T>(url: string) => {
        axios.defaults.baseURL = BASE_URL;
        return axios.get<T>(url).then(responseBody)
        ;
    }
 };
