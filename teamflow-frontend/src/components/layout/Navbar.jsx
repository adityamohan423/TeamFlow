import React, { useState } from "react";
import {
  PanelRightOpen,
  PanelRightClose,
  LayoutGrid,
  Bell,
  CircleQuestionMark,
  Settings,
} from "lucide-react";
import Seachbar from "../ui/Seachbar";
import Button from "../ui/Button";

const Navbar = () => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const iconSize = 22;
  const stroke = 1;
  return (
    <div className="h-14 border-b border-[#ccc9c9db] flex items-center justify-between px-4">
      <div id="nav_first" className="flex gap-4 ">
        <div>
          {sidebarDisplay ? (
            <PanelRightOpen size={`${iconSize}`} strokeWidth={`${stroke}`} />
          ) : (
            <PanelRightClose size={`${iconSize}`} strokeWidth={`${stroke}`} />
          )}
        </div>
        <div>
          <LayoutGrid size={`${iconSize}`} strokeWidth={`${stroke}`} />
        </div>
      </div>
      <div id="nav_middle">
        <div className="flex gap-2 justify-center">
          <Seachbar />
          <Button name={"+ Create"} />
        </div>
      </div>
      <div id="nav_end" className="flex gap-4">
        <Bell size={`${iconSize}`} strokeWidth={`${stroke}`} />
        <CircleQuestionMark size={`${iconSize}`} strokeWidth={`${stroke}`} />
        <Settings size={`${iconSize}`} strokeWidth={`${stroke}`} />
      </div>
    </div>
  );
};

export default Navbar;
