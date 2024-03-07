import { useState } from "react";
import Modal from "react-modal";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/featureActions/Actions";
import { MdCancel } from "react-icons/md";
import {persistor} from "../../app/Store"
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: '50%', // Adjust this value to your desired width
    height: '20%', // Adjust this value to your desired height
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: '0px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    padding: '0px'
  },
};

Modal.setAppElement("#root");

const Logout = ({type,componentStyle}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();

  const logoutAction=(e)=>{
   try{
    e.preventDefault();
    let payload = {
      body: false,
      params: false,
      isToast:true
    }
    dispatch(logoutUser(payload))
    persistor.purge().then(() => { 
      console.log('Persisted storage cleared successfully');
  }).catch((error) => {
      console.log('Error occurred while clearing persisted storage:', error);
  });
   }catch (rejectedValueOrSerializedError) {
    console.log(rejectedValueOrSerializedError)
  }
}

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className="w-100 text-start">
        <span>Logout</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-end">
          <button className="p-2 text-danger" onClick={closeModal}>
            <MdCancel style={{ fontSize: "30px" }} />
          </button>
        </div>
        <div className="h-25 d-flex justify-content-center align-items-center p-2">
          <span style={{ fontSize: "1.5rem",fontWeight:"bold" }}>
            Are you sure you want to logout
          </span>
        </div>
        <div className="h-50 d-flex justify-content-around align-items-center">
          <Button
            className="w-25"
            variant="primary"
            size="lg"
            onClick={logoutAction}
          >
            Logout
          </Button>
          <Button
            className="w-25"
            variant="secondary"
            size="lg"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Logout;
