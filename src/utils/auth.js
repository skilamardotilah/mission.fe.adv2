
export const isRegistered = () => localStorage.getItem('registered') === 'true'
export const isLoggedIn  = () => localStorage.getItem('loggedIn') === 'true'

export const setRegistered = () => localStorage.setItem('registered', 'true')
export const setLoggedIn  = () => localStorage.setItem('loggedIn', 'true')
export const logout       = () => localStorage.removeItem('loggedIn')
