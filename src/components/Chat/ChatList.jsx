import { useEffect,Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChats } from "../../features/featureActions/Actions";
import { getChatList } from "../../features/slices/ChatSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const dispatch = useDispatch();
  const chatsData = useSelector(getChatList);
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
    <div className="chat-list chat-col" >
      <div className="w-100 px-4 pt-4 d-flex justify-content-between align-items-center mb-3">
      <span style={{fontSize:"28px"}}>My chats</span>
      <button className="btn btn-secondary d-flex align-items-center">
        New group chat
        <IoIosAddCircleOutline style={{fontSize:"25px"}} className="ms-2"/>
      </button>
      </div>
       <div className="w-100 px-4 d-flex flex-column">
       {chatsData.map((chat,i)=>{
          return (
            <Fragment key={i}>
              <ChatListItem chat={chat}/>
            </Fragment>
          )
        })}
       </div>
    </div>
    </>
  );
};

export default ChatList;
