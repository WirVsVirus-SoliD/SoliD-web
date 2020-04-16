import React from "react";
import { ResponsiveSvgBackground } from "~/components/Background";
import { ResponsiveLandingTitle } from "./components";

/**
 * The splash screen is shown when the app starts on a mobile device.
 */
const SplashScreen = () => {
  return (
    <>
      <div className="relative z-10 flex items-center h-full">
        {/* Logo and subtitle */}
        <ResponsiveLandingTitle withSpinner={true} />
      </div>
      {/* Bottom background */}
      <ResponsiveSvgBackground width={360} height={201}>
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
      </ResponsiveSvgBackground>
    </>
  );
};

export default SplashScreen;
