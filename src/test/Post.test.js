const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { Post } = require('../models');
const testMockData = require('./testMockData');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test create post route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Post, 'create').resolves(testMockData.createPost);
    });
    after(() => {
      Post.create.restore();
    });
    it('should return the post', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/posts')
        .set('Authorization', testMockData.token)
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.have.property('content');
      expect(chaiHttpResponse.body).to.have.property('image');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/posts')
        .set('Authorization', 'invalid token')
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/api/posts')
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
});

describe('Test get all posts route', () => {
  describe('Should return all posts', () => {
    before(async () => {
      sinon.stub(Post, 'findAll').resolves(testMockData.allPosts);
    });
    after(() => {
      Post.findAll.restore();
    });
    it('should return all posts', async () => {
      const chaiHttpResponse = await chai.request(app)
        .get('/api/posts');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.have.lengthOf(2);
      chaiHttpResponse.body.forEach((post) => {
        expect(post).to.have.property('id');
        expect(post).to.have.property('content');
        expect(post).to.have.property('image');
        expect(post).to.have.property('userId');
        expect(post).to.have.property('createdAt');
        expect(post).to.have.property('updatedAt');
      });
    });
  });
});

describe('Test update post route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(testMockData.post);
      sinon.stub(Post, 'update').resolves(testMockData.post);
    });
    after(() => {
      Post.findOne.restore();
      Post.update.restore();
    });
    it('should return the updated post', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/posts/1')
        .set('Authorization', testMockData.token)
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('content');
      expect(chaiHttpResponse.body).to.have.property('image');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/posts/1')
        .set('Authorization', 'invalid token')
        .send(testMockData.updatePost);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/posts/1')
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With invalid post id', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(null);
    });
    after(() => {
      Post.findOne.restore();
    });
    it('should return 404', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/posts/1000')
        .set('Authorization', testMockData.token)
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Post not found');
    });
  });
  describe('With no authorization', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(testMockData.noAuthPost);
    });
    after(() => {
      Post.findOne.restore();
    });
    it('should return 403', async () => {
      const chaiHttpResponse = await chai.request(app)
        .put('/api/posts/2')
        .set('Authorization', testMockData.token)
        .send(testMockData.post);
      expect(chaiHttpResponse.status).to.be.equal(403);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You are not allowed to edit this post');
    });
  });
});

describe('Test delete post route', () => {
  describe('With valid token', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(testMockData.post);
      sinon.stub(Post, 'destroy').resolves([1]);
    });
    after(() => {
      Post.findOne.restore();
      Post.destroy.restore();
    });
    it('should return the deleted post', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/posts/1')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.an('array');
    });
  });
  describe('With invalid token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/posts/1')
        .set('Authorization', 'invalid token');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
  describe('With no token', () => {
    it('should return 401', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/posts/1');
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('No token provided');
    });
  });
  describe('With invalid post id', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(null);
    });
    after(() => {
      Post.findOne.restore();
    });
    it('should return 404', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/posts/1000')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('Post not found');
    });
  });
  describe('With no authorization', () => {
    before(async () => {
      sinon.stub(Post, 'findOne').resolves(testMockData.noAuthPost);
    });
    after(() => {
      Post.findOne.restore();
    });
    it('should return 403', async () => {
      const chaiHttpResponse = await chai.request(app)
        .delete('/api/posts/2')
        .set('Authorization', testMockData.token);
      expect(chaiHttpResponse.status).to.be.equal(403);
      expect(chaiHttpResponse.body).to.have.property('error');
      expect(chaiHttpResponse.body.error).to.be.equal('You are not allowed to delete this post');
    });
  });
});

describe('Test get post by user id route', () => {
  before(async () => {
    sinon.stub(Post, 'findAll').resolves(testMockData.allPosts);
  });
  after(() => {
    Post.findAll.restore();
  });
  it('should return all user posts', async () => {
    const chaiHttpResponse = await chai.request(app)
      .get('/api/posts/user/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.an('array');
    chaiHttpResponse.body.forEach((post) => {
      expect(post).to.have.property('id');
      expect(post).to.have.property('content');
      expect(post).to.have.property('userId');
      expect(post).to.have.property('createdAt');
      expect(post).to.have.property('updatedAt');
      expect(post.userId).to.be.equal(1);
    });
  });
});