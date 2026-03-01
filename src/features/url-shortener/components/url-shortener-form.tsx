import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useShortenUrl } from '../api/url-shortener.queries';
import { ShortenUrlRequestSchema } from '../api/url-shortener.schemas';
import type { ShortenUrlRequest } from '../api/url-shortener.schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { isApiErrorWithStatus } from '../../../app/api/utils/api-error-handler';

interface ErrorState extends Record<string, string> {}
export const UrlShortenerForm = () => {
  const { mutate, isPending, error } = useShortenUrl();
  const [errorMessage, setErrorMessage] = useState<ErrorState | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShortenUrlRequest>({
    resolver: zodResolver(ShortenUrlRequestSchema),
    mode: 'onChange',
    defaultValues: {
      url: '',
      forceRefresh: false,
    },
  });

  const onSubmit = (data: ShortenUrlRequest) => {
    mutate(data, {
      onSuccess: () => reset(),
      onError: (error: unknown) => {
        if (isApiErrorWithStatus(error, 400)) {
          setErrorMessage({ url: 'Запрещенный URL' });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-md flex-col gap-4" noValidate>
      <Input
        label="URL для сокращения"
        type="url"
        placeholder="https://example.com"
        error={errors.url?.message}
        disabled={isPending}
        {...register('url')}
      />

      <Button type="submit" disabled={isPending} isLoading={isPending} className="w-full">
        Получить карточку
      </Button>
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage?.url || 'Произошла ошибка при обработке запроса'}
        </div>
      )}
    </form>
  );
};

UrlShortenerForm.displayName = 'UrlShortenerForm';
