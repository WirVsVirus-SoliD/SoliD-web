import classnames from "classnames";
import React from "react";
import BaseButton, { Props as BaseButtonProps } from "./BaseButton";

type Props = {
  theme?: "flat" | "border";
} & Omit<BaseButtonProps, "pill">;

const DangerButton = ({ theme = "flat", className, ...rest }: Props) => {
  const css = classnames(
    "border-red-600",
    {
      "bg-red-600 text-white": theme === "flat",
      "text-red-600": theme === "border"
    },
    className
  );

  return <BaseButton className={css} pill {...rest} />;
};

export default DangerButton;
