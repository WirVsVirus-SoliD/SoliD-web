import classnames from "classnames";
import React, { useState } from "react";
import { Minus, Plus } from "react-feather";

type Props = {
  min?: number;
  max?: number;
  steps: number;
  initialValue?: number;
  renderValue?: (value: number) => React.ReactNode;
  className?: string;
  onChange?: (value: number) => void;
  onBlur?: () => void;
};

const StepCalculator = ({
  min = -Infinity,
  max = Infinity,
  steps,
  initialValue,
  className,
  renderValue,
  onChange,
  onBlur
}: Props) => {
  const css = classnames("flex items-stretch text-center", className);
  const [value, setValue] = useState(initialValue);
  const decrease = () => {
    const v = Math.max(min, value - steps);
    setValue(v);
    onChange?.(v);
  };
  const increase = () => {
    const v = Math.min(max, value + steps);
    setValue(v);
    onChange?.(v);
  };
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
        <input
          className="w-full text-center"
          value={value}
          onChange={(e) => {
            const val = e.currentTarget.value.replace(",", ".");
            const float = parseFloat(val);
            setValue(float);
            onChange?.(float);
          }}
          onBlur={onBlur}
          type="number"
          step="0.01"
          min={min}
        />
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
