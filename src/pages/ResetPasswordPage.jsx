import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordEmailForm from '../components/reset-password/ResetPasswordEmailForm';
import ResetPasswordVerifyForm from '../components/reset-password/ResetPasswordVerifyForm';
import ResetPasswordNewPasswordForm from '../components/reset-password/ResetPasswordNewPasswordForm';
import { resetPasswordService } from '../services';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

/**
 * Страница сброса пароля с 3 этапами:
 * 1. Ввод email
 * 2. Подтверждение кода
 * 3. Установка нового пароля
 */
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    // Редирект если пользователь уже залогинен
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Этап сброса пароля: 'email' -> 'verify' -> 'newPassword'
    const [stage, setStage] = useState('email');
    
    // Email пользователя (передается между этапами)
    const [email, setEmail] = useState('');
    
    // Состояния загрузки и сообщений
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    /**
     * Шаг 1: Отправка кода подтверждения на email
     */
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !email.trim()) {
            setSubmitError('Введите email');
            return;
        }

        try {
            setIsLoading(true);
            setSubmitError(null);
            setSubmitSuccess(null);

            const response = await resetPasswordService.init(email.trim());
            
            setSubmitSuccess(response.message || 'Код подтверждения отправлен на почту');
            
            // Переход к следующему шагу через небольшую задержку
            setTimeout(() => {
                setStage('verify');
                setSubmitSuccess(null);
            }, 1500);
            
        } catch (error) {
            setSubmitError(error.message || 'Ошибка при отправке кода. Попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Повторная отправка кода (на этапе verify)
     */
    const handleResendCode = async () => {
        try {
            setSubmitError(null);
            await resetPasswordService.init(email);
            return Promise.resolve();
        } catch (error) {
            setSubmitError(error.message || 'Ошибка при повторной отправке кода');
            return Promise.reject(error);
        }
    };

    /**
     * Шаг 2: Проверка кода подтверждения
     */
    const handleVerifySubmit = async (code) => {
        try {
            setIsLoading(true);
            setSubmitError(null);
            setSubmitSuccess(null);

            const response = await resetPasswordService.verify(email, code);
            
            setSubmitSuccess(response.message || 'Код подтвержден. Установите новый пароль.');
            
            // Переход к следующему шагу через небольшую задержку
            setTimeout(() => {
                setStage('newPassword');
                setSubmitSuccess(null);
            }, 1500);
            
        } catch (error) {
            setSubmitError(error.message || 'Неверный код. Попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Шаг 3: Установка нового пароля
     */
    const handleNewPasswordSubmit = async (newPassword) => {
        try {
            setIsLoading(true);
            setSubmitError(null);
            setSubmitSuccess(null);

            const response = await resetPasswordService.finalize(newPassword);
            
            if (response.status) {
                setSubmitSuccess(response.message || 'Пароль успешно изменён!');
                
                // Переход на страницу входа через небольшую задержку
                setTimeout(() => {
                    navigate('/login', { 
                        replace: true,
                        state: { message: 'Пароль успешно изменён. Войдите с новым паролем.' }
                    });
                }, 2000);
            } else {
                setSubmitError(response.message || 'Не удалось изменить пароль. Попробуйте еще раз.');
            }
            
        } catch (error) {
            setSubmitError(error.message || 'Ошибка при изменении пароля. Попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Возврат к предыдущему шагу
     */
    const handleBack = () => {
        setSubmitError(null);
        setSubmitSuccess(null);
        
        if (stage === 'verify') {
            setStage('email');
        } else if (stage === 'newPassword') {
            setStage('verify');
        }
    };

    /**
     * Функция для разработки - переход на конкретный этап
     * Доступна только в режиме разработки
     */
    const jumpToStage = (targetStage) => {
        if (process.env.NODE_ENV === 'development') {
            setStage(targetStage);
            if (targetStage === 'email') {
                setEmail('');
            }
            setSubmitError(null);
            setSubmitSuccess(null);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setSubmitError(null);
    };

    return (
        <div className="reset-password-page">
            {isLoading && (
                <div className="loading-container">
                    <img className="loading-image" src={require('../assets/imges/loading_gif.gif')} alt="Загрузка..." />
                    <div className="loading-text">
                        {stage === 'email' && 'Отправка кода...'}
                        {stage === 'verify' && 'Проверка кода...'}
                        {stage === 'newPassword' && 'Сохранение пароля...'}
                    </div>
                </div>
            )}

            {/* Панель разработчика - видна только в dev режиме */}
            {process.env.NODE_ENV === 'development' && (
                <div className="dev-panel">
                    <div className="dev-panel-title">🔧 Dev Panel (Testing)</div>
                    <div className="dev-panel-buttons">
                        <button 
                            className="dev-button" 
                            onClick={() => jumpToStage('email')}
                            style={{ backgroundColor: stage === 'email' ? '#7b88ff' : '#555' }}
                        >
                            Stage 1: Email
                        </button>
                        <button 
                            className="dev-button" 
                            onClick={() => jumpToStage('verify')}
                            style={{ backgroundColor: stage === 'verify' ? '#7b88ff' : '#555' }}
                        >
                            Stage 2: Verify
                        </button>
                        <button 
                            className="dev-button" 
                            onClick={() => jumpToStage('newPassword')}
                            style={{ backgroundColor: stage === 'newPassword' ? '#7b88ff' : '#555' }}
                        >
                            Stage 3: New Password
                        </button>
                    </div>
                    <div className="dev-panel-info">
                        Current Stage: <strong>{stage}</strong>
                    </div>
                </div>
            )}

            <div className="auth-container">
                <div className="auth-content">
                    {stage === 'email' && (
                        <ResetPasswordEmailForm
                            email={email}
                            onChange={handleEmailChange}
                            onSubmit={handleEmailSubmit}
                            isLoading={isLoading}
                            submitError={submitError}
                            submitSuccess={submitSuccess}
                        />
                    )}

                    {stage === 'verify' && (
                        <ResetPasswordVerifyForm
                            email={email}
                            onSubmit={handleVerifySubmit}
                            onResendCode={handleResendCode}
                            onBack={handleBack}
                            isLoading={isLoading}
                            submitError={submitError}
                            submitSuccess={submitSuccess}
                        />
                    )}

                    {stage === 'newPassword' && (
                        <ResetPasswordNewPasswordForm
                            onSubmit={handleNewPasswordSubmit}
                            isLoading={isLoading}
                            submitError={submitError}
                            submitSuccess={submitSuccess}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
