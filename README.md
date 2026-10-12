# Monster Coffee

Сайт сети кофеен в колледжах: заказ заранее, живая очередь, отзывы, контакты.
Фронт на Vite + React, бэкенд пишется как serverless-функции Vercel в папке `api/`.

## Запуск

```bash
npm install
npm run dev        # только фронт, http://localhost:5173
npm run build      # сборка в dist/
npm run preview    # посмотреть сборку локально
```

Чтобы локально работали и фронт, и `/api`, нужен Vercel CLI:

```bash
npm i -g vercel
vercel dev         # http://localhost:3000, фронт + функции
```

## Деплой на Vercel

1. Залить репозиторий на GitHub.
2. В Vercel: Add New → Project → выбрать репозиторий.
3. Framework определится как Vite, остальное уже прописано в `vercel.json`. Жмём Deploy.

После деплоя проверка: `https://<проект>.vercel.app/api/health` должен вернуть `{"ok":true,...}`.

## Структура

```
api/                 серверные функции, каждый файл = эндпоинт
  health.js          GET /api/health
public/assets/menu/  фото напитков
src/
  App.jsx            вся логика: состояние, корзина, очередь, формы
  data.js            демо-данные (точки, меню, отзывы, FAQ)
  icons.js           иконки
  lib/api.js         fetch-обёртка для запросов к /api
  components/        шапки, нижний таббар, шторки, тосты
  pages/             экраны: главная, меню, очередь, отзывы, связь, вход, профиль
  styles.css         цветовые токены (светлая/тёмная тема), анимации, hover-состояния
```

## Как подключать бэкенд

1. Создать функцию, например `api/menu.js`:

   ```js
   export function GET() {
     return Response.json([/* позиции меню */])
   }
   ```

   Для POST экспортируется `POST(request)`, тело читается через `await request.json()`.

2. На фронте вызвать её через `api()` из `src/lib/api.js`:

   ```js
   import { api } from './lib/api.js'
   const menu = await api('/menu')
   await api('/orders', { method: 'POST', body: { items, pointId } })
   ```

3. Сейчас данные берутся из `src/data.js`, а сеть имитируется таймерами в `App.jsx`
   (`startLoad`, `submitAuth`, `submitFb`, `placeOrder`, `tick`). Эти места и нужно заменить на запросы.

Секреты (ключ БД и т.п.) кладутся в Vercel → Settings → Environment Variables,
в функциях читаются из `process.env`. Локально можно положить их в `.env.local`, он в `.gitignore`.
Переменные с префиксом `VITE_` попадают во фронт, поэтому секреты так называть нельзя.
