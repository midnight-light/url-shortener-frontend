import { useState } from 'react';
import { useShortenUrl } from '../api/url-shortener.queries';

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
    <div>
      <input onChange={handleUrlChange} value={url} />
      <button onClick={() => handleSubmit(url)} disabled={isPending}>
        {isPending ? 'Shortening...' : 'Shorten URL'}
      </button>
    </div>
  );
};
