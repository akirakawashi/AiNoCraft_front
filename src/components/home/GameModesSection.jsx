// src/components/home/GameModesSection.jsx
import React from 'react';

const ModeCard = ({ isFeatured, badge, icon, title, description, players, worlds }) => (
  <div className={`mode-card ${isFeatured ? 'mode-featured' : ''}`}>
    {isFeatured && <div className="mode-badge">{badge}</div>}
    <div className="mode-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="mode-stats">
      <span>👥 {players} игроков</span>
      <span>🌍 {worlds} миров</span>
    </div>
    <a href="/todo" className="mode-button">Подробнее</a>
  </div>
);

const GameModesSection = () => {
  const modes = [
    {
      isFeatured: true,
      badge: 'Рекомендуется',
      icon: '🏰',
      title: 'Выживание+',
      description: 'Выживание с продуманным ендгеймом, своей экономикой, квестами и уникальными нашими модами',
      players: '∞',
      worlds: '2'
    },
    {
      isFeatured: false,
      icon: '⚔️',
      title: 'Своё измерение',
      description: 'Уникальное измерение с кастомными мобами, структурами и эксклюзивными ресурсами',
      players: '∞',
      worlds: '1'
    },
    {
      isFeatured: false,
      icon: '🎨',
      title: 'Творчество',
      description: 'Свободное пространство для создания, экспериментов и воплощения твоих идей',
      players: '∞',
      worlds: '1'
    }
  ];

  return (
    <section className="game-modes-section">
      <div className="section-header">
        <h2>Режимы игры</h2>
        <p className="section-subtitle">Выбери свой стиль игры</p>
      </div>
      
      <div className="modes-container">
        {modes.map((mode, index) => (
          <ModeCard key={index} {...mode} />
        ))}
      </div>
    </section>
  );
};

export default GameModesSection;