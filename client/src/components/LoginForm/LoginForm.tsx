import React from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { NavLink } from "react-router-dom";

interface IFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
  });
  const { dirtyFields, isSubmitted } = formState;

  const onSubmit = (data: any) => console.log();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Sign in to ChatApp</div>

      <div className="social-sign-buttons-container">
        <button className="button facebook-button">
          <i className="fab fa-facebook-f" aria-hidden="true"></i>
        </button>
        <button className="button google-button">
          <i className="fab fa-google" aria-hidden="true"></i>
        </button>
      </div>

      <div className="line-text">OR</div>
      <div className="line"></div>

      {isSubmitted && errors.email && (
        <span className="has-text-danger is-pulled-left">
          {errors.email?.message}
        </span>
      )}
      <div className="control has-icons-left">
        <input
          className={
            "input is-large is-black has-text-white" +
            (isSubmitted && errors.email ? " is-error" : "")
          }
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
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>

      {isSubmitted && errors.password && (
        <span className="has-text-danger is-pulled-left error">
          {errors.password?.message}
        </span>
      )}
      <div className="control has-icons-left">
        <input
          className={
            "input is-large is-black has-text-white" +
            (isSubmitted && errors.password ? " is-error" : "")
          }
          name="password"
          type="password"
          placeholder="Password"
          ref={register({
            required: true,
            minLength: { value: 8, message: "Password too short" },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: "Password too weak",
            },
          })}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </div>

      <span className="is-pulled-left forgot info">
        <a>Forgot password?</a>
      </span>

      <input
        className="button is-primary is-medium"
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
