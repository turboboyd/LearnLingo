import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  return user.email ? <Element {...rest} /> : <Navigate to="/" />;
};


export default PrivateRoute;
