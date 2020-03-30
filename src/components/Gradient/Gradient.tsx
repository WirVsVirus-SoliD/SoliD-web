import classnames from "classnames";
import React from "react";
import "./Gradient.css";

type Props = {
  block?: boolean;
  height: number | string;
  direction?: "top-bottom" | "right-left";
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * We may want to show a small gradient using css, e.g. when having a smooth transition
 * to our map.
 */
const Gradient = ({
  block,
  className,
  height,
  style,
  direction = "top-bottom",
  ...rest
}: Props) => {
  const css = classnames(
    {
      "w-full block": block,
      "gradient-white-transparent": direction === "top-bottom",
      "gradient-white-transparent-rtl": direction === "right-left"
    },
    className
  );
  const styles = { ...style, height };

  return <div className={css} style={styles} {...rest} />;
};

export default Gradient;
