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
                <h2 className="auth-title">Сброс пароля</h2>
                <p className="auth-subtitle">Введите email для получения кода подтверждения</p>
            </div>

            {/* Сообщение об ошибке */}
            {submitError && (
                <div className="error-message alert-error" role="alert" aria-live="assertive">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{submitError}</span>
                </div>
            )}

            {/* Сообщение об успехе */}
            {submitSuccess && (
                <div className="success-message alert-success" role="status" aria-live="polite">
                    <span className="success-icon">✅</span>
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
                        <div className="input-icon">📧</div>
                    </div>
                    <div className="input-hint">
                        Код подтверждения будет отправлен на этот email
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className="auth-button primary-button"
                    disabled={isLoading || !email}
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
                <div className="auth-footer">
                    <p>Вспомнили пароль?</p>
                    <Link to="/login" className="auth-link">
                        Войти в аккаунт
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordEmailForm;
