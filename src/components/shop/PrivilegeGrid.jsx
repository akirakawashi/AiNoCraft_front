// src/components/shop/PrivilegeGrid.jsx
import React from 'react';
import { privileges } from '../../data/privileges';
import PrivilegeCard from './PrivilegeCard';

const PrivilegeGrid = ({ onAddToCart, onOpenDetails }) => {
  return (
    <section className="privileges-section">
      <div className="section-header">
        <h2>Выберите свою привилегию</h2>
        <p className="section-subtitle">
          Каждая привилегия открывает уникальные возможности на сервере
        </p>
      </div>

      <div className="privileges-container">
        {privileges.map((privilege) => (
          <PrivilegeCard
            key={privilege.id}
            privilege={privilege}
            isFeatured={privilege.id === 'premium'} // Premium как featured
            onAddToCart={onAddToCart}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>
    </section>
  );
};

export default PrivilegeGrid;