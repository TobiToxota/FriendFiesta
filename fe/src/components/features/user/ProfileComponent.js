// local imports
import { useSwipeInFromBottomTwo } from '../../../hooks/animations/animations'

const ProfileComponent = ({ userData, token }) => {
    // animation
    useSwipeInFromBottomTwo(ProfileComponent, '#main-container')

    return (
        <div className="container is-fluid active is-rounded" id="main-container">
            <div
                className="notification is-light is-rounded fade-in shadow"
                style={{
                    marginTop: '6vh',
                    borderRadius: 15,
                    minHeight: '150px',
                }}
                id="nightout-container"
            >
                <h2 className="label is-size-3 is-size-4-touch has-text-centered mb-0">
                    Hi {userData.username}!
                </h2>
                    <img
                        className="image mb-2 mx-auto"
                        src={`https://avatars.dicebear.com/api/${userData.avatarStyle}/${userData.username}+${userData.avatarIteration}.svg`}
                        alt=""
                        width={'70px'}
                    />
                <h3 className="is-size-4 is-size-5-touch has-text-centered mb-2">
                    Here you can edit your user profile.
                </h3>
            </div>
        </div>
    )
}

export default ProfileComponent
