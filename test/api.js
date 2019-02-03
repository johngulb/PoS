const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const assert = require('chai').assert;
const expect = require('chai').expect;

describe('api', () => {

  let server;

  beforeEach(() => {
    let api = require('../api');
    server = api.listen(3001);
  })

  afterEach(() => {
    server.close();
  })

  context('GET /', () => {
    it('should return "A point of sale rest api"', (done) => {
      chai.request(server).get('/')
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.equal("A point of sale rest api");
          done();
        });
    })
  })

})
