import React from "react";
import "./ImageFull.scss";
import { useOuterClick } from "../../hooks/hooks";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setImageUrlToOpen } from "../../redux/actions/uiActions";

const mapActionsToProps = { setImageUrlToOpen };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { url: string };

function ImageFull({ url, setImageUrlToOpen }: Props) {
  const closeImage = () => setImageUrlToOpen(null);
  const innerRef = useOuterClick(() => closeImage());

  return (
    <div className="image-full-container">
      <div className="image-full-close">
        <i className="fas fa-times"></i>
      </div>
      <img ref={innerRef} className="image-full" src={url}></img>
    </div>
  );
}

export default connector(ImageFull);
