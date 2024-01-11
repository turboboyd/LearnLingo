import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoading,
  selectStatus,
  selectError,
  selectIsAuthCheck,
} from '../redux/auth/authSelectors';

const useAuth = () => {
  const user = useSelector(selectUser);
  const IsAuthCheck = useSelector(selectIsAuthCheck);
  const isLoading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return {
    user,
    IsAuthCheck,
    isLoading,
    status,
    error,
  };
};

export default useAuth;
