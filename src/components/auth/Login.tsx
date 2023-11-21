import useAuthForms from '../../hooks/useAuthForms'
import errorMessage from '../../utils/errorHandler'

const Login = () => {
  const { credentials,
    handleAuth: login,
    handleChanges,
    loginError,
    isLoginError,
    isLoginLoading
  } = useAuthForms("login", {
    email: '',
    password: ''
  })
  
  if(isLoginLoading) return <p>loading</p>
  return (
    <fieldset>
      <legend>Login</legend>
      <form onSubmit={login}>
        <input type="email" name="email" value={credentials.email} onChange={handleChanges} />
        <input type="password" name="password" value={credentials.password} onChange={handleChanges} />
        <button type="submit">Login!</button>
      </form>
      <p>{isLoginError ? <p>{errorMessage(loginError)}</p>: null } </p>
    </fieldset>
  )
}

export default Login