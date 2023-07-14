import { useState, useEffect } from "react";
import Overview from "./components/overview/Overview";
import Questions from "./components/questions/Questions";
import RatingsAndReviews from "./components/ratings/RatingsAndReviews";
import Related from "./components/related/Related";
import axios from "axios";

type item = {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: string,
  features: {
    feature: string;
    value: string;
  }[];
}

const defaultItem = {
  id: 0,
  name: "Loading . . . ",
  slogan: "Loading . . . ",
  description: "Loading . . . ",
  category: "Loading . . . ",
  default_price: "0",
  features: [],
};

const App = () => {
  const [currentItem, setCurrentItem] = useState<item>(defaultItem);
  const [allItems, setAllItems] = useState<item[]>([]);

  const endpoint = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/";
  const config = {headers: {Authorization: import.meta.env.VITE_AUTH_TOKEN}};

  useEffect(() => {
    // console.log(import.meta.env.VITE_.substr())
    axios
      .get(endpoint + "products", config)
      .then((results) => {
        const data = results.data[0];
        setCurrentItem(data);
        // console.log('CURRENT ITEM SET', results.data[0], currentItem)
        setAllItems(results.data);
      })
      .catch((err) => console.log("APP GET ERROR:::::", err));
  }, []);

  useEffect(() => {
    axios.get(endpoint + 'products', config)
    .then((results) => setCurrentItem(results.data[2]))
    .catch((err) => console.log(err))
  },[])

  if(Object.keys(currentItem).length < 1) {
    return (
      // could use a loading spinner
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Overview
        itemArray={allItems}
        currentItem={currentItem}
        description={currentItem.description}
        slogan={currentItem.slogan}
        id={currentItem.id}
        setCurrentItem={setCurrentItem}
      />
      <Related setCurrent={setCurrentItem} current={currentItem}/>
      <Questions itemId={currentItem.id} />

      <RatingsAndReviews itemId={currentItem.id}/>
    </div>
  );
};

export default App;
