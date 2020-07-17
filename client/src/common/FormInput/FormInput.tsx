import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import "./FormInput.scss";

interface IProps {
  isSubmitted: boolean;
  error: FieldError | undefined;
  name: string;
  type: string;
  placeholder: string;
}

function FormInput(props: IProps, ref: any) {
  const { isSubmitted, error, name, type, placeholder } = props;
  return (
    <>
      {isSubmitted && error && (
        <span className="has-text-danger is-pulled-left">{error.message}</span>
      )}
      <div className="control has-icons-left">
        <input
          className={
            "input is-large is-black has-text-white" +
            (isSubmitted && error ? " is-error" : "")
          }
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>
    </>
  );
}

export default forwardRef(FormInput);
