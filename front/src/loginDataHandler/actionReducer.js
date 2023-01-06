const loginReducer = (state, action) => {
    switch (action.type) {
      case 'EMAIL': {
        return {
          ...state,
          email: action.typedEmail,
        }
  
      }
      case 'PASSWORD': {
        return {
          ...state,
          password: action.typedPassword,
        }
      }
      default:
        return state;
    }
  }
  
  const enteredLoginDataIsValidReducer = (state, action) => {
    switch (action.type) {
      case 'EMAIL': {
        return {
          ...state,
          isEmail: action.isEmailAvailable,
        }
  
      }
      case 'PASSWORD': {
        return {
          ...state,
          isPassword: action.isPasswordAvailable,
        }
      }
      default:
        return state;
    }
  }
  
  const isMessageReducer = (state, action) => {
    switch (action.type) {
      case 'EMAIL': {
        return {
          ...state,
          emailMessage: action.emailMessage,
        }
  
      }
      case 'PASSWORD': {
        return {
          ...state,
          passwordMessage: action.passwordMessage,
        }
      }
      default:
        return state;
    }
  }

  module.exports = {loginReducer, enteredLoginDataIsValidReducer, isMessageReducer};