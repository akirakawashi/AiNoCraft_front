import React from 'react';

const PasswordStrength = ({ strength }) => {
  return (
    <div className="password-strength">
      <div 
        className="strength-bar" 
        style={{
          width: strength.width || '0%',
          backgroundColor: strength.color || '#ddd',
          transition: 'all 0.3s ease'
        }}
      ></div>
      <div 
        className="strength-label"
        style={{ color: strength.color || '#666' }}
      >
        {strength.text || 'Сложность пароля'}
      </div>
    </div>
  );
};

export default PasswordStrength;