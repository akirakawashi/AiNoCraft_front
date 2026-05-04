import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrength from '../register/PasswordStrength';
import { validatePassword, validatePasswordMatch } from '../../utils/passwordValidation';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Обновляем силу пароля
        if (name === 'newPassword') {
            setPasswordStrength(validatePassword(value).strength);
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
        const passwordValidation = validatePassword(formData.newPassword);
        if (!passwordValidation.isValid) {
            errors.newPassword = passwordValidation.message;
        }

        // Проверка совпадения паролей
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Подтвердите новый пароль';
        } else {
            const matchValidation = validatePasswordMatch(formData.newPassword, formData.confirmPassword);
            if (!matchValidation.isMatch) {
                errors.confirmPassword = 'Пароли не совпадают';
            }
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

            <div className="auth-header">
                <h2>Новый пароль</h2>
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
                            disabled={isLoading}
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
                        <div className="input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                        >
                            {showConfirmPassword ? (
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
                    {validationErrors.confirmPassword && (
                        <span className="field-error">{validationErrors.confirmPassword}</span>
                    )}
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className={`auth-button ${(isLoading || !formData.newPassword || !formData.confirmPassword || submitSuccess) ? 'disabled' : ''}`}
                    disabled={isLoading || !formData.newPassword || !formData.confirmPassword || submitSuccess}
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
                <div className="auth-links">
                    <p>Вспомнили пароль? <Link to="/login" className="auth-link">Войти в аккаунт</Link></p>
                    <Link to="/" className="back-link">← Вернуться на главную</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordNewPasswordForm;
