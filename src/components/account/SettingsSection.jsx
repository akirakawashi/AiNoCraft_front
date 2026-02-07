import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsSection = ({ email, phone, onChangePassword, onAddPhone }) => {
  const navigate = useNavigate();
  
  const settings = [
    {
      icon: '✉️',
      title: 'Электронная почта',
      value: email,
      action: 'Изменить',
      onAction: () => navigate('/coming-soon')
    },
    {
      icon: '📱',
      title: 'Телефон',
      value: phone || 'Не добавлен',
      action: phone ? 'Изменить' : 'Добавить',
      onAction: () => navigate('/coming-soon')
    },
    {
      icon: '🔐',
      title: 'Безопасность',
      value: 'Пароль установлен',
      action: 'Сменить',
      onAction: onChangePassword
    },
    {
      icon: '🔔',
      title: 'Уведомления',
      value: 'Включены',
      action: 'Настроить',
      onAction: () => navigate('/coming-soon')
    }
  ];

  return (
    <div className="settings-section">
      <h2>Настройки аккаунта</h2>
      
      <div className="settings-grid">
        {settings.map((setting, index) => (
          <div key={index} className="setting-item">
            <div className="setting-header">
              <span className="setting-icon">{setting.icon}</span>
              <div className="setting-info">
                <h4>{setting.title}</h4>
                <p className="setting-value">{setting.value}</p>
              </div>
            </div>
            <button className="setting-action" onClick={setting.onAction}>
              {setting.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;
