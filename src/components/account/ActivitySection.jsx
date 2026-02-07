import React from 'react';

const ActivitySection = () => {
  const activities = [
    {
      icon: '🎮',
      title: 'Вход на сервер',
      time: '10 минут назад'
    },
    {
      icon: '💰',
      title: 'Получено 500 монет за ивент',
      time: '2 часа назад'
    },
    {
      icon: '🏆',
      title: 'Победа в PvP турнире',
      time: 'Вчера, 18:32'
    }
  ];

  return (
    <div className="activity-section">
      <h2>Последняя активность</h2>
      <div className="activity-timeline">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;
