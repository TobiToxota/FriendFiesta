/** @format */

const SpinnerComponent = ({ children }) => {
    return (
        <div className="has-text-centered" style={{ height: '100vh' }}>
            <div
                className="container"
                style={{ marginTop: '28vh', marginLeft: '42%' }}
            >
                <div className="loader is-flex"></div>
            </div>
            {children && (
                <div className="level mt-4 fade-in mx-6">
                    <div className="level-item has-text-centered">
                        <p
                            className=" is-size-3-fullhd is-size-4-widescreen is-size-4-touch"
                            style={{ color: 'white' }}
                        >
                            {children}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SpinnerComponent
