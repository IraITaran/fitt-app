import React, { useState, useEffect } from "react";
import "./AdminBots.css";
import Modal from "react-bootstrap/Modal";
import adminService from "../../Services/admin.service";

export default function AdminPayments() {
  let [payments, setPayment] = useState([]);
  let [approveModal, setApproveModal] = useState(false);
  let [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  function updateList() {
    adminService.getAllPayment().then((response) => {
      setPayment(
        response.data.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        )
      );
    });
  }

  function deleteItem(id) {
    adminService.deletePayment(id).then(() => {
      updateList();
    });
  }

  return (
    <>
      <div className="admin-table-container w-100">
        <table className="admin-table m-auto w-100">
          <thead>
            <tr className="border-bottom">
              <th>User ID</th>
              <th>Status</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Subscription</th>
              <th>Tx ID</th>
              <th>Invoice</th>
              <th>Status Text</th>
              <th>Error</th>
              <th>Created At</th>
              <th>Updated At</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => {
              return (
                <tr>
                  <td>{item.userId}</td>
                  <td>{item.status}</td>
                  <td>{item.currency}</td>
                  <td>{item.amount}</td>
                  <td>{item.subscriptionType}</td>
                  <td>{item.txId}</td>
                  <td>{item.invoice}</td>
                  <td>{item.statusText}</td>
                  <td>{item.error}</td>
                  <td>{new Date(item.createdDate).toLocaleString()} </td>
                  <td>
                    {item.updatedDate !== null
                      ? new Date(item.updatedDate).toLocaleString()
                      : "-"}{" "}
                  </td>
                  <td>
                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentItem(item);
                        setApproveModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        className="approve-modal"
        show={approveModal}
        onHide={() => setApproveModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Удаление бота</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить бота?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={() => {
              deleteItem(currentItem.id);
              setApproveModal(false);
            }}
          >
            Удалить
          </button>
          <button
            type="button"
            className="approve-btn mt-4"
            onClick={() => setApproveModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
