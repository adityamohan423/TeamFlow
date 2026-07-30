import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = ({ searchText, setSearchText }) => {
  return (
    <div className="flex gap-1 items-center w-full h-full border p-1 rounded-lg border-[#ccc9c9e4] shadow">
      <IoSearch className=" left-3 text-gray-400 text-lg pointer-events-none" />
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className=" h-full w-full focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default Searchbar;
