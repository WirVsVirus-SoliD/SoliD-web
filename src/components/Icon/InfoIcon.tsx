import React from "react";

type Props = {
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

/**
 * The `InfoIcon` component is a custom-made icon used to grab
 * the attention of the user to display specific information.
 * Its purpose is to stand out and provide additional visibility to the user.
 * Therefore, use this component only for presentational purposes, not interactive ones.
 */
const InfoIcon = ({ size = 32, ...rest }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63616 23.3638 2.66663 16 2.66663C8.63616 2.66663 2.66663 8.63616 2.66663 16C2.66663 23.3638 8.63616 29.3333 16 29.3333Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21.3333V16"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10.6666H16.0133"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfoIcon;
