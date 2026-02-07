// src/components/shop/CTASection.jsx
import React from 'react';

const CTASection = () => {
  // ФУНКЦИЯ плавной прокрутки к привилегиям
  const scrollToPrivileges = (e) => {
    e.preventDefault();
    const privilegesSection = document.querySelector('.privileges-section');
    
    if (privilegesSection) {
      privilegesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Готовы улучшить свой игровой опыт?</h2>
          <p>
            Выберите подходящую привилегию и получите максимум от игры на AiNoCraft!
          </p>
          
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={scrollToPrivileges}
            >
              Выбрать привилегию
            </button>
            
            <button 
              className="cta-button secondary"
              onClick={() => {
                // Заглушка для отзывов
                alert('Раздел отзывов в разработке');
              }}
            >
              Посмотреть отзывы
            </button>
          </div>
        </div>
        
        <div className="cta-decoration">
          <div className="cta-icon">✨</div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;