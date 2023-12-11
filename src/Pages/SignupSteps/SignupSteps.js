import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SignupSteps.css";
import FormStepItem from './FormStepItem';
import Signup from "../../Pages/Signup/Signup";
import ApiKeyForm from "../../Components/Configuration/ApiKeyForm";
import BotConfigurationForm from "../../Components/Configuration/BotConfigurationForm";
import TarrifPlans from "../../Pages/TarrifPlans/TarrifPlans";
import PayForm from "../../Pages/PayForm/PayForm";
import CurrentRates from "../../Pages/CurrentRates/CurrentRates";

export default function SignupSteps(props) {
  const [currentStep, setCurrentStep] = useState(0);
  let { leaderId } = useParams();
  

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const tabTitle = ['Создайте личный аккаунт', 'Добавить новый API-ключ', 'Просмотр текущих ставок', 'Настройка бота', 'Тарифные планы', 'Оплата']; // Your tab names or data

  return (
    <div className="signup-steps">
      <div className="step-header-block container">
        <div className="step-header-inner">
          <ul className="signup-steps-tabs">
            {tabTitle.map((tab, index) => <li key={index} className={index === currentStep ? 'is-active' : ''}>{tab}</li>)}
          </ul>
        </div>
      </div>
      <div className="step-content">
        <div className="form-step-block">
          <FormStepItem step={0} currentStep={currentStep}>
            <Signup />
          </FormStepItem>
          <FormStepItem step={1} currentStep={currentStep}>
            <ApiKeyForm nextEnabled={prevStep} />
          </FormStepItem>
          <FormStepItem step={2} currentStep={currentStep}>
           <CurrentRates />
          
          </FormStepItem>
          <FormStepItem step={3} currentStep={currentStep}>
          After Signup get BotConfigurationForm Component
          {/* <BotConfigurationForm
            title="Step 2"
            leaderId={'617B4703835764641A68160483DF3778'}
            // data={botConfiguration}
            // updateBotConfiguration={updateBotConfiguration}
            // botSaveEvent={botSaveEvent}
            nextEnabled={nextEnabled}
            isUpdate={false}
          /> */}
            
          </FormStepItem>
          <FormStepItem step={4} currentStep={currentStep}>
          <TarrifPlans isFrequentQuestions={false}/>
          </FormStepItem>
          <FormStepItem step={5} currentStep={currentStep}>
            <PayForm />
          </FormStepItem>
        </div>
      </div>

      <div className="step-footer container">
      <div className="step-footer-inner">
        <div className="btns-block">
          {currentStep > 0 && (<button onClick={prevStep} className="btn prev-btn"><span>Назад</span></button>)}
          {currentStep < 5 && (<button onClick={nextStep} className="btn next-btn">Вперед</button>)}
          {currentStep === 5 && (<button className="btn submit-btn">Сохранить</button>)}
         </div>
      </div>
      </div>
      </div>
  );
}
