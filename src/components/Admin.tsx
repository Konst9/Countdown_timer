import React, { useState } from 'react';
import {
  AdminWrapper,
  TimeSettingWrapper,
  TimeSetting,
  Text,
  TimeBlock,
  Settings
} from '../assets/styles/Component/admin.styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const Admin = ({ block, onSetTimer }: { block: boolean; onSetTimer: (hours: number, minutes: number, seconds: number) => void }) => {
  const [errorHour, setErrorHour] = useState<boolean>(false);
  const [errorMinutes, setErrorMinutes] = useState<boolean>(false);
  const [errorSeconds, setErrorSeconds] = useState<boolean>(false);
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const regex = /^(0?[0-9]|1[0-9]|2[0-3])$/;
    if (event.target.value === '') {
      setHour(0);
    }
    if (regex.test(String(value))) {
      setHour(value);
      setErrorHour(false)
    } else {
      setErrorHour(true);
    }
  };

  const handleSliderHourChange = (event: Event, value: number | number[]) => {
    setHour(value as number);
  }

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const regex = /^(0?[0-9]|[1-5][0-9]|59)$/;
    if (event.target.value === '') {
      setMinutes(0);
    }
    if (regex.test(String(value))) {
      setMinutes(value);
      setErrorMinutes(false)
    } else {
      setErrorMinutes(true);
    }
  };

  const handleSliderMinutesChange = (event: Event, value: number | number[]) => {
    setMinutes(value as number);
  }

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const regex = /^(0?[0-9]|[1-5][0-9]|59)$/;
    if (event.target.value === '') {
      setSecond(0);
    }
    if (regex.test(String(value))) {
      setSecond(value);
      setErrorSeconds(false)
    } else {
      setErrorSeconds(true);
    }
  };

  const handleSliderSecondsChange = (event: Event, value: number | number[]) => {
    setSecond(value as number);
  }

  return (
    <AdminWrapper>
      <TimeSettingWrapper>
        <Text>Настройка времени</Text>
        <TimeSetting>
          <TimeBlock>
            <Text>часы:</Text>
            <Settings>
              <TextField
                id="outlined-basic"
                label="hours"
                variant="outlined"
                value={hour}
                onChange={handleHourChange}
                error={errorHour}
                helperText={errorHour ? "Только цифры до 23" : ''}
              />
              <Slider
                aria-label="hours"
                value={hour}
                onChange={(_, value) => handleSliderHourChange(_, value)}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={23}
              />
            </Settings>
          </TimeBlock>
          <TimeBlock>
            <Text>минуты:</Text>
            <Settings>
              <TextField
                id="outlined-basic"
                label="minutes"
                variant="outlined"
                value={minutes}
                onChange={handleMinutesChange}
                error={errorMinutes}
                helperText={errorMinutes ? "Только цифры до 59" : ''}
              />
              <Slider
                aria-label="minutes"
                value={minutes}
                onChange={(_, value) => handleSliderMinutesChange(_, value)}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={59}
              />
            </Settings>
          </TimeBlock>
          <TimeBlock>
           <Text>секунды:</Text>
            <Settings>
               <TextField
                 id="outlined-basic"
                 label="seconds"
                 variant="outlined"
                 value={second}
                 onChange={handleSecondsChange}
                 error={errorSeconds}
                 helperText={errorSeconds ? "Только цифры до 59" : ''}
               />
              <Slider
                aria-label="seconds"
                value={second}
                onChange={(_, value) => handleSliderSecondsChange(_, value)}
                valueLabelDisplay="auto"
                marks
                min={0}
                step={15}
                max={59}
              />
              </Settings>
          </TimeBlock>
        </TimeSetting>
        <Button variant="contained" disabled={block} onClick={() => onSetTimer(hour, minutes, second)}>Установить таймер</Button>
      </TimeSettingWrapper>
    </AdminWrapper>
  );
};

export default Admin;