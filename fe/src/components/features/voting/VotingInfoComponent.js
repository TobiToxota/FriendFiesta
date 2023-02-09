// local imports
import CollapsibleComponent from '../../common/CollapsibleComponent'

const VotingInfoComponent = () => {
    return (
        <CollapsibleComponent
            title={'What to do here?'}
            content={
                'In this phase you will see all the suggestions. You have one vote and you can vote for the suggestion you like the most. The voting phase will end automatically when either everyone has voted or the creator wants to end the voting phase early. You can send the creator of the nightout a reminder if you think he should end the voting phase early.'
            }
        />
    )
}

export default VotingInfoComponent;