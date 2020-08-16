import React, { useState } from "react";
import "./MessageImage.scss";
import ImageFull from "../ImageFull/ImageFull";

interface IProps {
  url: string;
}

export default function MessageImage({ url }: IProps) {
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);

  const openFullImage = () => setIsFullImageOpen(true);

  const closeFullImage = () => setIsFullImageOpen(false);

  return (
    <>
      <img onClick={openFullImage} className="image-small" src={url}></img>
      {isFullImageOpen && <ImageFull url={url} closeImage={closeFullImage} />}
    </>
  );
}
