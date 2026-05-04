import React, { useState } from 'react';
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
    // Состояние для показа/скрытия пароля
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2>Вход в аккаунт</h2>
                <p className="auth-subtitle">Введите свои данные для входа</p>
            </div>

            {/* Ошибка отправки формы */}
            {submitError && (
                <div className="error-message alert-error">
                    <span className="error-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
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
                        <div className="input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
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
                            type={showPassword ? "text" : "password"}
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
                        <div className="input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                        >
                            {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="eye-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7b88ff"/>
                                            <stop offset="100%" stopColor="#ff7bc6"/>
                                        </linearGradient>
                                    </defs>
                                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 12 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="url(#eye-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="eye-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7b88ff"/>
                                            <stop offset="100%" stopColor="#ff7bc6"/>
                                        </linearGradient>
                                    </defs>
                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="url(#eye-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="12" r="3" stroke="url(#eye-gradient)" strokeWidth="2"/>
                                </svg>
                            )}
                        </button>
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
                    <span>или</span>
                </div>

                {/* Ссылки */}
                <div className="auth-links">
                    <p>
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