export const isDevelopment = (): boolean => {
  return import.meta.env.MODE === 'development';
};
