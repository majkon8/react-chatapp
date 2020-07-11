import React from "react";
import { useForm } from "react-hook-form";
import "./RegisterForm.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";

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

export default function RegisterForm() {
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

  const onSubmit = (data: any) => console.log(data);

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

  const validateDate = (date: { [key: string]: string }) => {
    let { day, month, year } = date;
    +month < 9 ? (month = `0${+month + 1}`) : (month = `${+month + 1}`);
    return moment(`${day}-${month}-${year}`, "DD-MM-YYY", true).isValid();
  };

  const validateBirthDateInput = () => {
    if (!dirtyFields.day || !dirtyFields.month || !dirtyFields.year)
      return true;
    if (validateDate(getValues(["day", "month", "year"]))) {
      clearErrors("date");
      return true;
    }
    setError("date", { type: "manual", message: "Privided date is incorrect" });
    return false;
  };

  return (
    <form className="form register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Sign up to ChatApp</div>

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

      {isSubmitted && errors.username && (
        <span className="has-text-danger is-pulled-left">
          {errors.username?.message}
        </span>
      )}
      <div className="control has-icons-left">
        <input
          className={
            "input is-large is-black has-text-white" +
            (isSubmitted && errors.username ? " is-error" : "")
          }
          name="username"
          type="text"
          placeholder="Username"
          ref={register({
            required: { value: true, message: "This field is required" },
            maxLength: { value: 30, message: "Maximum 30 characters" },
          })}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-user"></i>
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
          placeholder="Confirm password"
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

      <span className="birth-date-label">Date of birth</span>
      <div className="date-selects">
        <div className="select">
          <select
            name="day"
            ref={register({
              validate: validateBirthDateInput,
            })}
            defaultValue="Day"
          >
            <option value="Day" disabled hidden>
              Day
            </option>
            {days.map((day) => (
              <option value={day} key={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            name="month"
            ref={register({
              validate: validateBirthDateInput,
            })}
            defaultValue="Month"
          >
            <option value="Month" disabled hidden>
              Month
            </option>
            {months.map((month, index) => (
              <option value={index} key={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select
            name="year"
            ref={register({
              validate: validateBirthDateInput,
            })}
            defaultValue="Year"
          >
            <option value="Year" disabled hidden>
              Year
            </option>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
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

      <input
        className="button is-primary is-medium register-button"
        type="submit"
        value="Sign in"
        disabled={
          Object.keys(dirtyFields).length === 0 ||
          Object.keys(dirtyFields).length !== Object.keys(getValues()).length
        }
      />

      <span className="is-pulled-left info">
        <NavLink to="/login">Already signed up?</NavLink>
      </span>
    </form>
  );
}
