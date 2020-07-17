import React from "react";
import "./ErrorSuccessInfo.scss";

interface IProps {
  error: string | null;
  success: string | null;
}

export default function ErrorSuccessInfo({ error, success }: IProps) {
  return (
    <>
      {error && (
        <p className="message error-message has-background-danger">{error}</p>
      )}
      {success && (
        <p className="message error-message has-background-success">
          {success}
        </p>
      )}
    </>
  );
}
