import React from "react";
import "./ColorPicker.scss";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setColor } from "../../redux/actions/uiActions";

const mapActionsToProps = { setColor };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ColorPicker({ setColor }: Props) {
  const handleColorChange = (color: string) => setColor(color);

  const colors = [
    "rgb(84, 89, 230)",
    "rgb(0, 31, 63)",
    "rgb(127, 219, 255)",
    "rgb(57, 204, 204)",
    "rgb(61, 153, 112)",
    "rgb(46, 204, 64)",
    "rgb(1, 255, 112)",
    "rgb(255, 220, 0)",
    "rgb(255, 133, 27)",
    "rgb(255, 65, 54)",
    "rgb(133, 20, 75)",
    "rgb(240, 18, 190)",
    "rgb(177, 13, 201)",
    "rgb(17, 17, 17)",
    "rgb(170, 170, 170)",
    "rgb(221, 221, 221)",
  ];

  return (
    <div className="color-picker-container">
      {colors.map((color) => (
        <div
          key={color}
          style={{ backgroundColor: color }}
          className="color"
          onClick={() => handleColorChange(color)}
        ></div>
      ))}
    </div>
  );
}

export default connector(ColorPicker);
