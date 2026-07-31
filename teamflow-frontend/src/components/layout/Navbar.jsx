import React, { useState } from "react";
import axios from "axios";

import { IoGrid } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { LuPanelRightOpen, LuPanelLeftOpen } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import Searchbar from "../ui/Searchbar";
import { IoIosSettings } from "react-icons/io";
import Button from "../ui/Button";

const Navbar = () => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const [searchText, setSearchText] = useState("");
  const iconSize = 24;
  const stroke = 1.25;

  const handleCreateClick = async () => {
    try {
      const response = await axios.post(
        "https://teamflow-1tzb.onrender.com/users",
        {
          name: "MohanJi",
          email: "mohan007@gmail.com",
          password: "123",
          passCode: "12321",
        },
      );

      // Axios automatically parses the JSON, data is in response.data
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Failed to send string:", error.message);
    }
  };

  return (
    <div className="h-16 border-b border-[#ccc9c9db] flex items-center justify-between px-4 font-sans">
      <div id="nav_first" className="flex gap-3 items-center">
        <div className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-md">
          {sidebarDisplay ? (
            <LuPanelRightOpen
              size={`${iconSize + 3}`}
              className="text-gray-600"
            />
          ) : (
            <LuPanelLeftOpen
              size={`${iconSize + 3}`}
              className="text-gray-600"
            />
          )}
        </div>
        <div className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-md">
          <BsFillGrid3X3GapFill
            size={`${iconSize}`}
            className="text-gray-600"
          />
        </div>
        <div>
          <img
            src="/teamflowLogo.png"
            alt=""
            className="w-10 sm:hidden cursor-pointer"
          />
          <img
            src="/teamflow.png"
            alt=""
            className="hidden sm:block sm:w-20 md:w-30 sm:ml-2 md:ml-4 lg:ml-6 cursor-pointer"
          />
        </div>
      </div>

      <div id="nav_middle">
        <div className="flex gap-2 justify-center">
          <Button onClick={handleCreateClick} name={"Create"} />
          <div className="hidden sm:block sm:w-50 md:w-60 lg:w-100 ">
            <Searchbar searchText={searchText} setSearchText={setSearchText} />
          </div>
        </div>
      </div>

      <div id="nav_end" className="flex gap-3 items-center">
        <div className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-md">
          <FaBell size={`${iconSize - 3}`} className="text-gray-600" />
        </div>
        <div className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-md">
          <BsFillQuestionCircleFill
            size={`${iconSize - 3}`}
            className="text-gray-600"
          />
        </div>
        <div className="cursor-pointer hover:bg-gray-200 p-0.5 rounded-md">
          <IoIosSettings size={`${iconSize + 1}`} className="text-gray-600" />
        </div>
        <div id="Avatar" className="bg-black rounded-full cursor-pointer w-6">
          hel
        </div>
      </div>
    </div>
  );
};

export default Navbar;
