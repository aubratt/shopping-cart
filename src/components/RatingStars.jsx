import Rating from "@mui/material/Rating";

export default function RatingStars({ product }) {
  return (
    <div className="product__rating-stars">
      <Rating
        name={product.id}
        defaultValue={0}
        value={product.rating.rate}
        precision={0.25}
        sx={{ color: "black" }}
        readOnly
      />
    </div>
  );
}
