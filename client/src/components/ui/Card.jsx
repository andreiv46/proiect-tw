const Card = ({ children }) => {
  return (
    <div
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-2xl
      dark:bg-teal-600/60 dark:border-gray-500 dark:text-white text-black font-mono 
      transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
    >
      {children}
    </div>
  );
};

export default Card;
