import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

import { Logo } from '../Logo/Logo.jsx';
import { AppNav } from '../AppNav/AppNav.jsx';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          WorldWise &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
