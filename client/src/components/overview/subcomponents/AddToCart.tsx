import { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
type AddToCartProps = {
  skus: {
    [value:string]: {
      quantity: number
      size: string;
    }
  }
}
const AddToCart = ({skus}:AddToCartProps) => {
  const [availableSizes, setAvailableSizes] = useState<(number | string)[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("Select a Size");
  // state to find quantity based on selectedSize
  const [selectedItem, setSelectedItem] = useState<{quantity: number,size: string} | undefined>(undefined);
  const [availableQuantitiesArray, setAvailableQuantitiesArray] = useState<number[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("");
  const [showSizeWarning, setShowSizeWarning] = useState<boolean>(false);
  const [starFilled, setStarFilled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);


  // define func to handle add to cart btn click
  const handleAddToCart = () => {
    // if no size selected, show size warning
    if (selectedSize === "Select a Size") {
      setShowSizeWarning(true);
    } else {
      setShowModal(true);
    }
  }

  //  helper function that checks if all sizes out of stock for conditionally rendering Add To Cart button
  const allOutOfStock = Object.values(skus).every((sku) => {
    return sku.quantity === 0;
  })


  // -------------------------- HOOKS ------------------------------------
  // create array of available sizes
  useEffect(() => {
    const sizes:(number | string)[]= [];
    Object.values(skus).forEach((sku) => {
      // only list sizes currently in stock
      if (sku.quantity > 0) {
        sizes.push(sku.size);
      }
    });
    setAvailableSizes(sizes);
  }, [skus]);

  // find available quantities based on size's sku
  useEffect(() => {
    if (selectedSize === "Select a Size") {
      setSelectedItem(undefined);
    } else {
      // find item in skus object that's size property matches selected size
      const item = Object.values(skus).find((sku) => {
        return sku.size === selectedSize;
      })
      setSelectedItem(item);
    }
  }, [selectedSize, skus])

  // create array of available qty's
  useEffect(() => {
    // turn off show size warning when selectedSize ∆s
    if (showSizeWarning === true) {
      setShowSizeWarning(false);
    }

  if (selectedItem) {
    // create variable set to the lesser of total quantity and 15
    const availableQuantity = Math.min(selectedItem.quantity, 15)
    // create range of available quantities array
    const quantities = [];
    // iterate available quantity number of times
    for (let i = 0; i < availableQuantity; i++) {
      // push index plus one to array
      quantities.push(i+1);
  }
  setAvailableQuantitiesArray(quantities);
  }

  }, [selectedSize])



  {/* --------------------SIZE SELECTOR-------------------- */}
  return (
    <div className="addToCartContainer">
      {/* if showSizeWarning is true (ie selectedSize equals "Select a Size", then render a warning element */}
      {showSizeWarning && <p>Please select size</p>}
      <div className="selectors">
        <select
          className="sizeSelector"
          value={selectedSize}
          onChange={(e) => {
            const size = e.target.value;
            setSelectedSize(size);
          }}
          disabled={allOutOfStock}
        >
          {/* disable "Select a Size" option after a size is selected */}
          <option disabled={selectedSize !== "Select a Size"}>Select a Size</option>
          {/* is allOutOfStock? */}
          {allOutOfStock ? (
            // if yes, then only value is "OUT OF STOCK"
            <option value="OUT OF STOCK">OUT OF STOCK</option>
          ) : (
                // else, map available sizes
                availableSizes.map((size, index) => {
                  return <option key={index} value={size}>{size}</option>
                })
              )}
        </select>


        {/* --------------------QUANTITY SELECTOR-------------------- */}
        <select
          className="quantitySelector"
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}
          disabled={!selectedItem}
        >
          {/* did user select an item? */}
          {!selectedItem ? (
            // if no, then only option is "-"
            <option value="-">-</option>
          ) : (
            // if yes, then map available qty's
            availableQuantitiesArray.map((quantity, index) => (
              <option key={index} value={quantity}>{quantity}</option>
            ))
          )}
        </select>
      </div>
      <div className="addToCartBtns">
        <button
          className="addToCartButton"
          onClick={handleAddToCart}
          style={{display: allOutOfStock ? 'none': 'block'}}
        >
          Add to Cart
        </button>

        <button
          className="starButton"
          onClick={() => setStarFilled(!starFilled)}
        >
          {starFilled ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Checkout</h2>
            <p>Selected Size: {selectedSize}</p>
            <p>Selected Quantity: {selectedQuantity}</p>

            <form className='form'>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                Email:
                <input type="text" name="email" />
              </label>
              <label>
                Address:
                <input type="text" name="Address" />
              </label>
            </form>

            <button>Next</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddToCart;