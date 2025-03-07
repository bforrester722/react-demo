import React, { Component } from "react";

const Hair = ({ skinColor, hairColor }) => {
  const fillColor = hairColor instanceof Object ? hairColor.color1 : hairColor;
  const skinFillColor =
    skinColor instanceof Object ? skinColor.color1 : skinColor;

  return (
    <div className="hair-wrap ">
      <div className="hair-styles">
        {/* Bald */}
        <div className="hair-style"></div>

        <svg id="leia" className="hair-style">
          <path
            className="cls-1"
            d="M179.12,104.51h-3v-9.8a4.72,4.72,0,0,0-5-4.46H165a4.73,4.73,0,0,0-4.95,4.46V95a69.12,69.12,0,0,0-4.51-9c-2.47-4.14-11.27-18.86-22.15-18.54-5.81.18-8.33,4.52-15.82,4.28-8.6-.28-9.5-6.13-15.83-5.7-8.83.6-25.31,3.85-25.31,20,0,1.86-1.23,4-2.73,5.92a5.16,5.16,0,0,0-3.8-1.64H63.77a4.72,4.72,0,0,0-4.94,4.46v9.8h-3A4.72,4.72,0,0,0,50.92,109v25.31a4.72,4.72,0,0,0,4.94,4.46h3v9.8A4.72,4.72,0,0,0,63.77,153h6.17a4.72,4.72,0,0,0,4.94-4.46v-2.78c8-2.94,20.05-39.3,39.56-39.82,21.74-.58,33.19,43.85,44.31,41.36a4.66,4.66,0,0,0,1.34-.58v1.82A4.73,4.73,0,0,0,165,153h6.16a4.72,4.72,0,0,0,5-4.46v-9.8h3a4.72,4.72,0,0,0,4.94-4.46V109A4.72,4.72,0,0,0,179.12,104.51Z"
          />
        </svg>

        <svg id="han" className="hair-style">
          <path
            className="cls-1"
            d="M110.54,67.74a1.34,1.34,0,0,1-1.09,0A32.72,32.72,0,0,0,93,65c-17.09,1.75-32.25,18.42-38,41.85a1.36,1.36,0,0,1-.11.28A8.17,8.17,0,0,0,54,111a8.71,8.71,0,0,0,2.78,6,1.36,1.36,0,0,1-.15,2L54.4,120.7a4.26,4.26,0,0,0-.1,6.74h0a1.36,1.36,0,0,1,.45,1.43l-1.15,4a4.07,4.07,0,0,0,.82,3.76l4.29,5a1.35,1.35,0,0,1,.32.79l1.19,18a1,1,0,0,0,0,.17,11.81,11.81,0,0,0,12.22,9.53,1.34,1.34,0,0,0,1.28-1.59l-3.66-20.13a1.36,1.36,0,0,1,.12-.84l1.69-3.38a1.53,1.53,0,0,0,.14-.46l2-17.61a1.63,1.63,0,0,1,.07-.3c4.45-13.34,14.82-16.4,26-16.85a24.55,24.55,0,0,1,13.78,3.86,1,1,0,0,0,.48.18,16.69,16.69,0,0,0,5.74,0c4.75-.88,6.1-3.36,10-4,3.41-.56,6.18.71,9,2,6,2.77,9.44,1.45,11,4l5.79,8.69a1.29,1.29,0,0,1,.23.68l.95,19a1.35,1.35,0,0,0,.54,1l2.91,2.19a1.36,1.36,0,0,1,.54,1.15L160,164.28a1.36,1.36,0,0,1-.66,1.09l-.57.34a1.36,1.36,0,0,0,.78,2.52,18,18,0,0,0,9.91-3.82,1.36,1.36,0,0,0,.5-1v-10a1.4,1.4,0,0,1,.19-.69l2-3.39a4.7,4.7,0,0,0,.65-2.79l-.76-9a1.34,1.34,0,0,1,1.19-1.46,6.17,6.17,0,0,0,3.25-11.16,1.32,1.32,0,0,1-.16-2,6.06,6.06,0,0,0-1.16-9.26,1.34,1.34,0,0,1-.46-1.74A4.78,4.78,0,0,0,175,108a4.83,4.83,0,0,0-3.92-3,1.34,1.34,0,0,1-1.12-1.27c-.23-4.94-2-21.06-16-31.75C141.81,62.63,125,61,110.54,67.74Z"
          />
        </svg>

        <svg id="luke" className="hair-style">
          <path
            className="cls-1"
            d="M62,133.19c2.42,1.23,6.33,1.63,8.91,0,5.65-3.54-.2-13.44,4.86-17.7,4-3.38,11.65-.51,18.63.71,29.92,5.2,54.84-18.87,62.36-12,2.81,2.55-.71,5.85,2.43,19.83,1.79,8,3.62,9.94,5.67,10.62,3.36,1.12,9.93-.2,10.53-3.54,2.43-13.46,5.58-24.54-3.24-34-2.08-2.23-3.07-6.49-6.48-12-2.57-4.18-5.93-5.83-6.48-7.08-5.13-11.79-45.34-22.3-73.7-7.08A55.94,55.94,0,0,0,63.62,92.12a48.64,48.64,0,0,0-6.48,23.37C56.83,122.11,56.44,130.36,62,133.19Z"
          />
        </svg>

        <svg
          id="karen"
          className="hair-style"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="cls-1"
            d="M107.75,58c-3.06-.07-18.22-.13-30.59,11A40,40,0,0,0,64.5,92,49.38,49.38,0,0,0,55,118c-.8,13.2,2.74,24,5,28-.61,6,.33,17.29,6.61,31A66.68,66.68,0,0,0,93,206a23.72,23.72,0,0,1-9.49-10c-1.52-3.13-5.36-7-5.49-9,6.4,5.17,11.58,7.23,11.82,7,.48-.48-6.29-5.82-10.55-14-.93-1.78-5.74-11-4.22-20,2.41-14.31,19-16.59,36.92-37a101.24,101.24,0,0,0,12.66-18l13.72,12c3.23,7.08,13.52,16.17,15.43,27a111.79,111.79,0,0,1-2.11,48q3.71-11,7.39-22v8l2.28-14-1.23,20,2.11-5a39.76,39.76,0,0,1,0,7,41.09,41.09,0,0,1-2.11,10,58.76,58.76,0,0,0,7.39-16,57.24,57.24,0,0,0,2.11-12c5.27-9,3.55-18,8.82-27,2.16-2.23,7-11.86,6.57-26-.26-7.92.64-13.89-1.29-17,.13-2.93.51-18.15-11.61-30-11-10.8-28.2-14.62-44.3-10Z"
          />
        </svg>

        <svg
          id="yoda"
          className="hair-style"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`.ear{fill:${skinFillColor};}.light{fill: #fff; fill-opacity:.4}.wrinkle{fill: #000; fill-opacity:.4}}`}</style>
          <path
            className="ear"
            d="M68.9,119,6.46,100.13a3.5,3.5,0,0,0-3.91,5.23c1.56,2.47,3.28,5,5.19,7.48,16.34,21.49,37.57,32,50.94,37.16h9.4Z"
          />
          <path
            className="light"
            d="M10.57,111.18,55,144.78A1.68,1.68,0,0,0,57.67,143a35.45,35.45,0,0,0-4.55-10.9,36.08,36.08,0,0,0-17.63-14.28L11.34,109.7A.85.85,0,0,0,10.57,111.18Z"
          />
          <path
            className="ear"
            d="M169,119l62.44-18.85a3.5,3.5,0,0,1,3.9,5.23q-2.33,3.7-5.18,7.48c-16.34,21.49-37.58,32-50.94,37.16h-9.4Z"
          />
          <path
            className="light"
            d="M227.32,111.18l-44.47,33.6a1.67,1.67,0,0,1-2.62-1.74,35.65,35.65,0,0,1,4.54-10.9,36.08,36.08,0,0,1,17.63-14.28l24.16-8.16A.84.84,0,0,1,227.32,111.18Z"
          />
          <path
            className="wrinkle"
            d="M97.39,108.51a23.75,23.75,0,0,1,5.48-.67,18.57,18.57,0,0,0,2.62-.36c.84-.21,1.69-.48,2.55-.77a15.71,15.71,0,0,1,5.65-1.12c2,.08,3.77.59,5.5.79a11.37,11.37,0,0,0,2.53.11c.86,0,1.74-.2,2.68-.3a12.56,12.56,0,0,1,2.95,0,11.09,11.09,0,0,1,2.82.81,18.44,18.44,0,0,0,5,1.73c1.74.28,3.68.17,5.43.84a50.89,50.89,0,0,0-5.5.14,10.34,10.34,0,0,1-2.86-.4c-.92-.25-1.78-.59-2.63-.85a12,12,0,0,0-2.48-.53,11,11,0,0,0-2.52.18c-.88.14-1.8.29-2.77.38a13.1,13.1,0,0,1-2.94-.08c-1.9-.27-3.66-.77-5.33-.89a16.13,16.13,0,0,0-5.12.73,23.81,23.81,0,0,1-2.77.56,15.92,15.92,0,0,1-2.84,0A38.88,38.88,0,0,0,97.39,108.51Z"
          />
          <path
            className="wrinkle"
            d="M92.39,106.09c2.2-.64,4.5-.81,6.69-1.28a26.19,26.19,0,0,0,3.22-.83c1-.36,2.06-.78,3.1-1.23a22.06,22.06,0,0,1,6.74-2,40.77,40.77,0,0,1,7,.24,23.82,23.82,0,0,0,3.27.09c1.11,0,2.26-.13,3.43-.13a17.44,17.44,0,0,1,3.57.36,17.18,17.18,0,0,1,3.35,1.15,27.83,27.83,0,0,0,6.25,2.32c1.09.25,2.2.41,3.32.59a19.23,19.23,0,0,1,3.35.72,27.49,27.49,0,0,0-3.39-.17c-1.14,0-2.28,0-3.44-.17a17.1,17.1,0,0,1-3.43-.69c-1.12-.34-2.18-.78-3.23-1.15A19.77,19.77,0,0,0,129,103a15.49,15.49,0,0,0-3.21-.18c-1.09,0-2.21.11-3.36.18a24.29,24.29,0,0,1-3.52,0,43.12,43.12,0,0,0-6.64-.35A22.84,22.84,0,0,0,106,104.2a34.27,34.27,0,0,1-3.3,1,25.85,25.85,0,0,1-3.44.54C96.92,106,94.66,105.88,92.39,106.09Z"
          />
        </svg>

        <svg
          id="vader"
          className="hair-style"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`.vadercls-1{fill:none;}.vadercls-2{fill:#333;}.vadercls-3{fill:#262626;}.vadercls-4{fill:#1a1a1a;}.vadercls-5{fill:#4d4d4d;}.vadercls-6{fill:#666;}.vadercls-7{fill:#282828;}`}</style>
          <path
            className="vadercls-1"
            d="M156.64,176.91l12.47-47.17c-.45-.65-.91-1.27-1.37-1.88-.21-.28-.44-.56-.66-.83s-.48-.61-.73-.9-.47-.56-.7-.84l-.76-.84c-.22-.26-.45-.51-.68-.76-.43-.45-.87-.89-1.31-1.32-.2-.21-.42-.41-.64-.6s-.61-.57-.92-.85l-.69-.58c-.29-.25-.6-.51-.92-.75l-.64-.5c-.5-.38-1-.74-1.51-1.08l-.44-.29-1.21-.74-.62-.35c-.37-.21-.76-.41-1.13-.6-.2-.1-.38-.2-.58-.28q-.82-.41-1.68-.75l-.2-.07c-.52-.21-1-.38-1.56-.55l-.55-.16c-.44-.13-.87-.24-1.29-.35l-.55-.13c-.61-.14-1.21-.25-1.82-.33-4.68-.67-12.56.52-23.07,6.59l-3.73,0h-.3l-3.73,0c-10.51-6.07-18.39-7.26-23.07-6.59-.61.08-1.21.19-1.82.33l-.55.13c-.42.11-.85.22-1.29.35l-.55.16c-.53.17-1,.34-1.56.55l-.2.07q-.85.34-1.68.75c-.2.08-.38.18-.58.28-.37.19-.76.39-1.13.6l-.62.35-1.21.74-.44.29c-.51.34-1,.7-1.51,1.08l-.64.5c-.32.24-.63.5-.92.75l-.69.58c-.31.28-.62.56-.92.85s-.44.39-.64.6c-.44.43-.88.87-1.31,1.32-.23.25-.46.5-.68.76l-.76.84c-.23.28-.47.55-.7.84s-.49.59-.73.9-.45.55-.66.83c-.46.61-.92,1.23-1.37,1.88l12.47,47.17,6.84,3.87-6.59,8.43,0-.05s0,0,0,0l.58-.57,1.6-1.63,1.5-1.52L89,181.69l.28-.28,23.83-24.22.14-.15.72-.72,5-5.08,0,0,0,0,5,5.08.72.72.14.15,23.83,24.22.28.28,3.67,3.74,1.5,1.52,1.6,1.63.58.57s0,0,0,0l0,.05-6.59-8.43Z"
          />
          <path
            className="vadercls-2"
            d="M91,107.91h2.53l.2,0-33.38,0-29,68c-2.7,6.32,3.54,13.33,10,14.32C50.33,143.1,68,109.45,91,107.91Z"
          />
          <path
            className="vadercls-2"
            d="M115.12,107.91H94.35c5,.31,12.08,2.15,20.77,8.79Z"
          />
          <path
            className="vadercls-2"
            d="M206.69,175.86l-29-68-33.38,0,.2,0h2.53c23,1.54,40.62,35.19,49.69,82.27C203.15,189.19,209.39,182.18,206.69,175.86Z"
          />
          <path
            className="vadercls-2"
            d="M143.65,107.91H122.88v8.79C131.57,110.06,138.68,108.22,143.65,107.91Z"
          />
          <path
            className="vadercls-3"
            d="M92.05,113.41c-.61.08-1.21.19-1.82.33l-.55.13c-.42.11-.85.22-1.29.35l-.55.16c-.53.17-1,.34-1.56.55l-.2.07q-.85.34-1.68.75c-.2.08-.38.18-.58.28-.37.19-.76.39-1.13.6l-.62.35-1.21.74-.44.29c-.51.34-1,.7-1.51,1.08l-.64.5c-.32.24-.63.5-.92.75l-.69.58c-.31.28-.62.56-.92.85s-.44.39-.64.6c-.44.43-.88.87-1.31,1.32-.23.25-.46.5-.68.76l-.76.84c-.23.28-.47.55-.7.84s-.49.59-.73.9-.45.55-.66.83c-.46.61-.92,1.23-1.37,1.88l12.47,47.17,7.93,4.48,23.82-24.2.14-.15.72-.72,5-5.08,0,0,0,0,5,5.08.72.72.14.15,23.82,24.2,7.93-4.48,12.47-47.17c-.45-.65-.91-1.27-1.37-1.88-.21-.28-.44-.56-.66-.83s-.48-.61-.73-.9-.47-.56-.7-.84l-.76-.84c-.22-.26-.45-.51-.68-.76-.43-.45-.87-.89-1.31-1.32-.2-.21-.42-.41-.64-.6s-.61-.57-.92-.85l-.69-.58c-.29-.25-.6-.51-.92-.75l-.64-.5c-.5-.38-1-.74-1.51-1.08l-.44-.29-1.21-.74-.62-.35c-.37-.21-.76-.41-1.13-.6-.2-.1-.38-.2-.58-.28q-.82-.41-1.68-.75l-.2-.07c-.52-.21-1-.38-1.56-.55l-.55-.16c-.44-.13-.87-.24-1.29-.35l-.55-.13c-.61-.14-1.21-.25-1.82-.33-4.68-.67-12.56.52-23.07,6.59l-3.73,0h-.3l-3.73,0C104.61,113.93,96.73,112.74,92.05,113.41Z"
          />
          <path
            className="vadercls-1"
            d="M167.74,127.86c-.21-.28-.44-.56-.66-.83s-.48-.61-.73-.9-.47-.56-.7-.84l-.76-.84c-.22-.26-.45-.51-.68-.76-.43-.45-.87-.89-1.31-1.32-.2-.21-.42-.41-.64-.6s-.61-.57-.92-.85l-.69-.58c-.29-.25-.6-.51-.92-.75l-.64-.5c-.5-.38-1-.74-1.51-1.08l-.44-.29-1.21-.74-.62-.35c-.37-.21-.76-.41-1.13-.6-.2-.1-.38-.2-.58-.28q-.82-.41-1.68-.75l-.2-.07c-.52-.21-1-.38-1.56-.55l-.55-.16c-.44-.13-.87-.24-1.29-.35l-.55-.13c-.61-.14-1.21-.25-1.82-.33-4.68-.67-12.56.52-23.07,6.59l-3.73,0h-.3l-3.73,0c-10.51-6.07-18.39-7.26-23.07-6.59-.61.08-1.21.19-1.82.33l-.55.13c-.42.11-.85.22-1.29.35l-.55.16c-.53.17-1,.34-1.56.55l-.2.07q-.85.34-1.68.75c-.2.08-.38.18-.58.28-.37.19-.76.39-1.13.6l-.62.35-1.21.74-.44.29c-.51.34-1,.7-1.51,1.08l-.64.5c-.32.24-.63.5-.92.75l-.69.58c-.31.28-.62.56-.92.85s-.44.39-.64.6c-.44.43-.88.87-1.31,1.32-.23.25-.46.5-.68.76l-.76.84c-.23.28-.47.55-.7.84s-.49.59-.73.9-.45.55-.66.83c-.46.61-.92,1.23-1.37,1.88l12.47,47.17,7.93,4.48,23.82-24.2.14-.15.72-.72,5-5.08,0,0,0,0,5,5.08.72.72.14.15,23.82,24.2,7.93-4.48,12.47-47.17C168.66,129.09,168.2,128.47,167.74,127.86Z"
          />
          <path
            className="vadercls-4"
            d="M186.63,183.31c-.11-.95-.22-1.9-.34-2.85l-.2-1.48c-.12-.88-.25-1.76-.38-2.63-.08-.49-.15-1-.23-1.47-.14-.89-.3-1.78-.46-2.66-.08-.43-.14-.85-.23-1.28-.19-1-.39-2-.6-3-.05-.28-.11-.55-.16-.82-.56-2.61-1.18-5.15-1.84-7.61,0-.17-.09-.35-.14-.53-.28-1-.58-2.06-.89-3.07-.07-.25-.15-.5-.22-.74-.29-1-.6-1.9-.91-2.83-.08-.22-.15-.45-.23-.67-.33-1-.68-2-1-2.91-.06-.15-.1-.29-.16-.42a92.75,92.75,0,0,0-5.25-11.64h0L164.09,184l-4.41,3L187,187c-.07-.8-.16-1.59-.23-2.38C186.74,184.19,186.69,183.75,186.63,183.31Z"
          />
          <path
            className="vadercls-4"
            d="M64.64,136.68h0a92.75,92.75,0,0,0-5.25,11.64c-.06.13-.1.27-.16.42-.35.95-.7,1.92-1,2.91-.08.22-.15.45-.23.67-.31.93-.62,1.88-.91,2.83-.07.24-.15.49-.22.74-.31,1-.61,2-.89,3.07-.05.18-.1.36-.14.53-.66,2.46-1.28,5-1.84,7.61,0,.27-.11.54-.16.82-.21,1-.41,2-.6,3-.09.43-.15.85-.23,1.28-.16.88-.32,1.77-.46,2.66-.08.49-.15,1-.23,1.47-.13.87-.26,1.75-.38,2.63l-.2,1.48c-.12.95-.23,1.9-.34,2.85-.06.44-.11.88-.16,1.32-.07.79-.16,1.58-.23,2.38l27.34,0-4.41-3Z"
          />
          <path d="M196.74,190.18h0c-9.07-47.08-26.69-80.73-49.69-82.27h-3.4c-5,.31-12.08,2.15-20.77,8.79v-8.79h-7.76v8.79c-8.69-6.64-15.8-8.48-20.77-8.79H91c-23,1.54-40.62,35.19-49.69,82.27h0a.08.08,0,0,0,0,0,11.57,11.57,0,0,0,1.33.09h7l1.25-1.47c0-.61.1-1.21.16-1.83h0c.07-.8.16-1.59.23-2.38,0-.44.1-.88.16-1.32.11-.95.22-1.9.34-2.85l.2-1.48c.12-.88.25-1.76.38-2.63.08-.49.15-1,.23-1.47.14-.89.3-1.78.46-2.66.08-.43.14-.85.23-1.28.19-1,.39-2,.6-3,0-.28.11-.55.16-.82.56-2.61,1.18-5.15,1.84-7.61,0-.17.09-.35.14-.53.28-1,.58-2.06.89-3.07.07-.25.15-.5.22-.74.29-1,.6-1.9.91-2.83.08-.22.15-.45.23-.67.33-1,.68-2,1-2.91.06-.15.1-.29.16-.42a92.75,92.75,0,0,1,5.25-11.64h0L73.91,184l4.41,3,3.29,2.24h74.78l3.29-2.24,4.41-3,9.27-47.29h0a92.75,92.75,0,0,1,5.25,11.64c.06.13.1.27.16.42.35.95.7,1.92,1,2.91.08.22.15.45.23.67.31.93.62,1.88.91,2.83.07.24.15.49.22.74.31,1,.61,2,.89,3.07,0,.18.1.36.14.53.66,2.46,1.28,5,1.84,7.61.05.27.11.54.16.82.21,1,.41,2,.6,3,.09.43.15.85.23,1.28.16.88.32,1.77.46,2.66.08.49.15,1,.23,1.47.13.87.26,1.75.38,2.63l.2,1.48c.12.95.23,1.9.34,2.85.06.44.11.88.16,1.32.07.79.16,1.58.23,2.38h0c.06.62.12,1.22.16,1.83l1.25,1.47h7a11.57,11.57,0,0,0,1.33-.09A.08.08,0,0,0,196.74,190.18Zm-48-8.79-23.82-24.2-.14-.15-.72-.72-5-5.08,0,0,0,0-5,5.08-.72.72-.14.15-23.82,24.2-7.93-4.48L68.89,129.74c.45-.65.91-1.27,1.37-1.88.21-.28.44-.56.66-.83s.48-.61.73-.9.47-.56.7-.84l.76-.84c.22-.26.45-.51.68-.76.43-.45.87-.89,1.31-1.32.2-.21.42-.41.64-.6s.61-.57.92-.85l.69-.58c.29-.25.6-.51.92-.75l.64-.5c.5-.38,1-.74,1.51-1.08l.44-.29,1.21-.74.62-.35c.37-.21.76-.41,1.13-.6.2-.1.38-.2.58-.28q.82-.41,1.68-.75l.2-.07c.52-.21,1-.38,1.56-.55l.55-.16c.44-.13.87-.24,1.29-.35l.55-.13c.61-.14,1.21-.25,1.82-.33,4.68-.67,12.56.52,23.07,6.59l3.73,0h.3l3.73,0c10.51-6.07,18.39-7.26,23.07-6.59.61.08,1.21.19,1.82.33l.55.13c.42.11.85.22,1.29.35l.55.16c.53.17,1,.34,1.56.55l.2.07q.86.34,1.68.75c.2.08.38.18.58.28.37.19.76.39,1.13.6l.62.35,1.21.74.44.29c.51.34,1,.7,1.51,1.08l.64.5c.32.24.63.5.92.75l.69.58c.31.28.62.56.92.85s.44.39.64.6c.44.43.88.87,1.31,1.32.23.25.46.5.68.76l.76.84c.23.28.47.55.7.84s.49.59.73.9.45.55.66.83c.46.61.92,1.23,1.37,1.88l-12.47,47.17Z" />
          <path d="M159.69,135.38c1.23-3.73-5.63-11.5-14.29-12.09-9.84-.67-17.66,8.25-16.47,12.09C130.81,141.48,157.6,141.66,159.69,135.38Z" />
          <path
            className="vadercls-5"
            d="M144.39,138.92c7.39,0,13.52-1.67,14.25-3.89.29-.86-.13-2.25-1.11-3.71a16.7,16.7,0,0,0-12.2-6.93l-1,0a16.87,16.87,0,0,0-12.91,6.57c-1.42,1.94-1.69,3.4-1.46,4.12C130.65,137.22,137,138.92,144.39,138.92Z"
          />
          <path
            className="vadercls-6"
            d="M142.16,137.44c5.76,0,10.53-1.32,11.1-3.07a3.82,3.82,0,0,0-.86-2.92,13,13,0,0,0-9.5-5.46c-.26,0-.51,0-.77,0a13.07,13.07,0,0,0-10,5.19c-1.11,1.52-1.32,2.67-1.14,3.24C131.46,136.1,136.39,137.44,142.16,137.44Z"
          />
          <g id="EYE">
            <path d="M78.31,135.38c-1.23-3.73,5.63-11.5,14.29-12.09,9.84-.67,17.66,8.25,16.47,12.09C107.19,141.48,80.4,141.66,78.31,135.38Z" />
            <path
              className="vadercls-5"
              d="M93.61,138.92c-7.39,0-13.52-1.67-14.25-3.89-.29-.86.13-2.25,1.11-3.71a16.7,16.7,0,0,1,12.2-6.93l1,0a16.87,16.87,0,0,1,12.91,6.57c1.42,1.94,1.69,3.4,1.46,4.12C107.35,137.22,101,138.92,93.61,138.92Z"
            />
            <path
              className="vadercls-6"
              d="M95.84,137.44c-5.76,0-10.53-1.32-11.1-3.07a3.82,3.82,0,0,1,.86-2.92A13,13,0,0,1,95.1,126c.26,0,.51,0,.77,0a13.07,13.07,0,0,1,10,5.19c1.11,1.52,1.32,2.67,1.14,3.24C106.54,136.1,101.61,137.44,95.84,137.44Z"
            />
          </g>
          <polygon
            className="vadercls-5"
            points="143.21 183.44 137.71 177.3 128.56 167.07 127.72 166.13 123.07 160.93 122.23 160 121.48 159.14 121.47 159.14 119.73 157.19 119.15 156.54 119.15 156.28 119.11 156.25 119 156.38 118.89 156.25 118.85 156.28 118.85 156.54 118.27 157.19 116.53 159.14 116.52 159.14 115.77 160 114.93 160.93 110.28 166.13 109.44 167.07 100.29 177.3 94.79 183.44 92.58 185.91 94.79 185.91 100.29 185.91 109.44 185.91 114.93 185.91 118.85 185.91 119.15 185.91 123.07 185.91 128.56 185.91 137.71 185.91 143.21 185.91 145.41 185.91 143.21 183.44"
          />
          <polygon
            className="vadercls-4"
            points="114.93 160.93 114.93 185.91 109.44 185.91 109.44 167.07 114.93 160.93"
          />
          <polygon
            className="vadercls-4"
            points="100.29 177.3 100.29 185.91 94.79 185.91 94.79 183.44 100.29 177.3"
          />
          <polygon
            className="vadercls-5"
            points="110.44 184.91 110.44 167.45 113.93 163.55 113.93 184.91 110.44 184.91"
          />
          <polygon
            className="vadercls-5"
            points="99.19 184.81 99.19 180.37 95.89 183.95 95.89 184.81 99.19 184.81"
          />
          <circle className="vadercls-5" cx="86" cy="185.81" r="5.49" />
          <circle className="vadercls-4" cx="86.29" cy="185.81" r="4.92" />
          <path
            className="vadercls-7"
            d="M133.51,43.1h-29A44.85,44.85,0,0,0,59.64,88l.66,20H177.7l.66-20A44.85,44.85,0,0,0,133.51,43.1Z"
          />
          <path
            className="vadercls-4"
            d="M124.83,135.88a26.08,26.08,0,0,0-5.68-.73h-.3a26.08,26.08,0,0,0-5.68.73,3.59,3.59,0,0,0-2.18,3.39l1.86,17.92h12.3L127,139.27A3.59,3.59,0,0,0,124.83,135.88Z"
          />
          <path
            className="vadercls-5"
            d="M123.83,136.66c-.84-.1-3.36-.2-4.68-.21h-.3c-1.32,0-3.84.11-4.68.21-1.1.16-1.81.56-1.81,1L113.9,143h10.2l1.54-5.33C125.64,137.22,124.93,136.82,123.83,136.66Z"
          />
          <path
            className="vadercls-6"
            d="M123.81,151.75a5.47,5.47,0,0,0-4.66-2.95v0h-.3v0a5.46,5.46,0,0,0-5.27,5.47,5.58,5.58,0,0,0,.39,2,5.51,5.51,0,0,0,.45.87,5.62,5.62,0,0,0,2.1,1.95h0a5.37,5.37,0,0,0,2.32.61v0h.3v0a5.37,5.37,0,0,0,2.32-.61h0a5.62,5.62,0,0,0,2.1-1.95,5.51,5.51,0,0,0,.45-.87,5.58,5.58,0,0,0,.39-2A5.45,5.45,0,0,0,123.81,151.75Z"
          />
          <path d="M123.81,151.75a6.14,6.14,0,0,0-4.77-2.2H119a6.14,6.14,0,0,0-4.77,2.2,5.31,5.31,0,0,0-.94,5.29.67.67,0,0,0,.06.15,6,6,0,0,0,4.33,3.53,5.8,5.8,0,0,0,1.32.14H119a6.44,6.44,0,0,0,3.2-.86,5.73,5.73,0,0,0,2.45-2.81.67.67,0,0,0,.06-.15,5.31,5.31,0,0,0-.94-5.29Z" />
          <polygon points="119.15 42 118.85 42 115.12 42 115.12 107.91 118.85 107.91 119.15 107.91 122.88 107.91 122.88 42 119.15 42" />
          <polygon
            className="vadercls-4"
            points="119.15 43.1 118.85 43.1 116.22 43.1 116.22 106.81 118.85 106.81 119.15 106.81 121.78 106.81 121.78 43.1 119.15 43.1"
          />
          <polygon
            className="vadercls-5"
            points="119.15 107.91 118.85 107.91 115.12 107.91 115.12 117.8 118.85 117.8 119.15 117.8 122.88 117.8 122.88 107.91 119.15 107.91"
          />
          <polygon
            className="vadercls-4"
            points="119.15 109.01 118.85 109.01 115.12 109.01 115.12 116.7 118.85 116.7 119.15 116.7 122.88 116.7 122.88 109.01 119.15 109.01"
          />
          <polygon
            className="vadercls-4"
            points="123.07 160.93 123.07 185.91 128.56 185.91 128.56 167.07 123.07 160.93"
          />
          <polygon
            className="vadercls-4"
            points="137.71 177.3 137.71 185.91 143.21 185.91 143.21 183.44 137.71 177.3"
          />
          <polygon
            className="vadercls-5"
            points="124.07 184.91 124.07 163.55 127.56 167.45 127.56 184.91 124.07 184.91"
          />
          <polygon
            className="vadercls-5"
            points="138.81 184.81 138.81 180.37 142.11 183.95 142.11 184.81 138.81 184.81"
          />
          <polygon
            className="vadercls-2"
            points="123.07 160.93 122.23 160 121.48 159.14 121.47 159.14 119.73 157.19 119.15 156.54 119.15 156.28 119.11 156.25 119 156.38 118.89 156.25 118.85 156.28 118.85 156.54 118.27 157.19 116.53 159.14 116.52 159.14 115.77 160 114.93 160.93 110.28 166.13 114.93 166.13 118.85 166.13 119.15 166.13 123.07 166.13 127.72 166.13 123.07 160.93"
          />
          <path
            className="vadercls-2"
            d="M121.26,157.19a2.72,2.72,0,0,0-2.11-1.44v-.05l-.15,0-.15,0v.05a2.72,2.72,0,0,0-2.42,2.7,3.1,3.1,0,0,0,.09.69,2.68,2.68,0,0,0,1.12,1.58,2.79,2.79,0,0,0,1.21.43v0l.15,0,.15,0v0a2.79,2.79,0,0,0,1.21-.43,2.68,2.68,0,0,0,1.12-1.58,3.1,3.1,0,0,0,.09-.69A2.7,2.7,0,0,0,121.26,157.19Z"
          />
          <circle className="vadercls-5" cx="152" cy="185.81" r="5.49" />
          <circle className="vadercls-4" cx="151.71" cy="185.81" r="4.92" />
        </svg>

        <svg id="goku" className="hair-style">
          <style>{`.cls-1{fill: ${fillColor};}.gokuhcls-2{fill: #fff; fill-opacity:1}.cls-3{fill: none;}}`}</style>
          <path
            className="cls-1"
            d="M67,152H42l19-15.15c-7.4-4-10.41-8.25-21-11.85a172.94,172.94,0,0,0-35-8,225.92,225.92,0,0,1,51-10L22,78,0,68l45-9.38a10.85,10.85,0,0,1,5.84.38L71,66,45,41l20-3L44,11c10.41.06,36.82,1.71,57,21a69.74,69.74,0,0,1,10,12q-4-22-8-44a114.13,114.13,0,0,1,29,52,47.9,47.9,0,0,1,27,13,46.58,46.58,0,0,1,11,17,126.31,126.31,0,0,1,56,0l-39,21a161.9,161.9,0,0,1,51,4l-55,25,12,3-27,12.81V117.12L154,129a61.89,61.89,0,0,0-3-11,61.07,61.07,0,0,0-5.11-10.48A109.34,109.34,0,0,1,130,143a87.76,87.76,0,0,0-4-40,88.61,88.61,0,0,0-28,35q-1-14.5-2-29L85,137a38.18,38.18,0,0,1-8-11,37.45,37.45,0,0,1-3-9l-3.3,5.7L68,120Z"
          />
          <path
            className="gokuhcls-2"
            d="M84,79c1,0,11.22-1.11,11.22-1.11A73.3,73.3,0,0,0,55,44c4.67-1.33,6.33-3.67,11-5L46.78,41.44C53.28,46,59.55,52.79,67,60A177.19,177.19,0,0,1,84,79Z"
          />
          <path
            className="gokuhcls-2"
            d="M51,17S65,38,66,38s17,1,17,1A173.33,173.33,0,0,0,66,26,174.22,174.22,0,0,0,51,17Z"
          />
          <polygon
            className="gokuhcls-2"
            points="106 9 113 47 120 56 112 18 106 9"
          />
          <path
            className="gokuhcls-2"
            d="M170,83l2,8a177,177,0,0,1,48-9,117,117,0,0,0-50,1Z"
          />
          <path
            className="gokuhcls-2"
            d="M127,103l8,4a32.61,32.61,0,0,1,1,7,34.46,34.46,0,0,1-4,17c-.38-4.6-1-9.63-2-15C129.13,111.31,128.1,107,127,103Z"
          />
          <path
            className="gokuhcls-2"
            d="M120,87h-7a72.15,72.15,0,0,0-16,23c0,5.67,1,11.33,1,17l8-24Z"
          />
          <path
            className="gokuhcls-2"
            d="M91,91,81,96a38.26,38.26,0,0,0,1,36,40.94,40.94,0,0,1-2-14C80.46,104.07,88,94.4,91,91Z"
          />
          <path
            className="gokuhcls-2"
            d="M63,132a169.64,169.64,0,0,0-24-11c-5.63-2.07-11-3.7-16-5l15-6c-4.22.17-9.33,1.7-15,3-6,1.37-11,2.22-15,4,12,1,18,2,28,6C45.83,126.93,54.57,128.84,63,132Z"
          />
          <path
            className="gokuhcls-2"
            d="M60,109l10-3L33,77q-5.67-2.07-12-4c-5.22-1.58-10.24-2.9-15-4,7.54,3.86,15.6,5.22,23,12C41,92,51.09,100.68,60,109Z"
          />
        </svg>
      </div>
    </div>
  );
};
export default Hair;
