import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaderBoardListItem.css";
import UnknownIcon from "../../images/unknown-icon.png";
import LeaderAllData from "./LeaderAllData";

export default function LeaderBoardListItem(props) {
  let [name, setName] = useState("");
  let [click, setClick] = useState(false);
  let [allData, setAllData] = useState({});

  useEffect(() => {
    let changeName = function (name, keyword) {
      let index = name.toLowerCase().indexOf(keyword.toLowerCase());

      if (index === -1) {
        return name;
      }

      let substring = name.substring(index, index + keyword.length);

      return name.replace(
        substring,
        '<span class="highlight">' + substring + "</span>"
      );
    };

    setName(
      props.keyword.length > 0
        ? changeName(props.data.nickName, props.keyword)
        : props.data.nickName
    );
  }, [props.keyword, props.data.nickName]);

  function StatisticClick() {
    if (Object.keys(allData).length === 0) {
      axios
        .get(
          "https://fitt.ink/api/leaderboard/getOtherPerformance/" +
            props.data.encryptedUid
        )
        .then(handleResponse)
        .catch(function (error) {
          console.log(error);
        });
    }

    setClick(true);
  }

  function handleResponse(response) {
    setAllData({
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
    });
  }

  function hideStatistic() {
    setClick(false);
  }

  if (!click) {
    return (
      <tr className="border-bottom" onClick={StatisticClick}>
        <td className="d-flex">
          <img
            src={
              props.data.userPhotoUrl === ""
                ? UnknownIcon
                : props.data.userPhotoUrl
            }
            alt="icon"
            className="leader-icon me-3"
          ></img>
          <div>
            <h4
              className="leader-name"
              dangerouslySetInnerHTML={{ __html: name }}
            ></h4>
            <p className="leader-type">USD-M</p>
          </div>
        </td>

        <td className="roi">{(props.data.roi * 100).toFixed(2)}%</td>
        <td className="pnl">
          {props.data.pnl.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
          $
        </td>
        <td>
          <div className="circle ">
            <span className="star">&#9734;</span>
          </div>
        </td>
        <td>
          <button type="button" className="follow-btn ">
            Следить
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <LeaderAllData
        data={props.data}
        name={name}
        allData={allData}
        clickFunction={hideStatistic}
      />
    );
  }
}
