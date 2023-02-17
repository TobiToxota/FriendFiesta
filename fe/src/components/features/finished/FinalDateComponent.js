// local imports
import { nightOutDateToDate } from "../../../utils/nightOutDateToDate";
const FinalDateComponent = ({finalDate}) => {
    return (
        <div className='container has-text-centered'>
           <p className="label is-size-5">You all have agreed on the date <span className="is-size-4">{nightOutDateToDate(finalDate)}</span> for your Nightout</p>
        </div>
    )
}

export default FinalDateComponent;