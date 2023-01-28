import React from "react";
import "./LeaderPosition.css";
import UnknownIcon from "../../images/unknown-icon.png";

export default function LeaderPosition(props) {
  return (
    <>
      <tr className="border-bottom">
        <td className="d-flex">
          <img
            src={
              props.data.userPhotoUrl === undefined
                ? UnknownIcon
                : props.data.userPhotoUrl
            }
            alt="icon"
            className="leader-icon me-3"
          ></img>
          <div>
            <div>{props.data.leaderId}</div>
            <p className="leader-type">USD-M</p>
          </div>
        </td>
        <td>{props.data.symbol}</td>
        <td
          className={`direction ${
            props.data.direction === 0 ? "green" : "red"
          }`}
        >
          {props.data.direction === 0 ? "BUY" : "SHORT"}
        </td>
        <td>{props.data.amount.toFixed(2)}</td>
        <td>{props.data.entryPrice.toFixed(5)}$</td>
        <td className={`roi ${props.data.pnl < 0 ? "red" : "green"}`}>
          {(props.data.roe * 100).toFixed(2)}%
        </td>
        <td className={`pnl ${props.data.pnl < 0 ? "red" : ""}`}>
          {props.data.pnl > 0 ? "+" : ""}
          {props.data.pnl.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
          $
        </td>
        <td>x{props.data.leverage}</td>
        <td className={`pnl ${props.data.wasFaulted ? "red" : "green"}`}>
          {props.data.wasFaulted
            ? "Failed"
            : props.data.isClosed
            ? "Closed"
            : "In Progress"}
        </td>
      </tr>

      {props.data.history?.map(function (history, index) {
        return (
          <tr
            className="border-bottom"
            style={{ backgroundColor: "lightgray" }}
            key={"history_" + props.data.id + "_" + index}
          >
            <td>
              {new Date(history.updateDateTime).toLocaleDateString("es-ES") +
                " " +
                new Date(history.updateDateTime).toLocaleTimeString("es-ES")}
            </td>
            <td></td>
            <td>
              {history.isIncrease && <>&uarr;</>}
              {!history.isIncrease && <>&darr;</>}
            </td>

            <td>
              <div>
                <span style={{ color: "gray" }}>new:</span> {history.newAmount}
              </div>
              <div>
                <span style={{ color: "gray" }}>old:</span> {history.oldAmount}
              </div>
            </td>
            <td>{history.marketPrice.toFixed(5)}$</td>
            <td className={`roi ${history.fixedROI < 0 ? "red" : "green"}`}>
              {(history.fixedROI * 100).toFixed(2)}%
            </td>
            <td className={`pnl ${history.fixedPNL < 0 ? "red" : ""}`}>
              {history.fixedPNL > 0 ? "+" : ""}
              {history.fixedPNL.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              $
            </td>
            <td></td>
            <td></td>
          </tr>
        );
      })}
    </>
  );
}
