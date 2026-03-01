import { useState } from 'react';
import { useShortenUrl } from '../api/url-shortener.queries';
import { Button } from '@/components/ui/button';

export const UrlShortenerForm = () => {
  const { mutate, isPending } = useShortenUrl();

  const [url, setUrl] = useState<string>('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (url: string) => {
    mutate({ url });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4">
      <input className="input" onChange={handleUrlChange} value={url} />
      <Button onClick={() => handleSubmit(url)} disabled={isPending} isLoading={isPending}>
        Получить карточку
      </Button>
    </div>
  );
};
