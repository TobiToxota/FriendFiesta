import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import { useSwipeInFromBottom } from '../../hooks/animations/animations'

const LandingPage = () => {
    useSwipeInFromBottom(LandingPage, '#body')
    return (
        <section className="hero is-fullheight is-default is-bold has-background-white">
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                <p className="dancing-script-header has-text-link">FriendFiesta</p>
                            </a>
                        </div>
                        <div id="navbarMenu" className="navbar-menu">
                            <div className="navbar-end">
                                <div className="tabs is-right">
                                    <ul>
                                        <Link>
                                            <li className="is-active has-text-link label">Login</li>
                                        </Link>
                                        <Link>
                                            <li className="is-active has-text-link label">
                                                Register
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="body">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="columns is-vcentered">
                            <div className="column is-6">
                                <img src="/logo_dark.png" alt="" width={300} />
                                <h2 className="subtitle is-4 mb-1">
                                    Plan your next Nightout with your family, friends or co-workers.
                                </h2>
                                <h3 className="subtitle is-5">
                                    Find a suitable date together. Make suggestions for a great
                                    evening. Share your suggestions and vote together which evening
                                    will be your final nightout.
                                </h3>
                                <br />
                                <p className="has-text-centered">
                                    <a className="button is-medium is-link is-outlined mr-1">
                                        <span className="icon">
                                            <i className="fa-solid fa-door-open" />
                                        </span>
                                        <span className="">Login</span>
                                    </a>
                                    <a className="button is-medium is-link is-outlined">
                                        <span className="icon">
                                            <i className="fa-solid fa-user-astronaut" />
                                        </span>
                                        <span className="">Register</span>
                                    </a>
                                </p>
                            </div>
                            <div className="column is-6">
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <figure className="image shadow">
                                            <img src="/nightout-stock-one.jpg" alt="Description" />
                                        </figure>
                                    </div>
                                    <div className="column">
                                        <figure className="image mt-4 shadow">
                                            <img src="/nightout-stock-two.jpg" alt="Description" />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-body">
                    <div className="container is-widescreen">
                        <div className="content">
                            <h5 className="title is-size-3 has-text-link">
                                What should I know before I start planning a Nightout?
                            </h5>
                            <p className="is-size-6">
                                FriendFiesta is free 🚀
                                <br /> It is okay if a participant is not always active, but most
                                participants should be active and contribute to the planning
                                <br /> 📍 You can use Google Places, to add your favorite restaurant for example, when you create a plan
                                suggestion
                                <br /> FriendFiesta is still in Beta. I would love to hear from you what do you like and what you don't like
                                <br /> To give me some feedback or report something just fill out this form 📝
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container">
                    <div className="tabs is-centered">
                        <ul>
                            <li>
                                <a>And this is the bottom</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingPage
