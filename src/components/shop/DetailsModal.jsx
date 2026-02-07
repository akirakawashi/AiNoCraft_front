// src/components/shop/DetailsModal.jsx
import React, { useEffect } from 'react';

const DetailsModal = ({ privilege, onClose, onAddToCart }) => {
  // ВАЖНО: Хуки должны вызываться ДО любых условий
  
  // ЗАКРЫТИЕ ПО ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]); // Зависимость onClose

  // РАННИЙ ВОЗВРАТ - после всех хуков
  if (!privilege) return null;

  const {
    title,
    price,
    description,
    features,
    image,
    gradientClass,
    buttonClass
  } = privilege;

  // ЗАКРЫТИЕ ПО КЛИКУ НА ОВЕРЛЕЙ
  const handleOverlayClick = (e) => {
    if (e.target.className.includes('details-overlay')) {
      onClose();
    }
  };

  // ФУНКЦИЯ анимации кнопки
  const handleBuyClick = () => {
    onAddToCart();
    
    // Анимация кнопки
    const btn = document.getElementById('details-buy-btn');
    if (btn) {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 200);
    }
  };

  return (
    <div 
      className="details-overlay active" 
      onClick={handleOverlayClick}
    >
      <div className="details-container">
        {/* КНОПКА ЗАКРЫТИЯ */}
        <button className="details-close" onClick={onClose}>×</button>
        
        {/* ИЗОБРАЖЕНИЕ */}
        <div className="details-image">
          <div className={`image-placeholder ${gradientClass}`}>
            <img 
              src={image} 
              alt={`${title} привилегия`} 
              className="privilege-img"
              id="details-image"
            />
          </div>
        </div>
        
        {/* КОНТЕНТ МОДАЛКИ */}
        <div className="details-content">
          {/* ЗАГОЛОВОК */}
          <h2 id="details-title" className="details-title">{title} привилегия</h2>
          
          {/* ОПИСАНИЕ */}
          <p className="details-description" id="details-description">
            {description}
          </p>
          
          {/* ЦЕНА */}
          <div className="details-price">
            <span className="price-amount">{price.toLocaleString('ru-RU')}</span>
            <span className="price-currency">₽</span>
          </div>
          
          {/* СПИСОК ВОЗМОЖНОСТЕЙ */}
          <div className="details-features" id="details-features">
            <ul>
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* КНОПКА ПОКУПКИ */}
          <button 
            className={`details-buy-button ${buttonClass}`}
              id="details-buy-btn"
              onClick={handleBuyClick}
            >
              Купить {title} за {price.toLocaleString('ru-RU')} ₽
            </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;