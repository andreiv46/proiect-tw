import { cn } from "../../../lib/utils";

const Input = ({ className, value, placeholder, type, ...props }) => {
  return (
    <input
      className={cn("bg-gray-200 px-4 py-2 rounded-lg w-64", className)}
      type={type}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};

export default Input;
