class ApiError extends Error {
    
    constructor(message, status, code = null, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.data = data;
    }

    isUnauthorized() {
        return this.status === 401;
    }

    isForbidden() {
        return this.status === 403;
    }

    isNotFound() {
        return this.status === 404;
    }

    isServerError() {
        return this.status >= 500;
    }

    isClientError() {
        return this.status >= 400 && this.status < 500;
    }
}

class ErrorHandler {
    
    static async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = this.extractErrorMessage(errorData, response.status);
            const code = errorData?.error?.code || null;
            const error = new ApiError(message, response.status, code, errorData);
            this.logError(error);
            return error;
        }
        return null;
    }

    static extractErrorMessage(errorData, status) {
        if (errorData?.error?.message) {
            return errorData.error.message;
        }
        if (errorData?.detail) {
            return errorData.detail;
        }
        if (errorData?.message) {
            return errorData.message;
        }
        return this.getDefaultMessage(status);
    }

    static getDefaultMessage(status) {
        const messages = {
            400: 'Неверный запрос',
            401: 'Необходима авторизация',
            403: 'Доступ запрещен',
            404: 'Ресурс не найден',
            409: 'Конфликт данных',
            422: 'Ошибка валидации данных',
            429: 'Слишком много запросов',
            500: 'Внутренняя ошибка сервера',
            502: 'Сервер недоступен',
            503: 'Сервис временно недоступен',
        };
        return messages[status] || `HTTP ошибка: ${status}`;
    }

    static logError(error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('[API Error]', {
                message: error.message,
                status: error.status,
                code: error.code,
                data: error.data,
            });
        }
        
        // # todo: integrate with monitoring service
        // this.sendToMonitoring(error);
    }

    static handleNetworkError(error) {
        const networkError = new ApiError(
            'Ошибка сети. Проверьте подключение к интернету.',
            0,
            'NETWORK_ERROR',
            { originalError: error.message }
        );
        
        this.logError(networkError);
        return networkError;
    }
}

export { ApiError, ErrorHandler };
