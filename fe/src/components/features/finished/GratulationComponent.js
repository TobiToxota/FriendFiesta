// local imports
import { useGratulateOne, swipeAwayToTop } from '../../../hooks/animations/animations'

const GratulationComoponent = ({ nightOut, userData }) => {
    // animation
    useGratulateOne(GratulationComoponent, '#wellDone')
    setTimeout(() => {
        swipeAwayToTop('#wellDone')
    }, 3000)

    return (
        <>
            <div
                className="container is-justify-content-center mb-1 has-text-centered px-2"
                id="wellDone"
                style={{ marginTop: '10vh' }}
            >
                <div className="container mb-1 has-text-centered mx-auto" id="WellDoneGraphic">
                    <img
                        className="is-rounded img-shadow"
                        src="/FinishedNightOut.png"
                        alt=""
                        style={{ width: '16vh', borderRadius: '40px' }}
                    />
                </div>
                <p className="is-size-3 is-size-3-touch">🎉</p>
                <p className="is-size-3 is-size-4-touch has-text-white">
                    Hey {userData.username}, here is the final plan for:
                </p>
                <p className="dancing-script-header" style={{ fontSize: '55px' }}>
                    {nightOut.title}
                </p>
            </div>
        </>
    )
}

export default GratulationComoponent
