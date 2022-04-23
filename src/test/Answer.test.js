const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { Answer } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test create answer route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Answer, 'create').resolves(testMockData.answer);
    });
    after(() => {
      Answer.create.restore();
    });
    it('should return the answer', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/answers')
        .set('Authorization', testMockData.token)
        .send(testMockData.createAnswer);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('content');
      expect(chaiHttpResponse.body).to.have.property('userId');
      expect(chaiHttpResponse.body).to.have.property('postId');
    });
  });
  describe('With create error', () => {
    before(async () => {
      sinon.stub(Answer, 'create').resolves({ error: { errors: [{ message: 'Error' }] } });
    });
    after(() => {
      Answer.create.restore();
    });
    it('should return 400', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/answers')
        .set('Authorization', testMockData.token)
        .send(testMockData.createAnswer);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('error');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/answers')
        .set('Authorization', 'invalid token')
        .send(testMockData.createAnswer);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/answers')
        .send(testMockData.createAnswer);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
});

describe('Test get all answers route', () => {
  before(async () => {
    sinon.stub(Answer, 'findAll').resolves(testMockData.allAnswers);
  });
  after(() => {
    Answer.findAll.restore();
  });
  it('should return all answers', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/answers');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    chaiHttpResponse.body.forEach((answer) => {
      expect(answer).to.have.property('id');
      expect(answer).to.have.property('content');
      expect(answer).to.have.property('userId');
      expect(answer).to.have.property('postId');
      expect(answer).to.have.property('createdAt');
      expect(answer).to.have.property('updatedAt');
    });
  });
});

describe('Test get answers by post id route', () => {
  before(async () => {
    sinon.stub(Answer, 'findAll').resolves(testMockData.answersByPostId);
  });
  after(() => {
    Answer.findAll.restore();
  });
  it('should return answers by post id', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/answers/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    chaiHttpResponse.body.forEach((answer) => {
      expect(answer).to.have.property('id');
      expect(answer).to.have.property('content');
      expect(answer).to.have.property('userId');
      expect(answer).to.have.property('postId');
      expect(answer).to.have.property('createdAt');
      expect(answer).to.have.property('updatedAt');
    });
  });
});

describe('Test count answers by post id route', () => {
  before(async () => {
    sinon.stub(Answer, 'count').resolves(5);
  });
  after(() => {
    Answer.count.restore();
  });
  it('should return count answers by post id', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/answers/count/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(5);
  });
});

describe('Test update answer route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Answer, 'findOne').resolves(testMockData.answer);
      sinon.stub(Answer, 'update').resolves(testMockData.answer);
    });
    after(() => {
      Answer.findOne.restore();
      Answer.update.restore();
    });
    it('should return the answer', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/answers/1')
        .set('Authorization', testMockData.token)
        .send(testMockData.updateAnswer);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('content');
      expect(chaiHttpResponse.body).to.have.property('userId');
      expect(chaiHttpResponse.body).to.have.property('postId');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/answers/1')
        .set('Authorization', 'invalid token')
        .send(testMockData.updateAnswer);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/answers/1')
        .send(testMockData.updateAnswer);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With no authorization', () => {
    before(async () => {
      sinon.stub(Answer, 'findOne').resolves(testMockData.noAuthAnswer);
    });
    after(() => {
      Answer.findOne.restore();
    });
    it('should return 403', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/answers/1')
        .set('Authorization', testMockData.token)
        .send(testMockData.updateAnswer);
      expect(chaiHttpResponse.status).to.be.equal(403);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You are not allowed to edit this answer');
    });
  });
});

describe('Test delete answer route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Answer, 'findOne').resolves(testMockData.answer);
      sinon.stub(Answer, 'destroy').resolves([1]);
    });
    after(() => {
      Answer.findOne.restore();
      Answer.destroy.restore();
    });
    it('should return the answer', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/answers/1')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/answers/1')
        .set('Authorization', 'invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/answers/1');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With no authorization', () => {
    before(async () => {
      sinon.stub(Answer, 'findOne').resolves(testMockData.noAuthAnswer);
    });
    after(() => {
      Answer.findOne.restore();
    });
    it('should return 403', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/answers/1')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(403);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You are not allowed to delete this answer');
    });
  });
});

describe('Test count user answers route', () => {
  before(async () => {
    sinon.stub(Answer, 'count').resolves(5);
  });
  after(() => {
    Answer.count.restore();
  });
  it('should return count answers by user id', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/answers/user/count/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(5);
  });
});