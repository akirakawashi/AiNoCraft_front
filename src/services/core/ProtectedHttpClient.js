import HttpClient from './HttpClient';
import tokenManager from '../auth/TokenManager';

class ProtectedHttpClient extends HttpClient {
    constructor() {
        super();
        this.setupAuthInterceptor();
    }

    setupAuthInterceptor() {
        this.addRequestInterceptor(async (config) => {
            const token = tokenManager.getAccessToken();
            
            if (token) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
            
            return config;
        });
    }
}

export default ProtectedHttpClient;
