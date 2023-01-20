import React from 'react'
import CollapsibleComponent from '../../common/CollapsibleComponent'

const PlanningInfoComponent = ({}) => {
    return (
            <CollapsibleComponent
                title={'What to do here?'}
                content={
                    'In this phase you can create a suggestion about the plan for this Nightout. You can decide on which time you and your entourage will be where and what you are doing there. You can also add a description for your plan. You dont want to make a suggestion? No problem, you dont need to. In the next phase you will be able to see all the suggestions from everyone else and give a vote.'
                }
            />
    )
}

export default PlanningInfoComponent
