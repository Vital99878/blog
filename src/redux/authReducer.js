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
        responseError: false,
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

    case 'EMAIL_OR_PASSWORD_IS_INVALID':
      return {
        ...state,
        responseError: action.message,
      };

    case 'SIGN_UP_ERRORS':
      return {
        ...state,
        newUserEmail: action.newUserEmail,
        newUserName: action.newUserName,
      };

    case 'EDIT_PROFILE_ERRORS':
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
