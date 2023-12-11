import React from 'react';

const FormStep = ({ step, currentStep, children }) => {
  return (
    <div className={`form-step-item ${step === currentStep ? 'is-active' : ''}`}>
      {children}
    </div>
  );
};

export default FormStep;
