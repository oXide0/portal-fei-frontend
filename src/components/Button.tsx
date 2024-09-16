import clsx from "clsx";
import React from "react";

const sizes = ["sm", "base", "l", "xl"] as const;
const variants = ["primary", "secondary", "transparent", "ghost"] as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: (typeof sizes)[number];
    variant?: (typeof variants)[number];
    children?: React.ReactNode;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disableButtonStyles?: boolean;
    onlyIcon?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
    size = "base",
    variant = "primary",
    children,
    disabled = false,
    startIcon,
    endIcon,
    disableButtonStyles = false,
    onlyIcon,
    className,
    onClick,
    ...rest
}: ButtonProps) => {
    const baseStyles = `inline-flex items-center justify-center font-medium rounded focus:outline-none transition duration-150 ease-in-out ${className}`;

    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        base: "px-4 py-2 text-base",
        l: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
    };

    const variantClasses = {
        primary: "bg-header text-white hover:bg-black",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        transparent: "bg-transparent text-blue-500 hover:bg-blue-50",
        ghost: "bg-white border border-gray-300 hover:bg-gray-100",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed";

    const buttonClasses = clsx(
        baseStyles,
        sizeClasses[size],
        variantClasses[variant],
        disabled && disabledClasses,
        disableButtonStyles && "p-0"
    );

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {onlyIcon ? onlyIcon : children}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};

export default Button;
