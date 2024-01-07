import { Link } from 'react-router-dom';
import { HOME_ROUTE, TEACHERS_ROUTE, FAVORITES_ROUTE } from 'utils/const';

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={HOME_ROUTE}>Home</Link>
        </li>
        <li>
          <Link to={TEACHERS_ROUTE}>Teachers</Link>
        </li>
      </ul>
    </nav>
  );
}
