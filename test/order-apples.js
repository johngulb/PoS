const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Test Order #1', () => {

  let server;
  let inventory;

  before(() => {
    let api = require('../api');
    server = api.listen(3001);
    inventory = require('../inventory');
    order = require('../order');
    inventory.add({
      upc: 'apple',
      price: 0.99,
      per: 'pound',
      markdown: 0.10
    });
  })

  after(() => {
    server.close();
  })

  context('Scan 1 lb apples', () => {
    it('scan 1 lb of apples should total of $0.89', (done) => {
      chai.request(server).post('/scan')
        .type('form')
        .send({upc: 'apple', weight: 1.0})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.total).to.equal(0.89);
          done();
        });
    })
  })

  context('Scan 1.5 lb apples', () => {
    it('scan 1.5 lb of apples should total of $0.89', (done) => {
      chai.request(server).post('/scan')
        .type('form')
        .send({upc: 'apple', weight: 1.5})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.total).to.equal(2.22);
          done();
        });
    })
  })

  context('DELETE /scan', () => {
    it('scan 1 lb of apples should total of $0.89', (done) => {
      chai.request(server).delete('/scan')
        .type('form')
        .send({upc: 'apple', weight: 1.0})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.total).to.equal(1.33);
          done();
        });
    })
  })

})
