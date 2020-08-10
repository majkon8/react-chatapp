import React from "react";
import "./File.scss";

interface IProps {
  name: string;
  url: string;
}

export default function File({ name, url }: IProps) {
  const downloadUrl = window.URL.createObjectURL(new Blob([url]));
  return (
    <a
      target="_blank"
      download={name}
      href={downloadUrl}
      className="file-name"
      title="Download file"
    >
      <i className="far fa-file-alt"></i>
      {name}
    </a>
  );
}
