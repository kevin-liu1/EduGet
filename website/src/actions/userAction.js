export const login = (email,password) => ({
  type: 'LOGIN',
  email: email,
  password: password
});

export const signUp = (firstName, lastName, email, password, agree) => ({
  type: 'SIGNUP',
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  agree: agree
});
