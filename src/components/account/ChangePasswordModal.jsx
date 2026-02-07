import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import { useAuth } from '../../contexts/AuthContext';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '', 
    confirmPassword: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    level: 0,
    label: 'Сложность пароля'
  });
  
  const [passwordMatch, setPasswordMatch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showReloadConfirm, setShowReloadConfirm] = useState(false);

  useEffect(() => {
    if (formData.newPassword) {
      calculatePasswordStrength(formData.newPassword);
    } else {
      setPasswordStrength({ level: 0, label: 'Сложность пароля' });
    }

    if (formData.confirmPassword) {
      if (formData.newPassword === formData.confirmPassword) {
        setPasswordMatch('✓ Пароли совпадают');
      } else {
        setPasswordMatch('✗ Пароли не совпадают');
      }
    } else {
      setPasswordMatch('');
    }
  }, [formData.newPassword, formData.confirmPassword]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    let label = '';
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      label = 'Слабый пароль';
    } else if (strength <= 3) {
      label = 'Средний пароль';
    } else if (strength <= 4) {
      label = 'Хороший пароль';
    } else {
      label = 'Отличный пароль';
    }
    setPasswordStrength({ level: strength, label });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // UX validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Пароли не совпадают' });
      return;
    }
    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Пароль должен содержать минимум 6 символов' });
      return;
    }

    // request to change password backend
    try {
      setIsLoading(true);
      setMessage({ type: '', text: '' });
      
      const response = await userService.changePassword(formData.oldPassword, formData.newPassword);
      
      const successMessage = response?.message || 'Пароль успешно изменен';
      setMessage({ type: 'success', text: successMessage });
      
      // show reload confirmation dialog
      setShowReloadConfirm(true);
    } catch (error) {
      let errorMessage = 'Ошибка при смене пароля';
      
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReloadConfirm = async () => {
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowReloadConfirm(false);
    onClose();
    
    await logout();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Смена пароля</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="oldPassword">Старый пароль</label>
            <div className="input-container">
              <input 
                type="password" 
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required 
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">Новый пароль</label>
            <div className="input-container">
              <input 
                type="password" 
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required 
                minLength="6"
              />
              <span className="input-icon">🔑</span>
            </div>
            <div className="password-strength">
              <div 
                className="strength-bar" 
                data-strength={passwordStrength.level}
              ></div>
              <div className="strength-label">{passwordStrength.label}</div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <div className="input-container">
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <span className="input-icon">✓</span>
            </div>
            {passwordMatch && (
              <div className={`password-match ${formData.newPassword === formData.confirmPassword ? 'match' : 'no-match'}`}>
                {passwordMatch}
              </div>
            )}
          </div>
          
          <button type="submit" className="auth-button" disabled={isLoading}>
            <span className="button-icon">🔄</span>
            {isLoading ? 'Загрузка...' : 'Сменить пароль'}
          </button>
          
          {message.text && (
            <div className={`modal-message modal-message-${message.type}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>

      {/* dialog for reloading the page */}
      {showReloadConfirm && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-icon">✓</div>
            <h3 className="confirmation-title">Перезагрузка страницы</h3>
            <p className="confirmation-message">
              {message.text}
            </p>
            <p className="confirmation-message" style={{ fontSize: '13px', opacity: 0.6 }}>
              Все остальные окна и вкладки этого браузера с вашим аккаунтом будут разлогированы.
            </p>
            <div className="confirmation-buttons">
              <button 
                className="confirmation-button confirm-button"
                onClick={handleReloadConfirm}
              >
                <span>✓</span>
                Перезагрузить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordModal;
