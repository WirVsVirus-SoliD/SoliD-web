import React from "react";

type Props = {
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

/**
 * The `BigCheckIcon` component is a custom-made icon used for checklist-style information.
 * Its purpose is to stand out and provide additional visibility to the user.
 * Therefore, use this component only for presentational purposes, not interactive ones.
 */
const BigCheckIcon = ({ size = 24, ...rest }: Props) => {
  return (
    <svg
      width="176"
      height="176"
      viewBox="0 0 176 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="88" cy="88" r="88" fill="#94E1AE" />
      <path
        d="M128 65L73 120L48 95"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BigCheckIcon;
