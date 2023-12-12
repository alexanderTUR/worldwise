import styles from './AppNav.module.css';
import { NavLink } from 'react-router-dom';

export const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to='cities'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink
            to='countries'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
