import axios from "axios";

const API_URL = "https://fitt.mom/api/leaderboard";

class LeaderBoardService {
  getLeaderInfo(leaderId) {
    return axios.get(API_URL + "/getLeaderInfo/" + leaderId);
  }

  search(sortChoice, periodChoice) {
    return axios.post(API_URL + "/getLeaderboardRank", {
      tradeType: "PERPETUAL",
      statisticsType: sortChoice,
      periodType: periodChoice,
      isShared: true,
      isTrader: false,
    });
  }

  getLeaderStatistic(leaderId) {
    return axios
      .get(API_URL + "/getOtherPerformance/" + leaderId)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  }

  getLeaderOpenPositions(leaderId) {
    return axios
      .get(API_URL + "/getOtherPosition/" + leaderId)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default new LeaderBoardService();
