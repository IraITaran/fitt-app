import React from "react";
import LeaderBoardListItem from "./LeaderBoardListItem";
import "./LeaderBoardList.css";

export default function LeaderBoardList(props) {
  return (
    <>
      <table className="leader-table-container m-auto w-100">
        <thead>
          <tr className="border-bottom">
            <th>Общая информация</th>
            <th>ROI</th>
            <th>Общий PnL</th>
            <th></th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(function (leader, index) {
            return (
              <LeaderBoardListItem
                data={leader}
                key={index}
                keyword={props.keyword}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
