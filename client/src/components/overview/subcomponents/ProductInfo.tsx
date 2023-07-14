import axios from "axios";
import { useEffect, useState } from "react";
import { Rating as Star} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type style = {
  style_id: number;
  name: string;
  original_price: string;
  sale_price:string;
  "default?": boolean;
  photos: {
    thumbnail_url: string;
    url: string;
  }[];
  skus: object
};
type ProductInfoType = {
  currentItem: {
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
  };
  itemArray: {
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
  }[];
  selectedStyle: style;
  id: number;
}

const ProductInfo = ({ itemArray, selectedStyle, id, currentItem }:ProductInfoType) => {
  // state for number of reviews
  const [totalReviews, SetTotalReviews] = useState(0);
  const [ stars, setStars ] = useState(0);
  // state for

  // check for selected style
  const originalPrice = selectedStyle ?
    // if there's a selected style, then original price is the original price
    selectedStyle.original_price :
    // if no selected style, check if there's a selected item at all
    itemArray[0] ?
      // if yes, then original price is the default price for the first style
      itemArray[0].default_price :
      // if not, the original price is 0
      0;
  // conditionally render sale price if it's not 0
  const salePrice = selectedStyle && selectedStyle.sale_price !== "0" ? selectedStyle.sale_price : null;

  useEffect(() => {
    if (id !== 0) {
      axios
        .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta',
        {
          headers: {
            Authorization: import.meta.env.VITE_AUTH_TOKEN,
          },
          params: {
            "product_id": id
          }
        }
      )
      .then((response) => {
          const ratingsObject = response.data.ratings;
          let numberOfReviews = 0;
          for (const rating in ratingsObject) {
            numberOfReviews += parseInt(ratingsObject[rating]);
          }
          SetTotalReviews(numberOfReviews);
          let count = 0;
          let total = 0;
          for (let i = 1; i < 6; i++) {
            count += parseInt(ratingsObject[i]);
            total += i * parseInt(ratingsObject[i]);
          }
          setStars(total/count);
        })
      .catch((error) => {
        console.log("ERROR GETTING REVIEWS:::::::::::", error);
      });
    }
  }, [id]);

  return (
    <div className="productInfoContainer">
      <div className="reviews">
        <Star
          name="text-feedback"
          value={stars}
          readOnly
          precision={0.25}
          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
        />
        <p
          className="reviewsLink"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
          Read all {totalReviews} reviews
        </p>
      </div>
      {itemArray.length > 0 && (
        <>
          <p className="category">{currentItem.category}</p>
          <h1 className="productName">{currentItem.name}</h1>
          {/* check if product is on sale */}
          {salePrice ? (
            <>
              <p className="price" style={{color: 'red'}}>{salePrice}</p>
              <p className="originalPrice" style={{textDecoration: 'line-through'}}>{originalPrice}</p>
            </>
          ) : (
            <p className="price">{originalPrice}</p>
          )}
        </>
      )}
    </div>
  )
}

export default ProductInfo;