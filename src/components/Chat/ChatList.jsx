import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChats } from "../../features/featureActions/Actions";
import { getChatList } from "../../features/slices/ChatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const chatsData = useSelector(getChatList);
  // console.log("chatsData", chatsData);

  const fetchChats = async () => {
    try {
      const payload = {
        params: false,
        query: false,
        isToast: false,
      };
      dispatch(getAllChats(payload));
      // const res = await dispatch(getAllChats(payload)).unwrap();
      // console.log("res",res)
    } catch (rejectedValueOrSerializedError) {}
  };

  useEffect(() => {
    let mount = true;
    if (mount) {
      fetchChats();
    }
    return () => {
      mount = false;
    };
  }, []);

  return (
    <>
    <div className="d-flex flex-column align-items-center bg-primary rounded"
    style={{height:"80vh"}}
    >
      <div className="w-100 ps-4">
        <span>My chats</span>
      </div>
    </div>
    </>
  );
};

export default ChatList;
