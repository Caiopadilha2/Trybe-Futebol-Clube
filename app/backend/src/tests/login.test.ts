import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userModel from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes de login', () => {
  describe('login com sucesso', () => {
    let response: Response;

    const loginMock = {
      email: 'admin@admin.com.br',
      password: '12345678'
    };

    before(async () => {
      response = await (chai.request(app).
      post('/login').
      send(loginMock as userModel))
    });

    it('status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna o token do usuário', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('login incorreto', () => {
    let response: Response;

    const loginMock = {
      email: 'caio@caio.com.br',
      password: '111111111'
    };

    before(async () => {
      response = await (chai.request(app).
      post('/login').
      send(loginMock as userModel))
    });

    it('status 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna mensagem de email ou senha incorretos', () => {
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });
  describe('login sem senha', () => {
    let response: Response;

    const loginMock = {
      email: 'caio@caio.com.br',
    };

    before(async () => {
      response = await (chai.request(app).
      post('/login').
      send(loginMock as userModel))
    });

    it('status 401', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna mensagem de tentativa de fazer login sem enviar uma senha', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
});
