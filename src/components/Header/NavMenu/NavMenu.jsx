import { NavLink } from 'react-router-dom';
import { FAVORITES_ROUTE, HOME_ROUTE, TEACHERS_ROUTE } from 'utils/const';
import css from './NavMenu.module.css';
import useAuth from 'hooks/useAuth';
import { selectRandomStyle } from '../../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

export default function NavMenu() {
  const randomStyle = useSelector(selectRandomStyle);
  const { IsAuthCheck } = useAuth();

  return (
    <nav>
      <ul className={css.list_nav}>
        {!IsAuthCheck && (
          <li>
            <NavLink
              to={HOME_ROUTE}
              style={{ '--activeColor': randomStyle.btn }}
            >
              Home
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to={TEACHERS_ROUTE}
            style={{ '--activeColor': randomStyle.btn }}
          >
            Teachers
          </NavLink>
        </li>
        {IsAuthCheck && (
          <li>
            <NavLink
              to={FAVORITES_ROUTE}
              style={{ '--activeColor': randomStyle.btn }}
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
