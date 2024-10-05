import React,
{
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

// Importaciones de hooks
import { useUserStore } from '../store/userStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Encargado de proteger las que deben tener Login
 *
 * @author Crhistian vargas
 * @version 1.0.0
*/
const ProtectedLoginRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Uso de useNavigate
  const navigate = useNavigate();
  const userToken = useUserStore((state) => state.token);
  useEffect(() => {
    if (!userToken) {
      navigate('/');
    }
  }, [userToken, navigate]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return userToken ? <>{children}</> : null;
};

/**
 * Encargado de proteger las que no deben tener Login
 *
 * @author crhistian Vargas
 * @version 1.0.0
*/
const ProtectedNoLoginRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Uso de useNavigate
  const navigate = useNavigate();
  const userToken = useUserStore((state) => state.token);
  const urlGoTo = useUserStore((state) => state.goTo);

  useEffect(() => {
    if (userToken) {
      if (urlGoTo) {
        return navigate(urlGoTo);
      }
      return navigate('/home');
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, navigate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return !userToken ? <>{children}</> : null;
};

export {
  ProtectedLoginRoute,
  ProtectedNoLoginRoute,
};
