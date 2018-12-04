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
    case 'INFO':
      return {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        password: action.password
      }
    default:
      return state;
  }
}
