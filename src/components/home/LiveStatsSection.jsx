// src/components/home/LiveStatsSection.jsx
import React from 'react';

const LiveStat = ({ icon, value, label }) => (
  <div className="live-stat">
    <div className="live-stat-icon">{icon}</div>
    <div className="live-stat-content">
      <div className="live-stat-value">{value}</div>
      <div className="live-stat-label">{label}</div>
    </div>
  </div>
);

const LiveStatsSection = () => {
  const stats = [
    {
      icon: "👑",
      value: "1,247",
      label: "Игроков онлайн сейчас"
    },
    {
      icon: "🏆",
      value: "24",
      label: "Турниров за месяц"
    },
    {
      icon: "🎁",
      value: "156",
      label: "Новых игроков сегодня"
    },
    {
      icon: "⚡",
      value: "99.8%",
      label: "Аптайм сервера"
    }
  ];

  return (
    <section className="live-stats-section">
      <div className="live-stats-container">
        {stats.map((stat, index) => (
          <LiveStat key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default LiveStatsSection;