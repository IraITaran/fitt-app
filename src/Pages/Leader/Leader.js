import React, { useState, useEffect } from "react";
import LeaderPosition from "./LeaderPosition";
import LeaderService from "../../Services/leader.service";
import "./Leader.css";
import { useParams } from "react-router-dom";

export default function Leader(props) {
  const [positions, setPositions] = useState([]);
  const [totalPnl, setTotalPNL] = useState(0);

  let { leaderId } = useParams();

  useEffect(() => {
    updatePositions(leaderId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updatePositions(leaderId) {
    LeaderService.getPositions(leaderId).then((response) => {
      setPositions(
        response.data.sort(
          (a, b) => new Date(b.createDate) - new Date(a.createDate)
        )
      );

      let total = 0;
      response.data.forEach((element) => {
        total += element.pnl;
      });
      setTotalPNL(total);
    });
  }

  return (
    <div>
      <div className="leader-position-total-container">
        <h4>
          Общий PNL:{" "}
          <span className={totalPnl > 0 ? "green" : "red"}>
            {totalPnl.toFixed(2)}$
          </span>
        </h4>
      </div>
      <table className="leader-position-table m-auto w-100">
        <thead>
          <tr className="border-bottom">
            <th>Общая информация</th>
            <th>Пара</th>
            <th>Дата открытия</th>
            <th>Short/Buy</th>
            <th>Amount</th>
            <th>Цена входа</th>
            <th>ROI</th>
            <th>Общий PnL</th>
            <th>Плечо</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {positions.map(function (position, index) {
            return <LeaderPosition data={position} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
