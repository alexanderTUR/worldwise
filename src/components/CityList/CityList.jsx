import styles from './CityList.module.css';

import { Spinner } from '../Spinner/Spinner.jsx';
import { CityItem } from '../CityItem/CityItem.jsx';
import { Message } from '../Message/Message.jsx';
import { useCities } from '../../contexts/CitiesContext.jsx';

export const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return <Message message='Add your first city plase!' />;
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};
