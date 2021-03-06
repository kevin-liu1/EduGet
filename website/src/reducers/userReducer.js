const userDefaultState = {
};

export default (state = userDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: action.auth
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
    case 'SUMMARY':
      return{
        summary: action.summary
      }
    case 'EDUCATION':
      return{
        educationlevel: action.educationlevel,
        grade: action.grade,
        school: action.school
      }
    case 'INTEREST':
      return{
        interestField: action.interestField
      }
    case 'EDITPROFILE':
      return{
        firstname: action.firstName,
        lastname: action.lastName,
        phone: action.phonenumber,
        city: action.city,
        age: action.age,
      }
    default:
      return state;
  }
}
