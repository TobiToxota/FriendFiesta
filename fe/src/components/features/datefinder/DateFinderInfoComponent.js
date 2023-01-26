import React from 'react'
import CollapsibleComponent from '../../common/CollapsibleComponent'

const DateFinderInfoComponent = () => {
    return (
        <CollapsibleComponent
            title={'What to do here?'}
            content={
                'In this phase you and your friends can find a date where most of the participants can participate in the Nightout. You can add date-suggestions and tell the other ones on which certain date you are willing to come. Please remember to click the finished button when you are done. Only the creator can select a final-date. But you can send him a reminder.'
            }
        />
    )
}

export default DateFinderInfoComponent
