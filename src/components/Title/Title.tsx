import React from "react";
import classnames from "classnames";
import BaseTitle, { Props as BaseTitleProps } from "./BaseTitle";

export type Props = BaseTitleProps & {
  bold?: boolean;
};

const Title = ({ bold, className, ...rest }: Props) => {
  const css = classnames("font-title", { "font-extrabold": bold }, className);

  return <BaseTitle className={css} {...rest} />;
};

export default Title;
