import React, {useEffect, useMemo, useRef, useState} from 'react';

import Text from '@components/base/Text/Text';
import {TTextProps} from '@components/base/Text/type';

import {Commons} from '@utils/commons';

type TPriceProps = {
  children?: number;
} & TTextProps;

const TextPriceAnimation = ({children, ...props}: TPriceProps) => {
  const [animatedValue, setAnimatedValue] = useState(children || 0);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (children !== undefined && hasRendered.current) {
      const startValue = children - 1000;
      const endValue = children;
      const duration = 500; // 0.5 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = startValue + (endValue - startValue) * progress;
        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setAnimatedValue(children || 0);
      hasRendered.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, hasRendered.current]);

  const animatedPriceValue = useMemo(() => {
    return Commons.number.formatNumberWithCommas(Math.round(animatedValue));
  }, [animatedValue]);

  return <Text {...props}>{animatedPriceValue}</Text>;
};

export default TextPriceAnimation;
