import css from './HeroBackground.module.css';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';



export default function HeroBackground() {

  const randomStyle = useSelector(selectRandomStyle);
  return (
    <div
      className={`${css.wrap_img} ${css[randomStyle.name]} ${css.wrap_img} `}
      style={{ backgroundColor: randomStyle.background }}
    ></div>
  );
}
