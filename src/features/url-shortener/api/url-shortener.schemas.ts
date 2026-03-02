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
