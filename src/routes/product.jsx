import { ChevronDown, ChevronRight, Minus, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import OptionColor from "../components/OptionColor";
import OptionSize from "../components/OptionSize";
import { useState } from "react";
import GalleryImage from "../components/GalleryImage";
import ProductDetail from "../components/ProductDetail";
import RatingStars from "../components/RatingStars";

export default function Product() {
  const location = useLocation();
  const product = location.state.product;
  const category = product.category;
  const unformattedCategory = getUnformattedCategory(category);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const shipping = `All orders are processed and shipped from our fulfillment 
  center in California, Monday through Friday, with the exception of public US 
  holidays. Domestic and international orders over $100 ship for FREE. 
  International orders ship via Passport (Taxes and Duties still apply). Express
  shipping is available for an additional fee.`;
  const returnsExchanges = `For hygienic reasons, earrings, underwear, socks,
  headwear, and hair accessories cannot be returned or exchanged. All
  sale/discounted items are FINAL SALE and cannot be returned/exchanged. All 
  other full-price items are eligible to be returned or exchanged for free. `;

  function getUnformattedCategory(category) {
    if (category === "men") return "men's clothing";
    if (category === "women") return "women's clothing";
    if (category === "jewelry") return "jewelery";
    return category;
  }

  function capitalizeString(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  function handleMinusClick() {
    if (quantity > 1)
      setQuantity((prev) => {
        return prev - 1;
      });
  }

  function handlePlusClick() {
    setQuantity((prev) => {
      return prev + 1;
    });
  }

  return (
    <div className="product">
      <div className="product__breadcrumbs">
        <Link
          to="/shop/all"
          state={{ category: "all" }}
          className="product__breadcrumb">
          All
        </Link>
        <ChevronRight />
        <Link
          to={`/shop/${unformattedCategory}`}
          state={{ category: product.category }}
          className="product__breadcrumb">
          {capitalizeString(category)}
        </Link>
        <ChevronRight />
        <p>{product.title}</p>
      </div>
      <div className="product__info">
        <div className="product__media">
          <div className="product__gallery">
            <GalleryImage
              product={product}
              imageNumber={0}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
            <GalleryImage
              product={product}
              imageNumber={1}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
            <GalleryImage
              product={product}
              imageNumber={2}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
            <GalleryImage
              product={product}
              imageNumber={3}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          </div>
          <div className="product__current-image">
            <img src={product.image} alt="" />
          </div>
        </div>
        <div className="product__content">
          <div className="product__heading">
            <h1>{product.title}</h1>
            <div className="product__subheading">
              <p className="product__price">${product.price}</p>
              <div className="product__rating">
                <RatingStars product={product} />
                <p className="product__review-count">
                  {product.rating.count} Reviews
                </p>
              </div>
            </div>
          </div>
          <div className="product__option">
            <div className="product__selected-option">
              <p className="product__option-label">Color:</p>
              <p>{capitalizeString(selectedColor)}</p>
            </div>
            <div className="product__options-color">
              <OptionColor
                color="black"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="gray"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="white"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="red"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="orange"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="yellow"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="green"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="blue"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <OptionColor
                color="purple"
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>
          </div>
          <div className="product__option">
            <div className="product__selected-option">
              <p className="product__option-label">Size:</p>
              <p>{selectedSize}</p>
            </div>
            <div className="product__options-size">
              <OptionSize
                size="XS"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="S"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="M"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="L"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="XL"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="2XL"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
              <OptionSize
                size="3XL"
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
          </div>
          <div className="product__purchase-controls">
            <div className="product__quantity">
              <button onClick={handleMinusClick}>
                <Minus width="16px" />
              </button>
              <p>{quantity}</p>
              <button onClick={handlePlusClick}>
                <Plus width="16px" />
              </button>
            </div>
            <div className="product__add-to-cart">
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="product__details">
            <ProductDetail
              heading="Description"
              content={product.description}
            />
            <ProductDetail heading="Shipping" content={shipping} />
            <ProductDetail
              heading="Returns & Exchanges"
              content={returnsExchanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
