import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import Select from "react-select";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/featureActions/Actions";
import LoadingSpinner from "../../LoadingSpinner";
import UserListItem from "../../UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import "./group.css";
import { createGroup } from "../../../features/featureActions/Actions";

function CreateGroupChat() {
  const [show, setShow] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    setSearchResult([]);
    setselectedUsers([]);
  };
  const handleShow = () => setShow(true);
  const handleSearch = async (e, query) => {
    e.preventDefault();
    if (!query) {
      toast.error("Please Enter something in search", {
        position: "top-right",
      });
    } else {
      try {
        let payload = {
          params: false,
          query: {
            search: query,
          },
          // query:false,
          isToast: true,
        };
        const res = await dispatch(getAllUsers(payload)).unwrap();
        setSearchResult(res?.data?.data);
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError);
      }
    }
  };
  const handleSelectedGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return toast.error("user already added", {
        position: "top-right",
      });
    }
    setselectedUsers((prev) => [...prev, userToAdd]);
  };
  const handleDelete = (e, user) => {
    e.preventDefault();
    setselectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        body: {
          users: JSON.stringify(selectedUsers),
          name: groupChatName,
        },
        params: false,
        isToast: true,
      };
      await dispatch(createGroup(payload));
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError);
    }
  };
  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        className="d-flex align-items-center"
      >
        New group chat
        <IoIosAddCircleOutline style={{ fontSize: "25px" }} className="ms-2" />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <input
                type="text"
                placeholder="Enter group name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                className="w-100 p-2 border border-3 border-secondary-subtle rounded mb-2"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => handleSearch(e, e.target.value)}
                className="w-100 p-2 border border-3 border-secondary-subtle rounded mb-2"
              />
            </div>
            <div className="d-flex align-items-center justify-content-start gap-1">
              {selectedUsers?.map((user, i) => {
                return (
                  <UserBadgeItem
                    key={i}
                    user={user}
                    handelFunction={handleDelete}
                  />
                );
              })}
            </div>
            {isLoading ? (
              <>
                <div className="d-flex justify-content-center mt-2">
                  <LoadingSpinner />
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    height: searchResult?.length > 0 ? "200px" : "0px",
                    paddingTop: "10px",
                    paddingRight: "10px",
                    overflowY: "scroll",
                  }}
                >
                  {searchResult?.map((user, i) => {
                    return (
                      <UserListItem
                        key={i}
                        user={user}
                        handleFunction={handleSelectedGroup}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            variant="info"
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
          >
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGroupChat;
