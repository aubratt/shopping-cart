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
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import OptionSize from "../components/OptionSize";
import { useEffect, useState } from "react";
import GalleryImage from "../components/GalleryImage";
import ProductDetail from "../components/ProductDetail";
import RatingStars from "../components/RatingStars";
import { Rating } from "@mui/material";
import { getProducts } from "../products";

export default function Product() {
  const { loading, setLoading, error, setError, products, setProducts } =
    useOutletContext();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [options, setOptions] = useState({
    color: "black",
    size: "",
    quantity: 1,
  });
  const [quantity, setQuantity] = useState(1);
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState({
    rating: "",
    title: "",
    body: "",
    recommends: "",
    verified: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const colors = [
    "black",
    "gray",
    "white",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
  ];
  const sizes = ["xs", "s", "m", "l", "xl", "2xl", "3xl"];
  const shipping = `All orders are processed and shipped from our fulfillment 
  center in California, Monday through Friday, with the exception of public US 
  holidays. Domestic and international orders over $100 ship for FREE. 
  International orders ship via Passport (Taxes and Duties still apply). Express
  shipping is available for an additional fee.`;
  const returnsExchanges = `For hygienic reasons, earrings, underwear, socks,
  headwear, and hair accessories cannot be returned or exchanged. All
  sale/discounted items are FINAL SALE and cannot be returned/exchanged. All 
  other full-price items are eligible to be returned or exchanged for free. `;

  useEffect(() => {
    if (!productId) return;

    const fetchProductData = async () => {
      try {
        const productData = await getProducts(
          `https://fakestoreapi.com/products/${productId}`,
        );
        const categoryMap = {
          electronics: "electronics",
          jewelery: "jewelry",
          "men's clothing": "men",
          "women's clothing": "women",
        };
        const formattedProduct = {
          ...productData,
          category: categoryMap[productData.category] || productData.category,
          reviews: [],
        };

        setProduct(formattedProduct);
        setError(null);
      } catch (error) {
        setError(error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

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

  function handleAddToCart(e) {
    e.preventDefault();
  }

  function handleWriteReviewClick() {
    setReviewing(!reviewing);
  }

  function handleCloseModal() {
    setReviewing(false);
    setReview({
      rating: "",
      title: "",
      body: "",
      recommends: "",
      verified: "",
      name: "",
    });
    setErrors({});
  }

  function handleReviewInputChange(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name] && e.target.value.trim())
      setErrors({ ...errors, [e.target.name]: null });
  }

  function handleReviewFormSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    Object.entries(review).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Please fill out this field";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newReview = {
        ...review,
        date: new Date().toISOString(),
        id: crypto.randomUUID(),
      };

      setReviewing(false);
      setProduct({ ...product, reviews: [...product.reviews, newReview] });
    }
  }

  function getTimeSince(date) {
    const diff = Date.now() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product">
      <div className="product__breadcrumbs">
        <Link to="/shop/all" className="product__breadcrumb">
          All
        </Link>
        <ChevronRight />
        <Link to={`/shop/${product.category}`} className="product__breadcrumb">
          {capitalizeString(product.category)}
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
          <form onSubmit={handleAddToCart} className="product__options">
            <div className="product__option">
              <div className="product__selected-option">
                <p className="product__option-label">Color:</p>
                <p>{capitalizeString(options.color)}</p>
              </div>
              <div className="product__options-color">
                {colors.map((color) => {
                  const selected = options.color === color;
                  return (
                    <div
                      key={color}
                      className={`product__option-color ${selected ? "selected" : ""}`}>
                      <label htmlFor={color}>
                        <input
                          onChange={(e) =>
                            setOptions({ ...options, color: e.target.value })
                          }
                          type="radio"
                          id={color}
                          name="color"
                          value={color}
                          style={{ backgroundColor: color }}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product__option">
              <div className="product__selected-option">
                <p className="product__option-label">Size:</p>
                <p>{options.size.toUpperCase()}</p>
              </div>
              <div className="product__options-size">
                {sizes.map((size) => {
                  const selected = options.size === size;
                  return (
                    <div
                      key={size}
                      className={`product__option-size ${selected ? "selected" : ""}`}>
                      <label htmlFor={size}>
                        <input
                          onChange={(e) =>
                            setOptions({ ...options, size: e.target.value })
                          }
                          type="radio"
                          id={size}
                          name="size"
                          value={size}
                        />
                        {size.toUpperCase()}
                      </label>
                    </div>
                  );
                })}
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
                <button type="submit">Add to Cart</button>
              </div>
            </div>
          </form>
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
          {Object.keys(product.reviews).length === 0 && (
            <div className="product__no-reviews">
              <p>No written reviews</p>
            </div>
          )}
          {product.reviews.map((review) => {
            console.log(review);
            return (
              <div key={review.id} className="product__review">
                <div className="product__review-main">
                  <div className="product__reviewer">
                    <p className="product__reviewer-username">{review.name}</p>
                    {review.verified === "yes" && (
                      <div className="product__reviewer-verified">
                        <p>Verified Buyer</p>
                        <Check width="16px" />
                      </div>
                    )}
                  </div>
                  <Rating
                    defaultValue={review.rating}
                    sx={{ color: "black" }}
                    readOnly
                  />
                  <div className="product__review-content">
                    <p className="product__review-title">{review.title}</p>
                    <p className="product__review-body">{review.body}</p>
                  </div>
                  <div className="product__review-rec">
                    <p className="product__review-rec-label">
                      Recommends this product:{" "}
                      <span className="product__review-rec-value">
                        {capitalizeString(review.recommends)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="product__review-details">
                  <p className="product__review-date">
                    {getTimeSince(review.date)}
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
            );
          })}
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
            <form
              onSubmit={handleReviewFormSubmit}
              className="product__review-form">
              <div className="product__review-form-section">
                <label htmlFor="overallRating">Overall Rating</label>
                <Rating
                  onChange={handleReviewInputChange}
                  name="rating"
                  size="large"
                  sx={{ color: "black" }}
                />
                {errors.rating && (
                  <span className="product__review-form-error">
                    {errors.rating}
                  </span>
                )}
              </div>
              <div className="product__review-form-section">
                <label htmlFor="title">Review Title</label>
                <input
                  onChange={handleReviewInputChange}
                  type="text"
                  id="title"
                  name="title"
                />
                {errors.title && (
                  <span className="product__review-form-error">
                    {errors.title}
                  </span>
                )}
              </div>
              <div className="product__review-form-section">
                <label htmlFor="body">Review</label>
                <textarea
                  onChange={handleReviewInputChange}
                  name="body"
                  id="body"
                  rows={6}></textarea>
                {errors.body && (
                  <span className="product__review-form-error">
                    {errors.body}
                  </span>
                )}
              </div>
              <div className="product__review-form-section">
                <p>Would you recommend this product to a friend?</p>
                <div className="product__review-buttons">
                  <label htmlFor="recs-yes">
                    <input
                      onChange={handleReviewInputChange}
                      type="radio"
                      id="recs-yes"
                      name="recommends"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label htmlFor="recs-no">
                    <input
                      onChange={handleReviewInputChange}
                      type="radio"
                      id="recs-no"
                      name="recommends"
                      value="no"
                    />
                    No
                  </label>
                  {errors.recommends && (
                    <span className="product__review-form-error">
                      {errors.recommends}
                    </span>
                  )}
                </div>
              </div>
              <div className="product__review-form-section">
                <p>Are you a verified buyer? (Click yes)</p>
                <div className="product__review-buttons">
                  <label htmlFor="verified-yes">
                    <input
                      onChange={handleReviewInputChange}
                      type="radio"
                      id="verified-yes"
                      name="verified"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label htmlFor="verified-no">
                    <input
                      onChange={handleReviewInputChange}
                      type="radio"
                      id="verified-no"
                      name="verified"
                      value="no"
                    />
                    No
                  </label>
                  {errors.verified && (
                    <span className="product__review-form-error">
                      {errors.verified}
                    </span>
                  )}
                </div>
              </div>
              <div className="product__review-form-section">
                <label htmlFor="name">Your Name</label>
                <input
                  onChange={handleReviewInputChange}
                  type="text"
                  id="name"
                  name="name"
                />
                {errors.name && (
                  <span className="product__review-form-error">
                    {errors.name}
                  </span>
                )}
              </div>
              <button type="submit" className="product__review-form-submit">
                Post Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
