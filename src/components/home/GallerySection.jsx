import React from 'react';
import coverOne from '../../assets/imges/1.jpg';
import coverMain from '../../assets/imges/COVER1.png';
import coverCropped from '../../assets/imges/Cover_cropped.png';
import coverWinter from '../../assets/imges/cover_winter.png';
import coverEighteen from '../../assets/imges/cover_18.png';

const GalleryItem = ({ title, description, image, isLarge = false }) => (
  <div className={`gallery-item ${isLarge ? 'gallery-item-large' : ''}`}>
    <img src={image} alt={title} />
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
      image: coverCropped,
      isLarge: true
    },
    {
      title: "PvP Арена",
      description: "Еженедельные турниры",
      image: coverWinter,
    },
    {
      title: "Игровой город",
      description: "Торговый район",
      image: coverMain,
    },
    {
      title: "Подземелья",
      description: "Исследование новых мест",
      image: coverOne,
    },
    {
      title: "Уникальные мобы",
      description: "Кастомные создания",
      image: coverEighteen,
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
