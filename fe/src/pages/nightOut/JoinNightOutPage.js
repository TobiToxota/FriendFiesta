// local imports
import AuthContext from '../../context/AuthContext'
import HeaderComponent from '../../components/layout/HeaderComponent'
import { useSwipeInFromTop } from '../../hooks/animations/animations'
import { useAddParticipantToNightOutViaJoinLink } from '../../hooks/api/participantAPI'

// package imports
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const JoinNightOutPage = ({}) => {
    const { userData, token } = useContext(AuthContext)
    const [password, setPassword] = useState('')
    const { uuid } = useParams()

    // animation
    useSwipeInFromTop(JoinNightOutPage, '#join-nightout')

    // join link hook
    const {addParticipantToNightOutViaJoinLink , joinFetching} = useAddParticipantToNightOutViaJoinLink(token, uuid)

    if (userData) {
        return (
            <>
                <HeaderComponent />
                <div
                    className="container is-widescreen is-fluid active visible"
                    id="join-nightout"
                    style={{ marginTop: '25vh' }}
                >
                    <div className="container is-flex is-vcentered is-justify-content-center mb-1">
                        <img src="/logo_light.png" alt="" width={300} />
                    </div>
                    <div className="container is-flex is-vcentered is-justify-content-center mb-3 mt-1">
                        <h1
                            className="title is-3 roboto-plain has-text-centered is-size-4-touch"
                            style={{ color: 'white' }}
                        >
                            Hey {userData.username}
                        </h1>
                    </div>
                    <div className="container is-flex is-vcentered is-justify-content-center">
                        <h2
                            className="subtitle mb-1 has-text-centered is-size-6-touch"
                            style={{ color: 'white' }}
                        >
                            You got that join link and a password from your friend?
                        </h2>
                    </div>
                    <div className="container is-flex is-vcentered is-justify-content-center">
                        <h2
                            className="subtitle mb-5 has-text-centered is-size-6-touch"
                            style={{ color: 'white' }}
                        >
                            Thats nice, just put the password it into the form and join that Nightout.
                        </h2>
                    </div>
                    <div className="container is-flex is-vcentered is-justify-content-center">
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    className="input is-rounded is-size-7-touch is-success"
                                    type="text"
                                    placeholder="Join Link Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="control">
                                <button className="button is-success is-rounded is-size-7-touch"
                                onClick={() => addParticipantToNightOutViaJoinLink(password)}>
                                    Join that Nightout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <section className="hero is-success is-fullheight">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="/">
                                    <p className="dancing-script-header">FriendFiesta</p>
                                </a>
                            </div>
                            <div id="navbarMenuHeroB" className="navbar-menu">
                                <div className="navbar-end">
                                    <Link to={'/login'}>
                                        <span className="navbar-item pr-0">
                                            <button className="button is-info is-inverted is-rounded">
                                                <span className="icon">
                                                    <i className="fas fa-right-to-bracket" />
                                                </span>
                                                <span>Login</span>
                                            </button>
                                        </span>
                                    </Link>
                                    <Link to={'/register'}>
                                        <span className="navbar-item">
                                            <button className="button is-info is-inverted is-rounded">
                                                <span className="icon">
                                                    <i className="fas fa-right-to-bracket" />
                                                </span>
                                                <span>Register</span>
                                            </button>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="hero-body is-align-items-start" style={{ marginTop: '10%' }}>
                    <div className="container has-text-centered">
                        <div className="container is-flex is-vcentered is-justify-content-center mb-1">
                            <img src="/logo_light.png" alt="" width={300} />
                        </div>
                        <p className="subtitle">
                            Hey you! It seems like you clicked on a link a friend sent you.
                            Unfortunately, you are not logged in or don't have an account yet. Just
                            log in or create an account here with us and plan your next night out
                            with your friends.
                        </p>
                        <div className="buttons is-justify-content-center">
                            <Link to={'/login'}>
                                <span className="navbar-item pr-0">
                                    <button className="button is-info is-inverted is-rounded">
                                        <span className="icon">
                                            <i className="fas fa-right-to-bracket" />
                                        </span>
                                        <span>Login</span>
                                    </button>
                                </span>
                            </Link>
                            <Link to={'/register'}>
                                <span className="navbar-item">
                                    <button className="button is-info is-inverted is-rounded">
                                        <span className="icon">
                                            <i className="fas fa-right-to-bracket" />
                                        </span>
                                        <span>Register</span>
                                    </button>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default JoinNightOutPage
