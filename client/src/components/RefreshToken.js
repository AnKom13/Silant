import { useEffect, useState } from 'react';
import { updateAuthToken, updatePermissions } from '../authReducer';
import { useDispatch } from 'react-redux';
import { API_DJANGO }  from '../api/config'
import axios from 'axios';

export default function RefreshToken({ onTokenRefreshed }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = async () => {
      const refresh = localStorage.getItem('refreshToken');

      if (refresh) {
        try {
          const response = await axios.post(`${API_DJANGO}token/refresh/`, {
            refresh: refresh,
          });

          const newToken = response.data.access;

          try {
            const response = await axios.post(`${API_DJANGO}get-user`, {
              access: newToken
            });

            const permission = response.data;
            dispatch(updatePermissions(permission))

          } catch (error) {
            console.error(error);
          }

          dispatch(updateAuthToken(newToken));
          localStorage.setItem('authToken', newToken);
          onTokenRefreshed();
          setIsError(false);
        } catch (error) {
          console.error('Произошла ошибка при обновлении токена:', error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        onTokenRefreshed();
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, 59 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, onTokenRefreshed]);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return null;
};

