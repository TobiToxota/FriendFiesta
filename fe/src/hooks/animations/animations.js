/** @format */

import anime from "animejs";
import { useEffect, useLayoutEffect } from "react";

/* This function lets an target (id or classname) fly in from the left when the component changes or gets rendered*/
const useSwipeInFromLeft = (component, target) => {
  useLayoutEffect(() => {
    anime({
      targets: target,
      translateX: [-500, 0],
      duration: 1000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
};

/* This function lets an target (id or classname) fly in from the bottom when the component changes or gets rendered*/
const useSwipeInFromTop = (component, target) => {
  useLayoutEffect(() => {
    anime({
      targets: target,
      translateY: [-500, 0],
      duration: 1000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
};

/* This function lets two targets (part of progress bar) animate fill in and fade in*/
const useProgressAnimation = (percentage, targetOne, targetTwo) => {
  useEffect(() => {
    anime({
      targets: targetOne,
      value: [0, percentage],
      duration: 1000,
      easing: "easeInOutExpo",
    });

    anime({
      targets: targetTwo,
      opacity: [0, 1],
      duration: 1500,
      easing: "easeInOutExpo",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);
};

/* This function lets an array of divs fade in slowly behind each other */
const useFading = (target) => {
  useLayoutEffect(() => {
    anime({
      targets: target,
      opacity: [0, 1],
      borderRadius: [30, 15],
      duration: 300,
      delay: anime.stagger(30),
      easing: 'easeInOutQuad'
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
};

export {
  useSwipeInFromLeft,
  useSwipeInFromTop,
  useProgressAnimation,
  useFading,
};
