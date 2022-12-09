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

describe('Notification routes', () => {
  describe('POST /v1/notifications', () => {
    beforeEach(() => {
      notification = {
        title: faker.company.companyName(),
        content: faker.name.findName(),
        isRead: true,
      };
    });

    test('Confirm that a created notification return 201', async () => {
      //const token = await userOneAccessToken();
      const token = await tokenForGetAndDeleteAccess();

      await request(app)
        .post('/v1/notifications')
        .auth(token, { type: 'bearer' })
        //.set('Authorization', `bearer ${userOneAccessToken}`)
        .send(notification)
        .expect(httpStatus.CREATED);
    });
    test('Confirm that creating a notification without authentication return 401', async () => {
      await request(app).post('/v1/notifications').send(notification).expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /v1/notifications', () => {
    beforeEach(() => {
      newUser = {
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };
    });

    test('Confirm notification userid is same as authorised userid', async () => {
      const token = await tokenForGetAndDeleteAccess();
      const user = insertOne(newUser);
      insertNotifications(notication);
      const res = await request(app).get('/v1/notifications/1').auth(token, { type: 'bearer' }).expect(httpStatus.OK);
      expect(res.body.userId).toBe(user.id);
    });
  });
});
