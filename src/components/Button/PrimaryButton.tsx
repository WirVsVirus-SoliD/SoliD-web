import classnames from "classnames";
import React from "react";
import BaseButton, { Props as BaseButtonProps } from "./BaseButton";

type Props = {
  theme?: "flat" | "border";
} & Omit<BaseButtonProps, "pill">;

const PrimaryButton = ({ theme = "flat", className, ...rest }: Props) => {
  const css = classnames(
    "border-brand",
    {
      "bg-brand text-white": theme === "flat",
      "text-brand": theme === "border"
    },
    className
  );

  return <BaseButton className={css} pill {...rest} />;
};

export default PrimaryButton;
