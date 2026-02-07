// src/components/shop/PrivilegeCard.jsx
import React from 'react';

const PrivilegeCard = ({ 
  privilege, 
  isFeatured = false, 
  onAddToCart, 
  onOpenDetails 
}) => {
  const {
    id,
    title,
    price,
    badge,
    description,
    features,
    image,
    gradientClass,
    buttonClass,
    gradientTextClass
  } = privilege;

  return (
    <div className={`privilege-card ${isFeatured ? 'featured' : ''}`} data-tier={id}>
      <div className={`privilege-badge ${isFeatured ? 'featured-badge' : ''}`}>
        {badge}
      </div>
      
      <div className="privilege-image">
        <div className={`image-placeholder ${gradientClass}`}>
          <img 
            src={image} 
            alt={`${title} привилегия`} 
            className="privilege-img"
          />
        </div>
      </div>
      
      <div className="privilege-content">
        <h3 className="privilege-title">{title}</h3>
        
        <div className="privilege-price">
          <span className={`price-amount ${gradientTextClass}`}>
            {price.toLocaleString('ru-RU')}
          </span>
          <span className="price-currency">₽</span>
        </div>
        
        <p className="privilege-description">{description}</p>
        
        <ul className="privilege-features">
          {features.slice(0, 7).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
          {features.length > 7 && (
            <li>И еще {features.length - 7} возможностей...</li>
          )}
        </ul>
        
        <div className="privilege-footer">
          <button 
            className={`buy-button ${buttonClass}`}
            onClick={() => onAddToCart(privilege)}
          >
            Купить {title}
          </button>
          
          <button 
            className="details-link"
            onClick={() => onOpenDetails(privilege)}
            style={{
              background: 'none',
              border: 'none',
              color: '#7b88ff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Подробнее →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeCard;