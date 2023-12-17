import styles from './AppLayout.module.css';

import { Sidebar } from '../../components/Sidebar/Sidebar.jsx';
import { Map } from '../../components/Map/Map.jsx';
import { User } from '../../components/User/User.jsx';

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};
