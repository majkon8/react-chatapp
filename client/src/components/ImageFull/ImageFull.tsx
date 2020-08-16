import React from "react";
import "./ImageFull.scss";
import { useOuterClick } from "../../hooks/hooks";
import { createPortal } from "react-dom";

interface IProps {
  url: string;
  closeImage(): void;
}

export default function ImageFull({ url, closeImage }: IProps) {
  const innerRef = useOuterClick(() => closeImage());

  return createPortal(
    <div className="image-full-container">
      <div className="image-full-close">
        <i className="fas fa-times"></i>
      </div>
      <img ref={innerRef} className="image-full" src={url}></img>
    </div>,
    // @ts-ignore
    document.getElementById("main-container")
  );
}
