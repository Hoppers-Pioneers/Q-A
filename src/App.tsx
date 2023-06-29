import { useState, useEffect }  from 'react';
import Overview from './components/overview/Overview';
import Questions from './components/questions/Questions';
import RatingsAndReviews from './components/ratings/RatingsAndReviews';
import Related from './components/related/Related';
import axios from 'axios';

const App = () => {
  const [currentItem, setCurrentItem] = useState({});

  const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/'
  const config = {
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN
    }
  }

  useEffect(() => {
    axios.get(endpoint + 'products', config)
    .then((results) => setCurrentItem(results.data[2]))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      {/* <Overview/> */}
      <Related current={currentItem}/>
      {/* <Questions itemId={currentItem.id}/> */}
      {/* <RatingsAndReviews/> */}
    </div>
  );
};

export default App;