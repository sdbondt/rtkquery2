import useAuthForms from "../../hooks/useAuthForms"
import errorMessage from "../../utils/errorHandler"

const Signup = () => {
  const { handleAuth: signup,
    credentials,
    handleChanges,
    isSignupError,
    isSignupLoading,
    signupError } = useAuthForms('signup', {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
    })
  
  if (isSignupLoading) return <p>loading</p>
  return (
    <fieldset>
      <legend>Signup</legend>
      <form onSubmit={signup}>
        <input type="email" name="email" value={credentials.email} onChange={handleChanges} />
        <input type="text" name="name" value={credentials.name} onChange={handleChanges} />
        <input type="password" name="password" value={credentials.password} onChange={handleChanges} />
        <input type="password" name="confirmPassword" value={credentials.confirmPassword} onChange={handleChanges} />
        <button type="submit">Signup!</button>
      </form>
      <p>{isSignupError ?<p>{errorMessage(signupError)}</p>: null}</p>
    </fieldset>
  )
}

export default Signup