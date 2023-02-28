import React, { useState, useEffect } from "react";
import "./AdminLeaders.css";
import Modal from "react-bootstrap/Modal";
import adminService from "../../Services/admin.service";

export default function ApiManagement() {
  let [leaders, setLeaders] = useState([]);
  let [approveModal, setApproveModal] = useState(false);
  let [approvePositionsModal, setApprovePositionsModal] = useState(false);
  let [approveFailedPositionsModal, setApproveFailedPositionsModal] =
    useState(false);
  let [currentLeader, setCurrentLeader] = useState({});

  useEffect(() => {
    updateList();
  }, []);

  function updateList() {
    adminService.getAllLeaders().then((response) => {
      setLeaders(response.data);
    });
  }

  function deleteFunc(leaderId) {
    adminService.deleteLeader(leaderId).then(() => {
      updateList();
    });
  }

  function deletePositionsFunc(leaderId) {
    adminService.deleteLeaderPositions(leaderId).then(() => {
      updateList();
    });
  }

  function deleteFailedPositionsFunc(leaderId) {
    adminService.deleteLeaderFailedPositions(leaderId).then(() => {
      updateList();
    });
  }

  return (
    <>
      <div className="admin-leaders admin-table-container w-100">
        <table className="admin-table m-auto w-100">
          <thead>
            <tr className="border-bottom">
              <th>Trader</th>
              <th>Positions</th>
              <th>Open Positions</th>
              <th>Failed Positions</th>
              <th>Followers</th>
              <th>Running Bots</th>
              <th>ROI</th>
              <th>PNL</th>
              <th>User ROI</th>
              <th>User PNL</th>
              <th>Updated TimeStamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((item, index) => {
              return (
                <tr>
                  <td>
                    <span className="leader-name">{item.name}</span> <br />
                    {item.id}
                  </td>
                  <td>{item.positionsCount}</td>
                  <td>{item.openPositionsCount}</td>
                  <td>{item.failedPositionsCount}</td>
                  <td>{item.followersCount}</td>
                  <td>{item.runningBots}</td>
                  <td className={`roi ${item.totalPNL < 0 ? "red" : "green"}`}>
                    {item.totalROI.toFixed(2)}%
                  </td>
                  <td className={`pnl ${item.totalPNL < 0 ? "red" : ""}`}>
                    {item.totalPNL > 0 ? "+" : ""}
                    {item.totalPNL.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                  <td className={`roi ${item.profitPNL < 0 ? "red" : "green"}`}>
                    {item.profitROI.toFixed(2)}%
                  </td>
                  <td className={`pnl ${item.profitPNL < 0 ? "red" : ""}`}>
                    {item.profitPNL > 0 ? "+" : ""}
                    {item.profitPNL.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                  <td>{item.updateTimeStamp}</td>
                  <td>
                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentLeader(item);
                        setApproveModal(true);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentLeader(item);
                        setApprovePositionsModal(true);
                      }}
                    >
                      Delete Positions
                    </button>

                    <button
                      className="yellow-btn"
                      onClick={() => {
                        setCurrentLeader(item);
                        setApproveFailedPositionsModal(true);
                      }}
                    >
                      Delete Failed Positions
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
          <h4 className="approve-header">Удаление трейдера</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить трейдера?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={() => {
              deleteFunc(currentLeader.id);
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

      <Modal
        className="approve-modal"
        show={approvePositionsModal}
        onHide={() => setApprovePositionsModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Удаление позиций</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить все позиции трейдера?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={() => {
              deletePositionsFunc(currentLeader.id);
              setApprovePositionsModal(false);
            }}
          >
            Удалить
          </button>
          <button
            type="button"
            className="approve-btn mt-4"
            onClick={() => setApprovePositionsModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        className="approve-modal"
        show={approveFailedPositionsModal}
        onHide={() => setApproveFailedPositionsModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Удаление позиций</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить все позиции трейдера?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={() => {
              deleteFailedPositionsFunc(currentLeader.id);
              setApproveFailedPositionsModal(false);
            }}
          >
            Удалить
          </button>
          <button
            type="button"
            className="approve-btn mt-4"
            onClick={() => setApproveFailedPositionsModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
