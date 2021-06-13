import * as React from "react";

function HomePin(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 274.27 315" {...props}>
      <linearGradient
        id="yo"
        gradientUnits="userSpaceOnUse"
        x1={34.829}
        y1={162.246}
        x2={241.734}
        y2={162.246}
      >
        <stop offset={0} stopColor="#cf3339" />
        <stop offset={0.432} stopColor="#cf3339" />
        <stop offset={0.467} stopColor="#d2333a" />
        <stop offset={0.799} stopColor="#eb333e" />
        <stop offset={1} stopColor="#f5333f" />
      </linearGradient>
      <path
        d="M241.73 124.6c0 66.65-81.64 157.69-99.87 177.19a4.873 4.873 0 01-7.14-.02c-18.19-19.66-99.89-111.64-99.89-177.18 0-57.14 46.32-103.45 103.45-103.45 57.14.01 103.45 46.33 103.45 103.46z"
        fill="url(#yo)"
      />
      <g>
        <defs>
          <path
            id="yo_b"
            d="M241.73 124.6c0 66.65-81.64 157.69-99.87 177.19a4.873 4.873 0 01-7.14-.02c-18.19-19.66-99.89-111.64-99.89-177.18 0-57.14 46.32-103.45 103.45-103.45 57.14.01 103.45 46.33 103.45 103.46z"
          />
        </defs>
      </g>
    </svg>
  );
}

export default HomePin;
