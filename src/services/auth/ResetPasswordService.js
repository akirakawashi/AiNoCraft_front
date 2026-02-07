import PublicApiService from '../core/PublicApiService';
import ApiConfig from '../core/ApiConfig';

/**
 * Сервис для работы со сбросом пароля
 */
class ResetPasswordService extends PublicApiService {
    async init(email) {
        const response = await this.post(ApiConfig.ENDPOINTS.RESET_PASSWORD_INIT, {
            email,
        });

        return response;
    }

    async verify(email, code) {
        const response = await this.post(ApiConfig.ENDPOINTS.RESET_PASSWORD_VERIFY, {
            email,
            code,
        });

        return response;
    }

    async finalize(newPassword) {
        const response = await this.post(ApiConfig.ENDPOINTS.RESET_PASSWORD_FINALIZE, {
            new_password: newPassword,
        });

        return response;
    }
}


const resetPasswordService = new ResetPasswordService();

export default resetPasswordService;
