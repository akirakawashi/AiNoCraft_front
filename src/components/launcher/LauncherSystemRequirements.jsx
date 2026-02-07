// src/components/launcher/LauncherSystemRequirements.jsx
import React from 'react';

const LauncherSystemRequirements = () => {
  return (
    <section className="launcher-requirements">
      <div className="launcher-container">
        <h2>Системные требования</h2>
        
        <div className="requirements-grid">
          <div className="requirements-card">
            <h3>Минимальные требования</h3>
            <ul className="requirements-list">
              <li>ОС: Windows 7 / macOS 10.12 / Ubuntu 16.04</li>
              <li>Процессор: Intel Core i5 или эквивалент</li>
              <li>Оперативная память: 4 GB RAM</li>
              <li>Видеокарта: NVIDIA GTX 460 / AMD HD 5850</li>
              <li>Место на диске: 10 GB</li>
              <li>Интернет: 10 Mbps</li>
            </ul>
          </div>
          
          <div className="requirements-card recommended">
            <div className="badge">Рекомендуется</div>
            <h3>Рекомендуемые требования</h3>
            <ul className="requirements-list">
              <li>ОС: Windows 10 / macOS 11 / Ubuntu 20.04</li>
              <li>Процессор: Intel Core i7 / AMD Ryzen 5</li>
              <li>Оперативная память: 16 GB RAM</li>
              <li>Видеокарта: NVIDIA RTX 2060 / AMD RX 5700</li>
              <li>Место на диске: 15 GB SSD</li>
              <li>Интернет: 30 Mbps</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LauncherSystemRequirements;
