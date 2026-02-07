import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ 
    formData, 
    onChange, 
    onSubmit, 
    onForgotPassword,
    validationErrors = {},
    submitError = null,
    isLoading = false
}) => {
    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2 className="auth-title">Вход в аккаунт</h2>
                <p className="auth-subtitle">Введите свои данные для входа</p>
            </div>

            {/* Ошибка отправки формы */}
            {submitError && (
                <div className="error-message alert-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{submitError}</span>
                </div>
            )}

            <form className="auth-form" onSubmit={onSubmit}>
                {/* Поле логина */}
                <div className="form-group">
                    <label htmlFor="loginUsername" className="form-label">
                        Логин
                    </label>
                    <div className="input-container">
                        <input
                            type="text"
                            id="loginUsername"
                            name="username"
                            className={`form-input ${validationErrors.username ? 'input-error' : ''}`}
                            placeholder="Введите ваш логин"
                            value={formData.username}
                            onChange={onChange}
                            required
                            autoComplete="username"
                            disabled={isLoading}
                        />
                        <div className="input-icon">👤</div>
                    </div>
                    {validationErrors.username && (
                        <span className="field-error">{validationErrors.username}</span>
                    )}
                </div>

                {/* Поле пароля */}
                <div className="form-group">
                    <label htmlFor="loginPassword" className="form-label">
                        Пароль
                    </label>
                    <div className="input-container">
                        <input
                            type="password"
                            id="loginPassword"
                            name="password"
                            className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                            placeholder="Введите ваш пароль"
                            value={formData.password}
                            onChange={onChange}
                            required
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                        <div className="input-icon">🔒</div>
                    </div>
                    {validationErrors.password && (
                        <span className="field-error">{validationErrors.password}</span>
                    )}
                    {/* Дополнительные опции */}
                    <div className="password-actions">
                        <Link 
                            to="/reset-password" 
                            className="forgot-password-link"
                        >
                            Забыли пароль?
                        </Link>
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className="auth-button primary-button"
                    disabled={isLoading}
                >
                    <span className="button-text">
                        {isLoading ? 'Вход...' : 'Войти'}
                    </span>
                    <div className="button-icon">
                        {isLoading ? '⏳' : '→'}
                    </div>
                </button>

                {/* Разделитель */}
                <div className="auth-divider">
                    <span className="divider-text">или</span>
                </div>

                {/* Ссылки */}
                <div className="auth-links">
                    <p className="auth-link-text">
                        Нет аккаунта?{' '}
                        <Link to="/register" className="auth-link">
                            Зарегистрироваться
                        </Link>
                    </p>
                    <Link to="/" className="back-link">
                        ← Вернуться на главную
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;