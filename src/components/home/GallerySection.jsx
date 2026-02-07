// src/components/home/GallerySection.jsx (исправленный)
import React from 'react';

const GalleryItem = ({ title, description, image, isLarge = false }) => (
  <div className={`gallery-item ${isLarge ? 'gallery-item-large' : ''}`}>
    <img src={image} alt={title} />
      <span style={{ color: 'white', fontSize: '24px' }}>🖼️</span>
    <div className="gallery-overlay">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const GallerySection = () => {
  const galleryItems = [
    {
      title: "Главная база",
      description: "Гигантский замок, построенный сообществом",
      image: require('../../assets/imges/background.png'),
      isLarge: true
    },
    {
      title: "PvP Арена",
      description: "Еженедельные турниры",
      image: require('../../assets/imges/background.png'),
    },
    {
      title: "Игровой город",
      description: "Торговый район",
      image: require('../../assets/imges/background.png'),
    },
    {
      title: "Подземелья",
      description: "Исследование новых мест",
      image: require('../../assets/imges/background.png'),
    },
    {
      title: "Уникальные мобы",
      description: "Кастомные создания",
      image: require('../../assets/imges/background.png'),
    }
  ];

  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2>Игровые моменты</h2>
        <p className="section-subtitle">Лучшие скриншоты и моменты от нашего сообщества</p>
      </div>
      
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryItem key={index} {...item} image={item.image} />
        ))}
      </div>
      
      <div className="gallery-cta">
        <a href="/gallery" className="gallery-button">Посмотреть все скриншоты →</a>
      </div>
    </section>
  );
};

export default GallerySection;