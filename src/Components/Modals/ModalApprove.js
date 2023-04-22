import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalApprove.css";

export default function ModalApprove(props) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal className="approve-modal" show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <h4 className="approve-header">{props.title}</h4>
      </Modal.Header>
      <Modal.Body>
        <h4 className="approve-text">{props.bodyText}</h4>
        <button
          type="button"
          className="approve-btn delete mt-4"
          onClick={props.onSubmit}
        >
          {props.submitButtonText}
        </button>
        <button
          type="button"
          className="approve-btn mt-4"
          onClick={props.onHide}
        >
          Отмена
        </button>
      </Modal.Body>
    </Modal>
  );
}
