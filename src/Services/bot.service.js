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

  stop(botId) {
    return axios.post(
      API_URL + "/stop",
      {
        botId: botId,
      },
      { headers: authHeader() }
    );
  }

  delete(botId) {
    return axios.delete(API_URL + "/" + botId, { headers: authHeader() });
  }

  create(
    leaderKey,
    leaderName,
    type,
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
        type: type,
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

  update(
    id,
    leaderKey,
    leaderName,
    type,
    balance,
    coefficient,
    risk,
    positionControl,
    stopLoss,
    stopProfit
  ) {
    return axios.put(
      API_URL,
      {
        id: id,
        leaderKey: leaderKey,
        leaderName: leaderName,
        type: type,
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
