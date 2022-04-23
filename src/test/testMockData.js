module.exports = {
  user: {
    id: 1,
    name: 'John Doe',
    nickName: 'johndoe',
    email: 'test@test.com',
    image: 'test.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  userLogin: {
    email: 'test@test.com',
    password: '123456',
  },

  wrongUserLogin: {
    email: 'wrongemail@email.com',
    password: 'wrongpassword',
  },

  createUser: {
    name: 'John Doe',
    nickName: 'johndoe',
    email: 'test@test.com',
    password: '123456',
  },

  wrongCreateUser: {
    name: 'Jo',
    nickName: 'john doe',
    email: 'john',
    password: '12',
  },

  allUsers: [
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
  ],

  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5pY2tOYW1lIjoidGVzdCIsImlhdCI6MTY1MDY4MzE1NSwiZXhwIjoxNjUxMjg3OTU1fQ.HbbFNPJDAlur3nYOtDKmkro5WfW20QSG9fmzCo8rob0",

  updateUser: {
    name: 'Jane Doe',
    nickName: 'janedoe',
  },

  createPost: {
    content: 'Test post',
    image: '',
  },

  allPosts: [
    {
      id: 1,
      content: 'Test post',
      image: '',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      content: 'Test post 2',
      image: '',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  post: {
    id: 1,
    content: 'Test post',
    image: '',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  updatePost: {
    content: 'Test post',
  },

  noAuthPost: {
    id: 2,
    content: 'Test post 2',
    image: '',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}