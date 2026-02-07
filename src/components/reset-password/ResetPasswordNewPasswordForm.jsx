import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrength from '../register/PasswordStrength';

/**
 * Компонент формы для установки нового пароля (шаг 3)
 */
const ResetPasswordNewPasswordForm = ({ 
    onSubmit,
    isLoading,
    submitError,
    submitSuccess
}) => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    
    const [passwordStrength, setPasswordStrength] = useState({
        width: '0%',
        color: '#ddd',
        text: 'Сложность пароля'
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Валидация силы пароля
    const calculatePasswordStrength = (password) => {
        if (!password) {
            return { width: '0%', color: '#ddd', text: 'Сложность пароля' };
        }

        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        const strengths = [
            { width: '20%', color: '#ff4444', text: 'Очень слабый' },
            { width: '40%', color: '#ff8800', text: 'Слабый' },
            { width: '60%', color: '#ffaa00', text: 'Средний' },
            { width: '80%', color: '#88cc00', text: 'Хороший' },
            { width: '100%', color: '#00cc44', text: 'Отличный' }
        ];

        return strengths[Math.min(strength, 4)];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Обновляем силу пароля
        if (name === 'newPassword') {
            setPasswordStrength(calculatePasswordStrength(value));
        }

        // Очищаем ошибки
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        // Проверка нового пароля
        if (!formData.newPassword) {
            errors.newPassword = 'Пароль обязателен';
        } else if (formData.newPassword.length < 8) {
            errors.newPassword = 'Пароль должен содержать минимум 8 символов';
        } else if (formData.newPassword.length > 128) {
            errors.newPassword = 'Пароль слишком длинный (максимум 128 символов)';
        } else if (!/[a-z]/.test(formData.newPassword)) {
            errors.newPassword = 'Пароль должен содержать строчные буквы';
        } else if (!/[A-Z]/.test(formData.newPassword)) {
            errors.newPassword = 'Пароль должен содержать заглавные буквы';
        } else if (!/\d/.test(formData.newPassword)) {
            errors.newPassword = 'Пароль должен содержать цифры';
        }

        // Проверка совпадения паролей
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Подтвердите новый пароль';
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm();
        
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        onSubmit(formData.newPassword);
    };

    return (
        <div className="auth-card">
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

            <div className="auth-header">
                <h2 className="auth-title">Новый пароль</h2>
                <p className="auth-subtitle">Придумайте надёжный пароль</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                {/* Поле нового пароля */}
                <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">
                        Новый пароль
                    </label>
                    <div className="input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            className={`form-input ${validationErrors.newPassword ? 'input-error' : ''}`}
                            placeholder="Введите новый пароль"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            disabled={isLoading}
                        />
                        <div className="input-icon">🔒</div>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {validationErrors.newPassword && (
                        <span className="field-error">{validationErrors.newPassword}</span>
                    )}
                    <PasswordStrength strength={passwordStrength} />
                </div>

                {/* Поле подтверждения пароля */}
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                        Подтвердите пароль
                    </label>
                    <div className="input-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className={`form-input ${validationErrors.confirmPassword ? 'input-error' : ''}`}
                            placeholder="Повторите новый пароль"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                            disabled={isLoading}
                        />
                        <div className="input-icon">🔒</div>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {validationErrors.confirmPassword && (
                        <span className="field-error">{validationErrors.confirmPassword}</span>
                    )}
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className="auth-button primary-button"
                    disabled={isLoading || !formData.newPassword || !formData.confirmPassword}
                >
                    <span className="button-text">
                        {isLoading ? 'Сохранение...' : 'Сбросить пароль'}
                    </span>
                    <div className="button-icon">
                        {isLoading ? '⏳' : '✓'}
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

export default ResetPasswordNewPasswordForm;
