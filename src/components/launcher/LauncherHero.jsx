// src/components/launcher/LauncherHero.jsx
import React from 'react';
import backgroundImage from '../../assets/imges/background.png';

const LauncherHero = () => {
  return (
    <section className="launcher-hero">
      <div className="launcher-hero-content">
        <h1>Скачайте лаунчер AiNoCraft</h1>
        <p className="hero-subtitle">
          Официальный лаунчер для началу игры на нашем сервере. 
          Просто скачайте, установите и начните играть!
        </p>
      </div>
      <div className="launcher-hero-bg">
        <img src={backgroundImage} alt="background" className="hero-bg-image" />
      </div>
    </section>
  );
};

export default LauncherHero;
