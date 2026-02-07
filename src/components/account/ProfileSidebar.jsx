import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ImageCropModal from './ImageCropModal';
import { DEFAULT_AVATAR, DEFAULT_RING_COLOR } from '../../data/defaults';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSidebar = ({ userData, onAvatarChange, onChangePassword, onAddPhone }) => {
  const navigate = useNavigate();
  const { handleAvatarUpload, avatar } = useAuth();
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);



  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Допустимые форматы: JPG, PNG, WebP');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Максимальный размер файла: 5MB');
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result);
      setIsCropModalOpen(true);
    };
    reader.onerror = () => {
      setError('Ошибка при загрузке файла');
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const handleCropConfirm = async (blob) => {
    try {
      setError(null);
      setSuccess(null);
      setIsLoading(true);
      
      // Use context's handleAvatarUpload which manages state and loading
      const response = await handleAvatarUpload(blob);

      // Backend now returns { avatar_url: string } (public URL). For backward compatibility
      // also accept `presigned_url`. Prefer returned avatar_url, otherwise fall back to context.
      const returnedAvatar = response?.avatar_url || response?.presigned_url || null;
      if (typeof onAvatarChange === 'function') {
        if (returnedAvatar) {
          onAvatarChange(returnedAvatar);
        } else if (avatar) {
          onAvatarChange(avatar);
        }
      }

      setSuccess('Фото успешно загружено!');
      setIsCropModalOpen(false);
      setSelectedImage(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      // Обработка ошибки с правильной логикой
      let errorMessage = 'Ошибка загрузки фото';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.data?.detail) {
        errorMessage = err.data.detail;
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      }
      
      setError(errorMessage);
      
      // НЕ закрываем окно при ошибке, чтобы пользователь видел ошибку
      // Окно останется открытым, пользователь сможет попробовать снова или закрыть вручную
    } finally {
      setIsLoading(false);
    }
  };


  const providedColor = userData && (userData.privilegeColor || userData.avatarColor);
  const ringColor = providedColor || DEFAULT_RING_COLOR;

  return (
    <div className="account-sidebar">
      {/* Профиль карточка */}
      <div className="profile-card">
        <div className="avatar-container">
          <div className="avatar-wrapper">
            <div
              className="avatar-preview"
              style={{
                background: 'transparent', // keep inner gap transparent
                border: `4px solid ${ringColor}`,
              }}
            >
              <img src={avatar || DEFAULT_AVATAR} alt="Avatar" />
            </div>
            <div className="avatar-upload">
              <input 
                type="file" 
                id="avatar-input" 
                accept="image/jpeg,image/png,image/webp" 
                hidden 
                onChange={handleFileSelect}
                disabled={isLoading}
              />
              <label htmlFor="avatar-input" className="upload-button">
                <span className="upload-icon">📷</span>
                <span className="upload-text">
                  {isLoading ? 'Загрузка...' : 'Сменить фото'}
                </span>
              </label>
              <p className="upload-hint">JPG, PNG, WebP до 20MB</p>
              {error && <p className="upload-error">{error}</p>}
              {success && <p className="upload-success">{success}</p>}
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          <h3>{userData.username}</h3>
          <div className="profile-meta">
            <span className="meta-item">🎮 Игрок с {userData.registeredYear}</span>
            <span className="meta-item">👑 Статус: {userData.status}</span>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="quick-actions">
        <h3>Быстрые действия</h3>
        <button className="action-button" onClick={onChangePassword}>
          <span className="action-icon">🔒</span>
          Сменить пароль
        </button>
        <button className="action-button" onClick={() => navigate('/coming-soon')}>
          <span className="action-icon">📱</span>
          Добавить телефон
        </button>
        <Link to="/coming-soon" className="action-button">
          <span className="action-icon">👥</span>
          Моя команда
        </Link>
        <Link to="/coming-soon" className="action-button">
          <span className="action-icon">🎯</span>
          Мои достижения
        </Link>
      </div>

      {/* Статистика игрока */}
      <div className="player-stats">
        <h3>Статистика</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Время игры</span>
            <span className="stat-value">{userData.stats.playtime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Победы в PvP</span>
            <span className="stat-value">{userData.stats.pvpWins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Построек</span>
            <span className="stat-value">{userData.stats.builds}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Друзей</span>
            <span className="stat-value">{userData.stats.friends}</span>
          </div>
        </div>
      </div>

      {/* Модальное окно для обрезки */}
      <ImageCropModal
        isOpen={isCropModalOpen}
        imageSrc={selectedImage}
        onClose={() => {
          setIsCropModalOpen(false);
          setSelectedImage(null);
          setError(null);
          setSuccess(null);
        }}
        onConfirm={handleCropConfirm}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ProfileSidebar;
