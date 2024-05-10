import React from 'react';
import Timer from "../components/Timer";
import {SHeader} from "../assets/styles/app.styles";

const TimerPage = () => {
  return (
    <div>
      <Timer hours={0} minutes={0} seconds={15} mseconds={0}/>
    </div>
  );
};

export default TimerPage;