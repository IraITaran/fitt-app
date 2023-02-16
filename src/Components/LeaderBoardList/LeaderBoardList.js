import React, { useEffect, useState } from "react";
import LeaderBoardListItem from "./LeaderBoardListItem";
import ModalFollowInfo from "../ModalFollowInfo/ModalFollowInfo";
import "./LeaderBoardList.css";
import leaderboardService from "../../Services/leaderboard.service";

export default function LeaderBoardList(props) {
  let [currentLeader, setCurrentLeader] = useState({});
  let [showFollowModal, setShowFollowModal] = useState(false);
  let [leaderAVGBalance, setLeaderAVGBalance] = useState(0.0);

  useEffect(() => {
    if (Object.keys(currentLeader).length === 0) return;

    let leaderStatistic = leaderboardService.getLeaderStatistic(
      currentLeader.encryptedUid
    );

    setLeaderAVGBalance(leaderStatistic.avgPnl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeader]);

  let onListClick = (e, leader) => {
    setCurrentLeader(leader);
    if (e.target.localName === "button") {
      setShowFollowModal(true);
    }
  };

  return (
    <>
      <table className="m-auto w-100">
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
                onClick={(e) => {
                  onListClick(e, leader);
                }}
              />
            );
          })}
        </tbody>
      </table>
      {
        <ModalFollowInfo
          show={showFollowModal}
          data={currentLeader}
          onHide={() => setShowFollowModal(false)}
          leaderBalance={leaderAVGBalance}
        />
      }
    </>
  );
}
