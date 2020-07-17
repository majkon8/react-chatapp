import React, { forwardRef } from "react";

interface IProps {
  name: string;
  defaultValue: string;
  options: (string | number)[];
  optionsAreMonths?: boolean;
}

function DateSelect(props: IProps, ref: any) {
  const { name, defaultValue, options, optionsAreMonths } = props;
  return (
    <div className="select">
      <select name={name} ref={ref} defaultValue={defaultValue}>
        <option value={defaultValue} disabled hidden>
          {defaultValue}
        </option>
        {!optionsAreMonths
          ? options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))
          : options.map((option, index) => (
              <option value={index} key={index}>
                {option}
              </option>
            ))}
      </select>
    </div>
  );
}

export default forwardRef(DateSelect);
