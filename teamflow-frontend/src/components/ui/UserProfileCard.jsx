import React from "react";
import { FaAngleRight } from "react-icons/fa6";

const UserProfileCard = () => {
  return (
    <div className="bg-white border border-[#dfddddbe] p-4 rounded-lg flex justify-between items-center shadow cursor-pointer">
      <img
        src="/teamflowLogo.png"
        alt=""
        className="w-10 h-10 border border-[#dfddddbe]  object-cover object-center rounded-full overflow-hidden "
      />
      <div id="name_of_user" className="flex flex-col text-sm font-light mr-8">
        <div id="name">Aditya Mohan</div>
        <div id="emial">adm@gmail.com</div>
      </div>
      <FaAngleRight />
    </div>
  );
};

export default UserProfileCard;
