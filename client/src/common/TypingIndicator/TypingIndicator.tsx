import React from "react";
import "./TypingIndicator.scss";

interface IProps {
  showImage: boolean;
  changeBackgroundColor?: boolean;
}

export default function TypingIndicator({
  showImage,
  changeBackgroundColor,
}: IProps) {
  return (
    <div className="typing-indicator-container">
      {showImage && (
        <img
          className="typing-indicator-user-image"
          src="https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
          alt="user"
        ></img>
      )}
      <div
        className={`typing-indicator ${
          changeBackgroundColor && "typing-indicator-change-background-color"
        }`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
