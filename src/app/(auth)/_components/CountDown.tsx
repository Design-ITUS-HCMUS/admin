import React, { useEffect } from 'react';
import { TimerRenderer, useTimer } from 'react-use-precision-timer';

interface CountDownProps {
  initialSeconds: number;
  onComplete: () => void;
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

export const CountDown = ({ initialSeconds, onComplete }: CountDownProps) => {
  const completeCountDown = React.useCallback(() => {
    onComplete();
  }, []);

  const timer = useTimer(
    {
      delay: 1000 * initialSeconds,
      runOnce: true,
    },
    completeCountDown
  );

  useEffect(() => {
    timer.start();
  });

  return (
    <TimerRenderer
      timer={timer}
      renderRate={500}
      render={(timer) => {
        const displayTime = Math.floor(timer.getRemainingTime() / 1000);
        return <span style={{ fontWeight: '800' }}>{formatSeconds(displayTime)}</span>;
      }}
    />
  );
};
