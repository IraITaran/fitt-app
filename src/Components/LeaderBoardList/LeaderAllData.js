import React from "react";
import UnknownIcon from "../../images/unknown-icon.png";
import "./LeaderAllData.css";

export default function LeaderAllData(props) {
  return (
    <tr className="LeaderAllData" onClick={props.clickFunction}>
      <td colSpan="5">
        <div className="d-flex">
          <div className="d-flex">
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
                dangerouslySetInnerHTML={{ __html: props.name }}
              ></h4>
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
                  Number(props.allData.dailyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.dailyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.dailyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.dailyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Последние 7 дней</td>
              <td
                className={
                  Number(props.allData.exactWeeklyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactWeeklyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.exactWeeklyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactWeeklyPnl).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Последние 30 дней</td>
              <td
                className={
                  Number(props.allData.exactMonthlyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactMonthlyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.exactMonthlyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactMonthlyPnl).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Последние 12 мес.</td>
              <td
                className={
                  Number(props.allData.exactYearlyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactYearlyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.exactYearlyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.exactYearlyPnl).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Еженедельно</td>
              <td
                className={
                  Number(props.allData.weeklyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.weeklyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.weeklyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.weeklyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Ежемесячно</td>
              <td
                className={
                  Number(props.allData.monthlyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.monthlyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.monthlyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.monthlyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Годовой</td>
              <td
                className={
                  Number(props.allData.yearlyRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.yearlyRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.yearlyPnl) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.yearlyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Все</td>
              <td
                className={
                  Number(props.allData.allRoi) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.allRoi * 100).toFixed(2)}%
              </td>
              <td
                className={
                  Number(props.allData.allPnlx) < 0
                    ? "negative-value"
                    : "positive-value"
                }
              >
                {Number(props.allData.allPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
