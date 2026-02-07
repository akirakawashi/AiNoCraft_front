import PublicApiService from '../core/PublicApiService';
import ApiConfig from '../core/ApiConfig';
import tokenManager from './TokenManager';


class AuthService extends PublicApiService {

    async login(login, password) {
        const response = await this.post(ApiConfig.ENDPOINTS.LOGIN, {
            login,
            password,
        });

        const accessToken = response.access_token;
        const tokenType = response.token_type || 'bearer';
        const userLogin = response.login;
        const expiresAt = response.expires_at; // unix timestamp in seconds

        tokenManager.setAccessToken(accessToken, expiresAt);

        return {
            accessToken,
            tokenType,
            login: userLogin,
            expiresAt,
        };
    }

    async registerInit(login, email, password) {
        const response = await this.post(ApiConfig.ENDPOINTS.REGISTER_INIT, {
            login,
            email,
            password,
        });

        return response;
    }

    async registerVerify(email, code) {
        const response = await this.post(ApiConfig.ENDPOINTS.REGISTER_VERIFY, {
            email,
            code,
        });

        return response;
    }

    async resendVerificationCode(email) {
        const response = await this.post(ApiConfig.ENDPOINTS.REGISTER_RESEND, {
            email,
        });

        return response;
    }   

    async logout() {
        try {
            await this.post(ApiConfig.ENDPOINTS.LOGOUT, {});
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Logout error:', error);
            }
        } finally {
            tokenManager.clearToken();
            this.clearUserData();
        }
    }

    async refresh() {
        const response = await this.post(ApiConfig.ENDPOINTS.REFRESH, {});

        const accessToken = response.access_token;
        const tokenType = response.token_type || 'bearer';
        const userLogin = response.login;
        const expiresAt = response.expires_at; // unix timestamp in seconds

        tokenManager.setAccessToken(accessToken, expiresAt);

        return {
            accessToken,
            tokenType,
            login: userLogin,
            expiresAt,
        };
    }

    isAuthenticated() {
        return tokenManager.hasToken();
    }

    async checkLoginAvailability(login) {
        return this.get(ApiConfig.ENDPOINTS.LOGIN_CHECK(login));
    }

    async checkEmailAvailability(email) {
        return this.get(ApiConfig.ENDPOINTS.EMAIL_CHECK(email));
    }

    clearUserData() {
        try {
            localStorage.removeItem('user');
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Clear user data error:', error);
            }
        }
    }
}

const authService = new AuthService();

export default authService;
