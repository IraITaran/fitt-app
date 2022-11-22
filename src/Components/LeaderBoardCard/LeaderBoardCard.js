import React from "react";
import LeaderBoardCardItem from "./LeaderBoardCardItem";
import "./LeaderBoardCard.css";

export default function LeaderBoardTable(props) {
  return (
    <div className="main-flex-container d-flex flex-wrap">
      {props.data.map(function (leader, index) {
        return (
          <LeaderBoardCardItem
            data={leader}
            key={index}
            keyword={props.keyword}
          />
        );
      })}
    </div>
  );
}
