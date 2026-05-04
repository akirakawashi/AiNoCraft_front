// src/components/launcher/LauncherDownloadSection.jsx
import React from 'react';

const LauncherDownloadSection = () => {
  const downloadLinks = [
    {
      os: 'Windows',
      icon: '🪟',
      version: '1.0.0',
      size: '256 MB',
      link: 'https://storage.ainocraft.com/downloads/AiNoCraftLauncher.exe',
      description: 'Самая популярная платформа'
    }
  ];

  return (
    <section className="launcher-download">
      <div className="launcher-container">
        <h2>Скачать лаунчер</h2>
        
        <div className="download-cards">
          {downloadLinks.map((item, index) => (
            <div key={index} className="download-card">
              <div className="card-icon">{item.icon}</div>
              <h3>{item.os}</h3>
              <p className="card-description">{item.description}</p>
              
              <div className="card-details">
                <div className="detail-item">
                  <span className="label">Версия:</span>
                  <span className="value">{item.version}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Размер:</span>
                  <span className="value">{item.size}</span>
                </div>
              </div>
              
              <a href={item.link} className="download-button">
                Скачать
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LauncherDownloadSection;
