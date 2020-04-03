import classnames from "classnames";
import React from "react";

type Props = {
  borderless?: boolean;
  block?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input = ({
  className,
  type = "text",
  block = false,
  borderless = false,
  ...rest
}: Props) => {
  const css = classnames(
    "pt-2 pb-1 px-1 border-gray-400 focus:bg-gray-200 outline-none",
    { "w-full block": block },
    { "border-b-2": !borderless },
    className
  );

  return <input type={type} className={css} {...rest} />;
};

export default Input;
