const baseUrl = `${process.env.URL_API_BACKEND}:${process.env.PORT}`;

export const api = `${baseUrl}/api/${process.env.VERSION}`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};