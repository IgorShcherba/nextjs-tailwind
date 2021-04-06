import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  name: string;
}

type InputRef = ForwardedRef<HTMLInputElement>;

const classes = {
  default: `rounded-sm flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base `,
  focusBorder: `focus:outline-none focus:ring-2 focus:border-transparent border border-gray-300 border-transparent`,
  errorMessage: `text-sm text-red-500 mb-6`,
};

const Input = forwardRef(
  (
    {
      isRequired,
      error,
      errorMessage,
      label,
      name,
      placeholder,
      ...rest
    }: InputProps,
    ref: InputRef
  ) => {
    return (
      <div className="relative">
        <label htmlFor={name} className="text-gray-700">
          {label}
          {isRequired && <span className="text-red-500 pl-0.5">*</span>}
        </label>
        <input
          {...rest}
          ref={ref}
          name={name}
          placeholder={placeholder}
          className={` 
          ${classes.default} ${classes.focusBorder} `}
        />
        {error && <p className={classes.errorMessage}>{errorMessage}</p>}
      </div>
    );
  }
);

export default Input;
