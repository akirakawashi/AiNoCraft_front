import ApiConfig from './ApiConfig';
import { ErrorHandler } from './ErrorHandler';

class HttpClient {
    constructor() {
        this.baseURL = ApiConfig.BASE_URL;
        this.defaultHeaders = ApiConfig.HEADERS;
        this.timeout = ApiConfig.REQUEST_TIMEOUT;
        this.requestInterceptors = [];
    }

    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }

    // main request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        let config = {
            method: options.method || 'GET',
            headers: {
                ...this.defaultHeaders,
                ...options.headers,
            },
            credentials: 'include', // for httpOnly cookies
            ...options,
        };

        for (const interceptor of this.requestInterceptors) {
            config = await interceptor(config);
        }

        if (config.body && config.method !== 'GET') {
            if (typeof config.body === 'object' && !(config.body instanceof FormData)) {
                config.body = JSON.stringify(config.body);
            }
        } else {
            delete config.body;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            try {
                const response = await fetch(url, {
                    ...config,
                    signal: controller.signal,
                });

                const error = await ErrorHandler.handleResponse(response);
                if (error) {
                    throw error;
                }

                if (response.status === 204) {
                    return null;
                }

                return await response.json();
            } finally {
                clearTimeout(timeoutId);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                throw ErrorHandler.handleNetworkError(new Error('Request timeout'));
            }
            
            if (!error.status) {
                throw ErrorHandler.handleNetworkError(error);
            }
            
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'GET',
        });
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: data,
        });
    }

    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: data,
        });
    }

    patch(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PATCH',
            body: data,
        });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }
}

export default HttpClient;
