import React, { useEffect } from 'react';
import { TimerRenderer, useTimer } from 'react-use-precision-timer';

import Typography, { TypographyProps } from '@mui/material/Typography';

interface CountdownProps {
  /**The seconds you want to countdown.*/
  initialSeconds: number;
  /**The callback function to be executed when the countdown is completed.*/
  onComplete: () => void;
  /**This component use Typography of MUI as the root, <code>typographyProps</code> helps pass the customization props.*/
  typographyProps?: TypographyProps;
}

export const milisecondsToMMss = (millis: number): { min: number; sec: number } => {
  const sec = Number(((millis % 60000) / 1000).toFixed(0)) % 60;
  const lastMilli = millis - sec * 1000;
  const min = Math.round(lastMilli / 60000);
  return { min, sec };
};

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const Countdown = ({ initialSeconds, onComplete, typographyProps }: CountdownProps) => {
  const completeCountdown = React.useCallback(() => {
    onComplete();
  }, []);

  const timer = useTimer(
    {
      delay: 1000 * initialSeconds,
      runOnce: true,
    },
    completeCountdown
  );

  useEffect(() => {
    timer.start();
  }, []);

  return (
    <TimerRenderer
      timer={timer}
      renderRate={500}
      render={(timer) => {
        const displayTime = Math.floor(timer.getRemainingTime() / 1000);
        return (
          <Typography component={'span'} fontWeight={800} {...typographyProps}>
            {formatSeconds(displayTime)}
          </Typography>
        );
      }}
    />
  );
};
