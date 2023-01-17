/** @format */

// packages imports
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// local imports
import AuthContext from '../../context/AuthContext'
import useScreenSize from '../../hooks/utilHooks/ScreenSize'
import useGetNotifications from '../../hooks/api/notifiactionAPI'
import notificationsLength from '../../utils/notificationsLength'
import DropDownContentComponent from '../common/DropDownContentComponent'

const HeaderComponent = () => {
    // get the user from the context
    let { logout, userData, token } = useContext(AuthContext)
    let [hamburger, setHamburger] = useState(false)

    // get the Notifications
    const { notifications, loading } = useGetNotifications(token)

    // check with hook if screensize is mobile, so hamburger menu is active/inactive
    const isMobile = useScreenSize(1023)
    useEffect(() => {
        if (!isMobile) {
            setHamburger(false)
        }
    }, [isMobile])

    return (
        <nav
            className="navbar is-transparent"
            role="navigation"
            aria-label="main navigation"
            style={{ backgroundColor: '#fff0' }}
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/logo_light.png" alt="ltshangout logo" />
                </a>
                {hamburger && (
                    <div className="is-pulled-right fade-in">
                        <div className="dropdown is-hoverable is-vcentered">
                            <div className="dropdown-trigger ">
                                <button
                                    className="mt-3 ml-3 is-small button is-light is-rounded"
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu4"
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-bell" />
                                        {notificationsLength(notifications) && (
                                            <span
                                                title="Badge top right"
                                                className="badge is-top-right is-size-7 is-danger"
                                            >
                                                {notifications.length}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            </div>
                            <div
                                className="dropdown-menu fade-in"
                                id="dropdown-menu4"
                                role="menu"
                            >
                                <div className="dropdown-content-header">
                                    {notificationsLength(notifications) ? (
                                        <></>
                                    ) : (
                                        <p className="has-text-centered">
                                            You have no notifications
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    className={`navbar-burger ${hamburger ? ' is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navMenu"
                    onClick={() =>
                        setHamburger((prevHamburger) => !prevHamburger)
                    }
                    style={{ color: 'white' }}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            {!hamburger ? (
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <div id="loggedIn" className="is-inline-flex">
                            {!loading && (
                                <div className="navbar-item p-1">
                                    <div className="dropdown is-hoverable is-vcentered">
                                        <div className="dropdown-trigger ">
                                            <button
                                                className="button is-light is-rounded"
                                                aria-haspopup="true"
                                                aria-controls="dropdown-menu4"
                                            >
                                                <span className="icon">
                                                    <i className="fa-solid fa-bell" />
                                                    {notificationsLength(
                                                        notifications
                                                    ) && (
                                                        <span
                                                            title="Badge top right"
                                                            className="badge is-bottom is-size-7 is-danger fade-in"
                                                        >
                                                            {
                                                                notifications.length
                                                            }
                                                        </span>
                                                    )}
                                                </span>
                                            </button>
                                        </div>

                                        <div
                                            className="dropdown-menu fade-in"
                                            id="dropdown-menu4"
                                            role="menu"
                                        >
                                            <div className="dropdown-content-header">
                                                {notificationsLength(
                                                    notifications
                                                ) ? (
                                                    <div className="has-text-centered">
                                                        {notifications.map(
                                                            (
                                                                notification,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    {index !==
                                                                        0 && (
                                                                        <hr class="navbar-divider"></hr>
                                                                    )}
                                                                    {notification.sender !==
                                                                        null && (
                                                                        <div className='columns is-vcentered is-centered p-1 pr-0'>
                                                                            <div className='column is-10 is-vcentered is-size-6 is-size-7-touch has-text-centered'>
                                                                            <Link
                                                                                to={
                                                                                    '/nightout/' +
                                                                                    notification
                                                                                        .nightout
                                                                                        .uuid
                                                                                }
                                                                            >
                                                                                {
                                                                                    notification
                                                                                        .sender
                                                                                        .username
                                                                                }{' '}
                                                                                {
                                                                                    notification.notificationMessage
                                                                                }
                                                                            </Link>
                                                                            </div>
                                                                            <div className='column is-vcentered is-1 pl-0'>
                                                                            <span className="icon has-text-centered is-clickable"
                                                                            onClick={() => console.log('dismiss')}>
                                                                                <i className="fa-regular fa-trash-can" />
                                                                            </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {notification.sender ===
                                                                        null && (
                                                                        <Link to={
                                                                            '/nightout/' +
                                                                            notification
                                                                                .nightout
                                                                                .uuid
                                                                        }>
                                                                            {
                                                                                notification
                                                                                    .nightout
                                                                                    .title
                                                                            }{' '}
                                                                            {
                                                                                notification.notificationMessage
                                                                            }
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="is-inline-flex has-text-centered">
                                                        <span className="icon has-text-centered ml-2">
                                                            <i className="fa-regular fa-face-smile-beam" />
                                                        </span>
                                                        <p className="ml-1">
                                                            You have no
                                                            notifications
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="navbar-item p-1">
                                <Link to="/user">
                                    <button
                                        className="button is-light is-rounded"
                                        id="avatar"
                                    >
                                        <span className="icon">
                                            <img
                                                src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                            <div className="navbar-item p-1">
                                <Link to={'/nightoutlist'}>
                                    <button className="button is-light is-rounded">
                                        <span className="icon">
                                            <i className="fa-solid fa-list-ul" />
                                        </span>
                                        <p className="is-size-7">
                                            Your NightOuts
                                        </p>
                                    </button>
                                </Link>
                            </div>
                            <div className="navbar-item p-1">
                                <button
                                    className="button is-light is-rounded"
                                    onClick={logout}
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-person-running" />
                                    </span>
                                    <span>LogOut</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        id="hamburgerMenu"
                        className="navbar-menu fade-in"
                        style={{ display: 'block' }}
                    >
                        <div className="navbar-end">
                            <Link to={'/nightoutlist'}>
                                <p
                                    className="navbar-item has-text-right"
                                    id="navbarItem"
                                >
                                    Your NightOuts
                                </p>
                            </Link>
                            <Link to={'/user'}>
                                <p
                                    className="navbar-item has-text-right"
                                    id="navbarItem"
                                >
                                    Edit your profile
                                </p>
                            </Link>
                            <p
                                className="navbar-item has-text-right"
                                id="navbarItem"
                                onClick={logout}
                            >
                                Logout
                            </p>
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}

export default HeaderComponent
