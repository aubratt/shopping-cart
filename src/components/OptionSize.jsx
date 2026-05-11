export default function OptionSize({ size, selectedSize, setSelectedSize }) {
  const selected = size === selectedSize ? true : false;

  function handleClick() {
    setSelectedSize(size);
  }

  return (
    <button onClick={handleClick} className={`product__option-size ${selected ? "selected" : ""}`}>
      <p>{size}</p>
    </button>
  );
}
