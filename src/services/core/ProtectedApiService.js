import ProtectedHttpClient from './ProtectedHttpClient';
import tokenManager from '../auth/TokenManager';

class ProtectedApiService {
    constructor() {
        this.client = new ProtectedHttpClient();
    }

    /**
     * main method to make requests protected by auth token
     * automatically handles 401 errors by refreshing token
     */
    async request(endpoint, options = {}) {
        try {
            return await this.client.request(endpoint, options);
        } catch (error) {
            if (error.isUnauthorized && error.isUnauthorized() && !options._isRetry) {
                return await this.handleUnauthorized(endpoint, options);
            }
            throw error;
        }
    }

    async handleUnauthorized(endpoint, options) {
        if (tokenManager.isRefreshing()) {
            await tokenManager.getRefreshPromise();
        } else {
            const refreshPromise = this.refreshToken();
            tokenManager.setRefreshPromise(refreshPromise);
            try {
                await refreshPromise;
            } catch (refreshError) {
                tokenManager.clearToken();
                throw refreshError;
            }
        }
        return this.client.request(endpoint, {
            ...options,
            _isRetry: true,
        });
    }

    async refreshToken() {
        const { default: authService } = await import('../auth/AuthService');
        return authService.refresh();
    }


    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'GET',
        });
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: data,
        });
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: data,
        });
    }

    async patch(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PATCH',
            body: data,
        });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }
}

export default ProtectedApiService;
