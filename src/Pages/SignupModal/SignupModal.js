import React, { useState } from "react";
import "./SignupModal.css";
import Modal from "react-bootstrap/Modal";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";

export default function ModalSignUp(props) {
  
  let [modal, setModal] = useState(true);
  let [showLogin, setShowLoginForm] = useState(false);
  const toggleForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };
  function onHide() {
    setModal((prevModal) => !prevModal);
  }
  return (
    <Modal className="approve-modal whithout-popup-header" show={modal} onHide={onHide}>
      <Modal.Header closeButton={true}>
       
      </Modal.Header>
      <Modal.Body>
      {showLogin ? (
        <Login onToggleFormLink={toggleForm}/>
        ) : (
        <Signup onToggleFormLink={toggleForm}/>
      )}
      </Modal.Body>
    </Modal>
  );
}
