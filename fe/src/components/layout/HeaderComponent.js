/** @format */

// packages imports
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// local imports
import AuthContext from '../../context/AuthContext'
import useScreenSize from '../../hooks/utilHooks/screenSize'
import { useGetNotifications, usePatchNotification } from '../../hooks/api/notifiactionAPI'
import notificationsLength from '../../utils/notificationsLength'
import { shaking } from '../../hooks/animations/animations'

const HeaderComponent = () => {
    // get the user from the context
    let { logout, userData, token } = useContext(AuthContext)
    let [hamburger, setHamburger] = useState(false)

    // get the Notifications
    const { getNotifications, notifications, loading } = useGetNotifications(token)

    // get the usePatchNotificationHook
    const { patchNotification } = usePatchNotification(token, getNotifications)

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
                    <p className="dancing-script-header">FriendFiesta</p>
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
                            <div className="dropdown-menu fade-in" id="dropdown-menu4" role="menu">
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
                    onClick={() => setHamburger((prevHamburger) => !prevHamburger)}
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
                                                className="button is-light is-rounded fade-in"
                                                aria-haspopup="true"
                                                aria-controls="dropdown-menu4"
                                            >
                                                <span className="icon">
                                                    <i className="fa-solid fa-bell" />
                                                    {notificationsLength(notifications) && (
                                                        <span
                                                            title="Badge top right"
                                                            className="badge is-bottom is-size-7 is-danger fade-in"
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
                                            <div className="dropdown-content-header has-text-centered">
                                                {notificationsLength(notifications) ? (
                                                    <div className="has-text-centered">
                                                        {notifications.map(
                                                            (notification, index) => (
                                                                <div key={index}>
                                                                    {index !== 0 && (
                                                                        <hr className="navbar-divider"></hr>
                                                                    )}
                                                                    {notification.sender !==
                                                                        null && (
                                                                        <div className="columns is-vcentered is-centered p-1 pr-0">
                                                                            <div
                                                                                className="column is-10 is-vcentered has-text-centered"
                                                                                id={
                                                                                    'notification' +
                                                                                    notification.id
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    to={
                                                                                        '/nightout/' +
                                                                                        notification
                                                                                            .nightout
                                                                                            .uuid
                                                                                    }
                                                                                >
                                                                                    {' '}
                                                                                    <p
                                                                                        id={
                                                                                            'notificationtext' +
                                                                                            notification.id
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
                                                                                    </p>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="column is-vcentered is-1 pl-0">
                                                                                <span
                                                                                    className="icon has-text-centered is-clickable"
                                                                                    onClick={() => {
                                                                                        patchNotification(
                                                                                            notification.id
                                                                                        )
                                                                                        shaking(
                                                                                            '#trash-can' +
                                                                                                notification.id
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <i
                                                                                        className="fa-regular fa-trash-can"
                                                                                        id={
                                                                                            'trash-can' +
                                                                                            notification.id
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {notification.sender ===
                                                                        null && (
                                                                        <>
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
                                                                                        .nightout
                                                                                        .title
                                                                                }
                                                                                {
                                                                                    <>
                                                                                        .<br />
                                                                                    </>
                                                                                }
                                                                                {
                                                                                    notification.notificationMessage
                                                                                }
                                                                            </Link>
                                                                            <span
                                                                                className="icon has-text-centered is-clickable is-inline"
                                                                                onClick={() => {
                                                                                    patchNotification(
                                                                                        notification.id
                                                                                    )
                                                                                    shaking(
                                                                                        '#trash-can' +
                                                                                            notification.id
                                                                                    )
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    className="fa-regular fa-trash-can"
                                                                                    id={
                                                                                        'trash-can' +
                                                                                        notification.id
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className=" is-inline-flex is-align-items-center is-justify-content-center">
                                                        <span className="icon">
                                                            <i className="fa-regular fa-face-smile-beam" />
                                                        </span>
                                                        <p className="ml-1 is-unselectable">
                                                            You have 0 notifications
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
                                    <button className="button is-light is-rounded" id="avatar">
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
                                        <p className="is-size-6 has-text-weight-semibold pb-1">
                                            Your Nightouts
                                        </p>
                                    </button>
                                </Link>
                            </div>
                            <div className="navbar-item p-1">
                                <button
                                    className="button is-light is-rounded has-text-weight-semibold"
                                    onClick={logout}
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-person-running" />
                                    </span>
                                    <span className="pb-1">LogOut</span>
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
                                <p className="navbar-item has-text-right" id="navbarItem">
                                    Your Nightouts
                                </p>
                            </Link>
                            <Link to={'/user'}>
                                <p className="navbar-item has-text-right" id="navbarItem">
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
