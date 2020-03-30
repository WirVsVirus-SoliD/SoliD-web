import classnames from "classnames";
import React from "react";

export type Props = {
  children: React.ReactNode;
  block?: boolean;
  pill?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const BaseButton = ({
  children,
  className,
  block = false,
  pill = false,
  ...rest
}: Props) => {
  const css = classnames(
    "border-2 border-solid font-medium px-4 py-1",
    pill ? "rounded-full" : "rounded",
    {
      "w-full block": block
    },
    className
  );

  return (
    <button type="button" className={css} {...rest}>
      {children}
    </button>
  );
};

export default BaseButton;
