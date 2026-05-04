import React from 'react';

const PasswordStrength = ({ strength }) => {
  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div 
          className="strength-bar-fill" 
          style={{
            width: strength.width || '0%',
            backgroundColor: strength.color || '#ddd'
          }}
        ></div>
      </div>
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