import { cn } from "../../../lib/utils.jsx";

const Button = ({ children, type, className, ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "px-4 py-2 rounded-lg text-white font-bold font-mono bg-rose-500 hover:bg-rose-600",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
