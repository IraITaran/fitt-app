import React, { useState, useEffect } from "react";
import "./LeaderBoardListItem.css";
import UnknownIcon from "../../images/unknown-icon.png";
import LeaderAllData from "./LeaderAllData";

import LeaderBoardService from "../../Services/leaderboard.service";

export default function LeaderBoardListItem(props) {
  let [name, setName] = useState("");
  let [expand, setExpand] = useState(false);
  let [allData, setAllData] = useState({});

  useEffect(() => {
    setName(
      props.keyword.length > 0
        ? changeName(props.data.nickName, props.keyword)
        : props.data.nickName
    );
  }, [props.keyword, props.data.nickName]);

  function changeName(name, keyword) {
    let index = name.toLowerCase().indexOf(keyword.toLowerCase());

    if (index === -1) return name;

    let substring = name.substring(index, index + keyword.length);

    return name.replace(
      substring,
      '<span class="highlight">' + substring + "</span>"
    );
  }

  function showStatistic() {
    if (Object.keys(allData).length === 0) {
      let leaderStatistic = LeaderBoardService.getLeaderStatistic(
        props.data.encryptedUid
      );
      setAllData(leaderStatistic);
    }

    setExpand(true);
  }

  function hideStatistic() {
    setExpand(false);
  }

  if (!expand) {
    return (
      <tr className="list-row border-bottom" onClick={showStatistic}>
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

        <td className="roi">+{(props.data.roi * 100).toFixed(2)}%</td>
        <td className="pnl">
          +
          {props.data.pnl.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
          $
        </td>
        <td></td>
        <td>
          <div>
            <div className="circle">
              <span className="star">&#9734;</span>
            </div>
            <button
              className="follow-btn"
              onClick={() => props.onFollowClick()}
            >
              Следить
            </button>
          </div>
        </td>
      </tr>
    );
  } else {
    return (
      <LeaderAllData
        data={props.data}
        name={name}
        allData={allData}
        expandFunction={hideStatistic}
      />
    );
  }
}
