import { useSelector } from 'react-redux';
import {
  selectTeachers,
  selectIsLoading,
  selectStatus,
  selectError,
} from '../redux/teacher/teacherSelectors.js';

const useTeachers = () => {
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return {
    teachers,
    isLoading,
    status,
    error,
  };
};

export default useTeachers;
