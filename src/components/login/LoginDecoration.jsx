import React from 'react';

const AuthDecoration = () => {
    const decorationItems = [
        {
            icon: '🎮',
            title: 'Быстрый доступ',
            description: 'Войдите, чтобы получить доступ ко всем функциям сервера'
        },
        {
            icon: '⭐',
            title: 'Привилегии',
            description: 'Получите доступ к покупкам и бонусам'
        },
        {
            icon: '👥',
            title: 'Сообщество',
            description: 'Присоединяйтесь к нашему дружному комьюнити'
        }
    ];

    return (
        <div className="auth-decoration">
            {decorationItems.map((item, index) => (
                <div key={index} className="decoration-item">
                    <div className="decoration-icon">
                        <span className="icon-emoji">{item.icon}</span>
                    </div>
                    <h3 className="decoration-title">{item.title}</h3>
                    <p className="decoration-description">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default AuthDecoration;