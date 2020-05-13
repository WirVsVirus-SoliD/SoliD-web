import React from "react";

type Props = React.SVGAttributes<SVGElement>;

/**
 * The `TeaIcon` component is a custom-made icon used for checklist-style information.
 * Its purpose is to stand out and provide additional visibility to the user.
 * Therefore, use this component only for presentational purposes, not interactive ones.
 */
const TeaIcon = ({ ...rest }: Props) => {
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
        d="M120.724 75.969H124.832C129.19 75.969 133.369 77.7001 136.45 80.7815C139.532 83.863 141.263 88.0423 141.263 92.4001C141.263 96.7578 139.532 100.937 136.45 104.019C133.369 107.1 129.19 108.831 124.832 108.831H120.724"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55 75.969H120.724V112.939C120.724 117.297 118.993 121.476 115.912 124.557C112.83 127.639 108.651 129.37 104.293 129.37H71.4311C67.0733 129.37 62.894 127.639 59.8125 124.557C56.7311 121.476 55 117.297 55 112.939V75.969Z"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M71.4307 47.2146V59.5379"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M87.8613 47.2146V59.5379"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M104.292 47.2146V59.5379"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TeaIcon;
