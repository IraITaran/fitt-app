import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FAQ from './FAQ';
import FITT from './FITT';
import CopyTraderGuide from './CopyTraderGuide';
import SignalGuide from './SignalGuide';
import Comission from './Comission';
import Referral from './Referral';
import Conditions from './Conditions';
import Confidentiality from './Confidentiality';
import TransactionHistory from './TransactionHistory';
import QuestionsSidebar from './QuestionsSidebar';

export default function QuestionsRoute() {
  return (
    <div className="QuestionsRoute">
      <div className="container">
        <QuestionsSidebar />
        <Routes>
          <Route>
            <Route path="faq" element={<FAQ />}></Route>
            <Route path="fitt-meaning" element={<FITT />}></Route>
            <Route path="copytrader-guide" element={<CopyTraderGuide />}></Route>
            <Route path="signal-guide" element={<SignalGuide />}></Route>
            <Route path="comission" element={<Comission />}></Route>
            <Route path="referral" element={<Referral />}></Route>
            <Route path="conditions" element={<Conditions />}></Route>
            <Route path="confidentiality" element={<Confidentiality />}></Route>
            <Route path="transaction-history" element={<TransactionHistory />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
