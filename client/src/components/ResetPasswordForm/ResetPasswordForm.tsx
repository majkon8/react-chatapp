import React from "react";
import { useForm } from "react-hook-form";

interface IFormInputs {
  password: string;
  confirm_password: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, errors, formState, getValues } = useForm<
    IFormInputs
  >({
    mode: "onChange",
  });
  const { dirtyFields, isSubmitted } = formState;

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="form register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Reset password</div>

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
          placeholder="New password"
          ref={register({
            required: { value: true, message: "This field is required" },
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

      {isSubmitted && errors.confirm_password && (
        <span className="has-text-danger is-pulled-left error">
          {errors.confirm_password?.message}
        </span>
      )}
      <div className="control has-icons-left">
        <input
          className={
            "input is-large is-black has-text-white" +
            (isSubmitted && errors.confirm_password ? " is-error" : "")
          }
          name="confirm_password"
          type="password"
          placeholder="Confirm new password"
          ref={register({
            required: { value: true, message: "This field is required" },
            validate: (value: string) =>
              value === getValues("password") ? true : "Passwords must match",
          })}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </div>

      <input
        className="button is-primary is-medium register-button"
        type="submit"
        value="Sign in"
        disabled={!dirtyFields.password || !dirtyFields.confirm_password}
      />
    </form>
  );
}
