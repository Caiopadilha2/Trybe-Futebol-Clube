import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamModel from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes de login', () => {
  describe('login com sucesso', () => {
    let response: Response;

    const teamsMock = [
        {
          "id": 1,
          "teamName": "Avaí/Kindermann"
        },
        {
          "id": 2,
          "teamName": "Bahia"
        },
        {
          "id": 3,
          "teamName": "Botafogo"
        },
        {
          "id": 4,
          "teamName": "Corinthians"
        },
        {
          "id": 5,
          "teamName": "Cruzeiro"
        },
        {
          "id": 6,
          "teamName": "Ferroviária"
        },
        {
          "id": 7,
          "teamName": "Flamengo"
        },
        {
          "id": 8,
          "teamName": "Grêmio"
        },
        {
          "id": 9,
          "teamName": "Internacional"
        },
        {
          "id": 10,
          "teamName": "Minas Brasília"
        },
        {
          "id": 11,
          "teamName": "Napoli-SC"
        },
        {
          "id": 12,
          "teamName": "Palmeiras"
        },
        {
          "id": 13,
          "teamName": "Real Brasília"
        },
        {
          "id": 14,
          "teamName": "Santos"
        },
        {
          "id": 15,
          "teamName": "São José-SP"
        },
        {
          "id": 16,
          "teamName": "São Paulo"
        }
      ]

    before(async () => {
      response = await (chai.request(app).
      get('/teams').
      send(teamsMock))
    });

    it('status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna todos os times', () => {
      expect(response.body).to.equal(teamsMock);
    });
  });

  
//   describe('login sem senha', () => {
//     let response: Response;

//     const loginMock = {
//       email: 'caio@caio.com.br',
//     };

//     before(async () => {
//       response = await (chai.request(app).
//       post('/login').
//       send(loginMock as userModel))
//     });

//     it('status 401', () => {
//       expect(response).to.have.status(400);
//     });

//     it('Retorna mensagem de tentativa de fazer login sem enviar uma senha', () => {
//       expect(response.body.message).to.be.equal('All fields must be filled');
//     });
//   });
});
