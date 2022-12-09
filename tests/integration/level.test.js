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
const {
  userOneAccessToken,
  userThreeAccessToken,
  adminAccessToken,
  tokenForGetAndDeleteAccess,
} = require('../fixtures/token.fixture');

setupTestDB();

describe('Level routes', () => {
  describe('POST v1/levels', () => {
    beforeEach(() => {
      level = {
        title: faker.name.findName(),
        description: faker.name.findName(),
        salary: faker.datatype.number(),
        isActive: true,
      };
    });

    test('confirm an unauthenticated user cannot create a level', async () => {
      await request(app).post('/v1/levels').send(level).expect(httpStatus.UNAUTHORIZED);
    });

    test('confirm an authenticated user without a business cannot create a level and returns 401', async () => {
      const token = await userThreeAccessToken();
      await request(app).post('/v1/levels').auth(token, { type: 'bearer' }).send(level).expect(httpStatus.UNAUTHORIZED);
    });

    test('confirm an authenticated user with a business can create a level and returns 201', async () => {
      const token = tokenForGetAndDeleteAccess();
      await request(app)
        .post('/v1/levels')
        // .set('Authorization', `bearer ${adminAccessToken}`)
        .set('Authorization', `bearer ${token}`)
        .send(level)
        .expect(httpStatus.CREATED);
    });
  });

  describe('GET v1/levels', () => {
    beforeEach(() => {
      level = {
        title: faker.name.findName(),
        description: faker.name.findName(),
        salary: faker.datatype.number(),
        isActive: true,
      };
    });

    test('Confirm a user with get level permission can get level', async () => {
      await request(app).get('/v1/levels').auth(adminAccessToken, { type: 'bearer' }).expect(httpStatus.OK);
    });
  });
});
