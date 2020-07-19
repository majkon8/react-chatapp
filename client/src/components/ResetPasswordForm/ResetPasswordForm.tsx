import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../common/FormInput/FormInput";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
import { NavLink } from "react-router-dom";
import ErrorSuccessInfo from "../../common/ErrorSuccessInfo/ErrorSuccessInfo";
// redux
import { connect, ConnectedProps } from "react-redux";
import { resetPassword } from "../../redux/actions/userActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const mapActionsToProps = { resetPassword };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { token: string };

interface IFormInputs {
  password: string;
  confirm_password: string;
}

function ResetPasswordForm({ token, resetPassword, UI }: Props) {
  const { register, handleSubmit, errors, formState, getValues } = useForm<
    IFormInputs
  >({
    mode: "onChange",
  });
  const { dirtyFields, isSubmitted } = formState;

  const onSubmit = (data: IFormInputs) => {
    const requestData = { newPassword: data.password, token };
    if (!(Object.keys(errors).length === 0)) return;
    resetPassword(requestData);
  };

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
      <SubmitButton
        hasMarginTop={false}
        text="Reset password"
        disabled={!dirtyFields.password || !dirtyFields.confirm_password}
        loading={UI.loading}
      />
      <span className="is-pulled-left info">
        <NavLink to="/login">Sign in</NavLink>
      </span>
      <ErrorSuccessInfo error={UI.error} success={UI.success} />
    </form>
  );
}

export default connector(ResetPasswordForm);
