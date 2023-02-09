import React, { useState, useEffect } from "react";
import LeaderPosition from "./LeaderPosition";
import LeaderService from "../../Services/leader.service";
import "./Leader.css";
import { useParams } from "react-router-dom";

export default function Leader(props) {
  const [positions, setPositions] = useState([]);
  const [totalPnl, setTotalPNL] = useState(0);
  //const [leaders, setLeaders] = useState([]);

  let { leaderId } = useParams();

  useEffect(() => {
    //2B5D309B9C5C7E845B77EE8AF7006998
    updatePositions(leaderId);

    // LeaderService.getLeaders().then((response) => {
    //   setLeaders(response.data);
    // });
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

  // function changeLeader(id) {
  //   console.log("sdsaa" + id);
  //   updatePositions(id);
  // }

  return (
    <div>
      {/* <select
        onChange={(e) => {
          changeLeader(e.target.value);
        }}
      >
        {leaders.map(function (leader, index) {
          return (
            <option key={index} value={leader.id}>
              {leader.name} - {leader.id}
            </option>
          );
        })}
      </select> */}
      <div>Общий PNL: {totalPnl}</div>
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
