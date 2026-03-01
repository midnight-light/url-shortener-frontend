export const isDevelopment = (): boolean => {
  return import.meta.env.NODE_ENV === 'development';
};
