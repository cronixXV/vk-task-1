# Infinite Movie List

## Описание

Проект представляет собой бесконечный список популярных фильмов, загружаемых с публичного API. Реализована плавная подгрузка данных при скролле, а также возможность локального редактирования и удаления элементов. Этот проект разработан с использованием TypeScript, React, MobX, CSS-модулей и библиотеки компонентов Material UI.

## Функциональные возможности

Получение данных с сервера: Загружаются популярные фильмы с публичного API (TMDB API).
Бесконечный скролл: Элементы подгружаются постепенно при прокрутке страницы.
Локальное редактирование и удаление: Возможность локально редактировать и удалять элементы из списка с использованием MobX для управления состоянием.
Покрытие тестами: Компоненты и функциональность покрыты unit-тестами с использованием Jest и React Testing Library.

## Технологии
React + TypeScript: Библиотека для построения пользовательских интерфейсов, используя строгую типизацию TypeScript для надежности кода.
MobX: Библиотека для управления состоянием, обеспечивающая наблюдаемость состояния и реактивные обновления.
CSS-модули: Стилизация с помощью CSS-модулей для изоляции стилей.
Material UI (MUI): UI-библиотека, обеспечивающая готовые компоненты и гибкость кастомизации. Выбрана для ускорения разработки,минималистичного дизайна, а также за счет самого большого коммьюнити и понятной и подробной документации.
Jest и React Testing Library: Покрытие unit-тестами всех компонентов и ключевой логики приложения.

## Установка и запуск

Клонирование репозитория:

git clone https://github.com/cronixXV/vk-task-1
cd vk-task-1
Установка зависимостей:

npm install
Запуск приложения:

npm start

Запуск тестов:

npm run test

API и аутентификация
Проект использует публичное API для получения списка популярных фильмов. Если API требует аутентификации, необходимо создать файл .env и добавить переменные окружения VITE_API_KEY и VITE_BASE_URL.

Пример .env:

VITE_API_KEY=your_api_key_here
VITE_BASE_URL=https://api.example.com

Тестирование
Каждый компонент приложения покрыт unit-тестами, которые проверяют отображение, редактирование и удаление элементов. Тесты написаны с использованием Jest и React Testing Library.

Примечание
Список фильмов поддерживает локальное редактирование и удаление элементов, но изменения не отправляются на сервер. Это обеспечивает быстрое взаимодействие с данными и удобство редактирования без необходимости работы с серверными запросами.
