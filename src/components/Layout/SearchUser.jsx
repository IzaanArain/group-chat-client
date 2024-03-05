import React from "react";
import { FaSearch } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import RenderTooltips from "../RenderTooltips";
const SearchUser = () => {
  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // );
  return (
    <>
      <div>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          // overlay={renderTooltip}
          overlay={<RenderTooltips id="button-tooltip"  content="Search users to chat" />}
        >
          <button style={{fontSize:"17px"}} type="button" className="shadow border border-0 btn btn-outline-dark d-flex align-items-center ">
            <FaSearch />
            <span  style={{fontWeight:"bold"}} className="d-none d-sm-block px-2">Search User</span>
          </button>
        </OverlayTrigger>
      </div>
    </>
  );
};

export default SearchUser;
