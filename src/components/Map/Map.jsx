import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Map = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      Position: {lat}, {lng}
      <button onClick={() => setSearchParams({ lat: 10, lng: 20 })}>
        Change
      </button>
    </div>
  );
};
