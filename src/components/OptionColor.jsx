export default function OptionColor({
  color,
  selectedColor,
  setSelectedColor,
}) {
  const selected = color === selectedColor ? true : false;

  function handleClick() {
    setSelectedColor(color);
  }

  return (
    <button
      onClick={handleClick}
      className={`product__option-color ${selected ? "selected" : ""}`}>
      <div
        style={{
          backgroundColor: color,
        }}></div>
    </button>
  );
}
