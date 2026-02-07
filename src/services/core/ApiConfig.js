class ApiConfig {
    static BASE_URL = process.env.REACT_APP_API_URL || 'https://api.ainocraft.com/api/v1';
    
    static ENDPOINTS = {
        // Auth endpoints
        LOGIN: '/login',
        REGISTER_INIT: '/register/init',
        REGISTER_VERIFY: '/register/verify',
        REGISTER_RESEND: '/register/resend-code',
        LOGOUT: '/logout',
        REFRESH: '/refresh',
        CHANGE_PASSWORD: '/change-password',
        
        // Reset Password endpoints
        RESET_PASSWORD_INIT: '/reset-password/init',
        RESET_PASSWORD_VERIFY: '/reset-password/verify',
        RESET_PASSWORD_FINALIZE: '/reset-password/finalize',
        
        // User endpoints
        BALANCE: '/balance',
        GET_AVATAR: '/avatars/get-avatar',
        GET_AVATAR_UPLOAD_URL: '/avatars/get-upload-url',
        AVATAR_COMPLETE: '/avatars/avatar-complete',
        LOGIN_CHECK: (login) => `/check/login/${login}`,
        EMAIL_CHECK: (email) => `/check/email/${email}`,
    };

    static HEADERS = {
        'Content-Type': 'application/json',
    };

    static REQUEST_TIMEOUT = 10000; // 10 seconds
}

export default ApiConfig;
