import React, { useState, useEffect } from "react";
import "./AdminBots.css";
import Modal from "react-bootstrap/Modal";
import adminService from "../../Services/admin.service";

export default function ApiManagement() {
  let [bots, setBots] = useState([]);
  let [approveModal, setApproveModal] = useState(false);
  let [currentBot, setCurrentBot] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  function updateList() {
    adminService.getAllBots().then((response) => {
      console.log(response.data);
      setBots(response.data);
    });
  }

  function deleteBot(botId) {
    adminService.deleteBot(botId).then(() => {
      updateList();
    });
  }

  return (
    <>
      <div className="admin-table-container w-100">
        <table className="admin-table m-auto w-100">
          <thead>
            <tr className="border-bottom">
              <th>Trader</th>
              <th>User ID</th>
              <th>Balance</th>
              <th>Coefficient (Risk)</th>
              <th>Status</th>
              <th>ROI</th>
              <th>PNL</th>
              <th>Position Control</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Stop/Run Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bots.map((item, index) => {
              return (
                <tr>
                  <td>
                    <span className="leader-name">{item.leaderName}</span>{" "}
                    <br />
                    {item.leaderKey}
                  </td>
                  <td>{item.userId}</td>
                  <td>{item.balance}$</td>
                  <td>
                    {item.coefficient.toFixed(4)} ({item.risk})
                  </td>
                  <td
                    className={
                      item.status === 0
                        ? ""
                        : item.status === 1
                        ? "green"
                        : "red"
                    }
                  >
                    {item.status === 0
                      ? "New"
                      : item.status === 1
                      ? "Running"
                      : "Stopped"}{" "}
                  </td>

                  <td className={`roi ${item.pnl < 0 ? "red" : "green"}`}>
                    {item.roi.toFixed(2)}%
                  </td>
                  <td className={`pnl ${item.pnl < 0 ? "red" : ""}`}>
                    {item.pnl > 0 ? "+" : ""}
                    {item.pnl.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                  <td>
                    {item.positionControl ? item.positionControl + "%" : "-"}
                  </td>
                  <td>{new Date(item.createdDate).toLocaleString()} </td>
                  <td>{new Date(item.runStopDate).toLocaleString()} </td>
                  <td>{new Date(item.updatedDate).toLocaleString()} </td>
                  <td>
                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentBot(item);
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
              deleteBot(currentBot.id);
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
