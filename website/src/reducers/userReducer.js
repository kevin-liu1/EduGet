const userDefaultState = {};

export default (state = userDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        email: action.email,
        password: action.password
      }
    case 'LOGOUT':
      return {};
    case 'SIGNUP':
      return {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        password: action.password,
        agree: action.agree
      }
    default:
      return state;
  }
}
