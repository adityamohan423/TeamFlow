import React from "react";

const SidebarElement = () => {
  return (
    <div className="group border border-[#dfddddbe] hover:bg-[#dfddddbe] hover:transition duration-150 px-4 py-3 rounded-lg flex justify-between items-center shadow">
      <div id="name">Projects</div>
      <div
        id="count"
        className="rounded-full bg-gray-200 w-6 flex justify-center items-center group-hover:bg-gray-300 hover:transition duration-150"
      >
        3
      </div>
    </div>
  );
};

export default SidebarElement;
