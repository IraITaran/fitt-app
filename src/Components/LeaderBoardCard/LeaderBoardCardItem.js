import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LeaderBoardCardItem.css";
import UnknownIcon from "../../images/unknown-icon.png";

export default function LeaderBoardCardItem(props) {
  let [name, setName] = useState("");

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

  return (
    <div className="LeaderBoardCardItem">
      <div className="leaderboard-container-item">
        <div className="header-board">
          <img
            src={
              !props.data.userPhotoUrl?.includes("https")
                ? UnknownIcon
                : props.data.userPhotoUrl
            }
            alt="icon"
            className="leader-icon"
          ></img>
          <div>
            <h4
              className="leader-name"
              dangerouslySetInnerHTML={{ __html: name }}
            ></h4>
            <p className="leader-type">USD-M</p>
          </div>
        </div>
        <div className="main-board">
          <div className="roi">
            <p>+{(props.data.roi * 100).toFixed(2)}%</p>
            <p>ROI за 30 дней</p>
          </div>
          <div className="pnl">
            <p>
              +
              {props.data.pnl.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              $
            </p>
            <p>Общий PnL</p>
          </div>
        </div>
        <div className="footer-board">
          <div className="circle">
            <span className="star">&#9734;</span>
          </div>
          <Link to={"/follow/" + props.data.encryptedUid}>
            <button type="button" className="follow-btn">
              Следить
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
