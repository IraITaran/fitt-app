import React, { useEffect, useState } from "react";
import LeaderBoardListItem from "./LeaderBoardListItem";
import ModalFollowInfo from "../ModalFollowInfo/ModalFollowInfo";
import "./LeaderBoardList.css";
import leaderboardService from "../../Services/leaderboard.service";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LeaderBoardList(props) {
  let [currentLeader, setCurrentLeader] = useState({});
  let [showFollowModal, setShowFollowModal] = useState(false);
  let [leaderAVGBalance, setLeaderAVGBalance] = useState(0.0);

  let navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(currentLeader).length === 0) return;

    leaderboardService
      .getLeaderStatistic(currentLeader.encryptedUid)
      .then((leaderStatistic) => {
        setLeaderAVGBalance(leaderStatistic.avgPnl);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLeader]);

  function onFollowClick(leader) {
    setCurrentLeader(leader);
    //console.log(e.target);

    if (!AuthService.isAuthenticated()) {
      navigate("/login");
    }
    //if (e.target.localName === "button") {
    setShowFollowModal(true);
    // }
  }

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
                onFollowClick={() => {
                  onFollowClick(leader);
                }}
              />
            );
          })}
        </tbody>
      </table>

      <ModalFollowInfo
        show={showFollowModal}
        data={currentLeader}
        onHide={() => setShowFollowModal(false)}
        leaderBalance={leaderAVGBalance}
      />
    </>
  );
}
