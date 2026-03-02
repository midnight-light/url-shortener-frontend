import { type ShortenUrlResponse } from '../api/url-shortener.schemas';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { CheckIcon, CopyIcon } from '@/components/icons';

interface UrlCardProps {
  data: ShortenUrlResponse;
  className?: string;
  onCopy?: (url: string) => void;
  onVisit?: (url: string) => void;
  onBack?: () => void;
}

export const UrlCard: React.FC<UrlCardProps> = ({ data, className, onCopy, onVisit, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      onCopy?.(data.shortUrl);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [data.shortUrl, onCopy]);

  const handleVisit = useCallback(() => {
    window.open(data.originalUrl, '_blank', 'noopener,noreferrer');
    onVisit?.(data.originalUrl);
  }, [data.originalUrl, onVisit]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <Card className={cn('overflow-hidden', className)} hoverable>
      {data.image && !imageError && (
        <div className="h-sm relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800 md:h-48">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle className="line-clamp-2" as="h3">
          {data.title}
        </CardTitle>
        {data.description && <CardDescription className="line-clamp-3">{data.description}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Оригинальный URL
          </p>
          <a
            href={data.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm text-primary-600 hover:underline dark:text-primary-400"
            title={data.originalUrl}
          >
            {data.originalUrl}
          </a>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Сокращенный URL
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
              {data.shortUrl}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
              aria-label="Копировать сокращенный URL"
            >
              {copied ? (
                <>
                  <CheckIcon className="mr-1 h-4 w-4" />
                  Скопировано
                </>
              ) : (
                <>
                  <CopyIcon className="mr-1 h-4 w-4" />
                  Копировать
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="secondary" size="sm" onClick={onBack} className="flex-1">
          Назад
        </Button>
        <Button variant="primary" size="sm" onClick={handleVisit} className="flex-1">
          Открыть оригинал
        </Button>
      </CardFooter>
    </Card>
  );
};

UrlCard.displayName = 'UrlCard';
