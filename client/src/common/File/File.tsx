import React from "react";
import "./File.scss";
import { saveAs } from "file-saver";
import { BrowserView, MobileView } from "react-device-detect";

interface IProps {
  name: string;
  url: string;
}

export default function File({ name, url }: IProps) {
  const handleDownload = () => {
    saveAs(url, name);
  };
  return (
    <>
      <BrowserView>
        <a onClick={handleDownload} className="file-name" title="Download file">
          <i className="far fa-file-alt"></i>
          {name}
        </a>
      </BrowserView>
      {/* on mobile browsers open in new tab instead of downloading */}
      <MobileView>
        <a
          href={url}
          target="_blank"
          className="file-name"
          title="Download file"
        >
          <i className="far fa-file-alt"></i>
          {name}
        </a>
      </MobileView>
    </>
  );
}
