import React from "react";
import classnames from "classnames";
import BaseTitle, { Props as BaseTitleProps } from "../Title/BaseTitle";

type Props = BaseTitleProps;

const FormTitle = ({ className, ...rest }: Props) => {
  const css = classnames("text-base", className);

  return <BaseTitle className={css} {...rest} />;
};

export default FormTitle;
