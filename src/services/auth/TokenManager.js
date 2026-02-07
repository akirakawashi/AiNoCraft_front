/**
 * Manages access and refresh tokens for authentication.
 * Centralizes the handling of access token and refresh token
 * Tracks token expiration for proactive refresh
 */
class TokenManager {
    constructor() {
        this.accessToken = null;
        this.expiresAt = null;
        this.refreshPromise = null;
    }

    setAccessToken(token, expiresAt) {
        this.accessToken = token;
        this.expiresAt = expiresAt;
    }

    getAccessToken() {
        return this.accessToken;
    }

    hasToken() {
        return !!this.accessToken;
    }

    /**
     * Check if token is valid (not expired)
     */
    isTokenValid() {
        if (!this.accessToken || !this.expiresAt) {
            return false;
        }
        const now = Math.floor(Date.now() / 1000);
        return now < this.expiresAt;
    }

    /**
     * Check if token is expiring soon (within threshold seconds)
     */
    isExpiringSoon(thresholdSeconds = 60) {
        if (!this.accessToken || !this.expiresAt) {
            return true;
        }
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = this.expiresAt - now;
        return timeLeft < thresholdSeconds;
    }

    /**
     * Get remaining time in seconds
     */
    getTimeUntilExpiry() {
        if (!this.expiresAt) {
            return 0;
        }
        const now = Math.floor(Date.now() / 1000);
        return Math.max(0, this.expiresAt - now);
    }

    clearToken() {
        this.accessToken = null;
        this.expiresAt = null;
        this.refreshPromise = null;
    }

    setRefreshPromise(promise) {
        this.refreshPromise = promise;
        promise.finally(() => {
            this.refreshPromise = null;
        });
    }

    getRefreshPromise() {
        return this.refreshPromise;
    }

    isRefreshing() {
        return this.refreshPromise !== null;
    }
}

const tokenManager = new TokenManager();

export default tokenManager;
