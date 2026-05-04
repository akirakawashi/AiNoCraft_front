import React from 'react';
import '../styles/coming-soon.css';

const ComingSoonPage = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">🚀</div>
        <h1>Скоро!</h1>
        <p className="coming-soon-text">Эта функция пока не работает</p>
        <p className="coming-soon-subtitle">Мы над ней работаем и скоро запустим</p>
        <a href="/" className="coming-soon-btn">Вернуться на главную</a>
      </div>
    </div>
  );
};

export default ComingSoonPage;
