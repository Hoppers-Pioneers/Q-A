import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";

type StyleSelectorProps = {
  currentItem:{
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
  selectedStyle:{
    style_id: number;
    name: string;
    original_price: string;
    sale_price:string;
    "default?": boolean;
    photos: {
      thumbnail_url: string;
      url: string;
    }[];
    skus: {
      [value:string]:{
        quantity:number;
        size: string;
      }
    }
  }
  setSelectedStyle: (value: style) => void;
}

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

const StyleSelector = ({ currentItem, selectedStyle, setSelectedStyle }:StyleSelectorProps) => {
  const [styles, setStyles] = useState([]);

  // Hook to set style based on current item
  useEffect(() => {
    const id = currentItem.id;
    if (id !== 0) {
      axios
        .get(
          `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${currentItem.id}/styles`,
          {
            headers: {
              Authorization: import.meta.env.VITE_AUTH_TOKEN,
            },
          }
        )
        .then((response) => {
          setStyles(response.data.results);
          setSelectedStyle(response.data.results[0]);
        })
        .catch((error) => {
          console.log("ERROR GETTING PRODUCT STYLES:::::::::::", error);
        });
    }
  }, [currentItem]);

  // Event handler for setting style when clicking styles
  const handleStyleClick = (style:style) => {
    if (selectedStyle !== style) {
      setSelectedStyle(style);
    }
  }

  return (
    <div className="styleSelectorContainer">
      <div className="styleText">
        <p className="styleArrow">{"Style  >"}</p>
        <p className="selectedStyle">{selectedStyle.name}</p>
      </div>
      <div className="styleThumbnails">
        {styles.map((style: style, index) => {
          return (
            <div style={{position: 'relative'}} key={index}>
              <img
                className="styleThumbnail"
                onClick={() => handleStyleClick(style)}
                src={style.photos[0].thumbnail_url}
                alt={style.name}
              />
              {selectedStyle === style && (
                <CheckCircleOutlineIcon
                  style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'transparent'}}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StyleSelector;