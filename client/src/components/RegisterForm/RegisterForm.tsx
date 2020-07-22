import React from "react";
import { useForm } from "react-hook-form";
import "./RegisterForm.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";
import FormInput from "../../common/FormInput/FormInput";
import DateSelect from "../../common/DateSelect/DateSelect";
import ErrorSuccessInfo from "../../common/ErrorSuccessInfo/ErrorSuccessInfo";
import SubmitButton from "../../common/SubmitButton/SubmitButton";
// redux
import { connect, ConnectedProps } from "react-redux";
import { signup } from "../../redux/actions/userActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ UI: state.UI });
const mapActionsToProps = { signup };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IFormInputs {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  day: string;
  month: string;
  year: string;
  date: string;
  terms: boolean;
}

function RegisterForm({ signup, UI }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<IFormInputs>({
    mode: "onChange",
  });
  const { dirtyFields, isSubmitted } = formState;

  const onSubmit = (data: IFormInputs) => {
    const { email, username, password } = { ...data };
    if (!(Object.keys(errors).length === 0)) return;
    if (username !== username.trim())
      setError("username", {
        type: "manual",
        message: "Cannot start or end with space",
      });
    const birthDate = new Date(+data.year, +data.month, 1 + +data.day);
    const userData = { email, username, password, birthDate };
    signup(userData);
  };

  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  const years = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    years.push(i);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (date: { [key: string]: string }) => {
    let { day, month, year } = date;
    +day < 9 ? (day = `0${+day + 1}`) : (day = `${+day + 1}`);
    +month < 9 ? (month = `0${+month + 1}`) : (month = `${+month + 1}`);
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const validDate = (date: string) =>
    moment(date, "DD-MM-YYYY", true).isValid();

  const validAge = (date: string) => {
    const today = moment();
    const birthDay = moment(date, "DD-MM-YYYY");
    const difference = today.diff(birthDay, "years", true);
    if (difference <= 13) return false;
    return true;
  };

  const validateBirthDateInput = () => {
    if (!dirtyFields.day || !dirtyFields.month || !dirtyFields.year)
      return true;
    const formattedDate = formatDate(getValues(["day", "month", "year"]));
    if (!validDate(formattedDate)) {
      setError("date", {
        type: "manual",
        message: "Privided date is incorrect",
      });
      return false;
    }
    if (!validAge(formattedDate)) {
      setError("date", {
        type: "manual",
        message: "You have to be at least 13 years old",
      });
      return false;
    }
    clearErrors("date");
    return true;
  };

  return (
    <form className="form register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Sign up to ChatApp</div>
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.email}
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
        error={errors.username}
        name="username"
        type="text"
        placeholder="Username"
        iconClass="fas fa-user"
        ref={register({
          required: { value: true, message: "This field is required" },
          maxLength: { value: 30, message: "Maximum 30 characters" },
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
      <FormInput
        isSubmitted={isSubmitted}
        error={errors.confirm_password}
        name="confirm_password"
        type="password"
        placeholder="Confirm password"
        iconClass="fas fa-lock"
        ref={register({
          required: { value: true, message: "This field is required" },
          validate: (value: string) =>
            value === getValues("password") ? true : "Passwords must match",
        })}
      />
      <span className="birth-date-label">Date of birth</span>
      <div className="date-selects">
        <DateSelect
          name="day"
          defaultValue="Day"
          options={days}
          ref={register({
            validate: validateBirthDateInput,
          })}
        />
        <DateSelect
          name="month"
          defaultValue="Month"
          options={months}
          ref={register({
            validate: validateBirthDateInput,
          })}
          optionsAreMonths
        />
        <DateSelect
          name="year"
          defaultValue="Year"
          options={years}
          ref={register({
            validate: validateBirthDateInput,
          })}
        />
      </div>
      {isSubmitted && errors.date && (
        <span className="has-text-danger is-pulled-left error date-error">
          {errors.date?.message}
        </span>
      )}
      <label className="is-pulled-left checkbox-label info">
        <input
          ref={register({
            required: true,
          })}
          className="checkbox"
          type="checkbox"
          name="terms"
        />{" "}
        I agree to the <a href="/terms">terms and conditions</a>
      </label>
      <SubmitButton
        hasMarginTop={false}
        text="Sign up"
        disabled={
          Object.keys(dirtyFields).length === 0 ||
          Object.keys(dirtyFields).length !== Object.keys(getValues()).length
        }
        loading={UI.loading}
      />
      <span className="is-pulled-left info">
        <NavLink to="/login">Already signed up?</NavLink>
      </span>
      <ErrorSuccessInfo error={UI.error} success={UI.success} />
    </form>
  );
}

export default connector(RegisterForm);
