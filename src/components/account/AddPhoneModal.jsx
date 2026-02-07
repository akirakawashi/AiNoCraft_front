import React, { useState } from 'react';

const AddPhoneModal = ({ isOpen, onClose, onPhoneAdded }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (phoneNumber.length < 10) {
      alert('Введите корректный номер телефона');
      return;
    }
    
    // Здесь будет API запрос на отправку кода
    console.log('Sending code to:', phoneNumber);
    setCodeSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!codeSent) {
      alert('Сначала получите код подтверждения');
      return;
    }
    
    if (verificationCode.length !== 6) {
      alert('Код должен состоять из 6 символов');
      return;
    }

    // Здесь будет API запрос на подтверждение
    console.log('Verifying phone:', { phoneNumber, verificationCode });
    
    onPhoneAdded(phoneNumber);
    setPhoneNumber('');
    setVerificationCode('');
    setCodeSent(false);
    onClose();
  };

  const formatPhone = (value) => {
    // Простое форматирование телефона
    const cleaned = value.replace(/\D/g, '');
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhoneNumber(formatted);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Добавление телефона</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="phoneNumber">Номер телефона</label>
            <div className="input-container">
              <input 
                type="tel" 
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99" 
                required 
              />
              <span className="input-icon">📱</span>
            </div>
            <p className="input-hint">Для восстановления доступа и безопасности</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="verificationCode">Код подтверждения</label>
            <div className="input-container">
              <input 
                type="text" 
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="XXXXXX" 
                maxLength="6" 
                required 
              />
              <span className="input-icon">#️⃣</span>
            </div>
            <div className="verification-info">
              <p>Код будет отправлен в SMS сообщении</p>
              <button 
                type="button" 
                className="send-code-button" 
                onClick={handleSendCode}
                disabled={codeSent}
              >
                {codeSent ? 'Код отправлен' : 'Отправить код'}
              </button>
            </div>
          </div>
          
          <button type="submit" className="auth-button">
            <span className="button-icon">✓</span>
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPhoneModal;
