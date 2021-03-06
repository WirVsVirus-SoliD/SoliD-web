import React from "react";

type Props = { size?: number | string } & React.SVGProps<SVGSVGElement>;

/**
 * The icon of the brand's logo without any text.
 */
const LogoIcon = ({ size, ...rest }: Props) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M13.4009 305.435C-38.6195 148.342 83.2177 -1.65694 83.2177 -1.65694C83.2177 -1.65694 269.546 43.137 323.641 206.507C377.736 369.876 253.824 513.599 253.824 513.599C253.824 513.599 65.3999 462.529 13.4009 305.435Z"
          fill="#DCB38E"
        />
        <path
          d="M188.303 205.583C242.548 49.2246 431.614 0.694321 431.614 0.694321C431.614 0.694321 553.516 146.075 497.089 308.626C440.662 471.177 253.778 513.515 253.778 513.515C253.778 513.515 134.101 361.963 188.303 205.583Z"
          fill="#94E1AE"
        />
        <path
          d="M257.628 99.1189C228.752 127.162 203.34 162.217 188.303 205.583C134.208 361.627 253.243 512.927 253.799 513.578C253.799 513.578 377.711 369.855 323.616 206.486C310.188 166.255 287.625 129.543 257.628 99.1189Z"
          fill="#199057"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="512" height="512" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LogoIcon;
