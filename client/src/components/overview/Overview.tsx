import ProductInfo from "./subcomponents/ProductInfo";
import ProductOverview from "./subcomponents/ProductOverview";
import ImgGallery from "./subcomponents/ImgGallery";
import StyleSelector from "./subcomponents/StyleSelector";
import AddToCart from "./subcomponents/AddToCart";
import { useState } from "react";

type OverviewProps = {
  itemArray: {
    id: number;
    name: string;
    slogan: string;
    description: string;
    category: string;
    default_price: string;
    features: {
      feature: string;
      value: string;
    }[];
  }[] | string;
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
};

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
  skus: {
    [value:string]:{
      quantity:number;
      size: string;
    }
  }
}
const defaultStyle = {
  style_id: 1,
  name: "Loading . . .",
  original_price: "0",
  sale_price: "0",
  "default?": false,
  photos: [
    {
      thumbnail_url: "",
      url: ""
    }
  ],
  skus: {},
};

const Overview = ({
  itemArray,
  currentItem,
}: OverviewProps) => {
  const [selectedStyle, setSelectedStyle] = useState<style>(defaultStyle);

  return (
    <div className="container">
      <div className="centeringContainer">
        <div className="topContainer">
          <ImgGallery selectedStyle={selectedStyle} />
          <div className="topRightContainer">
            <ProductInfo
              itemArray={itemArray}
              selectedStyle={selectedStyle}
              id={currentItem.id}
              currentItem={currentItem}
            />
            <StyleSelector
              currentItem={currentItem}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
            <AddToCart skus={selectedStyle.skus} />
          </div>
        </div>
        <div className="bottomContainer">
          <ProductOverview
            slogan={currentItem.slogan}
            description={currentItem.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;