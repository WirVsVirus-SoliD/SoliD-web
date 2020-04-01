import React from "react";
import { LogoIcon, LogoWithText } from "./components";

type Props = { size?: number | string; withText?: boolean } & React.SVGProps<
  SVGSVGElement
>;

/**
 * Our logo has two versions. One with text, the other without.
 */
const Logo = ({ size, withText = false, ...rest }: Props) => {
  if (withText) {
    return <LogoWithText height={size} {...rest} />;
  } else {
    return <LogoIcon size={size} {...rest} />;
  }
};

export default Logo;
