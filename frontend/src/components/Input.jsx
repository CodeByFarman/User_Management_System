const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${error ? "border-red-500" : "border-gray-300"}
        ${className}`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
