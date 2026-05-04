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
          <span className="error-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="error-text">{submitError || authError || codeError}</span>
        </div>
      )}

      {resendSuccess && (
        <div className="success-message alert-success" role="status" aria-live="polite">
          <span className="success-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="success-text">{resendSuccess}</span>
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
            <div className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="input-hint">
            Введите 6-значный код из письма
          </div>
        </div>

        {/* Кнопка отправки */}
        <button 
          type="submit" 
          className={`auth-button ${!code || code.length !== 6 || isSubmitting || submitSuccess ? 'disabled' : ''}`}
          disabled={!code || code.length !== 6 || isSubmitting || submitSuccess}
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
            className={`resend-button ${isResending || timeLeft > 0 || submitSuccess ? 'disabled' : ''}`}
            onClick={handleResend}
            disabled={isResending || timeLeft > 0 || submitSuccess}
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
