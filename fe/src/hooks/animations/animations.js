import anime from "animejs"
import { useEffect } from "react";


/* This function lets an target (id or classname) fly in from the left when the component changes or gets rendered*/
let useSwipeInFromLeft = (component, target) => {

  useEffect(() => {
    anime({
      targets: target,
      translateX: [-500, 0],
      duration: 1000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
}

/* This function lets an target (id or classname) fly in from the bottom when the component changes or gets rendered*/
let useSwipeInFromTop = (component, target) => {
  
  useEffect(() => {
    anime({
      targets: target,
      translateY: [-500, 0],
      duration: 1000,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component])
}

export { useSwipeInFromLeft, useSwipeInFromTop }