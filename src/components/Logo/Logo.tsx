import React from "react";
import "./Logo.css";

type Props = { size?: number; className?: string };

const Logo = ({ size = 200, ...rest }: Props) => {
  return (
    <svg
      id="farmhelden_logo"
      data-name="farmhelden_logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      {...rest}
    >
      <defs>
        {/* <style>
         .cls-1,.cls-2{fill:none;}.cls-1{clip-rule:evenodd;}.cls-3{fill:#f2ac7d;}.cls-4{clip-path:url(#clip-path);}.cls-5{clip-path:url(#clip-path-2);}.cls-6{fill:#325802;}.cls-7{clip-path:url(#clip-path-3);}.cls-8{clip-path:url(#clip-path-4);}.cls-9{clip-path:url(#clip-path-5);}.cls-10{clip-path:url(#clip-path-6);}.cls-11{isolation:isolate;}.cls-12{clip-path:url(#clip-path-7);}.cls-13{clip-path:url(#clip-path-8);}.cls-14{clip-path:url(#clip-path-9);}.cls-15{clip-path:url(#clip-path-10);}.cls-16{clip-path:url(#clip-path-11);}.cls-17{clip-path:url(#clip-path-12);}.cls-18{clip-path:url(#clip-path-13);}.cls-19{clip-path:url(#clip-path-14);}.cls-20{clip-path:url(#clip-path-15);}.cls-21{clip-path:url(#clip-path-17);}.cls-22{clip-path:url(#clip-path-18);}.cls-23{clip-path:url(#clip-path-19);}.cls-24{fill:#749a60;}.cls-25{clip-path:url(#clip-path-20);}.cls-26{clip-path:url(#clip-path-22);}.cls-27{clip-path:url(#clip-path-23);}.cls-28{clip-path:url(#clip-path-24);}.cls-29{clip-path:url(#clip-path-25);}.cls-30{clip-path:url(#clip-path-27);}.cls-31{clip-path:url(#clip-path-28);}.cls-32{clip-path:url(#clip-path-29);}.cls-33{clip-path:url(#clip-path-30);}.cls-34{clip-path:url(#clip-path-32);}.cls-35{clip-path:url(#clip-path-33);}.cls-36{clip-path:url(#clip-path-34);}.cls-37{fill:#91b169;}
         </style> */}
        <clipPath id="clip-path">
          <path
            className="cls-1"
            d="M354.53,214.38a39.77,39.77,0,1,1,39.76-39.77A39.78,39.78,0,0,1,354.53,214.38Zm0-151.1A111.25,111.25,0,0,0,243.2,174.61c0,83.5,111.33,206.76,111.33,206.76S465.86,258.11,465.86,174.61A111.25,111.25,0,0,0,354.53,63.28Z"
          />
        </clipPath>
        <clipPath id="clip-path-2">
          <rect
            className="cls-2"
            x="163.68"
            y="31.48"
            width="1224.64"
            height="1431.4"
          />
        </clipPath>
        <clipPath id="clip-path-3">
          <circle
            className="cls-2"
            cx="99.85"
            cy="101.58"
            r="81.62"
            transform="translate(-42.58 100.36) rotate(-45)"
          />
        </clipPath>
        <clipPath id="clip-path-4">
          <circle
            className="cls-3"
            cx="100.09"
            cy="101.98"
            r="82.11"
            transform="translate(-39.13 134.16) rotate(-58.55)"
          />
        </clipPath>
        <clipPath id="clip-path-5">
          <path
            className="cls-1"
            d="M13.85,104.05A84.57,84.57,0,1,0,98.41,19.4,84.61,84.61,0,0,0,13.85,104.05Z"
          />
        </clipPath>
        <clipPath id="clip-path-6">
          <rect
            className="cls-2"
            x="-533.92"
            y="8.63"
            width="837.37"
            height="581.51"
          />
        </clipPath>
        <clipPath id="clip-path-7">
          <rect
            className="cls-2"
            x="-17.54"
            y="16.19"
            width="196.55"
            height="79.67"
          />
        </clipPath>
        <clipPath id="clip-path-8">
          <path
            className="cls-1"
            d="M-17.3,95.47C27.86,17.1,125.6-5.63,178.8,50.27Z"
          />
        </clipPath>
        <clipPath id="clip-path-9">
          <rect
            className="cls-2"
            x="13.28"
            y="19.1"
            width="169.8"
            height="169.8"
          />
        </clipPath>
        <clipPath id="clip-path-10">
          <path
            className="cls-1"
            d="M26.29,65a85,85,0,0,0-4.09,60.66l69.47,7.08,90.82-69.34C181.68,62.31,169.11,48,168.26,47c-10.91-4.76-30.29-9.88-54-9.63C88.3,37.65,57.17,44.35,26.29,65Z"
          />
        </clipPath>
        <clipPath id="clip-path-11">
          <rect
            className="cls-2"
            x="-527.81"
            y="7.3"
            width="837.37"
            height="581.51"
            transform="translate(-3.17 -1.14) rotate(-0.61)"
          />
        </clipPath>
        <clipPath id="clip-path-12">
          <rect
            className="cls-2"
            x="-28.29"
            y="-8.65"
            width="211.67"
            height="175.03"
            transform="matrix(1, -0.01, 0.01, 1, -0.83, 0.83)"
          />
        </clipPath>
        <clipPath id="clip-path-13">
          <rect
            className="cls-2"
            x="11.45"
            y="-12.84"
            width="131.69"
            height="183.34"
            transform="translate(-18.3 134.08) rotate(-75.59)"
          />
        </clipPath>
        <clipPath id="clip-path-14">
          <rect
            className="cls-2"
            x="17.72"
            y="37.11"
            width="153.52"
            height="95.95"
            transform="translate(-0.9 1.01) rotate(-0.61)"
          />
        </clipPath>
        <clipPath id="clip-path-15">
          <path
            className="cls-1"
            d="M22,140.13a85,85,0,0,0,35.42,38c26.42.79,58.47,1,84.33-1.3A84.64,84.64,0,0,0,183,104.08a77.12,77.12,0,0,0-2.55-20.74c-3.43-12.22-6.69-17-9.41-22.7a85.93,85.93,0,0,0-6.24-9c-.8-.05-1.63-.08-2.51-.08C132.61,51.52,58.59,79.48,22,140.13Z"
          />
        </clipPath>
        <clipPath id="clip-path-17">
          <rect
            className="cls-2"
            x="-0.09"
            y="44.1"
            width="241.33"
            height="138.4"
          />
        </clipPath>
        <clipPath id="clip-path-18">
          <polygon
            className="cls-1"
            points="-0.08 44.27 165.24 44.27 240.97 182.25 -0.08 182.25 -0.08 44.27"
          />
        </clipPath>
        <clipPath id="clip-path-19">
          <rect
            className="cls-2"
            x="22"
            y="51.08"
            width="161.08"
            height="128.51"
          />
        </clipPath>
        <clipPath id="clip-path-20">
          <path
            className="cls-1"
            d="M23.56,64.9a84.64,84.64,0,0,0-6.5,16.33l67.5,88.87,75-7.25a84.38,84.38,0,0,0,21.12-37.77C134.36,82.75,65.76,64.84,27.33,64.84,26,64.84,24.78,64.86,23.56,64.9Z"
          />
        </clipPath>
        <clipPath id="clip-path-22">
          <rect
            className="cls-2"
            x="-0.09"
            y="56.89"
            width="202.95"
            height="97.11"
          />
        </clipPath>
        <clipPath id="clip-path-23">
          <rect
            className="cls-2"
            x="-0.04"
            y="57.19"
            width="202.41"
            height="96.46"
          />
        </clipPath>
        <clipPath id="clip-path-24">
          <rect
            className="cls-2"
            x="16.77"
            y="64.45"
            width="163.98"
            height="105.83"
          />
        </clipPath>
        <clipPath id="clip-path-25">
          <path
            className="cls-1"
            d="M14.87,89.84l42.85,71.7,84.75,14.37a84.86,84.86,0,0,0,24.6-23C126.41,99.43,55.9,75.08,19.31,73.69A83.94,83.94,0,0,0,14.87,89.84Z"
          />
        </clipPath>
        <clipPath id="clip-path-27">
          <rect
            className="cls-2"
            x="-1.26"
            y="66.78"
            width="190.15"
            height="117.46"
          />
        </clipPath>
        <clipPath id="clip-path-28">
          <rect
            className="cls-2"
            x="-0.92"
            y="66.85"
            width="189.74"
            height="117.24"
          />
        </clipPath>
        <clipPath id="clip-path-29">
          <rect
            className="cls-2"
            x="14.44"
            y="73.18"
            width="152.94"
            height="102.93"
          />
        </clipPath>
        <clipPath id="clip-path-30">
          <path
            className="cls-1"
            d="M13.85,104.52a84.48,84.48,0,0,0,138.4,64.73C113.66,114.88,45.67,89.17,15.33,88.72A84.81,84.81,0,0,0,13.85,104.52Z"
          />
        </clipPath>
        <clipPath id="clip-path-32">
          <rect
            className="cls-2"
            x="3.98"
            y="81.9"
            width="176.78"
            height="137.82"
          />
        </clipPath>
        <clipPath id="clip-path-33">
          <rect
            className="cls-2"
            x="4.25"
            y="82.1"
            width="176.21"
            height="137.24"
          />
        </clipPath>
        <clipPath id="clip-path-34">
          <rect
            className="cls-2"
            x="13.28"
            y="88.29"
            width="138.98"
            height="100.6"
          />
        </clipPath>
      </defs>
      <g className="cls-4">
        <g className="cls-5">
          <rect
            className="cls-6"
            x="163.68"
            y="-16.24"
            width="381.71"
            height="477.13"
          />
        </g>
      </g>
      <g className="cls-7">
        <circle
          className="cls-3"
          cx="100.09"
          cy="101.98"
          r="82.11"
          transform="translate(-39.13 134.16) rotate(-58.55)"
        />
        <g className="cls-8">
          <g className="cls-9">
            <g className="cls-10">
              <g className="cls-11">
                <g className="cls-12">
                  <g className="cls-13">
                    <g className="cls-14">
                      <rect
                        className="cls-3"
                        x="-20.21"
                        y="16.44"
                        width="201.91"
                        height="81.95"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="cls-15">
            <g className="cls-16">
              <g className="cls-11">
                <g className="cls-17">
                  <g className="cls-18">
                    <g className="cls-19">
                      <rect
                        className="cls-3"
                        x="-31.77"
                        y="-5.51"
                        width="216.93"
                        height="180.54"
                        transform="translate(-0.9 0.82) rotate(-0.61)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="cls-20">
            <g className="cls-10">
              <g className="cls-11">
                <g className="cls-21">
                  <g className="cls-22">
                    <g className="cls-23">
                      <rect
                        className="cls-24"
                        x="-2.99"
                        y="41.36"
                        width="246.87"
                        height="143.8"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="cls-25">
            <g className="cls-10">
              <g className="cls-11">
                <g className="cls-26">
                  <g className="cls-27">
                    <g className="cls-28">
                      <rect
                        className="cls-6"
                        x="-2.95"
                        y="54.28"
                        width="208.23"
                        height="102.27"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="cls-29">
            <g className="cls-10">
              <g className="cls-11">
                <g className="cls-30">
                  <g className="cls-31">
                    <g className="cls-32">
                      <rect
                        className="cls-24"
                        x="-3.83"
                        y="63.94"
                        width="195.55"
                        height="123.05"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="cls-33">
            <g className="cls-10">
              <g className="cls-11">
                <g className="cls-34">
                  <g className="cls-35">
                    <g className="cls-36">
                      <rect
                        className="cls-37"
                        x="1.35"
                        y="79.19"
                        width="182.02"
                        height="143.06"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
