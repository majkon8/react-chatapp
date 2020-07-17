import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../common/FormInput/FormInput";

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
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.confirm_password}
        name="confirm_password"
        type="password"
        placeholder="Confirm password"
        ref={register({
          required: { value: true, message: "This field is required" },
          validate: (value: string) =>
            value === getValues("password") ? true : "Passwords must match",
        })}
      />
      <input
        className="button form-button is-primary is-medium register-button"
        type="submit"
        value="Sign in"
        disabled={!dirtyFields.password || !dirtyFields.confirm_password}
      />
    </form>
  );
}
