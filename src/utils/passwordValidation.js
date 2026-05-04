/**
 * Единая система валидации паролей для всего приложения
 */

// Константы валидации
export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 64,
  REQUIRE_LETTERS: true, // должны быть буквы
  REQUIRE_DIGITS: true,  // должны быть цифры
  REQUIRE_SPECIAL_CHARS: false // опционально, но учитывается в силе
};

/**
 * Вычисляет силу пароля на основе различных критериев
 * @param {string} password - пароль для проверки
 * @returns {object} объект с информацией о силе пароля
 */
export const calculatePasswordStrength = (password) => {
  if (!password) {
    return {
      width: '0%',
      color: '#ddd',
      text: 'Сложность пароля',
      score: 0,
      level: 0
    };
  }

  let score = 0;

  // Проверка длины
  if (password.length >= PASSWORD_RULES.MIN_LENGTH) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Проверка типов символов
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  // Определяем уровень (0-5)
  let level = Math.min(Math.floor(score / 2), 4);
  if (score <= 1) level = 0;
  else if (score <= 2) level = 1;
  else if (score <= 3) level = 2;
  else if (score <= 4) level = 3;
  else level = 4;

  const strengths = [
    { width: '20%', color: '#ff4444', text: 'Очень слабый', level: 0 },
    { width: '40%', color: '#ff8800', text: 'Слабый', level: 1 },
    { width: '60%', color: '#ffaa00', text: 'Средний', level: 2 },
    { width: '80%', color: '#88cc00', text: 'Хороший', level: 3 },
    { width: '100%', color: '#00cc44', text: 'Отличный', level: 4 }
  ];

  return { ...strengths[level], score };
};

/**
 * Валидирует пароль по всем правилам
 * @param {string} password - пароль для проверки
 * @returns {object} объект с isValid, message и strength
 */
export const validatePassword = (password) => {
  const strength = calculatePasswordStrength(password);
  // Собираем все причины некорректности, чтобы UI мог показать подсказки
  const errors = [];

  // Пусто
  if (!password) {
    errors.push('Придумайте пароль');
    return {
      isValid: false,
      message: 'Придумайте пароль',
      strength: {
        width: '0%',
        color: '#ddd',
        text: 'Сложность пароля',
        score: 0,
        level: 0
      },
      errors
    };
  }

  // Минимальная длина
  if (password.length < PASSWORD_RULES.MIN_LENGTH) {
    errors.push(`Пароль должен содержать минимум ${PASSWORD_RULES.MIN_LENGTH} символов`);
  }

  // Максимальная длина
  if (password.length > PASSWORD_RULES.MAX_LENGTH) {
    errors.push(`Пароль слишком длинный (максимум ${PASSWORD_RULES.MAX_LENGTH} символов)`);
  }

  // Только ASCII-печатаемые символы (без пробела) — исключает кириллицу
  const englishPattern = /^[\x21-\x7E]*$/;
  if (!englishPattern.test(password)) {
    errors.push('Только латинские буквы, цифры и спецсимволы');
  }

  // Должен содержать хотя бы одну букву
  if (PASSWORD_RULES.REQUIRE_LETTERS && !/[A-Za-z]/.test(password)) {
    errors.push('Пароль должен содержать буквы');
  }

  // Должен содержать хотя бы одну цифру
  if (PASSWORD_RULES.REQUIRE_DIGITS && !/\d/.test(password)) {
    errors.push('Пароль должен содержать цифры');
  }

  const isValid = errors.length === 0;
  const message = isValid ? '✓ Пароль подходит' : errors[0];

  return {
    isValid,
    message,
    strength,
    errors
  };
};

/**
 * Проверяет совпадение двух паролей
 * @param {string} password1 - первый пароль
 * @param {string} password2 - второй пароль
 * @returns {object} объект с isMatch и message
 */
export const validatePasswordMatch = (password1, password2) => {
  if (!password2) {
    return { isMatch: false, message: '' };
  }

  if (password1 === password2) {
    return { isMatch: true, message: '✓ Пароли совпадают' };
  }

  return { isMatch: false, message: '✗ Пароли не совпадают' };
};
