import React, { useState, useEffect, useRef } from 'react';

/**
 * Компонент формы для ввода кода подтверждения (шаг 2)
 */
const ResetPasswordVerifyForm = ({ 
    email,
    onSubmit,
    onResendCode,
    onBack,
    isLoading,
    submitError,
    submitSuccess
}) => {
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);

    // Таймер для повторной отправки
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
            {/* Сообщения об ошибках */}
            {(submitError || codeError) && (
                <div className="error-message alert-error" role="alert" aria-live="assertive">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{submitError || codeError}</span>
                </div>
            )}

            {/* Сообщение об успехе повторной отправки */}
            {resendSuccess && (
                <div className="success-message alert-success" role="status" aria-live="polite">
                    <span className="success-icon">✅</span>
                    <span className="success-text">{resendSuccess}</span>
                </div>
            )}

            {/* Сообщение об успехе верификации */}
            {submitSuccess && (
                <div className="success-message alert-success" role="status" aria-live="polite">
                    <span className="success-icon">✅</span>
                    <span className="success-text">{submitSuccess}</span>
                </div>
            )}

            <div className="auth-header">
                <h2 className="auth-title">Подтверждение email</h2>
                <p className="auth-subtitle">Введите код, отправленный на {email}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                {/* Поле кода */}
                <div className="form-group">
                    <label htmlFor="verifyCode" className="form-label">
                        Код подтверждения
                    </label>
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
                            disabled={isLoading}
                        />
                        <div className="input-icon">🔐</div>
                    </div>
                    <div className="input-hint">
                        Введите 6-значный код из письма
                    </div>
                </div>

                {/* Кнопка отправки */}
                <button 
                    type="submit" 
                    className="auth-button primary-button"
                    disabled={!code || code.length !== 6 || isLoading}
                >
                    <span className="button-text">
                        {isLoading ? 'Проверка кода...' : 'Подтвердить'}
                    </span>
                    <div className="button-icon">→</div>
                </button>

                <div className="auth-divider">
                    <span>или</span>
                </div>

                {/* Кнопка повторной отправки */}
                <button
                    type="button"
                    className="auth-button secondary-button"
                    onClick={handleResend}
                    disabled={isResending || timeLeft > 0}
                >
                    <span className="button-text">
                        {isResending 
                            ? 'Отправка...' 
                            : timeLeft > 0 
                                ? `Отправить повторно (${timeLeft}с)` 
                                : 'Отправить код повторно'}
                    </span>
                    <div className="button-icon">📧</div>
                </button>

                {/* Кнопка назад */}
                <button
                    type="button"
                    className="back-button"
                    onClick={onBack}
                    disabled={isLoading || isResending}
                >
                    ← Назад
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordVerifyForm;
