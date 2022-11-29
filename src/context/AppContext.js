import React, { createContext, useEffect, useState } from 'react'
export const AppContext = createContext()

import { version } from '../../package.json'
import { _checkVersion } from '../utils/api.service'
export const AppContextProvider = ({ children }) => {
    const [update, setUpdate] = useState(false)

    const checkUpdate = async () => {
        const res = await _checkVersion()
        console.log(res);
        // if (version != res.version) {
        //     setUpdate(true)
        // }
    }

    useEffect(() => {
        checkUpdate()
    }, [])


    return (
        <AppContext.Provider value={{ update }}>
            {children}
        </AppContext.Provider >
    )
}