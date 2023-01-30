/** @format */

import anime from "animejs";
import React, { useEffect } from "react";

const CollapsibleComponent = ({ title, content, style, arrow }) => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // rotate the arrow depending on open state
    if (open) {
      anime({
        targets: "#arrow",
        rotate: {
          value: [0, 180],
          duration: 330,
          easing: "easeOutCubic",
        },
      });
      // also animate the content;
      anime({
        targets: "#content",
        marginTop: [-30, 0],
        duration: 200,
        easing: "easeOutCubic",
      });
      anime({
        targets: "#content",
        opacity: [0, 1],
        duration: 600,
        easing: "easeOutCubic",
      });
    } else {
      anime({
        targets: "#arrow",
        rotate: {
          value: [180, 0],
          duration: 330,
          easing: "easeOutCubic",       
        },
      });
    }
  }, [open]);


  return (
    <div className="collapsible is-unselectable">     
      <div className="content is-medium mt-2 has-text-centered" style={{backgroundColor: style}}>
        <p className="label is-inline is-size-4 is-size-5-touch" onClick={toggle}>
          {title}
          <i className="ml-1 fa-solid fa-chevron-down is-size-4 is-size-5-touch is-clickable" style={{color: arrow}} id="arrow"></i>
        </p>
        <div className="container" id="animate">
          {open && (
            <p className="label collapsible-content is-size-6 is-size-7-touch" id="content">
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleComponent;
