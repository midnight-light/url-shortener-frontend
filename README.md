# URL Shortener And Preview

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
