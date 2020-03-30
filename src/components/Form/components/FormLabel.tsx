import classNames from "classnames";
import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
  block?: boolean;
} & React.HTMLProps<HTMLLabelElement>;

const FormLabel = ({
  children,
  title,
  className,
  block = false,
  ...labelProps
}: Props) => {
  const css = classNames(
    {
      "inline-block": !className && !block,
      block
    },
    className
  );

  return (
    <label className={css} {...labelProps}>
      <div className="block">
        <span className="inline-block ml-1 font-medium">{title}</span>
      </div>
      {children}
    </label>
  );
};

export default FormLabel;
