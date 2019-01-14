export const login = (auth) => ({
  type: 'LOGIN',
  auth: auth
});

export const signUp = (firstName, lastName, email, password, agree) => ({
  type: 'SIGNUP',
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  agree: agree
});

export const editProfile = (state) => (
  Object.assign({}, {type: 'EDITPROFILE'}, state)
)
