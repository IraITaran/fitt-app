import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaderBoard.css";
import LeaderBoardCard from "../LeaderBoardCard/LeaderBoardCard";
import LeaderBoardList from "../LeaderBoardList/LeaderBoardList";
import SearchIcon from "../../images/search-icon.svg";
import BackgroundImages from "../BackgroundImages/BackgroundImages";
import ListOrTableDisplay from "../ListOrTableDisplay/ListOrTableDisplay";
import LeaderBoardBanner from "./LeaderBoardBanner";

export default function LeaderBoard() {
  let [results, setResults] = useState([]);
  let [allResults, setAllResults] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [isList, setIsList] = useState(true);

  let [viewCount, setViewCount] = useState(1);

  let [sortChoice, setSortChoice] = useState("ROI");
  let [periodChoice, setPeriodChoice] = useState("DAILY");
  let [keyword, setKeyword] = useState("");

  function handleChange() {
    searchApi();
  }

  function handleResponse(response) {
    setViewCount(1);
    setAllResults(response.data.data);
  }

  useEffect(() => {
    showLeaderBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allResults, viewCount, keyword, periodChoice]);

  useEffect(() => {
    searchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortChoice, periodChoice]);

  function showLeaderBoard() {
    let filteredArray = [...allResults];
    if (keyword.length > 0) {
      filteredArray = filteredArray.filter((x) =>
        x.nickName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setResults(filteredArray.slice(0, viewCount * 12));
  }

  function moreClick() {
    setViewCount(viewCount + 1);
  }

  function searchApi() {
    axios
      .post("https://fitt.ink/api/leaderboard/getLeaderboardRank", {
        tradeType: "PERPETUAL",
        statisticsType: sortChoice,
        periodType: periodChoice,
        isShared: true,
        isTrader: false,
      })
      .then(handleResponse)
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!loaded) {
    searchApi();
    setLoaded(true);
  }

  return (
    <div className="LeaderBoard">
      <LeaderBoardBanner />
      <div className="leaderboard-container">
        <div className="LeaderBoardDropdowns row">
          <div className="types col">
            <select
              className="w-100 "
              value={sortChoice}
              onChange={(e) => {
                handleChange();
                setSortChoice(e.target.value);
              }}
            >
              <option value="ROI">ROI</option>
              <option value="PNL">PNL</option>
            </select>
          </div>

          <div className="roiValue col">
            <select
              className="w-100"
              value={periodChoice}
              onChange={(e) => {
                handleChange();
                setPeriodChoice(e.target.value);
              }}
            >
              <option value="DAILY">День</option>
              <option value="WEEKLY">Неделя</option>
              <option value="MONTHLY">Месяц</option>
              <option value="ALL">За все время</option>
            </select>
          </div>
          <div className="col">
            <input
              type="search"
              placeholder="Поиск портфеля/лид трейдера"
              onChange={(e) => setKeyword(e.target.value)}
            ></input>

            <img src={SearchIcon} className="searchIcon" alt="search"></img>
          </div>
        </div>
        <hr />
        <ListOrTableDisplay isList={isList} setIsList={setIsList} />

        <br />
        {isList && (
          <LeaderBoardList
            data={results}
            keyword={keyword}
            choice={periodChoice}
          />
        )}
        {!isList && <LeaderBoardCard data={results} keyword={keyword} />}
        <br />
        <button
          type="button"
          className={
            results.length === allResults.length
              ? "more-btn-hidden"
              : "more-btn"
          }
          onClick={moreClick}
        >
          More
        </button>
        <BackgroundImages />
      </div>
    </div>
  );
}
