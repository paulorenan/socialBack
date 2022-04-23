const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { User } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test load session route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(testMockData.user);
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return the user', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/load')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body.user).to.have.property('name');
      expect(chaiHttpResponse.body.user).to.have.property('nickName');
      expect(chaiHttpResponse.body.user).to.have.property('email');
      expect(chaiHttpResponse.body.user).to.have.property('image');
      expect(chaiHttpResponse.body.user).to.have.property('createdAt');
      expect(chaiHttpResponse.body.user).to.have.property('updatedAt');
      expect(chaiHttpResponse.body.user).to.not.have.property('password');
    });
  });
  describe('With a deleted token', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);
    });
    after(() => {
      User.findOne.restore();
    });
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/load')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With invalid token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/load')
        .set('Authorization', 'invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return an error message', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/load');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
});