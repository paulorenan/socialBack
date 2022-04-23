const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { Like } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test create like route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Like, 'create').resolves(testMockData.createLike);
    });
    after(() => {
      Like.create.restore();
    });
    it('should return the like', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/likes')
        .set('Authorization', testMockData.token)
        .send(testMockData.like);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('postId');
      expect(chaiHttpResponse.body).to.have.property('userId');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/likes')
        .set('Authorization', 'invalid token')
        .send(testMockData.like);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/likes')
        .send(testMockData.like);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With no postId', () => {
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/likes')
        .set('Authorization', testMockData.token)
        .send({});
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No postId provided');
    });
  });
  describe('With post already liked', () => {
    before(async () => {
      sinon.stub(Like, 'create').resolves({error: 'Post already liked'});
    });
    after(() => {
      Like.create.restore();
    });
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/likes')
        .set('Authorization', testMockData.token)
        .send(testMockData.like);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You already liked this post');
    });
  });
});

describe('Test delete like route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Like, 'destroy').resolves([1]);
    });
    after(() => {
      Like.destroy.restore();
    });
    it('should return the like', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/likes/1')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.an('array');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/likes/1')
        .set('Authorization', 'invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/likes/1');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With error', () => {
    before(async () => {
      sinon.stub(Like, 'destroy').resolves({error: {errors: [{message: 'error'}]}});
    });
    after(() => {
      Like.destroy.restore();
    });
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/likes/1')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('error');
    });
  });
});

describe('Test count user likes route', () => {
  before(async () => {
    sinon.stub(Like, 'count').resolves(5);
  });
  after(() => {
    Like.count.restore();
  });
  it('should return the number of likes', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/likes/user/count/3')
      .set('Authorization', testMockData.token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(5);
  });
});