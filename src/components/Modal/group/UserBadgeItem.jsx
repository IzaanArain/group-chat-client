import React from 'react'
import { IoIosClose } from "react-icons/io";

const UserBadgeItem = ({user,handelFunction}) => {
  return (
    <>
    <div className='userBadgeItem'>
       <span>{user.name ? user.name : user?.email?.slice(0,4) + "..."}</span>
       <button onClick={(e)=>handelFunction(e,user)}>
       <IoIosClose style={{marginLeft:"10px",fontSize:"20px"}}/>
       </button>
    </div>
    </>
  )
}

export default UserBadgeItem