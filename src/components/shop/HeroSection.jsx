// src/components/shop/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  const stats = [
    { icon: '👥', value: '2,500+', label: 'Привилегий куплено' },
    { icon: '⭐', value: '4.9/5', label: 'Рейтинг доверия' },
    { icon: '⚡', value: '24/7', label: 'Активация' },
  ];

  return (
    <div className="shop-hero">
      <div className="hero-content">
        <h1>Магазин привилегий</h1>
        <p className="hero-subtitle">
          Откройте новые возможности и сделайте игру еще интереснее
        </p>
        
        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div className="hero-stat" key={index}>
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-info">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Декоративные элементы с анимацией */}
      <div className="hero-decoration">
        {['✨', '💎', '🎁'].map((emoji, index) => (
          <div 
            className={`shop-decoration-item floating ${index > 0 ? `delay-${index}` : ''}`}
            key={index}
          >
            <span>{emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;