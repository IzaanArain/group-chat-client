import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUser } from "../../features/slices/AuthSlice";
const ProfileMenu = () => {
  const user = useSelector(getUser);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="px-3">
          <FaBell style={{ fontSize: "25px" }} />
        </div>
        <div id="profile menu">
          <DropdownButton as={ButtonGroup} title="dropdown" variant="white">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
