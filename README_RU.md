# LearnLingo — MVP маркетплейса преподавателей языков

LearnLingo — это React-приложение в формате marketplace MVP для онлайн-изучения языков. Пользователь может просматривать преподавателей, фильтровать их по языку, уровню и цене, авторизоваться через Firebase, добавлять преподавателей в избранное и оставлять заявку на пробный урок.

Проект показывает реалистичное frontend-приложение с React, Redux Toolkit, React Router, Formik/Yup-валидацией и Firebase Authentication / Realtime Database. Его можно использовать как портфолио-проект для frontend-позиций, фриланс-MVP и небольших Firebase-backed продуктовых прототипов.

## Возможности

- Публичная landing page с позиционированием продукта и ключевыми метриками платформы
- Каталог преподавателей с переиспользуемыми карточками
- Фильтрация по языку, уровню знаний и цене за час
- Паттерн постепенной загрузки через “Load more”
- Регистрация и вход через Firebase email/password
- Google Sign-in через Firebase Authentication
- Защищённая страница Favorites для авторизованных пользователей
- Добавление и удаление преподавателей из избранного с сохранением в Firebase Realtime Database
- Модальное окно для заявки на пробный урок
- Валидация форм через Formik и Yup
- Защищённые маршруты для приватных страниц
- Redux Toolkit для управления состоянием авторизации, преподавателей и избранного
- Автоматический деплой на GitHub Pages через GitHub Actions
- Firebase-конфигурация через environment variables

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Redux Toolkit
- React Redux
- Redux Persist
- CSS Modules
- React Select
- React Loader Spinner

### Формы и валидация

- Formik
- Yup

### Backend-as-a-Service

- Firebase Authentication
- Firebase Google Authentication
- Firebase Realtime Database

### Инструменты и деплой

- Create React App
- ESLint через react-scripts
- Prettier configuration
- GitHub Actions
- GitHub Pages

## Архитектура

Приложение построено как client-side React SPA. Firebase используется как backend-сервис для авторизации и хранения данных.

```text
User Interface
  └── React pages и reusable components
        ├── Home page
        ├── Teachers catalogue
        ├── Favorites page
        └── Auth / trial lesson modals

State Management
  └── Redux Toolkit slices
        ├── auth
        ├── teachers
        └── favorites

Data Layer
  └── Firebase SDK
        ├── Firebase Authentication
        ├── Google sign-in provider
        └── Realtime Database

Deployment
  └── GitHub Actions
        └── Build and deploy to GitHub Pages
```

В проекте нет отдельного REST API или собственного backend-сервера. Данные загружаются напрямую из Firebase Realtime Database, а авторизация работает через Firebase Authentication. Для MVP или небольшого прототипа это нормальная архитектура, но проект нужно честно описывать как Firebase-backed SPA, а не как полноценную fullstack-платформу.

## Screenshots

### Главная страница

![Главная страница LearnLingo](assets/screenshots/home-desktop.png)

### Каталог преподавателей с фильтрами

![Каталог преподавателей с фильтрами](assets/screenshots/teachers-filters-desktop.png)

### Раскрытая карточка преподавателя с отзывами

![Карточка преподавателя с отзывами](assets/screenshots/teacher-card-expanded.png)

### Модальное окно авторизации

![Модальное окно авторизации](assets/screenshots/auth-modal.png)

### Страница избранного

![Страница избранного](assets/screenshots/favorites-authenticated.png)

### Форма заявки на пробный урок

![Форма заявки на пробный урок](assets/screenshots/trial-lesson-modal.png)

### Мобильная версия каталога

![Мобильная версия каталога](assets/screenshots/teachers-mobile.png)

## Installation

Склонировать репозиторий:

```bash
git clone https://github.com/turboboyd/LearnLingo.git
cd LearnLingo
```

Установить зависимости:

```bash
npm install
```

## Environment Setup

Создай `.env` файл в корне проекта:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Сейчас Firebase Realtime Database URL прописан в `src/server/firebaseConfig.js`. Для более чистой production-конфигурации его лучше тоже вынести в environment variable:

```env
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
```

## Локальный запуск

Запуск dev server:

```bash
npm start
```

Запуск lint:

```bash
npm run lint:js
```

Production build:

```bash
npm run build
```

## API / Backend Description

Проект использует Firebase как Backend-as-a-Service вместо собственного backend-сервера.

### Authentication

Авторизация реализована через Firebase Authentication:

- регистрация через email/password
- вход через email/password
- Google sign-in
- logout
- восстановление текущего пользователя при загрузке приложения

### Database

Firebase Realtime Database используется для:

