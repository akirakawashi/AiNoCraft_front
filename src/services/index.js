// for backward compatibility import and export AuthService
import authService from './auth/AuthService';

// Core modules
export { default as HttpClient } from './core/HttpClient';
export { default as PublicApiService } from './core/PublicApiService';
export { default as ProtectedHttpClient } from './core/ProtectedHttpClient';
export { default as ProtectedApiService } from './core/ProtectedApiService';
export { default as ApiConfig } from './core/ApiConfig';
export { ApiError, ErrorHandler } from './core/ErrorHandler';

// Auth
export { default as authService } from './auth/AuthService';
export { default as tokenManager } from './auth/TokenManager';
export { default as resetPasswordService } from './auth/ResetPasswordService';

// User
export { default as userService } from './user/UserService';

// for backward compatibility
export const AuthService = authService;
export default authService;
