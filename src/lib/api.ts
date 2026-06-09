import axios, { AxiosError, type AxiosResponse } from 'axios';



const token = localStorage.getItem('auth_token');

interface Repos{
    id: string;
    projectName: string;
    description: string;
    commitHash: string;
    branch: string;
    status: string;
    duration: string;
    timestamp: string;
    full_name: string;
    html_url: string;
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status, config } = error.response!;
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error('unauthorised');
                break;

            case 404:
                console.error('/not-found');
                break;

            case 500:
                console.error('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
};

const getRepos = {
    list: () =>
        request
            .get<{ repos: Repos[] }>('/repos')
            .then(res => res.repos),
    details: (id: string) => request.get<Repos>(`/repos/${id}`),
    // create: (data: Repos) => request.post<void>('/repos', data),
};

const deploy = {
    injectWorkflow: (data: { repoFullName: string; runtime: string; branch: string }) =>
        request.post<{ buildId: string }>('/inject-workflow', data),
    create: (data: { image: string; subdomain: string; repo?: string }) => 
        request.post<any>('/deploy', data),
    list: () => request.get<{ deployments: any[] }>('/deployments').then(res => res.deployments),
    get: (id: string) => request.get<{ deployment: any }>(`/deployments/${id}`).then(res => res.deployment),
    delete: (id: string) => axios.delete(`/deployments/${id}`).then(responseBody),
};

const api = {
    getRepos,
    deploy
};

export default api;