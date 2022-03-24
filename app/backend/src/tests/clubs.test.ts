import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Club from '../database/models/club';

import mockClubs from './mocks/mockClubs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Endpoint `/clubs` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves( mockClubs.findAllClubs  as unknown as Club[]);
  });

  after(() => {
    (Club.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/clubs')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/clubs')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockClubs.findAllClubs);
  })
});

describe('Endpoint `/clubs/:id` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves( mockClubs.findAllClubs  as unknown as Club[]);
  });

  after(() => {
    (Club.findAll as sinon.SinonStub).restore();
  })

  it('Verifica o um id que existe no banco, `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/clubs/1')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica o um id que existe no banco, `retorno` está correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/clubs/1')
      .send();
    expect(chaiHttpResponse.body[0]).to.be.deep.eq(mockClubs.findAllClubs[0]);
  })
});