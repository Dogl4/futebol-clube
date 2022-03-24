import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';

import mockLeaderBoard from './mocks/mockLeaderBoard';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint `/leaderboard/home` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findAll")
      .onCall(0)
      .resolves(mockLeaderBoard.findAllHomeWichMatch as unknown as user[]);
  });

  after(() => {
    (user.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockLeaderBoard.resultAllHome);
  })
});

describe('Endpoint `/leaderboard/away` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findAll")
      .onCall(0)
      .resolves(mockLeaderBoard.findAllAwayWichMatch as unknown as user[]);
  });

  after(() => {
    (user.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockLeaderBoard.resultAllAway);
  })
});


describe('Endpoint `/leaderboard` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findAll")
      .onCall(0)
      .resolves(mockLeaderBoard.findAllAwayWichMatch as unknown as user[])
      .onCall(1)
      .resolves(mockLeaderBoard.findAllHomeWichMatch as unknown as user[]);
  });

  after(() => {
    (user.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockLeaderBoard.resultAll);
  })
});
