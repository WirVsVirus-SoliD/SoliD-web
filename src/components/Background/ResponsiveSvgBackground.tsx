import React from "react";
import classnames from "classnames";
import { useWindowSize } from "~/lib/hooks";

type Props = {
  children: React.ReactNode;
  height: number;
  width: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * We sometimes use SVGs to visually upgrade certain screens of our app.
 * However, each user device may have a different screen size. Since we are using SVGs
 * we can simply resize them based on the device's screen size.
 *
 * This component takes care of the resizing and makes sure the SVGs width-to-height ratio is met.
 * The background is fixed to the bottom by default unless custom classNames have been passed as props.
 *
 * @param props.height The SVG's default height defined in its `viewBox` prop.
 * @param props.width The SVG's default width defined in its `viewBox` prop.
 * @param props.children The content of the SVG excluding the `<svg />` tag.
 */
const ResponsiveSvgBackground = ({
  children,
  height,
  width,
  className,
  ...rest
}: Props) => {
  const size = useWindowSize();
  const backgroundRatio = width / height;
  const svgHeight = size.width / backgroundRatio;
  const css = classnames({ "fixed bottom-0 left-0": !className });

  return (
    <div className={css} {...rest}>
      <svg
        width={size.width}
        height={svgHeight}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
};

export default ResponsiveSvgBackground;
