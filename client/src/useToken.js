import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const deleteToken = () => {
    localStorage.clear();
    setToken(null);
  };

  return {
    setToken: saveToken,
    deleteToken,
    token
  }
}