/** @format */

// package imports
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

// local imports
import AuthContext from '../../context/AuthContext'
import SpinnerComponent from '../../components/common/SpinnerComponent'
import HeaderComponent from '../../components/layout/HeaderComponent'
import { useGetNightOut } from '../../hooks/api/nightOutAPI'
import nightOutPhaseReturner from '../../utils/nightOutPhaseReturner'

const NightOutPage = () => {
    // get userData, token, params and nightOutData
    const { userData, token } = useContext(AuthContext)
    const { uuid } = useParams()
    const { nightOut, refreshNightOut, loading } = useGetNightOut(token, uuid)

    return (
        <>
            {loading ? (
                <>
                    <HeaderComponent />
                    <SpinnerComponent />
                </>
            ) : (
                <>
                    <HeaderComponent />
                    {nightOutPhaseReturner(
                        nightOut,
                        refreshNightOut,
                        userData,
                        token
                    )}
                </>
            )}
        </>
    )
}

export default NightOutPage
