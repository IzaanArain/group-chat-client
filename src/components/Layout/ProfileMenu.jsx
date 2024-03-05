import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getUser } from "../../features/slices/AuthSlice";
import { OverlayTrigger } from "react-bootstrap";
import RenderTooltips from "../RenderTooltips";
import PopoverTooltips from "../PopoverTooltips";
import Popover from "react-bootstrap/Popover";
const ProfileMenu = () => {
  const user = useSelector(getUser);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-3">
          <FaBell style={{ fontSize: "25px" }} />
        </div>
        <div id="profile menu">
          <Dropdown as={ButtonGroup}>
            <OverlayTrigger
              // trigger="click"
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              // overlay={<PopoverTooltips name={user.name} />}
              overlay={
                <Popover id="popover-basic">
                  <Popover.Header
                    as="h3"
                    className="px-2 py-3 d-flex align-items-center justify-content-center"
                  >
                    <Image
                    src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
                    alt=""
                    width={"100px"}
                    height={"100px"}
                    roundedCircle
                  />
                  <span className="px-3">{user.name}</span>
                  </Popover.Header>
                  <Popover.Body>
                    And here's some <strong>amazing</strong> content. It's very
                    engaging. right?
                  </Popover.Body>
                </Popover>
              }
            >
              {({ ref, ...triggerHandler }) => (
                <Button
                  variant="transparent"
                  {...triggerHandler}
                  //  className="d-flex align-items-center"
                  className="d-inline-flex align-items-center"
                >
                  <Image
                    ref={ref}
                    src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
                    alt=""
                    width={"30px"}
                    height={"30px"}
                    //  className="rounded-circle"
                    roundedCircle
                  />
                  <span className="px-2">{user.name}</span>
                </Button>
              )}
              {/* <Button
                variant="transparent"
                className="d-flex align-items-center"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
                  alt=""
                  width={"30px"}
                  height={"30px"}
                  className="rounded-circle"
                />
                <span className="px-2">{user.name}</span>
              </Button> */}
            </OverlayTrigger>
            <Dropdown.Toggle
              split
              variant="transparent"
              id="dropdown-split-basic"
              className="px-3"
            />
            <Dropdown.Menu className="w-100">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