- загрузки преподавателей из `teachers/`
- хранения избранных преподавателей пользователя в `favorites/{userId}`

Логическая модель данных:

```text
teachers/
  teacherId/
    name
    surname
    languages[]
    levels[]
    rating
    reviews[]
    price_per_hour
    lessons_done
    lesson_info
    conditions[]

favorites/
  userId/
    teacherId/
      teacher data snapshot
```

Для более серьёзной production-версии лучше хранить в избранном только ID преподавателей, а не копировать весь объект преподавателя. Отдельный backend можно добавить позже для бронирований, платежей, админки, логов и модерации.

## Структура проекта

```text
src/
  components/          Переиспользуемые UI- и feature-компоненты
  hooks/               Custom hooks для auth, teachers, favorites, filters и pagination
  images/              Иконки, SVG и статические assets
  pages/               Страницы уровня маршрутов: Home, Teachers, Favorites
  redux/               Redux Toolkit slices, async thunks, selectors и reducers
  server/              Firebase-конфигурация и экспорт Firebase-сервисов
  utils/               Общие константы и визуальная конфигурация
  index.js             Точка входа React-приложения
  index.css            Глобальные стили
  variables.css        CSS variables
```

Важные части:

- `components/TeacherCard/` — карточка преподавателя: avatar, stats, info, levels, favorite button, CTA на trial lesson.
- `components/Form/` — формы авторизации и пробного урока с валидацией.
- `redux/auth/` — состояние Firebase authentication.
- `redux/teacher/` — загрузка каталога преподавателей.
- `redux/favorite/` — управление избранными преподавателями.
- `hooks/` — переиспользуемая логика, вынесенная из компонентов.

## Business Use Case

LearnLingo — это MVP маркетплейса для онлайн-изучения языков. Подобная система может быть полезна для:

- онлайн-школ языков
- сетей частных преподавателей
- tutoring agencies
- EdTech-стартапов, которые проверяют marketplace-идею
- малых бизнесов, которым нужен быстрый Firebase-based MVP

Основной user flow:

1. Пользователь заходит на landing page.
2. Пользователь открывает каталог преподавателей.
3. Пользователь фильтрует преподавателей под свои цели.
4. Пользователь смотрит карточку, отзывы, цену и уровни.
5. Пользователь авторизуется.
6. Пользователь сохраняет преподавателей в избранное.
7. Пользователь оставляет заявку на пробный урок.

## Почему проект технически интересен

Этот проект сильнее обычной статической landing page, потому что в нём есть:

- client-side routing
- protected routes
- Firebase Authentication
- Google OAuth sign-in
- чтение и запись данных в базу
- глобальное состояние через Redux Toolkit
- custom hooks
- валидируемые формы
- modal workflows
- фильтрация каталога
- пользовательские persisted data
- автоматический деплой через GitHub Actions

Это практические навыки, которые часто нужны на фрилансе, в MVP для стартапов и на junior+/middle frontend-позициях.

## Production-oriented notes

Что уже выглядит production-oriented:

- Firebase config берётся из environment variables
- Есть GitHub Actions workflow для build/deploy
- Есть protected route для приватной страницы
- Формы валидируются через схемы
- Часть логики вынесена в hooks и Redux async thunks

Что стоит улучшить перед сильной презентацией:

- Вынести `databaseURL` в environment variable
- Добавить `.env.example`
- Сделать нормальные loading и empty states для teachers/favorites
- Обработать ситуацию `snapshot.val() === null`
- Добавить UI для ошибок Firebase-запросов
- Хранить в favorites только teacher IDs, а не полные объекты
- Перейти на TypeScript или усилить PropTypes
- Добавить unit tests для hooks, reducers и validation schemas
- Документировать Firebase Security Rules
- Улучшить accessibility модалок и форм
- Добавить screenshots и live demo link в верх README
- Обновить версии GitHub Actions

## Future Improvements

- Сохранение заявок на trial lesson в Firebase
- Admin panel для управления преподавателями
- Детальная страница преподавателя
- Поиск по имени преподавателя или ключевым словам
- Сортировка по рейтингу, цене и популярности
- Календарное бронирование уроков
- Email notifications для заявок
- Prototype payment integration
- User profile settings
- Internationalization
- TypeScript migration
- Test coverage через React Testing Library
- Firebase Security Rules и emulator setup
- CI pipeline с lint, tests и build verification

## Repository Status

Этот репозиторий лучше презентовать как frontend marketplace MVP на React и Firebase. Не стоит позиционировать его как полностью готовую production-платформу с платежами, админкой и реальным booking workflow, пока эти функции не реализованы.
