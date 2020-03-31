import classnames from "classnames";
import React from "react";
import BaseButton, { Props as BaseButtonProps } from "./BaseButton";

type Props = {
  theme?: "flat" | "border";
} & BaseButtonProps;

const PrimaryButton = ({ theme = "flat", className, ...rest }: Props) => {
  const css = classnames(
    "border-primary-light hover:border-brand focus:bg-secondary-dark focus:border-secondary-dark",
    {
      "bg-primary-light hover:bg-brand text-white": theme === "flat",
      "text-primary-light hover:bg-brand hover:text-white focus:text-white":
        theme === "border"
    },
    className
  );

  return <BaseButton className={css} {...rest} />;
};

export default PrimaryButton;
