import React from "react";

const Button = ({ name }) => {
  return (
    <div className="border p-1 rounded-sm bg-blue-500 text-white cursor-pointer hover:bg-blue-400">
      {name}
    </div>
  );
};

export default Button;
