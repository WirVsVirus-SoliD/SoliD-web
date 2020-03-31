import classnames from "classnames";
import React from "react";
import Title, { Props as TitleProps } from "./Title";

type Props = {
  as?: TitleProps["as"];
} & Omit<TitleProps, "as">;

/**
 * The top title used during the boarding process.
 */
const BoardingTitle = ({ className, as = "h1", ...rest }: Props) => {
  const css = classnames("text-brand text-xl sm:text-2xl mb-2", className);

  return <Title as={as} className={css} {...rest} />;
};

export default BoardingTitle;
