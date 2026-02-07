// src/components/home/AdvantagesSection.jsx
import React from 'react';

const AdvantageCard = ({ icon, title, description, items }) => (
  <div className="advantage-card">
    <div className="advantage-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul className="advantage-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: '✨',
      title: 'Самописные моды и плагины',
      description: 'Уникальная система, разработанная специально для AiNoCraft',
      items: ['Авторские механики', 'Уникальные предметы', 'Кастомные системы боя']
    },
    {
      icon: '🎁',
      title: 'Система лутбоксов',
      description: 'Получай награды за достижения и активную игру',
      items: ['Ежедневные награды', 'Боевые сундуки', 'Эксклюзивные предметы']
    },
    {
      icon: '🗓️',
      title: 'Регулярные ивенты',
      description: 'Постоянно новые события с интересными механиками',
      items: ['Еженедельные ивенты', 'Сезонные события', 'Экспедиции в своё измерение']
    },
    {
      icon: '💰',
      title: 'Собственная экономика',
      description: 'Справедливая и прозрачная система торговли и заработка',
      items: ['Честный обмен', 'Магазин игроков', 'Ежедневные квесты']
    },
    {
      icon: '👑',
      title: 'Разнообразные привилегии',
      description: 'Выбери привилегию, которая подходит именно тебе',
      items: ['Эксклюзивные предметы', 'Особые команды', 'Приватные зоны']
    },
    {
      icon: '🎨',
      title: 'Кастомизация персонажа',
      description: 'Создай уникального персонажа, отражающего твой стиль',
      items: ['Кастомные скины', 'Личный профиль', 'Интеграция с сайтом']
    }
  ];

  return (
    <section className="advantages-section">
      <div className="section-header">
        <h2>Что делает AiNoCraft особенным?</h2>
        <p className="section-subtitle">Инновационные системы, разработанные с нуля специально для тебя</p>
      </div>
      
      <div className="advantages-grid">
        {advantages.map((advantage, index) => (
          <AdvantageCard key={index} {...advantage} />
        ))}
      </div>
    </section>
  );
};

export default AdvantagesSection;