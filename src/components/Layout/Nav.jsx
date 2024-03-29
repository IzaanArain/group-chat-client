import React from "react";
import SearchUser from "./SearchUser";
import ProfileMenu from "./ProfileMenu";
const Nav = () => {
  return (
    <>
      <div className="shadow py-2 d-flex justify-content-between align-items-center w-100 px-5 bg-white border border-3 border-secondary-subtle">
        <SearchUser />
        <span
          style={{
            fontFamily: "Work sans",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Group-Chat
        </span>
        <ProfileMenu/>
      </div>
    </>
  );
};

export default Nav;
