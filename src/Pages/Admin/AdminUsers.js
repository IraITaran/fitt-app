import React, { useState, useEffect } from "react";
import "./AdminUsers.css";
import Modal from "react-bootstrap/Modal";
import adminService from "../../Services/admin.service";

export default function ApiManagement() {
  let [users, setUsers] = useState([]);
  let [approveModal, setApproveModal] = useState(false);
  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  function updateList() {
    adminService.getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }

  function deleteUser(userId) {
    adminService.deleteUser(userId).then(() => {
      updateList();
    });
  }

  return (
    <>
      <div className="admin-table-container w-100">
        <table className="admin-table m-auto w-100">
          <thead>
            <tr className="border-bottom">
              <th>ID</th>
              <th>Email</th>
              <th>Binance Key</th>
              <th>Used Balance</th>
              <th>Telegram</th>
              <th>Status</th>
              <th>Subscription</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <tr>
                  <td>{item.id} </td>
                  <td>{item.email} </td>
                  <td>{item.binanceKey ? "Yes" : "No"}</td>
                  <td>{item.usedBalance}</td>
                  <td>{item.telegramChatId} </td>
                  <td>{item.status} </td>
                  <td>{item.subscription} </td>
                  <td>{item.dateCreated} </td>
                  <td>
                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentUser(item);
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
          <h4 className="approve-header">Удаление пользователя</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить пользователя?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={() => {
              deleteUser(currentUser.id);
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
