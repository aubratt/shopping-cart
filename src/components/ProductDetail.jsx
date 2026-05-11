import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProductDetail({ heading, content }) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className="product__detail">
      <button onClick={handleClick} className="product__detail-heading">
        <h2>{heading}</h2>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="product__detail-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
