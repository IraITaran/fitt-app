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
              <td>{Number(props.allData.dailyRoi).toFixed(2)}%</td>
              <td>
                {Number(props.allData.dailyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Последние 7 дней</td>
              <td>{Number(props.allData.exactWeeklyRoi).toFixed(2)}%</td>
              <td>
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
              <td>{Number(props.allData.exactMonthlyRoi).toFixed(2)}%</td>
              <td>
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
              <td>{Number(props.allData.exactYearlyRoi).toFixed(2)}%</td>
              <td>
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
              <td>{Number(props.allData.weeklyRoi).toFixed(2)}%</td>
              <td>
                {Number(props.allData.weeklyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Ежемесячно</td>
              <td>{Number(props.allData.monthlyRoi).toFixed(2)}%</td>
              <td>
                {Number(props.allData.monthlyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Годовой</td>
              <td>{Number(props.allData.yearlyRoi).toFixed(2)}%</td>
              <td>
                {Number(props.allData.yearlyPnl).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                $
              </td>
            </tr>
            <tr className="border-bottom">
              <td>Все</td>
              <td>{Number(props.allData.allRoi).toFixed(2)}%</td>
              <td>
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
