import React from "react";
const Face = ({ skinColor, eyeColor, opacity }) => {
  // makes graidents for skin and eyes if neccessary
  const fillColor =
    skinColor instanceof Object ? "url(#linear-gradient2)" : skinColor;
  const styleEye =
    eyeColor instanceof Object
      ? {
          background: `radial-gradient(${eyeColor.color1}, ${eyeColor.color2})`,
        }
      : { backgroundColor: eyeColor };
  const fillEye = eyeColor.color1 ? eyeColor.color1 : eyeColor;

  return (
    <div className="opacity-transition" style={{ opacity: opacity }}>
      <svg style={{ width: "100px" }}>
        <linearGradient
          id="linear-gradient"
          x1="50.5"
          y1="23.33"
          x2="50.5"
          y2="103.51"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.01" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#717171" stopOpacity="0" />
          <stop offset="0.95" stopColor="#292929" stopOpacity="0.38" />
          <stop offset="1" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="linear-gradient2"
          y1="43"
          x2="101"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={skinColor.color1} />
          <stop offset="0.5" stopColor={skinColor.color2} />
          <stop offset="1" stopColor={skinColor.color3} />
        </linearGradient>
        <rect
          className="cls-1"
          style={{ fill: fillColor, fillOpacity: "1" }}
          x="19"
          y="99"
          width="63"
          height="16"
        />
        <rect
          className="cls-2"
          style={{ fill: "black", fillOpacity: ".2" }}
          x="19"
          y="99"
          width="63"
          height="16"
        />
        <rect
          className="cls-1"
          style={{ fill: fillColor, fillOpacity: "1" }}
          y="18"
          width="101"
          height="86"
          rx="16.39"
        />
        <rect
          className="cls-2"
          style={{ fill: "url(#linear-gradient)" }}
          y="18"
          width="101"
          height="86"
          rx="16.39"
        />
        <path
          className="cls-1"
          style={{ fill: fillColor, fillOpacity: "1" }}
          d="M31.31,0H69.69A5.31,5.31,0,0,1,75,5.31V18a0,0,0,0,1,0,0H26a0,0,0,0,1,0,0V5.31A5.31,5.31,0,0,1,31.31,0Z"
        />
      </svg>

      <div className="faces-wrap">
        <div className="faces">
          <div className="face classic">
            <div className="eye right" style={styleEye}></div>
            <div className="eye left" style={styleEye}></div>
            <div className="mouth"></div>
          </div>

          <div className="face smile">
            <div className="eye right" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="eye left" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="mouth"></div>
          </div>

          <div className="face large-smile">
            <div className="eye right" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="eye left" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="mouth"></div>
          </div>

          <div className="face frown">
            <div className="eye right" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="eye left" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="mouth"></div>
          </div>

          <div className="face surprised">
            <div className="eye right" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="eye left" style={styleEye}>
              <div className="brow"></div>
            </div>
            <div className="mouth"></div>
          </div>

          <svg
            id="goku"
            className="face"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <style>{`.gokucls-2{fill:#fff;}.gokucls-3{fill:${fillEye};}`}</style>
            </defs>
            <path d="M46.23,60.91a3.44,3.44,0,0,0,4.27-3.08c0-3.22,0-6.44,0-9.66h.33s.13.09.13.13a6.54,6.54,0,0,0,1.92,4.91,20.2,20.2,0,0,1,2,3,2.07,2.07,0,0,1-.42,3c-.94.83-1.92,1.61-2.89,2.4a2.81,2.81,0,0,1-3.58.22C47.42,61.55,46.82,61.24,46.23,60.91Zm5.46-8.55-.35.12c-.14,2.13-.29,4.26-.41,6.39,0,.15.15.44.25.45.64.08,1.41.33,1.89.08.79-.42,1.87-1.09,1.37-2.18C53.67,55.53,52.62,54,51.69,52.36Zm.08,8.06c-1.18-.72-2.05-.45-3.12.9C49.7,62,50.49,61.76,51.77,60.42Z" />
            <path d="M55.23,66.29c-1.09-.09-2.11-.23-3.13-.24-1.89,0-3.79,0-5.69,0a3.11,3.11,0,0,0-2.84,1.08,2.17,2.17,0,0,1-1.11.64c.86-1.24,1.72-2.37,3.5-2.34,2.47.06,4.94-.07,7.4-.11C54.19,65.34,55,65.47,55.23,66.29Z" />
            <path d="M46.73,72.05,46,71.48l5.19-.77.06.16-1.4.7,3.58.23,0,.43c-3.25.09-6.56-.13-9.39,1.94l-.17-.4Z" />
            <path
              className="gokucls-2"
              d="M19.1,30c1.54.51,3.11.93,4.6,1.54a48.62,48.62,0,0,1,4.71,2.28A1.75,1.75,0,0,1,29.18,35c.15,2.33,2.79,5.5,5.6,5.33a4.89,4.89,0,0,0,1.93-.51,2.18,2.18,0,0,1,2.62.1c.5.38,1.17.56,1.68.94s.89.89.8,1.06c-.34.64-.75,1.25-1.77,1a50,50,0,0,0-5.93-1c-3.43-.34-6.87-.55-10.32-.75A1.9,1.9,0,0,1,21.86,40c-1.26-2.71-2.63-5.37-3.94-8C17.17,30.4,17.3,30.22,19.1,30Z"
            />
            <path
              className="gokucls-3"
              d="M30.13,34.41l3.15,1.77-.26.15L33.43,38l1.63-.8,2.28,1.41c-1.42,1.69-2.9,1.35-4.59.68A5.15,5.15,0,0,1,30.13,34.41Z"
            />
            <path
              className="gokucls-2"
              d="M82.05,31.42c-.53,1.11-1.06,2.22-1.6,3.33-.92,1.91-1.87,3.81-2.78,5.73a2,2,0,0,1-1.87,1.33c-5.67.43-11.33.95-17,1.43a2.44,2.44,0,0,1-1,0,1,1,0,0,1-.56-.62.74.74,0,0,1,.32-.62,41.41,41.41,0,0,1,3.62-2.14,2.09,2.09,0,0,1,1.59,0A6.75,6.75,0,0,0,71.24,37a4.5,4.5,0,0,0,.65-2.12c0-.59.15-.87.69-1.1,1.75-.72,3.44-1.62,5.23-2.21a24.37,24.37,0,0,1,3.94-.66Z"
            />
            <path
              className="gokucls-3"
              d="M62.23,38.66c1.06-.54,1.92-1,2.81-1.41a.63.63,0,0,1,.58.12c.41.55.92,1,1.49.47.28-.27.17-1,.28-1.74l3.76-1.69a5.39,5.39,0,0,1-3.25,4.73A4.82,4.82,0,0,1,62.23,38.66Z"
            />
            <path d="M52.49,42.38c-2.23.76-2.73.4-2.73-1.92,0-.94-.1-1.88-.15-2.83l-.48,0c0,1.24.06,2.49,0,3.72,0,.41-.46,1.15-.64,1.13a10,10,0,0,1-2.65-.67c-.16-.06-.14-.81,0-1.2.42-1.62.9-3.23,1.35-4.85l-.4-.15a11.17,11.17,0,0,0-.49,1.25c-.2.69-.35,1.39-.52,2.09-.19.86-.59,1-1.36.53-1.74-1.15-3.52-2.23-5.28-3.36Q29.6,30,20.16,23.88c-.61-.4-1-.39-1.41.19q-3.06,3.87-6.16,7.7l.06.22c.85-.35,1.7-.72,2.56-1.06a1.17,1.17,0,0,1,1.73.7c1.46,3,3,5.94,4.49,9a2,2,0,0,0,2,1.3,71.45,71.45,0,0,1,16.93,1.93,1.45,1.45,0,0,0,1.87-.76c.2-.34.57-.83.83-.82a12,12,0,0,1,3,.52c.94.33,1.77.81,2.82.3.29-.14.8.05,1.16.21A2.25,2.25,0,0,0,53,42.34,1.54,1.54,0,0,0,52.49,42.38Zm-22.36-8,2.59,1.45a1.5,1.5,0,1,0,2.53,1.41l2.09,1.3c-1.42,1.69-2.9,1.35-4.59.68A5.15,5.15,0,0,1,30.13,34.41ZM41.81,42c-.34.64-.75,1.25-1.77,1a50,50,0,0,0-5.93-1c-3.43-.34-6.87-.55-10.32-.75A1.9,1.9,0,0,1,21.86,40c-1.26-2.71-2.63-5.37-3.94-8-.75-1.54-.62-1.72,1.18-1.92,1.54.51,3.11.93,4.6,1.54a48.62,48.62,0,0,1,4.71,2.28A1.75,1.75,0,0,1,29.18,35c.15,2.33,2.79,5.5,5.6,5.33a4.89,4.89,0,0,0,1.93-.51,2.18,2.18,0,0,1,2.62.1c.5.38,1.17.56,1.68.94S41.9,41.78,41.81,42Z" />
            <path d="M85.12,32.33c-.64-2.14-1.32-4.28-1.92-6.43-.55-2-.88-2.12-2.68-1.08-.43.25-.84.52-1.26.78-3.63,2.23-7.22,4.5-10.89,6.66-4.31,2.55-8.7,5-13,7.49-.79.46-1.5,1.1-2.16-.36a2.29,2.29,0,0,0,0,.57c.32,1.06.7,2.53,1.77,2.54,1.37,0,1.89,1.08,2.9,1.42.09,0,.22,0,.33-.05,6-.5,12-1,18-1.47A1.84,1.84,0,0,0,78,41.3c1.57-3.26,3.17-6.51,4.88-10L85,34.06l.48-.37C85.36,33.24,85.26,32.78,85.12,32.33ZM65,37.29a1.5,1.5,0,0,0,2.94-.39,1.48,1.48,0,0,0-.3-.9l3.54-1.59a5.39,5.39,0,0,1-3.25,4.73,4.82,4.82,0,0,1-5.67-.48C63.27,38.13,64.11,37.69,65,37.29Zm15.48-2.54c-.92,1.91-1.87,3.81-2.78,5.73a2,2,0,0,1-1.87,1.33c-5.67.43-11.33.95-17,1.43a2.44,2.44,0,0,1-1,0,1,1,0,0,1-.56-.62.74.74,0,0,1,.32-.62,41.41,41.41,0,0,1,3.62-2.14,2.09,2.09,0,0,1,1.59,0A6.75,6.75,0,0,0,71.24,37a4.5,4.5,0,0,0,.65-2.12c0-.59.15-.87.69-1.1,1.75-.72,3.44-1.62,5.23-2.21a24.37,24.37,0,0,1,3.94-.66l.3.5C81.52,32.53,81,33.64,80.45,34.75Z" />
          </svg>

          <svg
            id="scared"
            className="face"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>
              {`.acls-2,.acls-3{fill:#fff;stroke:#000;stroke-miterlimit:10;stroke-width:3px}.acls-2{stroke-width:3px;`}
            </style>
            <circle className="acls-2" cx="26.75" cy="34" r="14.5" />
            <circle className="acls-2" cx="73.25" cy="34.5" r="14.5" />
            <path
              className="acls-3"
              d="M73.11,76.5H27.89a3.47,3.47,0,0,1-3.38-4.27l2.36-10.05a3.48,3.48,0,0,1,3.38-2.68h40.5a3.48,3.48,0,0,1,3.38,2.68l2.36,10.05A3.47,3.47,0,0,1,73.11,76.5Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Face;
