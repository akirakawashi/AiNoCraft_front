import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authService, userService } from '../services';
import { ErrorHandler } from '../services/core/ErrorHandler';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState({ loli_coins: 0, loli_crystal: 0 });
    const [avatar, setAvatar] = useState(() => {
        return localStorage.getItem('user_avatar') || null;
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState(null);
    const refreshIntervalRef = React.useRef(null);


    // Reset auth state
    const resetState = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        setBalance({ loli_coins: 0, loli_crystal: 0 });
        setAvatar(null);
        setError(null);
        localStorage.removeItem('user_avatar');
    }, []);


    // Unified authentication error handler
    const handleAuthError = useCallback((err) => {
        const errorMessage = ErrorHandler.extractErrorMessage(err.data || {}, err.status || 0);
        setError(errorMessage);
        if (err?.status === 401 || err?.response?.status === 401) {
            const isInvalidCredentials = err.code === 'AUTH_INVALID_CREDENTIALS';
            if (!isInvalidCredentials) {
                resetState();
            }
        }
        return errorMessage;
    }, [resetState]);

    /**
     * Helper: handle avatar upload via MinIO presigned URL
     * Process: get presigned URL -> upload to MinIO -> confirm on backend -> update state + localStorage
     * Broadcasts update to other tabs via storage event
     */
    const handleAvatarUpload = useCallback(async (imageBlob) => {
        try {
            // Полный процесс загрузки через MinIO
            const response = await userService.uploadAvatar(imageBlob);
            
            if (process.env.NODE_ENV === 'development') {
                console.log('Upload response:', response);
            }
            
            // После успешной загрузки получаем свежий аватар с бэкенда
            if (response.success) {
                try {
                    const avatarData = await userService.getAvatar();
                    const avatarUrl = (avatarData && (avatarData.avatar_url || avatarData.presigned_url)) || null;
                    if (avatarUrl) {
                        setAvatar(avatarUrl);
                        // Сохраняем новую аватарку в localStorage (обновляем кеш для всех вкладок)
                        localStorage.setItem('user_avatar', avatarUrl);
                        
                        // Отправляем событие обновления всем вкладкам
                        window.dispatchEvent(new CustomEvent('avatar-updated', { detail: { avatar_url: avatarUrl } }));
                    }

                    if (process.env.NODE_ENV === 'development') {
                        console.log('Avatar refreshed from backend and cached');
                    }

                    return { success: response.success, message: response.message, avatar_url: avatarUrl };
                } catch (err) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Failed to refresh avatar:', err);
                    }
                    return { success: response.success, message: response.message, avatar_url: null };
                }
            }

            return { success: response.success, message: response.message, avatar_url: null };
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Avatar upload error:', err);
            }
            throw err;
        }
    }, []);


    /** 
     * Listen for avatar updates from other tabs and custom avatar-updated events
     * Ensures all tabs stay in sync when avatar changes on any device
     */
    useEffect(() => {
        const handleStorageChange = (event) => {
            // Sync avatar when updated from another tab
            if (event.key === 'user_avatar' && event.newValue) {
                setAvatar(event.newValue);
                if (process.env.NODE_ENV === 'development') {
                    console.log('Avatar synced from another tab');
                }
            }
        };

        const handleAvatarUpdated = (event) => {
            // Sync avatar when updated on current tab (broadcast from handleAvatarUpload)
            const newAvatarUrl = event.detail?.avatar_url;
            if (newAvatarUrl) {
                setAvatar(newAvatarUrl);
                if (process.env.NODE_ENV === 'development') {
                    console.log('Avatar updated locally');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('avatar-updated', handleAvatarUpdated);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('avatar-updated', handleAvatarUpdated);
        };
    }, []);

    /** 
     * Main initialization: Check sessionStorage, restore token if valid, setup proactive refresh timer
     */
    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            try {
                // Import after component mount to avoid race conditions
                const { default: tokenMgr } = await import('../services/auth/TokenManager');
                const { default: authSvc } = await import('../services/auth/AuthService');

                // Try to restore token from sessionStorage
                const storedToken = sessionStorage.getItem('accessToken');
                const storedExpiresAt = sessionStorage.getItem('tokenExpiresAt');
                const storedLogin = sessionStorage.getItem('userLogin');

                if (storedToken && storedExpiresAt) {
                    tokenMgr.setAccessToken(storedToken, parseInt(storedExpiresAt));

                    // If token is still valid, use it without refresh
                    if (tokenMgr.isTokenValid()) {
                        if (mounted) {
                            setIsAuthenticated(true);
                            const userLoginObj = storedLogin ? JSON.parse(storedLogin) : { login: '' };
                            setUser({ login: userLoginObj.login });
                            
                            // Load balance - always fresh from backend
                            try {
                                const balanceData = await userService.getBalance();
                                if (mounted) setBalance(balanceData);
                            } catch (err) {
                                if (process.env.NODE_ENV === 'development') {
                                    console.error('Failed to fetch balance:', err);
                                }
                            }
                            
                            // Avatar: use cached version from localStorage, load from API only if not cached
                            const cachedAvatar = localStorage.getItem('user_avatar');
                            if (cachedAvatar) {
                                if (mounted) {
                                    setAvatar(cachedAvatar);
                                    if (process.env.NODE_ENV === 'development') {
                                        console.log('Avatar loaded from cache');
                                    }
                                }
                            } else {
                                // Cache miss - fetch from backend and cache it
                                try {
                                    const avatarData = await userService.getAvatar();
                                    const avatarUrl = (avatarData && (avatarData.avatar_url || avatarData.presigned_url)) || null;
                                    if (mounted && avatarUrl) {
                                        setAvatar(avatarUrl);
                                        localStorage.setItem('user_avatar', avatarUrl);
                                        if (process.env.NODE_ENV === 'development') {
                                            console.log('Avatar loaded from backend and cached');
                                        }
                                    }
                                } catch (err) {
                                    if (process.env.NODE_ENV === 'development') {
                                        console.error('Failed to fetch avatar:', err);
                                    }
                                }
                            }

                            // Start proactive refresh timer
                            startProactiveRefreshTimer(authSvc, tokenMgr);
                            return;
                        }
                    }
                }

                // Token doesn't exist or expired - refresh to get new one
                const refreshResponse = await authSvc.refresh();
                if (mounted) {
                    sessionStorage.setItem('accessToken', refreshResponse.accessToken);
                    sessionStorage.setItem('tokenExpiresAt', refreshResponse.expiresAt);
                    sessionStorage.setItem('userLogin', JSON.stringify({ login: refreshResponse.login }));

                    setIsAuthenticated(true);
                    setUser({ login: refreshResponse.login });
                    
                    // Load balance - always fresh from backend
                    try {
                        const balanceData = await userService.getBalance();
                        if (mounted) setBalance(balanceData);
                    } catch (err) {
                        if (process.env.NODE_ENV === 'development') {
                            console.error('Failed to fetch balance:', err);
                        }
                    }
                    
                    // Avatar: use cached version from localStorage, load from API only if not cached
                    const cachedAvatar = localStorage.getItem('user_avatar');
                    if (cachedAvatar) {
                        if (mounted) {
                            setAvatar(cachedAvatar);
                            if (process.env.NODE_ENV === 'development') {
                                console.log('Avatar loaded from cache');
                            }
                        }
                    } else {
                        // Cache miss - fetch from backend and cache it
                        try {
                            const avatarData = await userService.getAvatar();
                            const avatarUrl = (avatarData && (avatarData.avatar_url || avatarData.presigned_url)) || null;
                            if (mounted && avatarUrl) {
                                setAvatar(avatarUrl);
                                localStorage.setItem('user_avatar', avatarUrl);
                                if (process.env.NODE_ENV === 'development') {
                                    console.log('Avatar loaded from backend and cached');
                                }
                            }
                        } catch (err) {
                            if (process.env.NODE_ENV === 'development') {
                                console.error('Failed to fetch avatar:', err);
                            }
                        }
                    }

                    // Start proactive refresh timer
                    startProactiveRefreshTimer(authSvc, tokenMgr);
                }
            } catch (error) {
                if (mounted) {
                    setUser(null);
                    setIsAuthenticated(false);
                    setBalance({ loli_coins: 0, loli_crystal: 0 });
                    setAvatar(null);
                    setError(null);
                    localStorage.removeItem('user_avatar');
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('tokenExpiresAt');
                    sessionStorage.removeItem('userLogin');
                }
            } finally {
               if (mounted) {
                   setIsLoading(false);
                   setIsInitialized(true);
               }
            }
        };

        initializeAuth();

        return () => {
            mounted = false;
            // Clean up timer on unmount
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Helper: Start timer to proactively refresh token before expiry
     * Checks every 10 seconds if token is expiring soon (< 1 minute)
     */
    const startProactiveRefreshTimer = useCallback(async (authSvc, tokenMgr) => {
        // Clear existing timer
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }

        refreshIntervalRef.current = setInterval(async () => {
            // Check if token exists before attempting refresh
            if (!tokenMgr.hasToken()) {
                return;
            }

            // Check if token is expiring soon
            if (tokenMgr.isExpiringSoon(60)) {
                // Avoid multiple refreshes - use refreshPromise for deduplication
                if (!tokenMgr.isRefreshing()) {
                    try {
                        const refreshPromise = authSvc.refresh();
                        tokenMgr.setRefreshPromise(refreshPromise);
                        const response = await refreshPromise;
                        
                        // Update sessionStorage with new token
                        sessionStorage.setItem('accessToken', response.accessToken);
                        sessionStorage.setItem('tokenExpiresAt', response.expiresAt);
                        sessionStorage.setItem('userLogin', JSON.stringify({ login: response.login }));

                        if (process.env.NODE_ENV === 'development') {
                            console.log('[Auth] Proactive token refresh completed');
                        }
                    } catch (err) {
                        console.error('Proactive refresh failed:', err);
                        // On error, clear auth state
                        sessionStorage.removeItem('accessToken');
                        sessionStorage.removeItem('tokenExpiresAt');
                        sessionStorage.removeItem('userLogin');
                    }
                }
            }
        }, 10000); // Check every 10 seconds
    }, []);


    const login = useCallback(async (username, password) => {
        try {
            setError(null);
            const loginResponse = await authService.login(username, password);

            // Save token to sessionStorage
            sessionStorage.setItem('accessToken', loginResponse.accessToken);
            sessionStorage.setItem('tokenExpiresAt', loginResponse.expiresAt);
            sessionStorage.setItem('userLogin', JSON.stringify({ login: loginResponse.login }));

            setIsAuthenticated(true);
            setUser({ login: loginResponse.login });
            
            // Load balance - always fresh from backend
            try {
                const balanceData = await userService.getBalance();
                setBalance(balanceData);
            } catch (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Failed to fetch balance:', err);
                }
            }
            
            // Avatar: use cached version from localStorage, load from API only if not cached
            const cachedAvatar = localStorage.getItem('user_avatar');
            if (cachedAvatar) {
                setAvatar(cachedAvatar);
                if (process.env.NODE_ENV === 'development') {
                    console.log('Avatar loaded from cache');
                }
            } else {
                // Cache miss - fetch from backend and cache it
                try {
                    const avatarData = await userService.getAvatar();
                    const avatarUrl = (avatarData && (avatarData.avatar_url || avatarData.presigned_url)) || null;
                    if (avatarUrl) {
                        setAvatar(avatarUrl);
                        localStorage.setItem('user_avatar', avatarUrl);
                        if (process.env.NODE_ENV === 'development') {
                            console.log('Avatar loaded from backend and cached');
                        }
                    }
                } catch (err) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Failed to fetch avatar:', err);
                    }
                }
            }

            // Start proactive refresh timer
            const { default: authSvc } = await import('../services/auth/AuthService');
            const { default: tokenMgr } = await import('../services/auth/TokenManager');
            startProactiveRefreshTimer(authSvc, tokenMgr);
            
            return loginResponse;
        } catch (err) {
            handleAuthError(err);
            throw err;
        }
    }, [handleAuthError, startProactiveRefreshTimer]);


    const register = useCallback(async (login, email, password) => {
        try {
            setError(null);
            const response = await authService.registerInit(login, email, password);   
            return response;
        } catch (err) {
            handleAuthError(err);
            throw err;
        }
    }, [handleAuthError]);

    const verifyEmail = useCallback(async (email, code) => {
        try {
            setError(null);
            const response = await authService.registerVerify(email, code);
            return response;
        } catch (err) {
            handleAuthError(err);
            throw err;
        }
    }, [handleAuthError]);

    const resendCode = useCallback(async (email) => {
        try {
            setError(null);
            const response = await authService.resendVerificationCode(email);
            return response;
        } catch (err) {
            handleAuthError(err);
            throw err;
        }
    }, [handleAuthError]);


    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear sessionStorage and auth state
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('tokenExpiresAt');
            sessionStorage.removeItem('userLogin');
            // Stop refresh timer
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
            resetState();
        }
    }, [resetState]);


    const refreshToken = useCallback(async () => {
        try {
            await authService.refresh();
            return true;
        } catch (err) {
            console.error('Token refresh failed:', err);
            handleAuthError(err);
            await logout();
            return false;
        }
    }, [logout, handleAuthError]);



    const clearError = useCallback(() => setError(null), []);

    /**
     * Cleanup timer on unmount
     */
    useEffect(() => {
        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, []);

    const updateAvatar = useCallback((avatarUrl) => {
        setAvatar(avatarUrl);
    }, []);

    
    const value = useMemo(() => ({
        isAuthenticated,
        user,
        balance,
        avatar,
        isLoading,
        isInitialized,
        error,
        login,
        register,
        verifyEmail,
        resendCode,
        logout,
        refreshToken,
        clearError,
        updateAvatar,
        handleAvatarUpload,
    }), [isAuthenticated, user, balance, avatar, isLoading, isInitialized, error, login, register, verifyEmail, resendCode, logout, refreshToken, clearError, updateAvatar, handleAvatarUpload]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};

export default AuthContext;
