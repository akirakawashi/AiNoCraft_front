import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm';
import VerifyEmailForm from '../components/register/VerifyEmailForm';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';
import { authService } from '../services';
import { validatePassword } from '../utils/passwordValidation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, verifyEmail, resendCode, error, clearError, isAuthenticated } = useAuth();
  
  // Редирект если пользователь уже залогинен
  React.useEffect(() => {
      if (isAuthenticated) {
          navigate('/account', { replace: true });
      }
  }, [isAuthenticated, navigate]);
  
  // Этап регистрации: 'form' - ввод данных, 'verify' - подтверждение кода
  const [registrationStage, setRegistrationStage] = useState('form');
  
  // Локальное управление загрузкой
  const [isLoading, setIsLoading] = useState(false);
  
  // Очистка ошибок при монтировании компонента
  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Email сохраняется для второго этапа
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  // Состояние валидации
  const [validation, setValidation] = useState({
    login: { isValid: false, message: '', isChecking: false },
    email: { isValid: false, message: '', isChecking: false },
    password: { isValid: false, message: '', strength: { width: '0%', color: '#ddd', text: 'Сложность пароля' } }
  });
  
  // Состояние чекбокса и отправки
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Таймеры для дебаунсинга
  const loginCheckTimeoutRef = useRef(null);
  const emailCheckTimeoutRef = useRef(null);

  // Очистка таймеров при размонтировании
  React.useEffect(() => {
    return () => {
      if (loginCheckTimeoutRef.current) {
        clearTimeout(loginCheckTimeoutRef.current);
      }
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current);
      }
    };
  }, []);

  // Валидация логина
  const validateLogin = (login) => {
    if (login.length === 0) {
      return { isValid: false, message: 'От 3 до 20 символов, только буквы и цифры', isChecking: false };
    }
    
    const isLengthValid = login.length >= 3 && login.length <= 20;
    const isCharsValid = /^[a-zA-Z0-9]+$/.test(login);
    
    if (!isLengthValid) {
      return { isValid: false, message: '❌ Длина должна быть от 3 до 20 символов', isChecking: false };
    } else if (!isCharsValid) {
      return { isValid: false, message: '❌ Только буквы и цифры (без пробелов и спецсимволов)', isChecking: false };
    } else {
      return { isValid: true, message: '✅ Имя пользователя подходит', isChecking: false };
    }
  };

  // Проверка доступности логина на сервере
  const checkLoginOnServer = async (login) => {
    try {
      setValidation(prev => ({
        ...prev,
        login: { ...prev.login, isChecking: true }
      }));

      const response = await authService.checkLoginAvailability(login);
      const isTaken = typeof response === 'boolean' ? response : (response?.exists || response?.data);

      if (!isTaken) {
        setValidation(prev => ({
          ...prev,
          login: {
            isValid: false,
            message: '❌ Такой логин уже занят',
            isChecking: false
          }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          login: {
            isValid: true,
            message: '✅ Логин доступен',
            isChecking: false
          }
        }));
      }
    } catch (error) {
      console.error('Error checking login:', error);
      setValidation(prev => ({
        ...prev,
        login: { 
          ...prev.login, 
          isChecking: false 
        }
      }));
    }
  };

  // Валидация email
  const validateEmail = (email) => {
    if (email.length === 0) {
      return { isValid: false, message: 'Введите электронную почту', isChecking: false };
    }
    
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (!isEmailValid) {
      return { isValid: false, message: '❌ Некорректная электронная почта', isChecking: false };
    } else {
      return { isValid: true, message: '✅ Почта подходит', isChecking: false };
    }
  };

  // Проверка доступности email на сервере
  const checkEmailOnServer = async (email) => {
    try {
      setValidation(prev => ({
        ...prev,
        email: { ...prev.email, isChecking: true }
      }));

      const response = await authService.checkEmailAvailability(email);     
      const isTaken = typeof response === 'boolean' ? response : (response?.exists || response?.data);

      if (!isTaken) {
        setValidation(prev => ({
          ...prev,
          email: {
            isValid: false,
            message: '❌ Этот email уже зарегистрирован',
            isChecking: false
          }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          email: {
            isValid: true,
            message: '✅ Email доступен',
            isChecking: false
          }
        }));
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setValidation(prev => ({
        ...prev,
        email: { 
          ...prev.email, 
          isChecking: false 
        }
      }));
    }
  };

  // Обработчик изменения полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Валидация в реальном времени
    if (name === 'login') {
      const loginValidation = validateLogin(value);
      setValidation(prev => ({
        ...prev,
        login: loginValidation
      }));
    } else if (name === 'email') {
      const emailValidation = validateEmail(value);
      setValidation(prev => ({
        ...prev,
        email: emailValidation
      }));
    } else if (name === 'password') {
      setValidation(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }
  };

  // Обработчик потери фокуса для логина
  const handleLoginBlur = (e) => {
    const login = e.target.value;
    
    if (loginCheckTimeoutRef.current) {
      clearTimeout(loginCheckTimeoutRef.current);
    }

    if (login.length >= 3 && login.length <= 20 && /^[a-zA-Z0-9]+$/.test(login)) {
      loginCheckTimeoutRef.current = setTimeout(() => {
        checkLoginOnServer(login);
      }, 500);
    }
  };

  // Обработчик потери фокуса для email
  const handleEmailBlur = (e) => {
    const email = e.target.value;
    
    if (emailCheckTimeoutRef.current) {
      clearTimeout(emailCheckTimeoutRef.current);
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailCheckTimeoutRef.current = setTimeout(() => {
        checkEmailOnServer(email);
      }, 500);
    }
  };

  // Обработчик чекбокса
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // === ПЕРВЫЙ ЭТАП: Отправка данных регистрации ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitError(null);
    setSubmitSuccess(null);
    clearError();
    
    const isFormValid = () => {
      return (
        validation.login.isValid &&
        validation.email.isValid &&
        validation.password.isValid &&
        formData.password === formData.confirmPassword &&
        termsAccepted &&
        !isLoading
      );
    };
    
    if (!isFormValid()) {
      setSubmitError('Пожалуйста, заполните все поля правильно');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSubmitError('Пароли не совпадают');
      return;
    }

    try {
      setIsLoading(true);
      console.log('[Register Init] Попытка инициализации регистрации:', {
        login: formData.login,
        email: formData.email
      });
      
      const response = await register(
        formData.login,
        formData.email,
        formData.password
      );

      console.log('[Register Init] Успешная инициализация:', response);
      
      // Сохраняем email для второго этапа и переходим к верификации
      setRegisteredEmail(formData.email);
      setRegistrationStage('verify');
      setSubmitError(null);
      setSubmitSuccess(null);
      
    } catch (err) {
      console.error('[Register Init] Ошибка инициализации:', err);
      const errorMsg = err.message || err.data?.detail || 'Ошибка регистрации';
      setSubmitError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // === ВТОРОЙ ЭТАП: Верификация кода ===
  const handleVerifyCode = async (code) => {
    try {
      setIsLoading(true);
      setSubmitError(null);
      setSubmitSuccess(null);
      clearError();
      
      console.log('[Register Verify] Попытка верификации:', {
        email: registeredEmail,
        code: code
      });

      const response = await verifyEmail(registeredEmail, code);

      console.log('[Register Verify] Успешная верификация:', response);
      
      // Показываем сообщение об успехе
      setSubmitSuccess(
        response?.message || 
        'Почта подтверждена! Аккаунт создан. Перенаправляем на страницу входа...'
      );
      
      // Перенаправляем на страницу входа через 2 секунды
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('[Register Verify] Ошибка верификации:', err);
      const errorMsg = err.message || err.data?.detail || 'Ошибка при верификации кода';
      setSubmitError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик повторной отправки кода
  const handleResendCode = async () => {
    try {
      console.log('[Register Resend] Попытка переотправки кода:', registeredEmail);
      
      const response = await resendCode(registeredEmail);
      
      console.log('[Register Resend] Код отправлен:', response);
      return response;
      
    } catch (err) {
      console.error('[Register Resend] Ошибка переотправки:', err);
      const errorMsg = err.message || err.data?.detail || 'Ошибка при отправке кода';
      throw new Error(errorMsg);
    }
  };

  // Обработчик возврата к первому этапу
  const handleBackToForm = () => {
    setRegistrationStage('form');
    setSubmitError(null);
    setSubmitSuccess(null);
    clearError();
  };

  // Проверка валидности всей формы (повторно используемая)
  const isFormValid = () => {
    return (
      validation.login.isValid &&
      validation.email.isValid &&
      validation.password.isValid &&
      formData.password === formData.confirmPassword &&
      termsAccepted &&
      !isLoading
    );
  };

  // Собрать список причин, почему форма невалидна (для блока декорации)
  const getFormErrors = () => {
    const errors = [];
    if (!validation.login.isValid) {
      errors.push(validation.login.message || 'Логин должен содержать только латинские буквы и цифры (3–16 символов).');
    }
    if (!validation.email.isValid) {
      errors.push(validation.email.message || 'Введите корректный email.');
    }
    if (!validation.password.isValid) {
      // validation.password may include an errors[] array from validatePassword util
      const passErrors = validation.password.errors && validation.password.errors.length ? validation.password.errors : [validation.password.message || 'Пароль не соответствует требованиям.'];
      passErrors.forEach(e => errors.push(e));
    }
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.push('Пароли не совпадают.');
    }
    if (!termsAccepted) {
      errors.push('Необходимо согласиться с правилами сервера.');
    }
    return errors;
  };

  return (
    <div className="register-page">
      {isLoading && (
        <div className="loading-container">
          <img className="loading-image" src={require('../assets/imges/loading_gif.gif')} alt="Загрузка..." />
          <div className="loading-text">
            {registrationStage === 'form' ? 'Регистрация...' : 'Проверка кода...'}
          </div>
        </div>
      )}

      <div className="auth-container">
        <div className="auth-content">
          {registrationStage === 'form' ? (
            <RegisterForm 
              formData={formData}
              validation={validation}
              termsAccepted={termsAccepted}
              isSubmitting={isLoading}
              submitSuccess={submitSuccess}
              submitError={submitError}
              authError={error}
              onInputChange={handleInputChange}
              onTermsChange={handleTermsChange}
              onSubmit={handleSubmit}
              onLoginBlur={handleLoginBlur}
              onEmailBlur={handleEmailBlur}
              getFormErrors={getFormErrors}
              isFormValid={isFormValid}
            />
          ) : (
            <VerifyEmailForm
              email={registeredEmail}
              isSubmitting={isLoading}
              submitError={submitError}
              submitSuccess={submitSuccess}
              authError={error}
              onSubmit={handleVerifyCode}
              onResendCode={handleResendCode}
              onBack={handleBackToForm}
              onClearError={() => setSubmitError(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;