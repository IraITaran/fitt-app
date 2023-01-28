import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.ink/api/bot";

class BotService {
  getBots() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  run(botId, option) {
    return axios.post(
      API_URL + "/run",
      {
        botId: botId,
        runOption: option,
      },
      { headers: authHeader() }
    );
  }

  create(
    leaderKey,
    leaderName,
    balance,
    coefficient,
    risk,
    positionControl,
    stopLoss,
    stopProfit
  ) {
    return axios.post(
      API_URL,
      {
        leaderKey: leaderKey,
        leaderName: leaderName,
        balance: balance,
        coefficient: coefficient,
        risk: risk,
        positionControl: positionControl,
        stopLoss: stopLoss,
        stopProfit: stopProfit,
      },
      { headers: authHeader() }
    );
  }
}

export default new BotService();
