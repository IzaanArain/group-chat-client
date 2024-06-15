import { useEffect,Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChats } from "../../features/featureActions/Actions";
import { getChatList } from "../../features/slices/ChatSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
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

  console.log(chatsData)
  return (
    <>
    <div className="d-flex flex-column align-items-center rounded shadow chat-col" id="">
      <div className="w-100 px-4 pt-4 d-flex justify-content-between align-items-center">
      <span style={{fontSize:"28px"}}>My chats</span>
      <button className="btn btn-secondary d-flex align-items-center">
        New group chat
        <IoIosAddCircleOutline style={{fontSize:"25px"}} className="ms-2"/>
      </button>
      </div>
       <div className="w-100 px-4">
       {chatsData.map((chat,i)=>{
          return (
            <Fragment key={i}>
              <div>
              {/* <span>{chat._id}</span> */}
              </div>
            </Fragment>
          )
        })}
       </div>
    </div>
    </>
  );
};

export default ChatList;
