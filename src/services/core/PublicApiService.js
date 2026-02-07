import HttpClient from './HttpClient';

/**
 * Базовый класс для публичных API запросов
 * Не требует авторизации, не добавляет токены
 * Используется для: login, register, refresh, проверок доступности и т.д.
 */
class PublicApiService {
    constructor() {
        this.client = new HttpClient();
    }

    async get(endpoint, options = {}) {
        return this.client.request(endpoint, {
            ...options,
            method: 'GET',
        });
    }

    async post(endpoint, data, options = {}) {
        return this.client.request(endpoint, {
            ...options,
            method: 'POST',
            body: data,
        });
    }

    async put(endpoint, data, options = {}) {
        return this.client.request(endpoint, {
            ...options,
            method: 'PUT',
            body: data,
        });
    }

    async patch(endpoint, data, options = {}) {
        return this.client.request(endpoint, {
            ...options,
            method: 'PATCH',
            body: data,
        });
    }

    async delete(endpoint, options = {}) {
        return this.client.request(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }
}

export default PublicApiService;
