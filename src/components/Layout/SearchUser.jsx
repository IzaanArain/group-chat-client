import { useState, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import RenderTooltips from "../RenderTooltips";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/featureActions/Actions";
import ChatLoading from "../Chat/ChatLoading";
import UserListItem from "../UserListItem";

const SearchUser = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  console.log(isLoading)
  const [search, setSearch] = useState("");
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setUser([]);
    setSearch("")
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) {
      toast.error("Please Enter something in search", {
        position: "top-right",
      });
    } else {
      try {
        let payload = {
          params: false,
          query:{
            search:search
          },
          // query:false,
          isToast: true,
        };
        const res = await dispatch(getAllUsers(payload)).unwrap();
        setUser(res?.data?.data);
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
      }
    }
  };

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
          <Offcanvas.Title>
            <span style={{ fontSize: "2rem" }}>Search User</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-75 p-2 border border-3 border-secondary-subtle rounded"
            />
            <Button
              className="w-25 p-2 ms-1 border border-3 rounded" //border-secondary-subtle bg-secondary-subtle text-dark
              variant="outline-secondary"
              onClick={handleSearch}
            >
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>Go</span>
            </Button>
          </div>
          <p className="py-1">results</p>
          <div id="chatScroll">
            {isLoading ? (
              <>
              <ChatLoading/>
              </>
            ) : (
              <>
              {users.map((user,i) => {
                return (
                  <Fragment key={i}>
                    <UserListItem 
                    user={user}
                    />
                  </Fragment>
                )
              })}
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchUser;
