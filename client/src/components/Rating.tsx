import { Rating as Star } from '@mui/material';
import { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import Request from './related/Request';

function Rating({ item }) {
  const [ stars, setStars ] = useState(0);
  useEffect(() => {
    if (item !== undefined && item.id !== undefined) {
      Request.getRatings(item.id).then((res) => {
        const data = res.data.ratings;
        let count = 0;
        let total = 0;
        for (let i = 1; i < 6; i++) {
          count += parseInt(data[i]);
          total += i * parseInt(data[i]);
        }
        setStars(total/count);
      })
    }
  }, [item]);

  return ( <Star
    name="text-feedback"
    value={stars}
    readOnly
    precision={0.25}
    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
  /> );
}

export default Rating;