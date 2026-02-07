// src/components/home/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>Добро пожаловать<br/>в AiNoCraft</h1>
      <p className="subtitle">
        Уникальный сервер Minecraft с собственными модами и плагинами. Присоединяйся к нам и разблокируй
        новый уровень игры с продуманным ендгеймом, собственной экономикой и возможностью кастомизации персонажа!
      </p>      
      <Link to="/launcher" className="cta-button">Начать играть</Link>
      
      <div className="server-stats">
        <div className="stat">
          <div className="hero-stat-number">24/7</div>
          <div className="hero-stat-label">Работа сервера</div>
        </div>
        <div className="stat">
          <div className="hero-stat-number">∞</div>
          <div className="hero-stat-label">Возможностей</div>
        </div>
        <div className="stat">
          <div className="hero-stat-number">2026</div>
          <div className="hero-stat-label">Запущен в 2026</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;