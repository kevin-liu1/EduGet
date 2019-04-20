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

export const editInterest = (interestField) => ({
  type: 'INTEREST',
  interestField: interestField
})

export const editProfile = (firstname, lastname, phonenumber, city, country, age) => ({
  type: 'EDITPROFILE',
  firstName: firstname,
  lastName: lastname,
  phonenumber: phonenumber,
  city: city,
  country: country,
  age: age,
})
