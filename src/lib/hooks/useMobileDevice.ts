import useMobileDetect from "use-mobile-detect-hook";

/**
 * We may need to render our interfaces differently based
 * on the user's device.
 * @returns `true` for mobile devices. `false` for other devices.
 */
export function useMobileDevice() {
  return useMobileDetect().isMobile();
}
