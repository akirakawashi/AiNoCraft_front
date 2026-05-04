import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, error, clearError, isAuthenticated } = useAuth();
    
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/account', { replace: true });
        }
    }, [isAuthenticated, navigate]);
    
    // Локальное управление загрузкой
    const [isLoading, setIsLoading] = useState(false);
    
    // Очистка при монтировании
    React.useEffect(() => {
        clearError();
    }, [clearError]);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    /**
     * Валидация формы
     */
    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = 'Логин не может быть пустым';
        }

        if (!formData.password) {
            errors.password = 'Пароль не может быть пустым';
        } else if (formData.password.length < 6) {
            errors.password = 'Пароль должен быть минимум 6 символов';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Очищаем предыдущие ошибки
        setValidationErrors({});
        setSubmitError(null);
        clearError();

        // Валидируем форму
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            // Вызываем функцию входа из контекста
            await login(formData.username, formData.password);
            setIsLoading(false);
        } catch (err) {
            // Обработка ошибки входа - ApiError содержит message в корне объекта
            const errorMsg = err.message || err.data?.detail || 'Ошибка при входе. Проверьте логин и пароль.';
            setSubmitError(errorMsg);
            setIsLoading(false);
        } finally {
            // Loading сбрасывается в try и catch
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаем ошибку для этого поля при редактировании
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="login-page">
            {isLoading && (
                <div className="loading-container">
                    <img className="loading-image" src={require('../assets/imges/loading_gif.gif')} alt="Загрузка..." />
                    <div className="loading-text">Вход...</div>
                </div>
            )}

            {/* Контент страницы */}
            <div className="auth-container">
                <div className="auth-content">
                    <LoginForm 
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        validationErrors={validationErrors}
                        submitError={submitError || error}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;