import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border p-1 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-400"
    >
      {name}
    </div>
  );
};

export default Button;
