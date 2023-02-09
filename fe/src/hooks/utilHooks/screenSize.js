import { useState, useEffect } from 'react'


/* this custom react hook checks if the screensize is bigger or smaller then a given amount of pixels*/
function useScreenSize(screenSize) {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < screenSize)

        const handleResize = () => {
            setIsMobile(window.innerWidth < screenSize)
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
        
    }, [screenSize])

    return isMobile
}

export default useScreenSize


