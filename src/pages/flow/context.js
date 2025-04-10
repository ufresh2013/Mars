import React from 'react'

const ChangeNodeContext = React.createContext(null)

export const ChangeNodeProvider = ChangeNodeContext.Provider
export const useChangeNode = () => React.useContext(ChangeNodeContext)
