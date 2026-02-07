import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailForm = ({ 
  email,
  isSubmitting,
  submitError,
  submitSuccess,
  authError,
  onSubmit,
  onResendCode,
  onBack,
  onClearError
}) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Только цифры
    if (value.length <= 6) {
      setCode(value);
      setCodeError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!code) {
      setCodeError('Введите код подтверждения');
      return;
    }

    if (code.length !== 6) {
      setCodeError('Код должен состоять из 6 цифр');
      return;
    }

    setCodeError('');
    setResendSuccess('');
    onSubmit(code);
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      setResendSuccess('');
      setCodeError('');
      setCode('');
      
      if (onClearError) {
        onClearError();
      }
      
      await onResendCode();
      
      setResendSuccess('Код отправлен повторно на вашу почту');
      setTimeLeft(30); 
    } catch (error) {
      setCodeError(error.message || 'Ошибка при отправке кода');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="auth-card">
      {(submitError || authError || codeError) && (
        <div className="error-message alert-error" role="alert" aria-live="assertive">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{submitError || authError || codeError}</span>
        </div>
      )}

      {resendSuccess && (
        <div className="success-message alert-success" role="status" aria-live="polite">
          <span className="success-icon">✅</span>
          <span className="success-text">{resendSuccess}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="success-message alert-success" role="status" aria-live="polite">
          <span className="success-icon">✅</span>
          <span className="success-text">{submitSuccess}</span>
        </div>
      )}

      <div className="auth-header">
        <h2>Подтверждение почты</h2>
        <p className="auth-subtitle">Введите код отправленный на {email}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} id="verifyEmailForm">
        {/* Поле кода */}
        <div className="form-group">
          <label htmlFor="verifyCode">Код подтверждения</label>
          <div className="input-container">
            <input
              type="text"
              id="verifyCode"
              name="code"
              placeholder="000000"
              value={code}
              onChange={handleCodeChange}
              maxLength="6"
              required
              inputMode="numeric"
              className="code-input"
            />
            <div className="input-icon">📧</div>
          </div>
          <div className="input-hint">
            Введите 6-значный код из письма
          </div>
        </div>

        {/* Кнопка отправки */}
        <button 
          type="submit" 
          className={`auth-button ${!code || code.length !== 6 || isSubmitting ? 'disabled' : ''}`}
          disabled={!code || code.length !== 6 || isSubmitting}
        >
          <span>{isSubmitting ? 'Проверка кода...' : 'Подтвердить'}</span>
          <div className="button-icon">→</div>
        </button>

        <div className="auth-divider">
          <span>или</span>
        </div>

        {/* Кнопка переотправки */}
        <div className="verify-actions">
          <button 
            type="button"
            className={`resend-button ${isResending || timeLeft > 0 ? 'disabled' : ''}`}
            onClick={handleResend}
            disabled={isResending || timeLeft > 0}
          >
            {isResending ? 'Отправляем...' : timeLeft > 0 ? `Повторить через ${timeLeft}c` : 'Отправить код заново'}
          </button>
        </div>

        <div className="auth-links">
          <button 
            type="button" 
            className="back-button"
            onClick={onBack}
          >
            ← Вернуться к регистрации
          </button>
          <Link to="/" className="back-link">← Вернуться на главную</Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
