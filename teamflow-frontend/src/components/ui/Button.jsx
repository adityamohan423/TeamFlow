import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-1 rounded-md bg-[#0052cc] text-white cursor-pointer  text-xs md:text-lg hover:scale-101 hover:transition duration-200 hover:shadow hover:shadow-gray-300"
    >
      {name}
    </div>
  );
};

export default Button;
