import React from "react";
import Claude from "../images/Claude.jpg";
const Header = () => {
  return (
    <div className="flex justify-center items-center gap-3 p-4 shadow-md">
      <img src={Claude} alt="illustration cuisinier" className="w-16" />
      <h1 className="text-2xl">Chef Claude</h1>
    </div>
  );
};

export default Header;
