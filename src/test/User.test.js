const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { User } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test create user route', () => {
  describe('With valid credentials', () => {
    before(async () => {
      sinon.stub(User, 'create').resolves(testMockData.user);
    });
    after(() => {
      User.create.restore();
    });
    it('should return the user', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/users')
        .send(testMockData.createUser);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('user');
    });
  });
  describe('With invalid credentials', () => {
    before(async () => {
      sinon.stub(User, 'create').resolves(null);
    });
    after(() => {
      User.create.restore();
    });
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/users')
        .send(testMockData.wrongCreateUser);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error.name).to.be.equal('Name must be at least 3 characters long');
      expect(chaiHttpResponse.body.error.nickName).to.be.equal('NickName must not contain spaces');
      expect(chaiHttpResponse.body.error.email).to.be.equal('Email must be a valid email address');
      expect(chaiHttpResponse.body.error.password).to.be.equal('Password must be at least 3 characters long');
    });
  });
});

describe('Test get users route', () => {
  before(async () => {
    sinon.stub(User, 'findAll').resolves(testMockData.allUsers);
  });
  after(() => {
    User.findAll.restore();
  });
  it('should return all users', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/users');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.equal(2);
    chaiHttpResponse.body.forEach((user) => {
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('nickName');
      expect(user).to.have.property('email');
      expect(user).to.have.property('image');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
      expect(user).to.not.have.property('password');
    });
  });
});

describe('Test get user by nickname route', () => {
  describe('With valid nickname', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(testMockData.user);
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return the user', async () => {
      const chaiHttpResponse = await chai.request(app)
        .get('/api/users/test');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('name');
      expect(chaiHttpResponse.body).to.have.property('nickName');
      expect(chaiHttpResponse.body).to.have.property('email');
      expect(chaiHttpResponse.body).to.have.property('image');
      expect(chaiHttpResponse.body).to.have.property('createdAt');
      expect(chaiHttpResponse.body).to.have.property('updatedAt');
      expect(chaiHttpResponse.body).to.not.have.property('password');
    });
  });
  describe('With invalid nickname', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .get('/api/users/test');
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('User not found');
    });
  });
});

describe('Test update user route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(User, 'update').resolves(testMockData.user);
    });
    after(() => {
      User.update.restore();
    });
    it('should return the user', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me')
        .set('Authorization', `${testMockData.token}`)
        .send(testMockData.updateUser);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('name');
      expect(chaiHttpResponse.body).to.have.property('nickName');
      expect(chaiHttpResponse.body).to.have.property('email');
      expect(chaiHttpResponse.body).to.have.property('image');
      expect(chaiHttpResponse.body).to.have.property('createdAt');
      expect(chaiHttpResponse.body).to.have.property('updatedAt');
      expect(chaiHttpResponse.body).to.not.have.property('password');
    });
  });
  describe('With invalid token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me')
        .set('Authorization', `abc`)
        .send(testMockData.updateUser);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('Withouth token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me')
        .send(testMockData.updateUser);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With invalid data', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me')
        .set('Authorization', `${testMockData.token}`)
        .send({});
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error.name).to.be.equal('Name must be a string');
      expect(chaiHttpResponse.body.error.nickName).to.be.equal('NickName must be a string');
    });
  });
});

describe('Test update user image route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(User, 'update').resolves(testMockData.user);
    });
    after(() => {
      User.update.restore();
    });
    it('should return the user', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me/image')
        .set('Authorization', `${testMockData.token}`)
        .send({ image: 'http://test.com/image.jpg' });
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('name');
      expect(chaiHttpResponse.body).to.have.property('nickName');
      expect(chaiHttpResponse.body).to.have.property('email');
      expect(chaiHttpResponse.body).to.have.property('image');
      expect(chaiHttpResponse.body).to.have.property('createdAt');
      expect(chaiHttpResponse.body).to.have.property('updatedAt');
      expect(chaiHttpResponse.body).to.not.have.property('password');
    });
  });
  describe('With invalid token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me/image')
        .set('Authorization', `abc`)
        .send({ image: 'http://test.com/image.jpg' });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('Withouth token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/users/me/image')
        .send({ image: 'http://test.com/image.jpg' });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
});
