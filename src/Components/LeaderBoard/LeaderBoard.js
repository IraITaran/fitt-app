import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import LeaderBoardCard from "../LeaderBoardCard/LeaderBoardCard";
import LeaderBoardList from "../LeaderBoardList/LeaderBoardList";
import SearchIcon from "../../images/search-icon.svg";
import BackgroundImages from "../BackgroundImages/BackgroundImages";
import ListOrTableDisplay from "../ListOrTableDisplay/ListOrTableDisplay";
import LeaderBoardBanner from "./LeaderBoardBanner";
import LeaderBoardService from "../../Services/leaderboard.service";
import Modal from "react-bootstrap/Modal";
import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import { useSearchParams } from "react-router-dom";

export default function LeaderBoard() {
  let [results, setResults] = useState([]);
  let [allResults, setAllResults] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [isList, setIsList] = useState(false);
  let [apiKeyModal, setApiKeyModal] = useState(false);

  let [viewCount, setViewCount] = useState(1);

  let [sortChoice, setSortChoice] = useState("ROI");
  let [periodChoice, setPeriodChoice] = useState("DAILY");
  let [keyword, setKeyword] = useState("");
  let [exchangeChoice, setExchangeChoice] = useState("Binance");
  let [apiKeyName, setApiKeyName] = useState("");
  let [apiKey, setApiKey] = useState("");
  let [apiSecret, setApiSecret] = useState("");
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  function handleResponse(response) {
    setViewCount(1);
    setAllResults(response.data.data);
  }

  useEffect(() => {
    if (searchParams.get("rc") !== null) {
      localStorage.setItem("referral_code", searchParams.get("rc"));
    }

    searchApi();
    setLoaded(true);

    let user = AuthService.getCurrentUser();
    if (user?.userDetails?.status < 2) {
      setApiKeyModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showLeaderBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allResults, viewCount, keyword]);

  useEffect(() => {
    if (loaded) {
      searchApi();
    }
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
    LeaderBoardService.search(sortChoice, periodChoice)
      .then(handleResponse)
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateApiKey() {
    UserService.updateApiKey(apiKeyName, apiKey, apiSecret, 1).then(
      (response) => {
        AuthService.updateUserDetails();
        setApiKeyModal(false);
      }
    );
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
                setPeriodChoice(e.target.value);
              }}
            >
              <option value="DAILY">День</option>
              <option value="WEEKLY">Неделя</option>
              <option value="MONTHLY">Месяц</option>
              <option value="ALL">За все время</option>
            </select>
          </div>
          <div className="col search-container">
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
          Еще
        </button>
        <BackgroundImages />
      </div>
      <Modal show={apiKeyModal} onHide={() => setApiKeyModal(false)}>
        <Modal.Body className="apikeyModal">
          <h4 className="apikey-header">Добавить новый API-ключ</h4>
          <div className="apikey-inputs-container">
            <label className="w-100">
              Биржа
              <select
                className="w-100 apikey-input"
                value={exchangeChoice}
                onChange={(e) => {
                  setExchangeChoice(e.target.value);
                }}
              >
                <option value="binance">Binance</option>
              </select>
            </label>
            <label className="w-100">
              Название
              <input
                type="text"
                className="w-100 apikey-input"
                onChange={(e) => setApiKeyName(e.target.value)}
              ></input>
            </label>
            <label className="w-100">
              API-ключ
              <input
                type="text"
                className="w-100 apikey-input"
                onChange={(e) => setApiKey(e.target.value)}
              ></input>
            </label>
            <label className="w-100">
              Секрет
              <input
                type="text"
                className="w-100 apikey-input"
                onChange={(e) => setApiSecret(e.target.value)}
              ></input>
            </label>
          </div>
          <p className="apikey-description">
            После добавления API ключа на этой странице будет отображаться
            список разрешенных IP-адресов. Добавьте его в настройки API ключа
            Binance. <a href="/">Подробнее...</a>
          </p>
          <div className="text-center">
            <button
              type="button"
              className="save-btn mt-4"
              onClick={updateApiKey}
            >
              Сохранить новый ключ
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
