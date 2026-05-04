import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import { useAuth } from '../../contexts/AuthContext';
import { validatePassword, validatePasswordMatch } from '../../utils/passwordValidation';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '', 
    confirmPassword: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    width: '0%',
    color: '#ddd',
    text: 'Сложность пароля'
  });
  
  const [passwordMatch, setPasswordMatch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showReloadConfirm, setShowReloadConfirm] = useState(false);
  
  // Состояния для показа/скрытия паролей
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (formData.newPassword) {
      setPasswordStrength(validatePassword(formData.newPassword).strength);
    } else {
      setPasswordStrength({ width: '0%', color: '#ddd', text: 'Сложность пароля' });
    }

    if (formData.confirmPassword) {
      const match = validatePasswordMatch(formData.newPassword, formData.confirmPassword);
      setPasswordMatch(match.isMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают');
    } else {
      setPasswordMatch('');
    }
  }, [formData.newPassword, formData.confirmPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация пароля
    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      setMessage({ type: 'error', text: passwordValidation.message });
      return;
    }

    // Валидация совпадения паролей
    const matchValidation = validatePasswordMatch(formData.newPassword, formData.confirmPassword);
    if (!matchValidation.isMatch) {
      setMessage({ type: 'error', text: 'Пароли не совпадают' });
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
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required 
              />
              <span className="input-icon">🔒</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-old" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 12 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="url(#eye-gradient-old)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-old" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="url(#eye-gradient-old)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="url(#eye-gradient-old)" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">Новый пароль</label>
            <div className="input-container">
              <input 
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required 
                minLength="6"
              />
              <span className="input-icon">🔑</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-new" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 12 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="url(#eye-gradient-new)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-new" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="url(#eye-gradient-new)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="url(#eye-gradient-new)" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className="strength-bar-fill" 
                  style={{
                    width: passwordStrength.width || '0%',
                    backgroundColor: passwordStrength.color || '#ddd'
                  }}
                ></div>
              </div>
              <div className="strength-label" style={{ color: passwordStrength.color || '#666' }}>
                {passwordStrength.text || 'Сложность пароля'}
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <div className="input-container">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <span className="input-icon">✓</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-confirm" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 12 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="url(#eye-gradient-confirm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="eye-gradient-confirm" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7b88ff"/>
                        <stop offset="100%" stopColor="#ff7bc6"/>
                      </linearGradient>
                    </defs>
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="url(#eye-gradient-confirm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="url(#eye-gradient-confirm)" strokeWidth="2"/>
                  </svg>
                )}
              </button>
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
