const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService, emailService } = require('../../src/services');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { User, Token } = require('../../src/models');
const { roleRights } = require('../../src/config/roles');
const { tokenTypes } = require('../../src/config/tokens');
const { userOne, admin, insertUsers, insertOne, insertUser } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken, tokenForGetAndDeleteAccess } = require('../fixtures/token.fixture');

setupTestDB();

describe('Business routes', () => {
  describe('POST /v1/business', () => {
    beforeEach(() => {
      business = {
        name: faker.company.companyName(),
        email: faker.internet.email().toLowerCase(),
        address: faker.address.streetAddress(),
        taxid: faker.datatype.number(),
        cacno: faker.datatype.number(),
        rcno: faker.datatype.number(),
      };
    });

    test('Confirm that a created business return 201', async () => {
      //const token = await userOneAccessToken();
      const token = await tokenForGetAndDeleteAccess();

      await request(app)
        .post('/v1/business')
        .auth(token, { type: 'bearer' })
        //.set('Authorization', `bearer ${userOneAccessToken}`)
        .send(business)
        .expect(httpStatus.CREATED);
    });
    test('Confirm that creating a business without authentication return 401', async () => {
      await request(app).post('/v1/business').send(business).expect(httpStatus.UNAUTHORIZED);
    });
  });
  // describe('GET /v1/business', () => {
  //   beforeEach(() => {
  //     business = {
  //       name: faker.company.companyName(),
  //       email: faker.internet.email().toLowerCase(),
  //       address: faker.address.streetAddress(),
  //       taxid: faker.datatype.number(),
  //       cacno: faker.datatype.number(),
  //       rcno: faker.datatype.number(),
  //     };
  //   });
  // });
});
