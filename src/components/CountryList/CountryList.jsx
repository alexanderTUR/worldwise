import styles from './CountryList.module.css';

import { Spinner } from '../Spinner/Spinner.jsx';
import { Message } from '../Message/Message.jsx';
import { CountryItem } from '../CountryItem/CountryItem.jsx';

export const CountryList = ({ cities, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message='Add your first city plase!' />;
  }
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((item) => item.country).includes(city.country)) {
      return [
        ...acc,
        { country: city.country, id: city.id, emoji: city.emoji },
      ];
    } else {
      return acc;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};
