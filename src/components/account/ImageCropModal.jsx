import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import '../../styles/image-crop-modal.css';

const ImageCropModal = ({ isOpen, imageSrc, onClose, onConfirm, isLoading, error }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (croppedAreaPixels && imageSrc) {
      const canvas = await createImage(imageSrc, croppedAreaPixels);
      canvas.toBlob((blob) => {
        onConfirm(blob);
      }, 'image/jpeg', 0.80);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        {isLoading && (
          <div className="modal-loading-overlay">
            <img 
              className="loading-image" 
              src={require('../../assets/imges/loading_gif.gif')} 
              alt="Загрузка..." 
            />
            <div className="loading-text">Загрузка аватара...</div>
          </div>
        )}
        <div className="crop-modal-header">
          <h2>Настройка фотографии</h2>
          <button className="close-btn" onClick={onClose} disabled={isLoading}>×</button>
        </div>

        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            restrictPosition={true}
          />
        </div>

        <div className="crop-controls">
          <div className="zoom-control">
            <label>Масштаб:</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <div className="crop-error-message">
            {error}
          </div>
        )}

        <div className="crop-modal-actions">
          <button 
            className="btn-cancel" 
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </button>
          <button 
            className="btn-confirm" 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Применить'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper функция для создания обрезанного изображения
const createImage = (url, pixelCrop) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    
    const onLoad = () => {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      resolve(canvas);
    };
    
    const onError = () => {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
      reject(new Error('Failed to load image'));
    };
    
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    image.src = url;
  });

export default ImageCropModal;
