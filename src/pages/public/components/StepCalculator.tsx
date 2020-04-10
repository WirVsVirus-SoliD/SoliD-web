import React, { useState } from "react";
import classnames from "classnames";

type Props = {
  min?: number;
  max?: number;
  steps: number;
  initialValue?: number;
  renderValue?: (value: number) => React.ReactNode;
  className?: string;
};

const StepCalculator = ({
  min = -Infinity,
  max = Infinity,
  steps,
  initialValue,
  className,
  renderValue
}: Props) => {
  const css = classnames("flex items-stretch text-center", className);
  const [value, setValue] = useState(initialValue);
  const decrease = () => value >= min + steps && setValue(value - steps);
  const increase = () => value <= max - steps && setValue(value + steps);

  return (
    <div className={css}>
      <button
        className="flex-grow border-2 border-r-0 rounded-l-full border-brand bg-brand text-white py-1"
        onClick={decrease}
      >
        -
      </button>
      <div className="flex flex-grow items-center border-2 border-brand py-1 text-sm font-medium">
        <span className="w-full text-center">
          {renderValue?.(value) ?? value}
        </span>
      </div>
      <button
        className="flex-grow border-2 border-l-0 rounded-r-full border-brand bg-brand text-white py-1"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default StepCalculator;
