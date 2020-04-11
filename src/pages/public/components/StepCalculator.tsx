import React, { useState } from "react";
import classnames from "classnames";
import { Plus, Minus } from "react-feather";

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
  const decrease = () => setValue(value - steps <= min ? min : value - steps);
  const increase = () => setValue(value + steps >= max ? max : value + steps);
  const reachedMin = value === min;
  const reachedMax = value === max;

  return (
    <div className={css}>
      <button
        className={classnames(
          "flex-grow border border-r-0 rounded-l-full text-white py-1",
          {
            "border-brand-light bg-brand-light": reachedMin,
            "border-brand bg-brand": !reachedMin
          }
        )}
        onClick={decrease}
        disabled={reachedMin}
      >
        <Minus size={16} className="mx-auto" />
      </button>
      <div className="flex flex-grow items-center border border-brand py-1 text-sm font-medium">
        <span className="w-full text-center">
          {renderValue?.(value) ?? value}
        </span>
      </div>
      <button
        className={classnames(
          "flex-grow border border-l-0 rounded-r-full text-white py-1",
          {
            "border-brand-light bg-brand-light": reachedMax,
            "border-brand bg-brand": !reachedMax
          }
        )}
        onClick={increase}
        disabled={reachedMax}
      >
        <Plus size={16} className="mx-auto" />
      </button>
    </div>
  );
};

export default StepCalculator;
