import React from 'react';

// Компонент теперь выводит один выразительный блок информации о регистрации.
// Если передан `replacementForFastStart`, он будет отображён внутри блока.
const AuthDecoration = ({ replacementForFastStart = null }) => {
  return (
    <div className="auth-decoration">
      <div className="decoration-item decoration-info">
        {replacementForFastStart ? (
          replacementForFastStart
        ) : (
          <>
            <div className="decoration-icon">⚡</div>
            <h3>Быстрый старт</h3>
            <p>Начните играть сразу после регистрации</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthDecoration;