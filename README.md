# URL Shortener And Preview

## ⚠️ Важное замечание
---------------------------------------------------
Для корректной работы фронтенда необходимо поднять докер контейнер с бэкендом:

https://github.com/midnight-light/url-shortener-backend
---------------------------------------------------

## Быстрый старт

```
npm install

# добавить url api бэкенда
cp .env.example .env

npm run dev
```

## Ключевые особенности

- Feature Based архитектура
- Фреймвор: React 19 + Vite
- Данные: Axios + TanStack Query
- Валидация: Zod + React Hook Forms
- Стили: Tailwind

## Структура проекта

```│
├── src/
│   ├── main.tsx                # Точка входа
│   │
│   ├── app/                    # App-level конфигурация
│   │   ├── App.tsx             # Корневой компонент
│   │   │
│   │   ├── providers/          # Глобальные провайдеры
│   │   │   ├── providers-wrapper.tsx
│   │   │   └── query-provider.tsx
│   │   │
│   │   └── api/                # API конфигурация
│   │       ├── api.config.ts   # Base URL, endpoints
│   │       ├── api.types.ts    # Shared API types
│   │       ├── instance.ts     # Axios instance factory
│   │       ├── interceptors.ts # Request/Response interceptors
│   │       ├── query-client.ts # TanStack Query config
│   │       └── utils/
│   │           └── api-error-handler.ts
│   │
│   ├── features/               # Feature modules
│   │   └── url-shortener/
│   │       ├── api/
│   │       │   ├── url-shortener.api.ts      # REST API запросы
│   │       │   ├── url-shortener.queries.ts  # React Query hooks
│   │       │   └── url-shortener.schemas.ts  # Zod schemas + types
│   │       │
│   │       └── components/
│   │           ├── url-shortener-form.tsx
│   │           └── url-card.tsx
│   │
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── card.tsx
│   │   │
│   │   └── icons/              # SVG icons
│   │
│   ├── shared/                 # Shared utilities
│   │   └── utils/
│   │       └── feature-flag.ts
│   │
│   ├── utils/                  # Common utilities
│   │   └── cn.ts               # className merger
│   │
│   └── index.css               # Global styles + Tailwind
```

### Валидация через Zod схемы

```ts
import { z } from 'zod';

export const ShortenUrlRequestSchema = z.object({
  url: z.string().url('Неверный формат URL'),
  forceRefresh: z.boolean().optional(),
});

export const ShortenUrlResponseSchema = z.object({
  originalUrl: z.string().url(),
  title: z.string(),
  description: z.string(),
  shortUrl: z.string(),
  image: z.string().url(),
});

export type ShortenUrlRequest = z.infer<typeof ShortenUrlRequestSchema>;
export type ShortenUrlResponse = z.infer<typeof ShortenUrlResponseSchema>;
```
