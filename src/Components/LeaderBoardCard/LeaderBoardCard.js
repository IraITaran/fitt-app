import React, { useState, useEffect } from "react";
import LeaderBoardCardItem from "./LeaderBoardCardItem";
import "./LeaderBoardCard.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UnknownIcon from "../../images/unknown-icon.png";
import axios from "axios";

export default function LeaderBoardTable(props) {
  let [allData, setAllData] = useState({});
  let [currentLeader, setCurrentLeader] = useState({});
  let [show, setShow] = useState(false);
  let [cacheAllData, setCacheAllData] = useState([]);

  let handleClose = () => setShow(false);

  let handleShow = (leader) => {
    setCurrentLeader(leader);
    setShow(true);
  };

  useEffect(() => {
    if (Object.keys(currentLeader).length === 0) {
      return;
    } else {
      if (cacheAllData.some((x) => x.key === currentLeader.encryptedUid)) {
        console.log("Use Cashe");
        let cachedItem = cacheAllData.find(
          (x) => x.key === currentLeader.encryptedUid
        );

        setAllData(cachedItem.data);
      } else {
        console.log("Use Request");
        StatisticClick();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeader]);

  function StatisticClick() {
    axios
      .get(
        "https://fitt.ink/api/leaderboard/getOtherPerformance/" +
          currentLeader.encryptedUid
      )
      .then(handleResponse)
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleResponse(response) {
    let mappedResult = {
      dailyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "DAILY" && x.statisticsType === "ROI"
      ).value,
      dailyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "DAILY" && x.statisticsType === "PNL"
      ).value,
      exactWeeklyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_WEEKLY" && x.statisticsType === "ROI"
      ).value,
      exactWeeklyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_WEEKLY" && x.statisticsType === "PNL"
      ).value,
      exactMonthlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_MONTHLY" && x.statisticsType === "ROI"
      ).value,
      exactMonthlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_MONTHLY" && x.statisticsType === "PNL"
      ).value,
      exactYearlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_YEARLY" && x.statisticsType === "ROI"
      ).value,
      exactYearlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_YEARLY" && x.statisticsType === "PNL"
      ).value,
      weeklyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "WEEKLY" && x.statisticsType === "ROI"
      ).value,
      weeklyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "WEEKLY" && x.statisticsType === "PNL"
      ).value,
      monthlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "MONTHLY" && x.statisticsType === "ROI"
      ).value,
      monthlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "MONTHLY" && x.statisticsType === "PNL"
      ).value,
      yearlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "YEARLY" && x.statisticsType === "ROI"
      ).value,
      yearlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "YEARLY" && x.statisticsType === "PNL"
      ).value,
      allRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "ALL" && x.statisticsType === "ROI"
      ).value,
      allPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "ALL" && x.statisticsType === "PNL"
      ).value,
    };

    cacheAllData.push({
      key: currentLeader.encryptedUid,
      data: mappedResult,
    });

    setCacheAllData(cacheAllData);

    setAllData(mappedResult);
  }

  return (
    <div className="main-flex-container d-flex flex-wrap">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex card-all-data">
            <Form.Label>Range</Form.Label>
            <Form.Range />
            <div className="d-flex">
              <img
                src={
                  currentLeader.userPhotoUrl === ""
                    ? UnknownIcon
                    : currentLeader.userPhotoUrl
                }
                alt="icon"
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
              <button type="button" className="follow-btn ms-2">
                Следить
              </button>
            </div>
          </div>

          <table className="m-auto">
            <thead>
              <tr className="border-bottom">
                <th>Временной интервал</th>
                <th>ROI</th>
                <th>PNL</th>
              </tr>
            </thead>
            <tbody>
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
                  {Number(allData.exactWeeklyPnl).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                  $
                </td>
              </tr>
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
                    Number(allData.allPnlx) < 0
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
            onClick={handleClose}
            className="close-btn"
          >
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
      {props.data.map(function (leader, index) {
        return (
          <div key={index} onClick={() => handleShow(leader)}>
            <LeaderBoardCardItem data={leader} keyword={props.keyword} />
          </div>
        );
      })}
    </div>
  );
}
