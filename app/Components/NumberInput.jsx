import React, { useState } from "react";

const NumberInput = ({
  min = 0,
  max = 5,
  step = 1,
  defaultValue = 1,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleIncrease = () => {
    if (value < max) {
     const newValue = Math.max(min, parseFloat((value + step).toFixed(1)));
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
     const newValue = Math.min(max, parseFloat((value - step).toFixed(1)));
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex flex-col">

      <button
        type="button"
        className=""
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase value"
      >

        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33366 10L8.00033 6L12.667 10" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
        type="button"
        className=""
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease value"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6663 6L7.99967 10L3.33301 6" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </button>

    </div>
  );
};

export default NumberInput;
