
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled: disabled:pointer-events-none";

    const variants = {
        primary: "bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-[#00a8ae]",
        secondary: "bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-[#00a8ae]",
        outline: "border-2 border-secondary text-secondary dark:border-secondary dark:text-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10",
        ghost: "text-secondary dark:text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20"
    };

    const sizes = {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-full",
        lg: "h-14 px-8 text-base rounded-lg"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
