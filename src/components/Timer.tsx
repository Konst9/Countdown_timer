import React from 'react';
import {useState, useEffect, useCallback} from "react";
import {
  TimerDataBlock,
  TimerBlock,
  TimerData,
  BtnBlock,
  Text,
  TextCard,
} from '../assets/styles/Component/timer.styles';
import Button from '@mui/material/Button';
import PlayImg from "../assets/Icons/playIcon.svg";
import PauseImg from "../assets/Icons/pauseIcon.svg"
import ReloadImg from "../assets/Icons/reload.svg";


const Timer = ({ hours = 0, minutes = 0, seconds = 0, mseconds = 0}) => {
const [paused, setPaused] = useState(false);
const [over, setOver] = useState(false);
const [[h, m, s, ms], setTime] = useState([hours, minutes, seconds, mseconds]);

const tick = useCallback(() => {
  if (paused || over) return;

  if (h === 0 && m === 0 && s === 0 && ms === 0) {
    setOver(true);
  } else if (m === 0 && s === 0 && ms === 0) {
    setTime([h - 1, 59, 59, 99]);
  } else if (s === 0 && ms === 0) {
    setTime([h, m - 1, 59, 99]);
  } else if (ms === 0) {
    setTime([h, m, s-1, 99]);
  } else {
    setTime([h, m, s, ms - 1]);
  }
}, [paused, over, h, m, s, ms]);

const reset = useCallback(() => {
  setTime([hours, minutes, seconds, mseconds]);
  setPaused(true);
  setOver(false);
}, [hours, minutes, seconds, mseconds]);

useEffect(() => {
  const timerID = setInterval(() => tick(), 10);
  return () => clearInterval(timerID);
}, [tick]);

  return (
    <div>
      <Text>{over ? "Время вышло!!!" : 'Таймер обратного отсчета'}</Text>
      <TimerBlock className="timer">
        <TimerDataBlock>
          <TextCard>hour</TextCard>
          <TimerData>{h.toString().padStart(2, '0')}</TimerData>
        </TimerDataBlock>
        <TimerDataBlock>
          <TextCard>min</TextCard>
          <TimerData>{m.toString().padStart(2, '0')}</TimerData>
        </TimerDataBlock>
        <TimerDataBlock>
          <TextCard>sec</TextCard>
          <TimerData>{s.toString().padStart(2, '0')}</TimerData>
        </TimerDataBlock>
        <TimerDataBlock>
          <TextCard>ms</TextCard>
          <TimerData>{ms.toString().padStart(2, '0')}</TimerData>
        </TimerDataBlock>
      </TimerBlock>
      <BtnBlock>
        <Button color="secondary" variant="contained" onClick={() => setPaused(!paused)}>
          <img src={paused ? PlayImg : PauseImg} alt="play"/>
        </Button>
        <Button color="secondary" variant="outlined" onClick={() => reset()}>
          <img src={ReloadImg} alt="reload"/>
        </Button>
      </BtnBlock>
    </div>
  );
};
export default React.memo(Timer);
