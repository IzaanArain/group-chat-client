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
import Logout from "../Modal/logout/Logout";
const ProfileMenu = () => {
  const user = useSelector(getUser);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-3">
          <FaBell style={{ fontSize: "25px" }} />
        </div>
        <div className="pe-2">
          <OverlayTrigger
            // trigger="click"
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            // overlay={<RenderTooltips content={user.name}/>}
            // overlay={<PopoverTooltips name={user.name} />}
            overlay={
              <Popover id="popover-basic">
                <Popover.Header
                  as="h3"
                  className="py-3 d-flex align-items-center justify-content-center"
                >
                <div style={{width:"100px",height:"100px"}}>
               <Image 
                src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
                alt=""
                // width={"30px"}
                // height={"30px"}
                style={{ width: "100%", height: "100%" }}
                //  className="rounded-circle"
                roundedCircle
              />
             </div>
                  <span className="ps-3">{user.name}</span>
                </Popover.Header>
                <Popover.Body>
                  And here's some <strong>amazing</strong> content. It's very
                  engaging. right?
                </Popover.Body>
              </Popover>
            }
          >
            {({ ref, ...triggerHandler }) => (
             <div style={{width:"30px",height:"30px"}}>
               <Image 
                ref={ref}
                src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
                alt=""
                // width={"30px"}
                // height={"30px"}
                style={{ width: "100%", height: "100%" }}
                //  className="rounded-circle"
                roundedCircle
                {...triggerHandler}
              />
             </div>
            )}
          </OverlayTrigger>
        </div>
        <div id="profile menu">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              <span className="pe-2">{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/completeProfile">My Profile</Dropdown.Item>
              <Dropdown.Item href="/chats">Chat</Dropdown.Item>
              <Dropdown.Item ><Logout/></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
