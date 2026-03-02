import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          {
            'border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900': variant === 'default',
            'border border-gray-300 bg-transparent dark:border-gray-700': variant === 'outline',
            'bg-gray-50 dark:bg-gray-800/50': variant === 'ghost',
            'transition-shadow hover:shadow-md': hoverable,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
});

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return <Component ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />;
  },
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props} />;
  },
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
});

CardContent.displayName = 'CardContent';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />;
});

CardFooter.displayName = 'CardFooter';
