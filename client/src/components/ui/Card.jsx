const Card = ({ children }) => {
  return (
    <div
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-500
       dark:border-gray-500 text-white font-mono"
    >
      {children}
    </div>
  );
};

export default Card;
