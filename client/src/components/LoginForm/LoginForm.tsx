import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { NavLink } from "react-router-dom";
import FormInput from "../../common/FormInput/FormInput";
import ErrorSuccessInfo from "../../common/ErrorSuccessInfo/ErrorSuccessInfo";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
// redux
import { connect, ConnectedProps } from "react-redux";
import { login, forgotPassword } from "../../redux/actions/userActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const mapActionsToProps = { login, forgotPassword };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IFormInputs {
  email: string;
  password: string;
}

function LoginForm({ login, forgotPassword, UI }: Props) {
  const [showEmailError, setShowEmailError] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
  } = useForm<IFormInputs>({
    mode: "onChange",
  });
  const { dirtyFields } = formState;
  let { isSubmitted } = formState;

  const onSubmit = (data: IFormInputs) => {
    const userData = { email: data.email, password: data.password };
    if (!(Object.keys(errors).length === 0)) return;
    login(userData);
  };

  const handleForgotPassword = () => {
    const email = getValues("email");
    if (!email)
      setError("email", {
        type: "manual",
        message: "This field is required",
      });
    if (errors.email) {
      setShowEmailError(true);
      return;
    }
    forgotPassword(email);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Sign in to ChatApp</div>
      <div className="social-sign-buttons-container">
        <FacebookLogin />
        <GoogleLogin />
      </div>
      <div className="line-text">OR</div>
      <div className="line"></div>
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.email}
        showEmailError={showEmailError}
        name="email"
        type="email"
        placeholder="Email"
        iconClass="fas fa-envelope"
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
        iconClass="fas fa-lock"
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
        <a onClick={handleForgotPassword}>Forgot password?</a>
      </span>
      <SubmitButton
        hasMarginTop={true}
        text="Sign in"
        disabled={!dirtyFields.email || !dirtyFields.password}
        loading={UI.loading}
      />
      <span className="is-pulled-left info">
        Don't have an account? <NavLink to="/register">Sign up</NavLink>
      </span>
      <ErrorSuccessInfo error={UI.error} success={UI.success} />
    </form>
  );
}

export default connector(LoginForm);
