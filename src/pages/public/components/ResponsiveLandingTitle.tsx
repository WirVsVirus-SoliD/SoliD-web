import React from "react";
import classnames from "classnames";
import { useWindowSize } from "~/lib/hooks";
import { Logo } from "~/components/Logo";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// ratio of background svg (reference: viewBox prop): width / height
const BACKGROUND_RATIO = 360 / 201;
const LOGO_DEFAULT_WIDTH = 40;
// The logo is designed for a base screen width
const LOGO_BASE_SCREEN_WIDTH = 360;

/**
 * The brand's word mark and a subtitle shown on landing pages.
 * The logo's and title's size are automatically adapting to the screen size
 * and are placed on the middle of the screen in relation to the background's height.
 */
const ResponsiveLandingTitle = ({ className, style, ...rest }: Props) => {
  const size = useWindowSize();
  const height = size.width / BACKGROUND_RATIO;
  const logoRatio = Math.max(size.width / LOGO_BASE_SCREEN_WIDTH, 1);
  // The bottom background counts as "taken" space.
  // We therefore want to pull the main part up using the negative margin trick,
  // to make sure it appears vertically centered.
  const styles = { marginTop: -height, ...style };

  return (
    <div
      className={classnames("w-full text-center", className)}
      style={styles}
      {...rest}
    >
      <Logo
        size={logoRatio * LOGO_DEFAULT_WIDTH}
        withText
        className="mx-auto mb-4 md:mb-8"
      />
      <p className="text-brand sm:text-lg md:text-2xl">
        Landwirt*innen und <br /> Helfer*innen verbinden.
      </p>
    </div>
  );
};

export default ResponsiveLandingTitle;
