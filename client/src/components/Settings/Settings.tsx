import React, { useState } from "react";
import "./Settings.scss";
import ColorPicker from "../../common/ColorPicker/ColorPicker";
import { useOuterClick } from "../../hooks/hooks";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setTheme } from "../../redux/actions/uiActions";

const mapActionsToProps = { setTheme };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Settings({ setTheme }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const innerRef = useOuterClick(() => setIsOpen(false));

  const toggleOpen = () => setIsOpen(!isOpen);

  const setDarkTheme = () => setTheme("dark");

  const setLightTheme = () => setTheme("light");

  const logout = () => {
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div
      ref={innerRef}
      onClick={toggleOpen}
      className={`settings-container dropdown is-right ${
        isOpen && "is-active"
      }`}
    >
      <div className="dropdown-trigger">
        <button
          className="button is-rounded settings-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <strong className="dropdown-item">Select theme:</strong>
          <div onClick={setDarkTheme} className="dropdown-item select-theme">
            Dark theme
          </div>
          <div onClick={setLightTheme} className="dropdown-item select-theme">
            Light theme
          </div>
          <hr className="break" />
          <strong className="dropdown-item">Select color:</strong>
          <ColorPicker />
          <hr className="break" />
          <strong
            onClick={logout}
            style={{ cursor: "pointer" }}
            className="dropdown-item logout"
          >
            Log out
          </strong>
        </div>
      </div>
    </div>
  );
}

export default connector(Settings);
