import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../components/account/ProfileSidebar';
import BalanceSection from '../components/account/BalanceSection';
import SettingsSection from '../components/account/SettingsSection';
import ActivitySection from '../components/account/ActivitySection';
import ChangePasswordModal from '../components/account/ChangePasswordModal';
import AddPhoneModal from '../components/account/AddPhoneModal';
import { useAuth } from '../contexts/AuthContext';
import '../styles/account.css';

const PersonalAccountPage = () => {
  const { balance, user, avatar } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    username: user?.login || 'Username',
    email: 'user@example.com',
    phone: null,
    avatar: avatar || null,
    registeredYear: '2024',
    status: 'Игрок',
    stats: {
    playtime: '156ч 32м',
    pvpWins: 247,
    builds: 42,
    friends: 18
    }
  });

  // Обновляем username когда приходит user из контекста
  useEffect(() => {
    if (user?.login) {
      setUserData(prev => ({ ...prev, username: user.login }));
    }
  }, [user?.login]);

  // Обновляем avatar когда он изменяется в контексте
  useEffect(() => {
    if (avatar) {
      setUserData(prev => ({ ...prev, avatar }));
    }
  }, [avatar]);

  const handleAvatarUpdate = (avatarUrl) => {
    setUserData(prev => ({ ...prev, avatar: avatarUrl }));
  };

  return (
    <div className="account-container">
      {/* Заголовок */}
      <div className="account-header">
        <h1>Личный кабинет</h1>
        <p className="account-subtitle">Управляйте настройками аккаунта, балансом и безопасностью</p>
      </div>

      <div className="account-grid">
        {/* Левая колонка: Аватар и информация */}
        <ProfileSidebar 
          userData={userData}
          onAvatarChange={handleAvatarUpdate}
          onChangePassword={() => setIsPasswordModalOpen(true)}
          onAddPhone={() => setIsPhoneModalOpen(true)}
        />

        {/* Правая колонка: Основная информация */}
        <div className="account-main">
          <BalanceSection 
            gameBalance={balance.loli_coins}
            premiumBalance={balance.loli_crystal}
          />

          <SettingsSection 
            email={userData.email}
            phone={userData.phone}
            onChangePassword={() => setIsPasswordModalOpen(true)}
            onAddPhone={() => setIsPhoneModalOpen(true)}
          />

          <ActivitySection />
        </div>
      </div>

      {/* Модальные окна */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <AddPhoneModal 
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onPhoneAdded={(phone) => setUserData(prev => ({ ...prev, phone }))}
      />
    </div>
  );
};

export default PersonalAccountPage;
