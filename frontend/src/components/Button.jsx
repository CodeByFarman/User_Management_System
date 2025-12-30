const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white"
};

const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
