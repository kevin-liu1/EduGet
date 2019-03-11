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

export const editSummary = (summary, summaryOpen) => ({
  type: 'SUMMARY',
  summary: summary,
})

export const editEducation = (educationlevel, grade, school) => ({
  type: 'EDUCATION',
  educationlevel: educationlevel,
  grade: grade,
  school: school

})
