import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import user from '../database/models/user';

import mockInProgressMatch from './mocks/mockInProgressMatch';
import mockAllMatch from './mocks/mockAllMatchs';
import mockCreateMatch from './mocks/mockCreateMatch';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint `/matchs` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockAllMatch as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matchs')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto, se os dados forem passados corretamente', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matchs')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockAllMatch);
  })
});

describe('Endpoint `/matchs?inProgress=true` metódo GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockInProgressMatch as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Verifica `status` de retorno é 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto, se os dados forem passados corretamente', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockInProgressMatch);
  })

  it('Verifica se passado um query errada, retorna status 404 e uma mensagem da url correta', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matchs?inPr')
      .send();
    expect(chaiHttpResponse.status).to.be.eq(404);
    expect(chaiHttpResponse.body).to.be.deep.eq({ 'Expected_route': '/matchs?inProgress=true' });
  })
});

describe('Endpoint `/matchs` metódo POST', () => {
  let chaiHttpResponse: Response;

  describe('', () => {
    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves(mockCreateMatch.output as unknown as Match);

      sinon
        .stub(user, "findOne")
        .resolves({ id: 5, email: "teste@teste.com", password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', username: 'Test', role: 'test' } as user);
    });

    after(() => {
      (Match.create as sinon.SinonStub).restore();
      (user.findOne as sinon.SinonStub).restore();
    })

    it('Verifica se não passado o token o `status` é 401 e retorna uma mensagem', async () => {
      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .send(mockCreateMatch.input);

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.be.deep.eq({ message: 'Token not found' });
    });

    it('Verifica se não é possivel criar uma partida com times iguais', async () => {
      const login = await chai.request(app).post('/login')
        .send({ email: 'teste@teste.com', password: 'secret_admin' });

      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .set('Authorization', login.body.token).send(mockCreateMatch.inputEqualTeams);

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.be.deep.eq({ "message": "It is not possible to create a match with two equal teams" });
    })

    it('Verifica se não é possivel criar uma partida com times que não estão no banco de dados', async () => {
      const login = await chai.request(app).post('/login')
        .send({ email: 'teste@teste.com', password: 'secret_admin' });

      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .set('Authorization', login.body.token).send(mockCreateMatch.inputTeamNotInDatabase);

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.be.deep.eq({
        "message": "There is no team with such id!"
      });
    })

    it('Verifica `status` de retorno é 201 quando criado a partida', async () => {
      const login = await chai.request(app).post('/login')
        .send({ email: 'teste@teste.com', password: 'secret_admin' });

      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .set('Authorization', login.body.token).send(mockCreateMatch.input);

      expect(chaiHttpResponse.status).to.be.eq(201);
    });

    it('Verifica `retorno` está correto quando criado a partida', async () => {
      const login = await chai.request(app).post('/login')
        .send({ email: 'teste@teste.com', password: 'secret_admin' });

      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .set('Authorization', login.body.token).send(mockCreateMatch.input);

      expect(chaiHttpResponse.body).to.be.deep.eq(mockCreateMatch.output);
    })
  })

  describe('', () => {
    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves(mockCreateMatch.outuptMatchOfTeamWhitIdZero as unknown as Match);

      sinon
        .stub(user, "findOne")
        .resolves({ id: 5, email: "teste@teste.com", password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', username: 'Test', role: 'test' } as user);
    });

    after(() => {
      (Match.create as sinon.SinonStub).restore();
      (user.findOne as sinon.SinonStub).restore();
    })

    it('Verifica se passado um time com id 0 troca o busca o time com o id 1 no banco de dados e cria a partida', async () => {
      const login = await chai.request(app).post('/login')
        .send({ email: 'teste@teste.com', password: 'secret_admin' });

      const chaiHttpResponse = await chai.request(app).post('/matchs')
        .set('Authorization', login.body.token).send(mockCreateMatch.inputMatchOfTeamWhitIdZero);

      expect(chaiHttpResponse.status).to.be.eq(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(mockCreateMatch.outuptMatchOfTeamWhitIdZero);
    })
  })
});
