import React from "react";
import { Logo } from "~/components/Logo";
import { useWindowSize } from "~/lib/hooks";

type Props = {};

// ratio of background svg (reference: viewBox prop): width / height
const BACKGROUND_RATIO = 360 / 201;
const LOGO_DEFAULT_WIDTH = 40;
// The logo is designed for a base screen width
const LOGO_BASE_SCREEN_WIDTH = 360;

/**
 * The splash screen is shown when the app starts on a mobile device.
 */
const SplashScreen = ({}: Props) => {
  const size = useWindowSize();
  const height = size.width / BACKGROUND_RATIO;
  const logoRatio = Math.max(size.width / LOGO_BASE_SCREEN_WIDTH, 1);
  // The bottom background counts as "taken" space.
  // We therefore want to pull the main part up using the negative margin trick,
  // to make sure it appears vertically centered.
  const MarginStyles = { marginTop: -height };
  console.log({ logoRatio });
  return (
    <>
      <div className="flex items-center h-full">
        {/* Logo and subtitle */}
        <div className="w-full text-center" style={MarginStyles}>
          <Logo
            size={logoRatio * LOGO_DEFAULT_WIDTH}
            withText
            className="mx-auto mb-4 md:mb-8"
          />
          <p className="text-brand sm:text-lg md:text-2xl">
            Landwirt*innen und <br /> Helfer*innen verbinden.
          </p>
        </div>
      </div>

      {/* Bottom background */}
      <div className="fixed bottom-0 left-0">
        <svg
          width={size.width}
          height={height}
          viewBox="0 0 360 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M207 0C146.2 0 50.6667 16 0 24V322H496V16C454.333 10.6667 267.8 0 207 0Z"
            fill="#DCB38E"
          />
          <path
            d="M160 58C81.6 58 24.3333 79.3333 -5 95V282H473V52C458.333 62.6667 374.2 81 339 81C295 81 258 58 160 58Z"
            fill="#94E1AE"
          />
          <path
            opacity="0.5"
            d="M217 89C138.6 89 21.3333 110.333 -8 126V330H477C484.2 330 480 165.667 477 89C462.333 99.6667 397.2 111 362 111C318 111 315 89 217 89Z"
            fill="#197649"
          />
        </svg>
      </div>
    </>
  );
};

export default SplashScreen;
