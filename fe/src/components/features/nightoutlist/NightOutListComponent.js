/** @format */

import { Link } from "react-router-dom";

import {
  getPhaseForNightOutListComponent,
  getColorForNightOutListComponent,
} from "../../../utils/nightOutListComponentUtils.js.js";
import { useFading } from "../../../hooks/animations/animations.js";

const NightOutListComponent = ({ nightOut}) => {
  useFading('#nightoutlist-component')

  return (
    <Link to={`/nightout/${nightOut.uuid}`}>
      <div
        className="box m-1"
        id="nightoutlist-component"
        style={{
          backgroundColor: getColorForNightOutListComponent(nightOut),
          color: "black",
          borderRadius: "15px",
        }}>
        <div className="content">
          <h3 id="blackTitle">{nightOut.title}</h3>
          <span className="icon mt-1 mb-1">
            Creator:
            <img
              src={`https://avatars.dicebear.com/api/${nightOut.creator.avatarStyle}/${nightOut.creator.username}+${nightOut.creator.avatarIteration}.svg`}
              alt=""
            />
            {nightOut.creator.username}
          </span>

          <p>
            {getPhaseForNightOutListComponent(nightOut)}
            <br></br>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NightOutListComponent;
