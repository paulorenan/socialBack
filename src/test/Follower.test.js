const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { Follower } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test create follower route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Follower, 'create').resolves(testMockData.follower);
    });
    after(() => {
      Follower.create.restore();
    });
    it('should return the follower', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/followers')
        .set('Authorization', testMockData.token)
        .send(testMockData.createFollower);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('userId');
      expect(chaiHttpResponse.body).to.have.property('followerId');
    });
  });
  describe('With create error', () => {
    before(async () => {
      sinon.stub(Follower, 'create').resolves({ error: 'Error' });
    });
    after(() => {
      Follower.create.restore();
    });
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/followers')
        .set('Authorization', testMockData.token)
        .send(testMockData.createFollower);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You already followed this user');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/followers')
        .set('Authorization', 'invalid token')
        .send(testMockData.createFollower);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/followers')
        .set('Authorization', '')
        .send(testMockData.createFollower);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With no userId', () => {
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/followers')
        .set('Authorization', testMockData.token)
        .send({});
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No userId provided');
    });
  });
});

describe('Test delete follower route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Follower, 'destroy').resolves([1]);
    });
    after(() => {
      Follower.destroy.restore();
    });
    it('should return the follower', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/api/followers/${testMockData.follower.userId}`)
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  });
  describe('With delete error', () => {
    before(async () => {
      sinon.stub(Follower, 'destroy').resolves({ error: 'Error' });
    });
    after(() => {
      Follower.destroy.restore();
    });
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/api/followers/${testMockData.follower.userId}`)
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You did not follow this user');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/api/followers/${testMockData.follower.userId}`)
        .set('Authorization', 'invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/api/followers/${testMockData.follower.userId}`)
        .set('Authorization', '');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
});

describe('Test count user followers route', () => {
  before(async () => {
    sinon.stub(Follower, 'count').resolves(5);
  });
  after(() => {
    Follower.count.restore();
  });
  it('should return the number of followers', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get(`/api/followers/count/${testMockData.follower.userId}`)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('number');
    expect(chaiHttpResponse.body).to.be.equal(5);
  });
});

describe('Test count user following route', () => {
  before(async () => {
    sinon.stub(Follower, 'count').resolves(5);
  });
  after(() => {
    Follower.count.restore();
  });
  it('should return the number of following', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get(`/api/followers/following/count/${testMockData.follower.userId}`)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('number');
    expect(chaiHttpResponse.body).to.be.equal(5);
  });
});

describe('Test get followers by userId route', () => {
  before(async () => {
    sinon.stub(Follower, 'findAll').resolves([testMockData.follower]);
  });
  after(() => {
    Follower.findAll.restore();
  });
  it('should return the followers', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get(`/api/followers/${testMockData.follower.userId}`)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('followerId');
  });
});
