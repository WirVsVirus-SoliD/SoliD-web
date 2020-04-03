import React from "react";
import classnames from "classnames";

export type Props = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  block?: boolean;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const BaseTitle = ({
  as: Component = "h6",
  block,
  className,
  ...rest
}: Props) => {
  const css = classnames({ block }, className);

  return <Component className={css} {...rest} />;
};

export default BaseTitle;
