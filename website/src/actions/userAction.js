export const login = (email,password) => ({
  type: 'LOGIN',
  email: email,
  password: password
});

export const userProfile = (firstName, lastName, email, password) => ({
  type: 'INFO',
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password
});
