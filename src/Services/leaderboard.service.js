import axios from "axios";

const API_URL = "https://fitt.ink/api/leaderboard";

class LeaderBoardService {
  search(sortChoice, periodChoice) {
    return axios.post(API_URL + "/getLeaderboardRank", {
      tradeType: "PERPETUAL",
      statisticsType: sortChoice,
      periodType: periodChoice,
      isShared: true,
      isTrader: false,
    });
  }

  getOtherPerformance(leaderId) {
    return axios
      .get(API_URL + "/getOtherPerformance/" + leaderId)
      .then((response) => {
        return this.handleOtherPerformanceResponse(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleOtherPerformanceResponse(response) {
    let result = {
      dailyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "DAILY" && x.statisticsType === "ROI"
      )?.value,
      dailyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "DAILY" && x.statisticsType === "PNL"
      )?.value,
      exactWeeklyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_WEEKLY" && x.statisticsType === "ROI"
      )?.value,
      exactWeeklyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_WEEKLY" && x.statisticsType === "PNL"
      )?.value,
      exactMonthlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_MONTHLY" && x.statisticsType === "ROI"
      )?.value,
      exactMonthlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_MONTHLY" && x.statisticsType === "PNL"
      )?.value,
      exactYearlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_YEARLY" && x.statisticsType === "ROI"
      )?.value,
      exactYearlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "EXACT_YEARLY" && x.statisticsType === "PNL"
      )?.value,
      weeklyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "WEEKLY" && x.statisticsType === "ROI"
      )?.value,
      weeklyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "WEEKLY" && x.statisticsType === "PNL"
      )?.value,
      monthlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "MONTHLY" && x.statisticsType === "ROI"
      )?.value,
      monthlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "MONTHLY" && x.statisticsType === "PNL"
      )?.value,
      yearlyRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "YEARLY" && x.statisticsType === "ROI"
      )?.value,
      yearlyPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "YEARLY" && x.statisticsType === "PNL"
      )?.value,
      allRoi: response.data.data.performanceRetList.find(
        (x) => x.periodType === "ALL" && x.statisticsType === "ROI"
      ).value,
      allPnl: response.data.data.performanceRetList.find(
        (x) => x.periodType === "ALL" && x.statisticsType === "PNL"
      ).value,
    };

    let avgPnl =
      (Math.abs(result.dailyPnl) +
        Math.abs(result.weeklyPnl) +
        Math.abs(result.monthlyPnl) +
        (result.yearlyPnl
          ? Math.abs(result.yearlyPnl)
          : Math.abs(result.allPnl))) /
      4;
    result["avgPnl"] = avgPnl;

    return result;
  }
}

export default new LeaderBoardService();
