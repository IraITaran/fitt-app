import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeaderBoardCardItem from "./LeaderBoardCardItem";
import "./LeaderBoardCard.css";
import Modal from "react-bootstrap/Modal";
import UnknownIcon from "../../images/unknown-icon.png";
import LeaderBoardService from "../../Services/leaderboard.service";

export default function LeaderBoardTable(props) {
  let [allData, setAllData] = useState({});
  let [currentLeader, setCurrentLeader] = useState({});
  let [showStatisticModal, setShowStatisticModal] = useState(false);

  let onCardClick = (e, leader) => {
    setCurrentLeader(leader);
    if (!(e.target.localName === "button")) {
      setShowStatisticModal(true);
    }
  };

  useEffect(() => {
    if (Object.keys(currentLeader).length === 0) return;

    getLeaderStatistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeader]);

  function getLeaderStatistic() {
    LeaderBoardService.getLeaderStatistic(currentLeader.encryptedUid).then(
      (leaderStatistic) => {
        setAllData(leaderStatistic);
      }
    );
  }

  return (
    <>
      <div className="main-flex-container d-flex flex-wrap">
        {props.data.map(function (leader, index) {
          return (
            <div key={index} onClick={(e) => onCardClick(e, leader)}>
              <LeaderBoardCardItem data={leader} keyword={props.keyword} />
            </div>
          );
        })}
      </div>

      <Modal
        show={showStatisticModal}
        onHide={() => setShowStatisticModal(false)}
      >
        <Modal.Header closeButton>
          <h5>Статистика трейдера</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex card-all-data">
            <div className="d-flex">
              <img
                src={
                  !currentLeader.userPhotoUrl?.includes("https")
                    ? UnknownIcon
                    : currentLeader.userPhotoUrl
                }
                alt="unknown-icon"
                className="leader-icon me-3"
              ></img>
              <div>
                <h4 className="leader-name">{currentLeader.nickName}</h4>
                <p className="leader-type">USD-M</p>
              </div>
            </div>

            <div className="d-flex ms-auto">
              <div className="circle">
                <span className="star">&#9734;</span>
              </div>
              <Link to={"/follow/" + currentLeader.encryptedUid}>
                <button type="button" className="follow-btn ms-2">
                  Следить
                </button>
              </Link>
            </div>
          </div>

          <table className="m-auto leaderboard-card-table">
            <thead>
              <tr className="border-bottom">
                <th>Временной интервал</th>
                <th>ROI</th>
                <th>PNL</th>
              </tr>
            </thead>
            <tbody>
              {allData.dailyRoi && (
                <tr className="border-bottom">
                  <td>Ежедневно</td>
                  <td
                    className={
                      Number(allData.dailyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.dailyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.dailyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.dailyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              {allData.exactWeeklyRoi !== 0 &&
                allData.exactWeeklyRoi &&
                allData.exactWeeklyPnl !== 0 &&
                allData.exactWeeklyPnl && (
                  <tr className="border-bottom">
                    <td>Последние 7 дней</td>
                    <td
                      className={
                        Number(allData.exactWeeklyRoi) < 0
                          ? "negative-value"
                          : "positive-value"
                      }
                    >
                      {Number(allData.exactWeeklyRoi * 100).toFixed(2)}%
                    </td>
                    <td
                      className={
                        Number(allData.exactWeeklyPnl) < 0
                          ? "negative-value"
                          : "positive-value"
                      }
                    >
                      {Number(allData.exactWeeklyPnl).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 0,
                        }
                      )}
                      $
                    </td>
                  </tr>
                )}
              {allData.exactMonthlyRoi !== 0 && allData.exactMonthlyRoi && (
                <tr className="border-bottom">
                  <td>Последние 30 дней</td>
                  <td
                    className={
                      Number(allData.exactMonthlyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.exactMonthlyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.exactMonthlyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.exactMonthlyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              {allData.exactYearlyRoi && (
                <tr className="border-bottom">
                  <td>Последние 12 мес.</td>
                  <td
                    className={
                      Number(allData.exactYearlyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.exactYearlyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.exactYearlyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.exactYearlyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              {allData.weeklyRoi && (
                <tr className="border-bottom">
                  <td>Еженедельно</td>
                  <td
                    className={
                      Number(allData.weeklyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.weeklyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.weeklyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.weeklyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              {allData.monthlyRoi && (
                <tr className="border-bottom">
                  <td>Ежемесячно</td>
                  <td
                    className={
                      Number(allData.monthlyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.monthlyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.monthlyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.monthlyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              {allData.yearlyRoi && (
                <tr className="border-bottom">
                  <td>Годовой</td>
                  <td
                    className={
                      Number(allData.yearlyRoi) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.yearlyRoi * 100).toFixed(2)}%
                  </td>
                  <td
                    className={
                      Number(allData.yearlyPnl) < 0
                        ? "negative-value"
                        : "positive-value"
                    }
                  >
                    {Number(allData.yearlyPnl).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    $
                  </td>
                </tr>
              )}
              <tr>
                <td>Все</td>
                <td
                  className={
                    Number(allData.allRoi) < 0
                      ? "negative-value"
                      : "positive-value"
                  }
                >
                  {Number(allData.allRoi * 100).toFixed(2)}%
                </td>
                <td
                  className={
                    Number(allData.allPnl) < 0
                      ? "negative-value"
                      : "positive-value"
                  }
                >
                  {Number(allData.allPnl).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                  $
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button
            variant="secondary"
            onClick={() => setShowStatisticModal(false)}
            className="close-btn"
          >
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
