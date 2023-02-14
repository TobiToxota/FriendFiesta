// local imports
import AuthContext from '../../context/AuthContext'
import HeaderComponent from '../../components/layout/HeaderComponent'
import SpinnerComponent from '../../components/common/SpinnerComponent'
import ProfileComponent from '../../components/features/user/ProfileComponent'

// package imports
import { useContext } from 'react'

const UserPage = () => {
    const { userData, token, refreshUserData } = useContext(AuthContext)

    if (!userData || !token) {
        return <SpinnerComponent />
    } else {
        return (
            <>
                <HeaderComponent />
                <ProfileComponent userData={userData} token={token} refreshUserData={refreshUserData}/>
            </>
        )
    }
}

export default UserPage
