import { Circles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';

export default function Loader() {
  const randomStyle = useSelector(selectRandomStyle);
  const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  return (
    <Circles
      height="80"
      width="80"
      color={randomStyle.btn}
      ariaLabel="circles-loading"
      wrapperStyle={loaderStyle}
      wrapperClass=""
      visible={true}
    />
  );
}
