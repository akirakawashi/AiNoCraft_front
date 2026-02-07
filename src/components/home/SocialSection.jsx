// src/components/home/SocialSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SocialCard = ({ icon, title, description, linkText, link }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (link.startsWith('/')) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <a href={link} target={link.startsWith('/') ? undefined : "_blank"} rel={link.startsWith('/') ? undefined : "noopener noreferrer"} onClick={handleClick} className={`social-card ${title.toLowerCase()}`}>
      <div className="social-icon">{icon}</div>
      <div className="social-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="social-link">{linkText} →</span>
      </div>
    </a>
  );
};

const SocialSection = () => {
  const socials = [
    {
      icon: "💬",
      title: "Discord",
      description: "Сообщество AiNoCraft - приватные каналы, помощь и общение",
      linkText: "Присоединиться",
      link: "https://discord.gg/y3UWMytaPG"
    },
    {
      icon: "📘",
      title: "ВКонтакте",
      description: "Новости, ивенты и обновления AiNoCraft в реальном времени",
      linkText: "Подписаться",
      link: "https://vk.com/ainocraft"
    },
    {
      icon: "✈️",
      title: "Telegram",
      description: "Уведомления и общение в приватном чате сообщества",
      linkText: "Подписаться",
      link: "https://t.me/ainocraft_official"
    },
    {
      icon: "🎥",
      title: "YouTube",
      description: "Гайды, обзоры и лучшие моменты на AiNoCraft",
      linkText: "Смотреть",
      link: "/coming-soon"
    },
  ];

  return (
    <section className="social-section">
      <div className="section-header">
        <h2>Присоединяйтесь к сообществу</h2>
        <p className="section-subtitle">Следите за нами в социальных сетях и будьте в курсе всех событий</p>
      </div>
      
      <div className="social-grid">
        {socials.map((social, index) => (
          <SocialCard key={index} {...social} />
        ))}
      </div>
    </section>
  );
};

export default SocialSection;