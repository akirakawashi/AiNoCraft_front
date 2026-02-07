import React from 'react';
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
  onEmailBlur
}) => {
  
  // Компонент индикатора сложности пароля
  const PasswordStrength = ({ strength }) => {
    return (
      <div className="password-strength">
        <div 
          className="strength-bar" 
          style={{
            width: strength.width || '0%',
            backgroundColor: strength.color || '#ddd',
            transition: 'all 0.3s ease'
          }}
        ></div>
        <div 
          className="strength-label"
          style={{ color: strength.color || '#666' }}
        >
          {strength.text || 'Сложность пароля'}
        </div>
      </div>
    );
  };

  // Проверка валидности всей формы
  const isFormValid = () => {
    const passwordsMatch = formData.password && formData.confirmPassword && 
                          formData.password === formData.confirmPassword;
    
    return (
      validation.login.isValid &&
      validation.email.isValid &&
      validation.password.isValid &&
      passwordsMatch &&
      termsAccepted &&
      !isSubmitting
    );
  };

  return (
    <div className="auth-card">
      {(submitError || authError) && (
        <div className="error-message alert-error" role="alert" aria-live="assertive">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{submitError || authError}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="success-message alert-success" role="status" aria-live="polite">
          <span className="success-icon">✅</span>
          <span className="success-text">{submitSuccess}</span>
        </div>
      )}
      <div className="auth-header">
        <h2>Создание аккаунта</h2>
        <p className="auth-subtitle">Заполните форму для регистрации</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit} id="registerForm">
        {/* Поле логина */}
        <div className="form-group">
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
            <div className="input-icon">👤</div>
            {validation.login.isChecking && <div className="input-loader">⏳</div>}
          </div>
          <div className={`input-hint ${validation.login.isValid ? 'valid' : validation.login.message.includes('❌') ? 'invalid' : ''}`}>
            {validation.login.message}
          </div>
        </div>

        {/* Поле email */}
        <div className="form-group">
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
            <div className="input-icon">✉️</div>
            {validation.email.isChecking && <div className="input-loader">⏳</div>}
          </div>
          <div className={`input-hint ${validation.email.isValid ? 'valid' : validation.email.message.includes('❌') ? 'invalid' : ''}`}>
            {validation.email.message}
          </div>
        </div>

        {/* Поле пароля */}
        <div className="form-group">
          <label htmlFor="registerPassword">Пароль</label>
          <div className="input-container">
            <input
              type="password"
              id="registerPassword"
              name="password"
              placeholder="Придумайте пароль"
              value={formData.password}
              onChange={onInputChange}
              required
            />
            <div className="input-icon">🔒</div>
          </div>
          <PasswordStrength strength={validation.password.strength} />
        </div>

        {/* Подтверждение пароля */}
        <div className="form-group">
          <label htmlFor="registerConfirmPassword">Подтверждение пароля</label>
          <div className="input-container">
            <input
              type="password"
              id="registerConfirmPassword"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={onInputChange}
              required
            />
            <div className="input-icon">✅</div>
          </div>
          {formData.password && formData.confirmPassword && 
           formData.password !== formData.confirmPassword && (
            <div className="input-hint invalid">❌ Пароли не совпадают</div>
          )}
        </div>

        {/* Чекбокс согласия с правилами */}
        <div className="form-group">
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

        {/* Кнопка отправки */}
        <button 
          type="submit" 
          className={`auth-button ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
          disabled={!isFormValid() || isSubmitting}
        >
          <span>{isSubmitting ? 'Отправка...' : 'Продолжить'}</span>
          <div className="button-icon">→</div>
        </button>

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