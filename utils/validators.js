module.exports.validateRegisterInput=(
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password must not be empty';
    }
    if (confirmPassword.trim() === '') {
      errors.confirmPassword = 'Password must not be empty';
    }
}