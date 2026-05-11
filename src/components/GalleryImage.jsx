export default function GalleryImage({ product, imageNumber, currentImage, setCurrentImage }) {
  const current = imageNumber === currentImage ? true : false;

  function handleClick() {
    setCurrentImage(imageNumber);
  }

  return (
    <div className={`product__gallery-image ${current ? "current" : ""}`}>
      <button onClick={handleClick}>
        <img src={product.image} alt="" />
      </button>
    </div>
  );
}
