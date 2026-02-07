// src/data/privileges.js
import VIPImg from '../assets/imges/VIP.jpg';
import LoliImg from '../assets/imges/Loli.jpg';
import PremiumImg from '../assets/imges/Premium.jpg';
import DeluxImg from '../assets/imges/Delux.jpg';
import UltraImg from '../assets/imges/Ultra.jpg';
import LegendaImg from '../assets/imges/Legenda.jpg';

// Данные всех привилегий
export const privileges = [
  {
    id: 'vip',
    tier: 'vip',
    title: 'VIP',
    price: 299,
    badge: 'Начальный',
    description: 'Базовые возможности для комфортной игры',
    features: [
      'Цветной ник в чате',
      'Доступ к /fly в лобби',
      'Приватный варп /home (3 шт)',
      'Ежемесячный бонус 500 монет',
      'Приоритет в очереди на вход',
      'Доступ к набору VIP',
      'Ранний доступ к обновлениям'
    ],
    image: VIPImg,
    gradientClass: 'vip-gradient',
    buttonClass: 'vip-button',
    gradientTextClass: 'vip-gradient-text'
  },
  {
    id: 'loli',
    tier: 'loli',
    title: 'Loli',
    price: 599,
    badge: 'Популярная',
    description: 'Эксклюзивные возможности для активных игроков',
    features: [
      'Все возможности VIP',
      'Эксклюзивные скины и плащи',
      'Приватный остров 100x100',
      'Доступ к /rtp каждые 5 минут',
      'Ежемесячный бонус 1,500 монет',
      'Особые команды и эффекты',
      'Доступ к LoliKit',
      'Создание аукциона'
    ],
    image: LoliImg,
    gradientClass: 'loli-gradient',
    buttonClass: 'loli-button',
    gradientTextClass: 'loli-gradient-text'
  },
  {
    id: 'premium',
    tier: 'premium',
    title: 'Premium',
    price: 999,
    badge: 'Рекомендуем',
    description: 'Максимальные возможности для настоящих игроков',
    features: [
      'Все возможности Loli',
      'Приватный остров 200x200',
      'Двойной доход на сервере',
      'Доступ к /rtp каждые 2 минуты',
      'Ежемесячный бонус 3,000 монет',
      'Premium эффекты частиц',
      'Участие в бета-тестах',
      'Приоритетная поддержка',
      'Доступ к PremiumKit'
    ],
    image: PremiumImg,
    gradientClass: 'premium-gradient',
    buttonClass: 'premium-button',
    gradientTextClass: 'premium-gradient-text'
  },
  {
    id: 'delux',
    tier: 'delux',
    title: 'Delux',
    price: 1499,
    badge: 'Премиум',
    description: 'Элитный статус с уникальными преимуществами',
    features: [
      'Все возможности Premium',
      'Приватный остров 300x300',
      'Тройной доход на сервере',
      'Доступ к /rtp каждые 60 секунд',
      'Ежемесячный бонус 5,000 монет',
      'Delux эффекты и анимации',
      'Создание личных ивентов',
      'Персональный помощник',
      'Доступ к DeluxKit',
      'Эксклюзивные квесты'
    ],
    image: DeluxImg,
    gradientClass: 'delux-gradient',
    buttonClass: 'delux-button',
    gradientTextClass: 'delux-gradient-text'
  },
  {
    id: 'ultra',
    tier: 'ultra',
    title: 'Ultra',
    price: 2499,
    badge: 'Ультра',
    description: 'Экстремальные возможности для продвинутых',
    features: [
      'Все возможности Delux',
      'Приватный остров 400x400',
      'x3.5 доход на сервере',
      'Доступ к /rtp каждые 30 секунд',
      'Ежемесячный бонус 7,500 монет',
      'Ultra эффекты и скины',
      'Создание серверных ивентов',
      'Личный менеджер',
      'Доступ к UltraKit',
      'Участие в разработке',
      'Именной варп на сервере'
    ],
    image: UltraImg,
    gradientClass: 'ultra-gradient',
    buttonClass: 'ultra-button',
    gradientTextClass: 'ultra-gradient-text'
  },
  {
    id: 'legenda',
    tier: 'legenda',
    title: 'Legenda',
    price: 4999,
    badge: 'Легендарный',
    description: 'Статус легенды с безграничными возможностями',
    features: [
      'Все возможности Ultra',
      'Приватный остров 500x500',
      'x4 доход на сервере',
      'Безлимитный доступ к /rtp',
      'Ежемесячный бонус 15,000 монет',
      'Легендарные эффекты и скины',
      'Создание глобальных ивентов',
      'Голос в управлении сервером',
      'Доступ к LegendKit',
      'Участие в разработке',
      'Золотая табличка в зале славы',
      'Собственный NPC в лобби'
    ],
    image: LegendaImg,
    gradientClass: 'legenda-gradient',
    buttonClass: 'legenda-button',
    gradientTextClass: 'legenda-gradient-text'
  }
];

// Данные для таблицы сравнения
export const comparisonData = {
  features: [
    'Цветной ник',
    'Приватный остров',
    'Множитель дохода',
    'Ежемесячный бонус',
    'RTP кд',
    'Эффекты частиц',
    'Создание ивентов',
    'Поддержка',
  ],
  values: {
    'VIP': ['✓', '—', 'x1', '500', '10 мин', '—', '—', 'Стандарт'],
    'Loli': ['✓', '100x100', 'x1.5', '1,500', '5 мин', 'Базовые', '—', 'Приоритет'],
    'Premium': ['✓', '200x200', 'x2', '3,000', '2 мин', 'Premium', '—', '24/7'],
    'Delux': ['✓', '300x300', 'x3', '5,000', '60 сек', 'Delux', 'Личные', 'Помощник'],
    'Ultra': ['✓', '400x400', 'x3.5', '7,500', '30 сек', 'Ultra', 'Серверные', 'Менеджер'],
    'Legenda': ['✓', '500x500', 'x4', '15,000', 'Без кд', 'Легендарные', 'Глобальные', 'Администрация']
  }
};

// Данные для FAQ
export const faqData = [
  {
    id: 1,
    icon: '❓',
    question: 'Как происходит активация привилегии?',
    answer: 'Привилегия активируется автоматически в течение 5-10 минут после успешной оплата. Вы получите уведомление в игре и на почту. Аккаунт определяется по логину, указанному при оплате.'
  },
  {
    id: 2,
    icon: '💰',
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки (Qiwi, ЮMoney), мобильные платежи и криптовалюту. Все платежи защищены SSL-шифрованием.'
  },
  {
    id: 3,
    icon: '🔄',
    question: 'Можно ли обновить привилегию?',
    answer: 'Да, вы можете обновить свою привилегию до более высокой в любой момент. При этом стоимость предыдущей привилегии учитывается в новой покупке (разница в цене).'
  },
  {
    id: 4,
    icon: '⏳',
    question: 'На какой срок покупается привилегия?',
    answer: 'Все привилегии покупаются навсегда. После покупки она остается на вашем аккаунте бессрочно и не требует продления.'
  },
  {
    id: 5,
    icon: '🔒',
    question: 'Что делать, если привилегия не активировалась?',
    answer: 'Если привилегия не активировалась в течение 30 минут, обратитесь в техническую поддержку в Discord, предоставив номер чека и логин игрока. Мы решим проблему в течение 1-2 часов.'
  }
];
