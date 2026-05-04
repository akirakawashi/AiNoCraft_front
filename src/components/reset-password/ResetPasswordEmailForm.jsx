import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент формы для ввода email (шаг 1)
 */
const ResetPasswordEmailForm = ({ 
    email,
    onChange,
    onSubmit,
    isLoading,
    submitError,
    submitSuccess
}) => {
    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2>Сброс пароля</h2>
                <p className="auth-subtitle">Введите email для получения кода подтверждения</p>
            </div>

            {/* Сообщение об ошибке */}
            {submitError && (
                <div className="error-message alert-error" role="alert" aria-live="assertive">
                    <span className="error-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className="error-text">{submitError}</span>
                </div>
            )}

            {/* Сообщение об успехе */}
            {submitSuccess && (
                <div className="success-message alert-success" role="status" aria-live="polite">
                    <span className="success-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className="success-text">{submitSuccess}</span>
                </div>
            )}

            <form className="auth-form" onSubmit={onSubmit}>
                {/* Поле email */}
                <div className="form-group">
                    <label htmlFor="resetEmail" className="form-label">
                        Email
                    </label>
                    <div className="input-container">
                        <input
                            type="email"
                            id="resetEmail"
                            name="email"
                            className="form-input"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={onChange}
                            required
                            autoComplete="email"
                            disabled={isLoading}
                        />
                        <div className="input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6L12 13L2 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="input-hint">
                        Код подтверждения будет отправлен на этот email
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className={`auth-button ${(isLoading || !email || submitSuccess) ? 'disabled' : ''}`}
                    disabled={isLoading || !email || submitSuccess}
                >
                    <span className="button-text">
                        {isLoading ? 'Отправка...' : 'Получить код'}
                    </span>
                    <div className="button-icon">
                        {isLoading ? '⏳' : '→'}
                    </div>
                </button>

                <div className="auth-divider">
                    <span>или</span>
                </div>

                {/* Ссылка на вход */}
                <div className="auth-links">
                    <p>Вспомнили пароль? <Link to="/login" className="auth-link">Войти в аккаунт</Link></p>
                    <Link to="/" className="back-link">← Вернуться на главную</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordEmailForm;
