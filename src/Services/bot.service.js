import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://fitt.mom/api/bot";

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

  save(botConfiguration) {
    return axios.post(
      API_URL,
      {
        leaderKey: botConfiguration.leaderId,
        leaderName: botConfiguration.nickName,
        type: botConfiguration.type,
        balance: botConfiguration.balance,
        coefficient: botConfiguration.coefficient,
        risk: botConfiguration.risk,
        positionControl: botConfiguration.positionControl,
        stopLoss: botConfiguration.stopLoss,
        stopProfit: botConfiguration.stopProfit,
        userExchangeAccountId: botConfiguration.userExchangeAccountId,
      },
      { headers: authHeader() }
    );
  }

  saveAndRun(botConfiguration, runOption) {

    return axios.post(
      API_URL + "/saveAndRun/" + runOption,
      {
        leaderKey: botConfiguration.leaderId,
        leaderName: botConfiguration.nickName,
        type: botConfiguration.type,
        balance: botConfiguration.balance,
        coefficient: botConfiguration.coefficient,
        risk: botConfiguration.risk,
        positionControl: botConfiguration.positionControl,
        stopLoss: botConfiguration.stopLoss,
        stopProfit: botConfiguration.stopProfit,
        userExchangeAccountId: botConfiguration.userExchangeAccountId,
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
    stopProfit,
    userExchangeAccountId
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
        userExchangeAccountId: userExchangeAccountId,
      },
      { headers: authHeader() }
    );
  }
}

export default new BotService();
