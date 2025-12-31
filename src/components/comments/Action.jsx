const Action = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs cursor-pointer hover:text-blue-400"
    >
      {type}
    </button>
  );
};

export default Action;
