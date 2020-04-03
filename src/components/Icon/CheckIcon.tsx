import React from "react";

type Props = {
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

/**
 * The `CheckIcon` component is a custom-made icon used for checklist-style information.
 * Its purpose is to stand out and provide additional visibility to the user.
 * Therefore, use this component only for presentational purposes, not interactive ones.
 */
const CheckIcon = ({ size = 24, ...rest }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle opacity="0.3" cx="13" cy="10" r="8" fill="#199057" />
      <path
        d="M16.59 7.58L10 14.17L6.41 10.59L5 12L10 17L18 9L16.59 7.58ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill="#444444"
      />
    </svg>
  );
};

export default CheckIcon;
