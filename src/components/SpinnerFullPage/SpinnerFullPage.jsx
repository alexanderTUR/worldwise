import styles from './SpinnerFullPage.module.css';

import Spinner from '../Spinner/Spinner.jsx';

export const SpinnerFullPage = () => {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
};
