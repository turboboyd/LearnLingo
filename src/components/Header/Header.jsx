import { Link } from 'react-router-dom';
import css from './Header.module.css';
import sprite from 'images/InlineSprite.svg';
import NavMenu from './NavMenu/NavMenu';
import BtnAuth from './BtnAuth/BtnAuth';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.logo} to={'/'}>
        <svg className={css.icon}>
          <use xlinkHref={`${sprite}#ukraine`} />
        </svg>
        <p className={css.logo_title}>LearnLingo</p>
      </Link>
      <NavMenu />
      <BtnAuth />
    </header>
  );
}
