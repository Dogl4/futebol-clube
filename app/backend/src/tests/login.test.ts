import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';
import LoginController from '../controllers/login';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint `/login`', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({ id: 5, email: "teste@teste.com",  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', username: 'Test', role: 'test' } as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

    it('Verifica `status` está correto, se os dados forem passados corretamente', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login')
    .send({  email: "teste@teste.com",  password: 'secret_admin' });
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` está correto, se os dados forem passados corretamente', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login')
      .send({  email: "teste@teste.com",  password: 'secret_admin' });

    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('password');
  })
});

describe('Endpoint `/login/validate`', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({ 
        id: 5,
        email: "teste@teste.com",
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        username: 'Test',
        role: 'test'
      } as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

  it('Verifica `status` está correto, se os dados forem passados corretamente', async () => {
    const login = await chai.request(app).post('/login')
      .send({ email: 'teste@teste.com', password: 'secret_admin' });

    const chaiHttpResponse = await chai
      .request(app).get('/login/validate')
      .set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Verifica `retorno` é o `role` do usuário se o token for valido', async () => {
    const login = await chai.request(app).post('/login')
      .send({ email: 'teste@teste.com', password: 'secret_admin' });

    const chaiHttpResponse = await chai
      .request(app).get('/login/validate')
      .set('Authorization', login.body.token);

    expect(chaiHttpResponse.body).to.be.equal('test');
  })
});
