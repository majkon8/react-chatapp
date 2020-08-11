import React from "react";
import "./ImageFull.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setImageUrlToOpen } from "../../redux/actions/uiActions";

const mapActionsToProps = { setImageUrlToOpen };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { url: string };

function ImageFull({ url, setImageUrlToOpen }: Props) {
  const closeImage = () => setImageUrlToOpen(null);

  return (
    <div onClick={closeImage} className="image-full-container">
      <div className="image-full-close">
        <i className="fas fa-times"></i>
      </div>
      <img className="image-full" src={url}></img>
    </div>
  );
}

export default connector(ImageFull);
