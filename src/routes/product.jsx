import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Minus,
  Plus,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import OptionColor from "../components/OptionColor";
import OptionSize from "../components/OptionSize";
import { useState } from "react";
import GalleryImage from "../components/GalleryImage";
import ProductDetail from "../components/ProductDetail";
import RatingStars from "../components/RatingStars";
import { Rating } from "@mui/material";

export default function Product() {
  const location = useLocation();
  const product = location.state.product;
  const category = product.category;
  const unformattedCategory = getUnformattedCategory(category);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewing, setReviewing] = useState(false);
  const [overallRating, setOverallRating] = useState(0);

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

  function handleWriteReviewClick() {
    setReviewing(!reviewing);
  }

  function handleOverallRatingClick(e) {
    setOverallRating(e.target.value);
  }

  function handleCloseModal() {
    setReviewing(false);
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
      <div className="product__rating-and-reviews">
        <div className="product__rating-large">
          <div className="product__rating-stars-large">
            <Rating
              name={product.id}
              defaultValue={0}
              value={product.rating.rate}
              precision={0.25}
              size="large"
              sx={{ color: "black" }}
              readOnly
            />
            <p className="product__rating-value-large">{product.rating.rate}</p>
          </div>
          <div className="product__review-count-large">
            <p>Based on {product.rating.count} reviews</p>
          </div>
        </div>
        <div className="product__write-a-review">
          <button onClick={handleWriteReviewClick}>Write a Review</button>
        </div>
        <div className="product__reviews">
          <div className="product__review">
            <div className="product__review-main">
              <div className="product__reviewer">
                <p className="product__reviewer-username">username</p>
                <div className="product__reviewer-verified">
                  <p>Verified Buyer</p>
                  <Check width="16px" />
                </div>
              </div>
              <Rating defaultValue={5} sx={{ color: "black" }} readOnly />
              <div className="product__review-content">
                <p className="product__review-title">Review Title</p>
                <p className="product__review-body">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit
                  amet consectetur adipiscing elit quisque faucibus ex.
                  Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
                </p>
              </div>
              <div className="product__review-rec">
                <p className="product__review-rec-label">
                  Recommends this product:{" "}
                  <span className="product__review-rec-value">Yes</span>
                </p>
              </div>
            </div>
            <div className="product__review-details">
              <p className="product__review-date">
                x days/weeks/months/years ago
              </p>
              <div className="product__review-helpful">
                <p className="product___review-helpful-label">Helpful?</p>
                <div className="product__review-helpful-buttons">
                  <button className="product__review-helpful-button">
                    <p>Yes</p>
                    <ThumbsUp width="18px" />
                    <p>21</p>
                  </button>
                  <button className="product__review-helpful-button">
                    <p>No</p>
                    <ThumbsDown width="18px" />
                    <p>1</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reviewing && (
        <div className="product__write-review-overlay">
          <div className="product__write-review">
            <div className="product__close-write-review">
              <button onClick={handleCloseModal}>
                <X color="gray" />
              </button>
            </div>
            <div className="product__review-form-heading">
              <h1>Share your thoughts</h1>
            </div>
            <form className="product__review-form">
              <div className="product__review-form-section">
                <label htmlFor="overall-rating">Overall Rating</label>
                <Rating
                  name="overall-rating"
                  value={overallRating}
                  onChange={handleOverallRatingClick}
                  size="large"
                  sx={{ color: "black" }}
                />
              </div>
              <div className="product__review-form-section">
                <label htmlFor="title">Review Title</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="product__review-form-section">
                <label htmlFor="body">Review</label>
                <textarea name="body" id="body" rows={6}></textarea>
              </div>
              <div className="product__review-form-section">
                <p>Would you recommend this product to a friend?</p>
                <div className="product__review-buttons">
                  <label htmlFor="recs-yes">
                    <input type="radio" id="recs-yes" name="recs" value="yes" />
                    Yes
                  </label>
                  <label htmlFor="recs-no">
                    <input type="radio" id="recs-no" name="recs" value="no" />
                    No
                  </label>
                </div>
              </div>
              <div className="product__review-form-section">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="product__review-form-section">
                <p>Are you a verified buyer? (Click yes)</p>
                <div className="product__review-buttons">
                  <label htmlFor="verified-yes">
                    <input
                      type="radio"
                      id="verified-yes"
                      name="verified"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label htmlFor="verified-no">
                    <input
                      type="radio"
                      id="verified-no"
                      name="verified"
                      value="no"
                    />
                    No
                  </label>
                </div>
              </div>
              <button className="product__review-form-submit">
                Post Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
