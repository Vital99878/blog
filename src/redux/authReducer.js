const initialState = {
  user: null,
  responseValidation: '',
  loading: true
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        auth: true,
        user: action.user,
        responseValidation: false,
      };

    case 'SIGN_UP':
      return {
        ...state,
        auth: true,
        user: action.user,
        username: action.user.username,
        emailValid: '',
        usernameValid: '',
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: false,
        user: null,
        username: '',
        responseValidation: false,
      };

    case 'COOKIES':
      return {
        ...state,
        user: action.user,
      };

    case 'NO_EMAIL_ORE_PASSWORD':
      return {
        ...state,
        responseValidation: action.message,
      };

    case 'SIGN_UP_ERRORS':
      return {
        ...state,
        emailValid: action.emailValid,
        usernameValid: action.usernameValid,
      };

    default:
      return state
  }
};

export default authReducer;
