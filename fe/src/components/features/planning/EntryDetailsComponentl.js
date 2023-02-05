// local imports
import { makeDateBeautiful, splitLocationType } from '../../../utils/nightOutPlanningUtils'

const EntryDetailsComponent = ({ entry, token }) => {
    return (
        <div className="columns is-vcentered">
            <div className="column is-6 ml-2">
                <div className="container mb-2">
                    {entry.formType === 'Google Maps' ? (
                        <a
                            href={'https:/www.google.de/maps/search/' + entry.name}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="is-size-4 has-text-weight-semibold">{entry.name}</span>
                        </a>
                    ) : (
                        <span className="is-size-4 has-text-weight-semibold">{entry.name}</span>
                    )}
                </div>
                <div className="container mb-2">
                    <span className="is-size-4 is-size-5-touch">
                        {!entry.location ? <>Address: Not defined</> : entry.location}
                    </span>
                </div>
                <div className="container mb-2">
                    <span className="is-size-4  is-size-5-touch">
                        {!entry.locationType ? (
                            <>Location-Type: Not defined</>
                        ) : (
                            splitLocationType(entry.locationType)
                        )}
                    </span>
                </div>
                <div className="container mb-2">
                    <span className="is-size-4  is-size-5-touch">
                        From: {makeDateBeautiful(entry.startTime)} to:{' '}
                        {makeDateBeautiful(entry.endTime)}
                    </span>
                </div>
                <div className="container">
                    <span className="is-size-4  is-size-5-touch">
                        Rating: {!entry.rating ? <>No Google Maps Place</> : entry.rating}
                    </span>
                </div>
            </div>
            <div className="column has-text-centered">
                {entry.photoKey ? (
                    <figure className="image mx-auto">
                        <img
                            className="mx-auto mb-2"
                            src={entry.photoKey}
                            alt={entry.name}
                            style={{ borderRadius: '12px', width: '150px' }}
                        />
                        <span className="has-text-primary-dark">
                            If you want to edit this entry, just click on the edit button in the
                            list.
                        </span>
                    </figure>
                ) : (
                    <span className="my-auto has-text-primary-dark">
                        This place is an individual place. You can add some data with the edit
                        button from this entry on the entry list.
                    </span>
                )}
            </div>
        </div>
    )
}

export default EntryDetailsComponent
