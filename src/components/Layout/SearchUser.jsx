import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import RenderTooltips from "../RenderTooltips";
import Offcanvas from "react-bootstrap/Offcanvas";

const SearchUser = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          overlay={
            <RenderTooltips
              id="button-tooltip"
              content="Search users to chat"
            />
          }
        >
          <button
            onClick={handleShow}
            style={{ fontSize: "17px" }}
            type="button"
            className="border border-0 btn btn-outline-secondary d-flex align-items-center"
          >
            <FaSearch />
            <span
              style={{ fontWeight: "bold" }}
              className="d-none d-sm-block px-2"
            >
              Search User
            </span>
          </button>
        </OverlayTrigger>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default SearchUser;
