import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConfirmEmail from "../../Pages/ConfirmEmail/ConfirmEmail";

import ApiKeyForm from "../../Components/Configuration/ApiKeyForm";
import BotConfigurationForm from "../../Components/Configuration/BotConfigurationForm";
import BotRunOptionForm from "../../Components/Configuration/BotRunOptionForm";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

import "./MultistepFollow.css";

export default function MultistepFollow() {
  let [currentStep, setCurrentStep] = useState(0);
  let [stepCount, setStepCount] = useState(0);
  let [botConfiguration, setBotConfiguration] = useState(null);
  let [botConfigurationStep, setBotConfigurationStep] = useState(0);
  let [botSaveEvent, setBotSaveEvent] = useState(false);
  let [isNextClicked, setIsNextClicked] = useState(false);
  let [isNextEnabled, setIsNextEnabled] = useState(true);
  let [componentList, setComponentList] = useState([]);

  let { leaderId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    let userStatus = user.userDetails.status;

    let list = [];
    switch (userStatus) {
      case 0:
        list.push("EmailCheck");
        list.push("ApiKeyForm");
        list.push("BotConfigurationForm");
        list.push("BotRunOptionForm");
        setComponentList(list);

        setBotConfigurationStep(2);
        setStepCount(list.length);
        break;
      case 1:
        list.push("ApiKeyForm");
        list.push("BotConfigurationForm");
        list.push("BotRunOptionForm");
        setComponentList(list);

        setBotConfigurationStep(1);
        setStepCount(list.length);
        break;
      case 2:
        list.push("BotConfigurationForm");
        list.push("BotRunOptionForm");
        setComponentList(list);

        setBotConfigurationStep(0);
        setStepCount(list.length);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateBotConfiguration(newBotConfiguration) {
    setBotConfiguration(newBotConfiguration);

    setBotSaveEvent(false);
    if (isNextClicked) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }

  function onNext() {
    if (currentStep === stepCount - 1) {
      return;
    }

    setIsNextClicked(true);

    if (currentStep === botConfigurationStep) {
      setBotSaveEvent(true);
      return;
    }

    setCurrentStep(currentStep + 1);
  }

  function onPrev() {
    if (currentStep <= 0) return;

    setIsNextClicked(false);

    if (currentStep === botConfigurationStep) {
      setBotSaveEvent(true);
      return;
    }

    setCurrentStep(currentStep - 1);
  }

  function enableNext(isEnabled) {
    setIsNextEnabled(isEnabled);
  }

  function currentStepComponentFunc() {
    switch (componentList[currentStep]) {
      case "EmailCheck":
        return <ConfirmEmail nextEnabled={enableNext} />;

      case "ApiKeyForm":
        return <ApiKeyForm nextEnabled={enableNext} />;

      case "BotConfigurationForm":
        return (
          <BotConfigurationForm
            title="Step 2"
            leaderId={leaderId}
            data={botConfiguration}
            updateBotConfiguration={updateBotConfiguration}
            botSaveEvent={botSaveEvent}
            nextEnabled={enableNext}
          />
        );

      case "BotRunOptionForm":
        return (
          <BotRunOptionForm
            title="Step 3"
            leaderId={leaderId}
            data={botConfiguration}
            nextEnabled={enableNext}
          />
        );
      default:
        break;
    }
  }

  return (
    <div className="multistep-container">
      {currentStepComponentFunc()}

      <div className="multistep-button-container">
        {currentStep > 0 && (
          <button
            className="yellow-btn prev"
            onClick={onPrev}
            disabled={currentStep === 0}
          >
            Назад
          </button>
        )}
        {currentStep !== stepCount - 1 && (
          <button
            className="yellow-btn next"
            onClick={onNext}
            disabled={currentStep === stepCount + 1 || !isNextEnabled}
          >
            Вперед
          </button>
        )}
      </div>
      <div>{botSaveEvent}</div>
    </div>
  );
}
