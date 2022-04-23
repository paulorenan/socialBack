const user = {
  id: 1,
  name: 'John Doe',
  nickName: 'johndoe',
  email: 'test@test.com',
  image: 'test.png',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userLogin = {
  email: 'test@test.com',
  password: '123456',
};

const wrongUserLogin = {
  email: 'wrongemail@email.com',
  password: 'wrongpassword',
};

const createUser = {
  name: 'John Doe',
  nickName: 'johndoe',
  email: 'test@test.com',
  password: '123456',
};

const wrongCreateUser = {
  name: 'Jo',
  nickName: 'john doe',
  email: 'john',
  password: '12',
};

const allUsers = [
  {
    id: 1,
    name: 'John Doe',
    nickName: 'johndoe',
    email: 'test@test.com',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Doe',
    nickName: 'janedoe',
    email: 'test2@test.com',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5pY2tOYW1lIjoidGVzdCIsImlhdCI6MTY1MDY4MzE1NSwiZXhwIjoxNjUxMjg3OTU1fQ.HbbFNPJDAlur3nYOtDKmkro5WfW20QSG9fmzCo8rob0"

const updateUser = {
  name: 'Jane Doe',
  nickName: 'janedoe',
};

module.exports = {
  user,
  userLogin,
  wrongUserLogin,
  createUser,
  wrongCreateUser,
  allUsers,
  token,
  updateUser,
};