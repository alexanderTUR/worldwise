import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/useUrlPosition.js';
import { useCities } from '../../contexts/CitiesContext.jsx';

import { Button } from '../Button/Button.jsx';
import { BackButton } from '../BackButton/BackButton.jsx';
import { Message } from '../Message/Message.jsx';
import { Spinner } from '../Spinner/Spinner.jsx';

import { convertToEmoji } from '../../utils/convertToEmoji.js';
import { BASE_GEOCODE_URL } from '../../constants.js';

export const Form = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geoError, setGeoError] = useState('');
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);

  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();

  const hasLocation = lat && lng;

  useEffect(() => {
    if (!hasLocation) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeoData(true);
        setGeoError('');
        const response = await fetch(
          `${BASE_GEOCODE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            'That place is not a city! Click on a city to add a new trip.',
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoError(error.message);
      } finally {
        setIsLoadingGeoData(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate('/app/cities');
  };

  if (isLoadingGeoData) return <Spinner />;

  if (!hasLocation)
    return (
      <Message message='You need to select a city before adding a new trip.' />
    );

  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          showPopperArrow={false}
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
};
