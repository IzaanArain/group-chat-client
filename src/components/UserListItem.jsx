import React from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initiateChat } from "../features/featureActions/Actions";
import LoadingSpinner from "../components/LoadingSpinner";

const UserListItem = ({ user}) => {
  const { isLoading } = useSelector((state) => state?.chat);
  const dispatch = useDispatch();

  const initiateChatOnClick = async() => {
    try {
      let payload = {
        params: false,
        body: {
          receiverId: user._id,
        },
        isToast: true,
      };
      dispatch(initiateChat(payload))
      // const res = await dispatch(initiateChat(payload)).unwrap();
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center px-2 py-3 mb-3 rounded"
        id="userItem"
        onClick={initiateChatOnClick}
      >
        {/*  bg-secondary-subtle */}
        <div style={{ width: "50px", height: "50px" }}>
          <img
            src={`${import.meta.env.VITE_API_URL}/${user.profileImage}`}
            alt=""
            // height={100}
            // width={100}
            //  className="rounded-circle"
            // roundedCircle
            style={{ width: "100%", height: "100%" }}
            className="rounded-circle"
          />
        </div>
        <div className="d-flex flex-column">
          <span className="ps-4">{user.name}</span>
          <span className="ps-4">
            <b>Email:</b> {user.email}
          </span>
        </div>
        <div className="ps-5">
        {isLoading ? <LoadingSpinner/> : null }
        </div>
      </div>
    </>
  );
};

export default UserListItem;
