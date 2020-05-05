import React from "react";

type Props = {
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

/**
 * The `SunIcon` component is a custom-made icon used for checklist-style information.
 * Its purpose is to stand out and provide additional visibility to the user.
 * Therefore, use this component only for presentational purposes, not interactive ones.
 */
const SunIcon = ({ size = 24, ...rest }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1V3"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21V23"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.21997 4.21997L5.63997 5.63997"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3601 18.3601L19.7801 19.7801"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 12H3"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H23"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.21997 19.7801L5.63997 18.3601"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3601 5.63997L19.7801 4.21997"
        stroke="#197649"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunIcon;
