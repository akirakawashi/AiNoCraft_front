import React from 'react';
import { useNavigate } from 'react-router-dom';

const BalanceSection = ({ gameBalance, premiumBalance }) => {
  const navigate = useNavigate();
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="balance-section">
      <h2>Ваши балансы</h2>
      <div className="balance-grid">
        {/* Игровая валюта */}
        <div className="balance-card">
          <div className="balance-header">
            <span className="balance-icon">💰</span>
            <h3>Игровая валюта</h3>
          </div>
          <div className="balance-amount">
            {formatNumber(gameBalance)} <span className="currency">монет</span>
          </div>
          <div className="balance-actions">
            <button className="balance-button" onClick={() => navigate('/coming-soon')}>Пополнить</button>
            <button className="balance-button" onClick={() => navigate('/coming-soon')}>Перевести</button>
          </div>
          <p className="balance-info">Начисляются за игру и ивенты</p>
        </div>

        {/* Премиум валюта */}
        <div className="balance-card">
          <div className="balance-header">
            <span className="balance-icon">💎</span>
            <h3>Премиум валюта</h3>
          </div>
          <div className="balance-amount">
            {formatNumber(premiumBalance)} <span className="currency">LoliCoins</span>
          </div>
          <div className="balance-actions">
            <button className="balance-button balance-button-premium" onClick={() => navigate('/coming-soon')}>Купить</button>
            <button className="balance-button balance-button-premium" onClick={() => navigate('/coming-soon')}>История</button>
          </div>
          <p className="balance-info">Покупается за реальные деньги</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
