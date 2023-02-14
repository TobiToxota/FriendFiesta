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
      translateY: [-400, 0],
      duration: 400,
      easing: 'easeOutQuint'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
};

/* This function lets an target (id or classname) fly in from the bottom when the component changes or gets rendered*/
const useSwipeInFromBottom = (component, target) => {
  useLayoutEffect(() => {
    anime({
      targets: target,
      translateY: [1000, 0],
      duration: 400,
      delay: 300,
      easing: 'easeOutQuint'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
};

/* This function lets an target (id or classname) fly in from the bottom when the component changes or gets rendered*/
const useSwipeInFromBottomTwo = (component, target) => {
  useLayoutEffect(() => {
    anime({
      targets: target,
      translateY: [2000, 0],
      duration: 400,
      easing: 'easeOutQuint'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
};

/* This function lets an target (id or classname) fly in from the bottom when the component changes or gets rendered*/
const swipeAwayToBottom = (target) => {
    anime({
      targets: target,
      translateY: [0, 1500],
      duration: 1000,
      easing: 'easeOutQuint',
      delay: 800
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      translateX: [0, 3, -3, 0],
      duration: 300,
      delay: anime.stagger(30),
      easing: "easeInOutQuad",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
};

/* This function lets an target shake */
const shaking = (target) => {
  anime({
    targets: target,
    rotate: [0, -20, 20, -20, 20, 0],
    duration: 300,
  })
}

/* This function lets an target shake */
const shakingTwo = (target) => {
  anime({
    targets: target,
    rotate: [0, -5, 5, -5, 5, 0],
    duration: 300,
  })
}

/* this function aniamtes a button */
const buttonPress = (target) => {
  anime({
    targets: target,
    translateX: [
      { value: 2, duration: 50 },
      { value: -2, duration: 50 },
      { value: 2, duration: 50 },
      { value: 0, duration: 50 },
    ],
    backgroundColor: [ "#48c78e", "#3e56c4"],
    easing: "easeOutElastic(1, .8)",
  });
};

/* This function lets an target (id or classname) fly in from the left when the component changes or gets rendered*/
const swipeAwaytoRight = (target) => {
    anime({
      targets: target,
      translateX: [
        { value: 10, duration: 90 },
        { value: -10, duration: 70 },
        { value: 10, duration: 80 },
        { value: 0, duration: 50 },
      ],
      
      easing: "easeInOutQuad",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
};


export {
  useSwipeInFromLeft,
  useSwipeInFromTop,
  useProgressAnimation,
  useSwipeInFromBottom,
  useSwipeInFromBottomTwo,
  swipeAwayToBottom,
  useFading,
  shaking,
  shakingTwo,
  buttonPress,
  swipeAwaytoRight
};
