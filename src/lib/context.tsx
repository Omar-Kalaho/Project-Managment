'use client'

import React from "react"

export const AuthContext = React.createContext({})

export const authReducer = (state:State, action:any) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children}:any) => {
  const [state, dispatch] =React.useReducer(authReducer, { 
    user: null
  })
  React.useEffect(() => {
    let storage =localStorage.getItem('user')
    const user = storage?JSON.parse(storage):null;
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
// add typescript types
type State = {
  user: {email: string, userType: string}
}
type Action = {

}

