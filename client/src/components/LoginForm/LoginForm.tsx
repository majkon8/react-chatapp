import React from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { NavLink } from "react-router-dom";
import FormInput from "../../common/FormInput/FormInput";

interface IFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
  });
  const { dirtyFields, isSubmitted } = formState;

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Sign in to ChatApp</div>
      <div className="social-sign-buttons-container">
        <button className="button form-button facebook-button">
          <i className="fab fa-facebook-f" aria-hidden="true"></i>
        </button>
        <button className="button form-button google-button">
          <i className="fab fa-google" aria-hidden="true"></i>
        </button>
      </div>
      <div className="line-text">OR</div>
      <div className="line"></div>
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.email}
        name="email"
        type="email"
        placeholder="Email"
        ref={register({
          required: { value: true, message: "This field is required" },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email address incorrect",
          },
        })}
      />
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.password}
        name="password"
        type="password"
        placeholder="Password"
        ref={register({
          required: { value: true, message: "This field is required" },
          minLength: { value: 8, message: "Password too short" },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: "Password too weak",
          },
        })}
      />
      <span className="is-pulled-left forgot info">
        <a>Forgot password?</a>
      </span>
      <input
        className="button form-button is-primary is-medium"
        type="submit"
        value="Sign in"
        disabled={!dirtyFields.email || !dirtyFields.password}
      />
      <span className="is-pulled-left info">
        Don't have an account? <NavLink to="/register">Sign up</NavLink>
      </span>
    </form>
  );
}
