export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return token;
};
