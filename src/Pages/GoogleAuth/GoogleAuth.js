import React, { useState } from "react";
import "./GoogleAuth.css";
import FormStepItem from './FormStepItem';
import googlePlay from '../../images/google-play.svg';
import appStore from '../../images/app-store.svg';
import qrCodeImg from '../../images/qr.jpg';
export default function GoogleAuth() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
      <div className="GoogleAuth base-form">
      <div className="container d-flex justify-content-center">
        <div className="row content-container">
          <div className="popup-close-btn"></div>
          <form className="google-auth-form">
              <div className="form-step-block" data-current-step={currentStep}>
              <FormStepItem step={1} currentStep={currentStep}>
                  <div className="form-title">Google authenticator</div>
                  <div className="form-description">Download and install the Google Authenticator app</div>
                  <div className="pagination-block">
                    <div className="pagination-item is-active">1</div>
                    <div className="pagination-item">2</div>
                    <div className="pagination-item">3</div>
                    <div className="pagination-item">4</div>
                  </div>
                  <div className="form-content">
                    <div className="app-block">
                      <a href="/"><img className="google-play" src={googlePlay} alt="Google play"></img></a>
                      <a href="/"><img className="app-store" src={appStore} alt="App store"></img></a>
                    </div>
                  </div>
              </FormStepItem>
              <FormStepItem step={2} currentStep={currentStep}>
                  <div className="form-title">Google authenticator</div>
                  <div className="form-description">Scan this QR code in the Google Authenticator app</div>
                  <div className="pagination-block">
                    <div className="pagination-item">1</div>
                    <div className="pagination-item is-active">2</div>
                    <div className="pagination-item">3</div>
                    <div className="pagination-item">4</div>
                </div>
                <div className="qr-block">
                  <a href="/"><img src={qrCodeImg} alt="QR code"></img></a>
                  <div className="qr-content">
                    <div className="qr-info">If you are unable to scan the QR code, please enter this code manually into the app.</div>
                    <div className="qr-value">GGQPRJ3SKS56ATVZ</div>
                  </div>
                </div>
              </FormStepItem>
              <FormStepItem step={3} currentStep={currentStep}>
              <div className="form-title">Google authenticator</div>
                  <div className="form-description">Please save this Key on paper. This Key will allow you to recover your Google Authenticator in case of phone loss.</div>
                  <div className="pagination-block">
                    <div className="pagination-item">1</div>
                    <div className="pagination-item">2</div>
                    <div className="pagination-item is-active">3</div>
                    <div className="pagination-item">4</div>
                </div>
                <div className="form-content">
                    <div className="qr-info">Resetting your Google Authentication requires opening a support ticket and takes at least 7 days to process.</div>
                    <div className="qr-value">GGQPRJ3SKS56ATVZ</div>
                  </div>
              </FormStepItem>
              <FormStepItem step={4} currentStep={currentStep}>
                  <div className="form-title">Google authenticator</div>
                  <div className="form-description">Enable your Google Authenticator.</div>
                  <div className="pagination-block">
                      <div className="pagination-item">1</div>
                      <div className="pagination-item">2</div>
                      <div className="pagination-item">3</div>
                      <div className="pagination-item is-active">4</div>
                </div>
                <div className="form-content">
                  <div className="form-group">
                    <label>Login Password</label>
                    <div className="form-field">
                      <input
                      type="password"
                      className="form-control form-input"
                        placeholder="Password"
                      />
                      <div className="password-icon"></div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Google auth code</label>
                      <input
                      type="text"
                      className="form-control form-input"
                        placeholder="Password"
                      />
                  </div>
                </div>
              </FormStepItem>
              <div className="btns-block">
                {currentStep > 1 && (<button onClick={prevStep} className="btn btn-prev">Назад</button>)}
                {currentStep < 4 && (<button onClick={nextStep} className="btn login-btn">Следующий шаг</button>)}
                {currentStep === 4 && (<button className="btn login-btn">Сохранить</button>)}
              </div>
              </div>
          </form>
        </div>
    </div>
      </div>
   
    );
  };
  
