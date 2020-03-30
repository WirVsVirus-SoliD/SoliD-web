import classnames from "classnames";
import React from "react";
import { Gradient } from "../Gradient";
import Pill from "./Pill";

type Props = {
  children: (PillComponent: typeof Pill) => React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * A list of pills with horizontal overflow. Therefore, any pills exceeding the
 * width of this list component will "fade out".
 */
const FadingPillList = ({ children, className, style, ...rest }: Props) => {
  const css = classnames(
    "relative overflow-hidden whitespace-no-wrap",
    className
  );
  const styles = { width: "calc(100% - 40px)", ...style };

  return (
    <div className={css} style={styles} {...rest}>
      {children(Pill)}
      <Gradient
        direction="right-left"
        height="100%"
        className="absolute top-0 right-0 w-32 z-10"
      />
    </div>
  );
};

export default FadingPillList;
