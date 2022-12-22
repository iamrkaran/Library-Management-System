export const setIsLoggedIn = (isLoggedIn) => {
    return {
      type: 'SET_IS_LOGGED_IN',
      payload: isLoggedIn,
    }
  }

export const setLoginSuccess = (loginSuccess) => {
    return {
      type: 'SET_LOGIN_SUCCESS',
      payload: loginSuccess,
    }
  }

export const setSignupSuccess = (signupSuccess) => {
    return {
      type: 'SET_SIGNUP_SUCCESS',
      payload: signupSuccess,
    }
  }

export const setErrorMessage = (errorMessage) => {

    return {
      type: 'SET_ERROR_MESSAGE',
      payload: errorMessage,
    }
  }

export const setToken = (token) => {
    return {
      type: 'SET_TOKEN',
      payload: token,
    }
  }


  