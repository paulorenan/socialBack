const validateName = (name) => {
  if (typeof name !== 'string') {
    return 'Name must be a string';
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
  if (name.length > 30) {
    return 'Name must be less than 30 characters long';
  }
  return null;
}

const validateNickName = (nickName) => {
  if (typeof nickName !== 'string') {
    return 'NickName must be a string';
  }
  if (nickName.length < 3) {
    return 'NickName must be at least 3 characters long';
  }
  if (nickName.length > 30) {
    return 'NickName must be less than 30 characters long';
  }
  if(nickName.includes(' ')) {
    return 'NickName must not contain spaces';
  }
  return null;
}

const validateEmail = (email) => {
  if (typeof email !== 'string') {
    return 'Email must be a string';
  }
  let re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return 'Email must be a valid email address';
  }
  if (email.length < 3) {
    return 'Email must be at least 3 characters long';
  }
  if (email.length > 30) {
    return 'Email must be less than 30 characters long';
  }
  return null;
}

const validatePassword = (password) => {
  if (typeof password !== 'string') {
    return 'Password must be a string';
  }
  if (password.length < 3) {
    return 'Password must be at least 3 characters long';
  }
  if (password.length > 30) {
    return 'Password must be less than 30 characters long';
  }
  return null;
}

const validateUser = (user) => {
  let errors = {};
  let nameError = validateName(user.name);
  if (nameError) {
    errors.name = nameError;
  }
  let nickNameError = validateNickName(user.nickName);
  if (nickNameError) {
    errors.nickName = nickNameError;
  }
  let emailError = validateEmail(user.email);
  if (emailError) {
    errors.email = emailError;
  }
  let passwordError = validatePassword(user.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
}

const validateUpdateUser = (user) => {
  const { name, nickName } = user;
  let errors = {};
  let nameError = validateName(name);
  if (nameError) {
    errors.name = nameError;
  }
  let nickNameError = validateNickName(nickName);
  if (nickNameError) {
    errors.nickName = nickNameError;
  }
  return errors;
}

module.exports = {
  validateUser,
  validateUpdateUser
}