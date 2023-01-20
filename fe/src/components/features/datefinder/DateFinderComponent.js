/** @format */

// package imports
import React, { useState } from 'react'

// local imports
import DateTableComponent from './DateTableComponent'
import AddDateComponent from './AddDateButtonComponent'
import AddFinalDateButtonComponent from './AddFinalDateButtonComponent'

const DateFinderComponent = ({
    nightOut,
    refreshNightOut,
    token,
    userData,
}) => {
    const [addFinalDateLoading, setAddFinalDateLoading] = useState(false)

    return (
        <>
            <AddDateComponent
                token={token}
                nightOut={nightOut}
                refreshNightOut={refreshNightOut}
                userData={userData}
            />
            <DateTableComponent
                nightOut={nightOut}
                refreshNightOut={refreshNightOut}
                token={token}
                userData={userData}
            />
            <AddFinalDateButtonComponent
                nightOut={nightOut}
                refreshNightOut={refreshNightOut}
                userData={userData}
                setAddFinalDateLoading={setAddFinalDateLoading}
            />
        </>
    )
}

export default DateFinderComponent
