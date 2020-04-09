import React from "react";
import classNames from "classnames";

type Props = {
  children?: string;
  block?: boolean;
} & Omit<React.HTMLProps<HTMLInputElement>, "type">;

const Radio = ({
  className,
  children,
  block = false,
  ...inputProps
}: Props) => {
  return (
    <label
      className={classNames(
        "radio select-none",
        block ? "block" : "inline-block",
        className
      )}
    >
      <input type="radio" {...inputProps} className="h-0 w-0" />
      <span className="pr-2">{children}</span>
    </label>
  );
};

export default Radio;
