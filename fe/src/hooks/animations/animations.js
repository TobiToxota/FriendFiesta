import anime from "animejs"
import { useEffect } from "react";

let useSwipeInFromLeft = (component, target) => {
    console.log("triggered")

    useEffect(() => {
        anime({
          targets: target,
          translateX: [-500, 0],
          duration: 1000,
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [component]);
}

export {useSwipeInFromLeft}