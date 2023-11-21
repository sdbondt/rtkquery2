import React, { useState, useEffect } from 'react'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true)
  const toggleComponents = () => setShowLogin((val) => !val)

  useEffect(() => {
    document.title = showLogin ? 'Login': 'Signup'
  }, [showLogin])
  
  
  return (
    <div>
      <p>Welcom</p>
      {showLogin ? <Login />: <Signup />}
      <button type="button" onClick={toggleComponents}>{ showLogin ? 'Signup instead': 'Login instead'}</button>
    </div>
  )
}

export default Auth