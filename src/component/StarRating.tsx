import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const starArray = [...Array(5).keys()].map((i) => i + 1);

const StarRating = ({ value }: { value: number | undefined | null }) => {
  return (
    <>
      {starArray.map((i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={value! >= i ? 'orange' : 'lightgrey'}
        />
      ))}
    </>
  );
};

export default StarRating;
