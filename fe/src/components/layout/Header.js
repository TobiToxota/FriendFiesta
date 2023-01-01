import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Header = () => {
    // get the user from the context
    let { logout, userData } = useContext(AuthContext);
    let [hamburger, setHamburger] = useState(false);

    return (
        <nav
            className="navbar is-transparent"
            role="navigation"
            aria-label="main navigation"
            style={{ backgroundColor: "#fff0" }}>
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/logo_light.png" alt="ltshangout logo" />
                </a>
                <button
                    className={`navbar-burger ${hamburger ? " is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navMenu"
                    onClick={() => setHamburger(prevHamburger => !prevHamburger)}
                    style={{ color: "white" }}>
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            <div id="navMenu" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <div id="loggedIn" className="is-inline-flex">
                                <button className="button is-light is-rounded" id="avatar">
                                    <Link to="/user">
                                        <span className="icon">
                                            <img
                                                src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                                                alt=""
                                            />
                                        </span>
                                    </Link>
                                </button>

                                <div>
                                    <a
                                        className="button is-light is-rounded mr-2"
                                        href="/nightoutlist">
                                        <span className="icon">
                                            <i className="fa-solid fa-list-ul" />
                                        </span>
                                        <p className="is-size-7">Your NightOuts</p>
                                    </a>
                                </div>

                                <div onClick={logout}>
                                    <button className="button is-light is-rounded">
                                        <span className="icon">
                                            <i className="fa-solid fa-person-running" />
                                        </span>
                                        <span>LogOut</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;