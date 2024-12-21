import {useCallback, useEffect, useRef, useState} from 'react';

import {AppState, AppStateStatus} from 'react-native';

export const useAppCountdown = ({
  totalSeconds,
  onComplete,
}: {
  totalSeconds: number;
  onComplete?: () => void;
}) => {
  const [seconds, setSeconds] = useState<number>(totalSeconds);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const backgroundTimestamp = useRef<number | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = useCallback(() => {
    intervalId.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
  }, []);
  const reset = useCallback(() => {
    setSeconds(totalSeconds);
    backgroundTimestamp.current = null;
    intervalId.current && clearInterval(intervalId.current);
    startCountdown();
  }, [startCountdown, totalSeconds]);

  const stopCountdown = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const _onComplete = useCallback(() => {
    if (seconds === 0) {
      stopCountdown();
      onComplete?.();
    }
  }, [onComplete, seconds, stopCountdown]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // Calculate the difference in time when the app becomes active again
        if (backgroundTimestamp.current) {
          const timeDiff = Math.floor(
            (Date.now() - backgroundTimestamp.current) / 1000,
          );
          setSeconds(prev => Math.max(prev - timeDiff, 0));
        }
        startCountdown();
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        backgroundTimestamp.current = Date.now();
        stopCountdown();
      }
      appState.current = nextAppState;
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // (AppState as any).removeEventListener('change', handleAppStateChange);
    };
  }, [startCountdown, stopCountdown]);

  useEffect(() => {
    startCountdown();
    return stopCountdown;
  }, [startCountdown, stopCountdown]);

  useEffect(() => {
    _onComplete();
  }, [seconds, _onComplete]);

  return {seconds, reset};
};

export default useAppCountdown;
