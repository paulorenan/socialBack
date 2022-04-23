const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { User } = require('../models');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test login route', () => {
  describe('With valid credentials', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves({
        id: 1,
        name: 'John Doe',
        nickName: 'johndoe',
        email: 'test@test.com',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return the user and the token', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/login')
        .send({
          email: 'test@test.com',
          password: '123456',
        });
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });
  describe('With invalid credentials', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/login')
        .send({
          email: 'wrongemail@email.com',
          password: 'wrongpassword',
        });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
    });
  });
});
