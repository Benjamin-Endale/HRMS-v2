import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const ProgressRate = ({
  rating,
  max = 5,
  height = "h-[0.3125rem]",
  rounded = "rounded-[1.875rem]",
  low,
  high,
  medium,
}) => {

    const percentage = Math.min((rating / max) * 100, 100);

  const getColor = (low,medium,high) => {
    if (percentage < 50) return low;
    if (percentage < 80) return medium;
    return high;
  };

  return (
    <div className="font-semibold">
      {/* Progress bar container */}
      <div className={clsx("w-full bg-limegray overflow-hidden", height, rounded)} role="progressbar" aria-valuenow={rating} aria-valuemin={0} aria-valuemax={max}>
        {/* Progress fill */}
        <div className={clsx(height, getColor(low,medium,high), "transition-all duration-500", rounded)} style={{ width: `${percentage}%` }}/>
      </div>
    </div>
  );
};

ProgressRate.propTypes = {
  rating: PropTypes.number.isRequired,
  maxEmp: PropTypes.number,
  height: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string,
    low: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired
};
