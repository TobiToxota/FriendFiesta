import { createContext, useState } from 'react'

// create the ModalContext
const ModalContext = createContext()

export default ModalContext

export const ModalProvider = ({ children }) => {
    // create the states
    const [modal, setModal] = useState(null)
    const [modalData, setModalData] = useState({})

    // put in the context data
    const contextData = {
        modal: modal,
        setModal: setModal,
        modalData: modalData,
        setModalData: setModalData
    }

    return (
        <ModalContext.Provider value={contextData}>
            {children}
        </ModalContext.Provider>
    )
}
