import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  return user.email ? <Navigate to="/teachers" /> : <Element {...rest} />;
};

export default AuthRoute;
