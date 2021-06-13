import * as React from "react";

function Pin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 252.5 402.21"
      {...props}
    >
      <defs>
        <linearGradient
          id="prefix__a"
          x1={34.83}
          y1={162.25}
          x2={241.73}
          y2={162.25}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#4c813c" />
          <stop offset={0.43} stopColor="#4c813c" />
          <stop offset={0.77} stopColor="#639442" />
          <stop offset={1} stopColor="#6c9c44" />
        </linearGradient>
        <clipPath id="prefix__b" transform="translate(10.77 13.51)">
          <path
            d="M241.73 124.6c0 66.65-81.63 157.7-99.87 177.2a4.87 4.87 0 01-7.14 0c-18.19-19.69-99.89-111.67-99.89-177.2a103.45 103.45 0 01206.9 0z"
            fill="none"
          />
        </clipPath>
      </defs>
      <path
        d="M241.73 124.6c0 66.65-81.63 157.7-99.87 177.2a4.87 4.87 0 01-7.14 0c-18.19-19.69-99.89-111.67-99.89-177.2a103.45 103.45 0 01206.9 0z"
        transform="translate(10.77 13.51)"
        fill="url(#prefix__a)"
        data-name="Layer 1"
      />
      <g clipPath="url(#prefix__b)" data-name="Layer 2">
        <path
          d="M191.6 31.09S79 101.68 135.3 331.93-.84 155.51 0 126.05 56.31 22.69 56.31 22.69L121.01 0h41.18z"
          fill="#de8026"
        />
      </g>
    </svg>
  );
}

export default Pin;
