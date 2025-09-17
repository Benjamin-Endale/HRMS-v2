import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const ProgressDashPerformance = ({
  attended,
  maxEmp,
  height = "h-[0.3125rem]",
  rounded = "rounded-[1.875rem]",
  low,
  high,
  medium,
  percentage
}) => {

  const getColor = (low,medium,high) => {
    if (percentage < 50) return low;
    if (percentage < 80) return medium;
    return high;
  };

  return (
    <div className="font-semibold">
      {/* Progress bar container */}
      <div className={clsx("w-full bg-limegray overflow-hidden", height, rounded)} role="progressbar" aria-valuenow={attended} aria-valuemin={0} aria-valuemax={maxEmp}>
        {/* Progress fill */}
        <div className={clsx(height, getColor(low,medium,high), "transition-all duration-500", rounded)} style={{ width: `${percentage}%` }}/>
      </div>
    </div>
  );
};

ProgressDashPerformance.propTypes = {
  attended: PropTypes.number.isRequired,
  maxEmp: PropTypes.number,
  height: PropTypes.string,
  rounded: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
    low: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired
};
