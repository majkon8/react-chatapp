import React from "react";
import "./SubmitButton.scss";
import { CircularProgress } from "@material-ui/core";

interface IProps {
  loading: boolean;
  disabled: boolean;
  hasMarginTop: boolean;
  text: string;
}

export default function SubmitButton({
  loading,
  disabled,
  hasMarginTop,
  text,
}: IProps) {
  return (
    <button
      className={`button form-button is-primary is-medium ${
        !hasMarginTop && "register-button"
      }`}
      type="submit"
      disabled={disabled}
    >
      {loading ? <CircularProgress color="inherit" /> : text}
    </button>
  );
}
