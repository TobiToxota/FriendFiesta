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
      <div className="content is-medium mt-1 has-text-centered" style={{backgroundColor: style}}>
        <h1 className="is-inline collapsible-header is-size-3 is-size-4-touch" onClick={toggle}>
          {title}
          <i className="ml-1 fa-solid fa-chevron-down is-size-3 is-size-4-touch" style={{color: arrow}} id="arrow"></i>
        </h1>
        <div className="container" id="animate">
          {open && (
            <p className="has-text-weight-semibold collapsible-content is-size-6" id="content">
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleComponent;
