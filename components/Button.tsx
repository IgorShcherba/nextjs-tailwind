import React from "react";
import { classNames } from "utils/classNames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullwidth?: boolean;
  color?: "primary" | "success" | "danger" | "warning" | "dark";
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  submit?: boolean;
}

type ButtonSizes = {
  sm: string;
  md: string;
  lg: string;
};

type ButtonRef = React.ForwardedRef<HTMLButtonElement>;

type Colors = {
  primary: string;
  success: string;
  danger: string;
  dark: string;
  warning: string;
};

const colors = (rounded?: boolean): Colors => ({
  primary: classNames(
    rounded
      ? "border-blue-700 border-2 text-blue-700 active:bg-blue-700 active:text-white"
      : "bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-200"
  ),

  success: classNames(
    rounded
      ? "border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white"
      : "bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-200"
  ),

  danger: classNames(
    rounded
      ? "border-red-600 border-2 text-red-600 active:bg-red-600 active:text-white"
      : "bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-200"
  ),
  dark: classNames(
    rounded
      ? "border-black border-2 text-gray-900 active:bg-black active:text-white"
      : "bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-200"
  ),
  warning: classNames(
    rounded
      ? "border-yellow-500 border-2 text-yellow-500 active:bg-yellow-500 active:text-white"
      : "bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-200"
  ),
});

const sizes: ButtonSizes = {
  sm: "px-6 py-1 text-sm",
  md: "px-6 py-2",
  lg: "px-6 py-3 text-lg",
};

export const Button = React.forwardRef(
  (
    {
      isFullwidth,
      children,
      className,
      color,
      disabled,
      outline,
      rounded,
      size,
      submit,
      ...props
    }: ButtonProps,
    ref: ButtonRef
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        type={submit ? "submit" : "button"}
        disabled={disabled}
        className={classNames(
          isFullwidth && "flex justify-center w-full",
          disabled && "opacity-60 cursor-not-allowed",
          color && colors(outline)[color],
          size && sizes[size],
          rounded ? "rounded-full" : "rounded-md",
          className,
          "text-white focus:outline-none shadow font-medium transition ease-in duration-200"
        )}
      >
        {children}
      </button>
    );
  }
);

Button.defaultProps = {
  size: "md",
  color: "dark",
  rounded: false,
};
