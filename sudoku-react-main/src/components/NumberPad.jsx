const NumberPad = ({ handleInput, selected, counts }) => {
  const handleClick = (value) => {
    if (!selected) return;
    const [rIdx, cIdx] = selected;
    handleInput(rIdx, cIdx, value);
  };

  return (
    <div style={{ marginTop: 12 }} className="number-btn">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handleClick(num.toString())}
          disabled={counts[num] >= 9}
        >
          {num}
        </button>
      ))}
      <button onClick={() => handleClick("")}>x</button>
    </div>
  );
};

export default NumberPad;
