import React from 'react';
import { Link } from 'react-router-dom';

const Step = ({ number, title, description }) => (
  <div className="step">
    <div className="step-number">{number}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const GettingStartedSection = () => {
  const steps = [
    {
      number: 1,
      title: "Скачай самописный лаунчер",
      description: "Установи наш уникальный лаунчер с интегрированными модами и плагинами AiNoCraft"
    },
    {
      number: 2,
      title: "Создай персонажа",
      description: "Зарегистрируйся и кастомизируй свой профиль прямо на сайте - всё синхронизируется с игрой"
    },
    {
      number: 3,
      title: "Начни приключение",
      description: "Запусти игру и погрузись в AiNoCraft с его уникальными системами и возможностями"
    }
  ];

  return (
    <section className="getting-started-section">
      <div className="section-header">
        <h2>Начать играть легко</h2>
        <p className="section-subtitle">Всего 3 простых шага до увлекательной игры</p>
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </div>
      
      <div className="getting-started-download">
        <Link to="/launcher" className="download-button windows">
          <span className="download-icon">🪟</span>
          Windows
        </Link>
      </div>
    </section>
  );
};

export default GettingStartedSection;
