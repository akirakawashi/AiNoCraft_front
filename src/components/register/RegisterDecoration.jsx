import React from 'react';

const AuthDecoration = () => {
  const decorationItems = [
    { 
      icon: '🎁', 
      title: 'Бонус за регистрацию', 
      text: 'Получите 100 монет в подарок после регистрации' 
    },
    { 
      icon: '⚡', 
      title: 'Быстрый старт', 
      text: 'Начните играть сразу после регистрации' 
    },
    { 
      icon: '👥', 
      title: 'Присоединяйтесь к нам', 
      text: 'Станьте частью нашего растущего сообщества' 
    }
  ];

  return (
    <div className="auth-decoration">
      {decorationItems.map((item, index) => (
        <div key={index} className="decoration-item">
          <div className="decoration-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthDecoration;