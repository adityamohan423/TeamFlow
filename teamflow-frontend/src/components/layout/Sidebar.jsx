import React from "react";
import SidebarElement from "./SidebarElement";
import UserProfileCard from "../ui/UserProfileCard";

const Sidebar = () => {
  return (
    <div className=" px-6 py-4 border-r border-[#b9b6b6e4] h-full w-70 bg-gray-100 ">
      <div id="workbase" className="mb-8 border p-4 rounded-lg">
        WorkBase-1
      </div>
      <div className="flex flex-col gap-3 max-h-90 overflow-scroll">
        <SidebarElement />
        <SidebarElement />
        <SidebarElement />
        <SidebarElement />
        <SidebarElement />
        <SidebarElement />
      </div>
      <div id="profile" className="border-t border-[#b9b6b6e4] mt-8 pt-4">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default Sidebar;
