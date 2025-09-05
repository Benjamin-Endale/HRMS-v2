import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const ProgressDashTraining = ({
  attended,
  max,
  height = "h-[0.3125rem]",
  rounded = "rounded-[1.875rem]",
  low,
  high,
  medium,
  percentage
}) => {

  const getColor = (low,medium,high) => {
    if (attended <= max*0.25) return low;
    if (attended <= max*0.5) return medium;
    return high;
  };

  return (
    <div className="font-semibold">
      {/* Progress bar container */}
      <div className={clsx("w-full bg-limegray overflow-hidden", height, rounded)} role="progressbar" aria-valuenow={attended} aria-valuemin={0} aria-valuemax={max}>
        {/* Progress fill */}
        <div className={clsx(height, getColor(low,medium,high), "transition-all duration-500", rounded)} style={{ width: `${(attended/max)*100}%` }}/>
      </div>
    </div>
  );
};

ProgressDashTraining.propTypes = {
  attended: PropTypes.number.isRequired,
  max: PropTypes.number,
  height: PropTypes.string,
  rounded: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
    low: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired
};
