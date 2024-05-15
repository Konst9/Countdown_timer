import React from 'react';
import {useState, useEffect, useCallback, useMemo} from "react";
import PropTypes from 'prop-types';
import {
  TimerWrapper,
  TimerDataBlock,
  TimerBlock,
  TimerData,
  BtnBlock,
  Text,
  TextCard,
} from '../assets/styles/Component/timer.styles';
import Button from '@mui/material/Button';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PlayImg from "../assets/Icons/playIcon.svg";
import PauseImg from "../assets/Icons/pauseIcon.svg"
import ReloadImg from "../assets/Icons/reload.svg";
import endTimerAudio from '../assets/sounds/endTimerAudio.mp3';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const Timer = ({ hours = 0, minutes = 0, seconds = 0, setBlock }: { hours: number; minutes: number; seconds: number; setBlock: (value: boolean) => void }) => {
const [paused, setPaused] = useState(true);
const [over, setOver] = useState(false);
const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
const [progress, setProgress] = useState(100);

const INTERVAL = 1000;

useEffect(() => {
  if (over) {
    const audio = new Audio(endTimerAudio)
    audio.play();
  }
}, [over]);

const tick = useCallback(() => {
  if (paused || over) return;

  if (h === 0 && m === 0 && s === 0) {
    setOver(true);
  } else if (m === 0 && s === 0) {
    setTime([h - 1, 59, 59]);
  } else if (s === 0) {
    setTime([h, m - 1, 59]);
  } else {
    setTime([h, m, s - 1]);
  }
}, [h, m, s, over, paused]);

const reset = useCallback(() => {
  setTime([hours, minutes, seconds]);
  setPaused(true);
  setOver(false);
  setProgress(100);
  setBlock(false);
}, [hours, minutes, seconds, setBlock]);

useEffect(() => {
  setTime([hours, minutes, seconds]);
}, [hours, minutes, seconds]);

const timeData = useMemo(() => (hours * 60 * 60 + minutes * 60 + seconds), [hours, minutes, seconds]);

useEffect(() => {
  if (!paused) {
    setBlock(!over);
    const timer = setInterval(() => {
      tick();
      setProgress((prevProgress) => (prevProgress <= 0 ? 0 : prevProgress - 100 / timeData));
    }, INTERVAL);
    return () => {
      clearInterval(timer);
    };
  }
}, [paused, tick, setBlock, over, timeData]);

return (
  <TimerWrapper>
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
    </TimerBlock>
    <Box sx={{ width: '20%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
    <BtnBlock>
      <Button color="primary" variant="contained" disabled={over} onClick={() => setPaused(!paused)}>
        <img src={paused ? PlayImg : PauseImg} alt="play"/>
      </Button>
      <Button color="primary" variant="outlined" onClick={() => reset()}>
        <img src={ReloadImg} alt="reload"/>
      </Button>
    </BtnBlock>
  </TimerWrapper>
);
};

Timer.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
}
export default React.memo(Timer);
