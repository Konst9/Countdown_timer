import React, { useState } from 'react';
import Timer from "../components/Timer";
import Admin from '../components/Admin';
import { Wrapper } from "../assets/styles/app.styles";

const TimerPage = () => {
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [block, setBlock] = useState(false);
  const handleSetTimer = (selectedHour: number, selectedMinutes: number, selectedSeconds: number) => {
    setHour(selectedHour);
    setMinutes(selectedMinutes);
    setSecond(selectedSeconds);
  }

  return (
    <Wrapper>
      <Admin onSetTimer={handleSetTimer} block={block} />
      <Timer hours={hour} minutes={minutes} seconds={second} setBlock={setBlock} />
    </Wrapper>
  );
};

export default TimerPage;