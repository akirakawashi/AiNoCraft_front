import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ 
  formData, 
  validation, 
  termsAccepted, 
  isSubmitting, 
  submitSuccess,
  submitError,
  authError,
  onInputChange, 
  onTermsChange, 
  onSubmit,
  onLoginBlur,
  onEmailBlur,
  getFormErrors,
  isFormValid
}) => {
  
  // Состояния для показа/скрытия паролей
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Компонент индикатора сложности пароля
  const PasswordStrength = ({ strength }) => {
    return (
      <div className="password-strength">
        <div className="strength-bar">
          <div 
            className="strength-bar-fill" 
            style={{
              width: strength.width || '0%',
              backgroundColor: strength.color || '#ddd'
            }}
          ></div>
        </div>
        <div 
          className="strength-label"
          style={{ color: strength.color || '#666' }}
        >
          {strength.text || 'Сложность пароля'}
        </div>
      </div>
    );
  };

  return (
    <div className="auth-card">
      {(submitError || authError) && (
        <div className="error-message alert-error" role="alert" aria-live="assertive">
          <span className="error-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="error-text">{submitError || authError}</span>
        </div>
      )}

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
        <h2>Создание аккаунта</h2>
        <p className="auth-subtitle">Заполните форму для регистрации</p>
      </div>

      <form className="register-auth-form" onSubmit={onSubmit} id="registerForm">
        {/* Поле логина */}
        <div className="register-form-group">
          <label htmlFor="registerLogin">Логин</label>
          <div className="input-container">
            <input
              type="text"
              id="registerLogin"
              name="login"
              placeholder="Придумайте логин"
              value={formData.login}
              onChange={onInputChange}
              onBlur={onLoginBlur}
              required
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {validation.login.isChecking && <div className="input-loader">⏳</div>}
          </div>
          <div className={`input-hint ${validation.login.isValid ? 'valid' : validation.login.message.includes('❌') ? 'invalid' : ''}`}>
            {validation.login.message}
          </div>
        </div>

        {/* Поле email */}
        <div className="register-form-group">
          <label htmlFor="registerEmail">Электронная почта</label>
          <div className="input-container">
            <input
              type="email"
              id="registerEmail"
              name="email"
              placeholder="Ваш email"
              value={formData.email}
              onChange={onInputChange}
              onBlur={onEmailBlur}
              required
            />
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {validation.email.isChecking && <div className="input-loader">⏳</div>}
          </div>
          <div className={`input-hint ${validation.email.isValid ? 'valid' : validation.email.message.includes('❌') ? 'invalid' : ''}`}>
            {validation.email.message}
          </div>
        </div>

        {/* Поле пароля */}
        <div className="register-form-group">
          <label htmlFor="registerPassword">Пароль</label>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="registerPassword"
              name="password"
              placeholder="Придумайте пароль"
              value={formData.password}
              onChange={onInputChange}
              required
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
          <PasswordStrength strength={validation.password.strength} />
        </div>

        {/* Подтверждение пароля */}
        <div className="register-form-group">
          <label htmlFor="registerConfirmPassword">Подтверждение пароля</label>
          <div className="input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="registerConfirmPassword"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={onInputChange}
              required
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
              aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
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
          {formData.password && formData.confirmPassword && 
           formData.password !== formData.confirmPassword && (
            <div className="input-hint invalid">❌ Пароли не совпадают</div>
          )}
        </div>

        {/* Чекбокс согласия с правилами */}
        <div className="register-form-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              id="terms"
              name="termsAccepted"
              className="checkbox-input"
              checked={termsAccepted}
              onChange={onTermsChange}
              required 
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">Я согласен с <Link to="/terms">правилами сервера и политикой конфиденциальности</Link></span>
          </label>
        </div>

        {/* Встроенная валидационная панель */}
        {(formData.login || formData.email || formData.password ||formData.confirmPassword) && (
          <div className={`form-validation-panel ${isFormValid() ? 'success' : 'error'}`}>
            <div className="validation-panel-header">
              <div className="validation-panel-icon">
                {isFormValid() ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="validation-panel-title">
                {isFormValid() ? 'Готово к регистрации!' : 'Проверьте данные'}
              </div>
            </div>
            {isFormValid() ? (
              <p className="validation-panel-message">
                Все поля заполнены верно. Можно продолжить регистрацию.
              </p>
            ) : (
              <>
                {getFormErrors && getFormErrors().length > 0 && (
                  <ul className="validation-panel-list">
                    {getFormErrors().slice(0, 5).map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                )}
                <p className="validation-panel-message">
                  Исправьте указанные проблемы для продолжения.
                </p>
              </>
            )}
          </div>
        )}

        {/* Кнопка отправки */}
        <button 
          type="submit" 
          className={`auth-button ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
          disabled={!isFormValid() || isSubmitting}
        >
          <span>{isSubmitting ? 'Отправка...' : 'Продолжить'}</span>
          <div className="button-icon">→</div>
        </button>

        {/* Информационный блок теперь вынесен в декорацию */}

        <div className="auth-divider">
          <span>или</span>
        </div>

        <div className="auth-links">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
          <Link to="/" className="back-link">← Вернуться на главную</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;