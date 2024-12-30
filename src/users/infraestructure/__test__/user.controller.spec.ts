import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

describe('Users controller CRUD', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        id: '201d990e-3bf7-4d00-b689-2393891343e6',
        name: 'Luis Angel',
        lastname: 'Luis Angel',
        document: '75840236',
        type_document: 1,
        username: 'luis.lucero',
        password: '123456789',
        email: 'luis.lucero@soulum-code.com',
        cellphone: '923062749',
        code: '123456',
        points: 0,
        status: 1,
        role: '985f69e3-7281-446b-810a-ea2bb588f14a',
        birth_date: '2000-02-02',
      })
      .expect(201);
  });

  it('Update user', () => {
    return request(app.getHttpServer())
      .put('/users')
      .send({
        id: '201d990e-3bf7-4d00-b689-2393891343e6',
        name: 'Luis Angel',
        lastname: 'Lucero Saldaña',
        document: '75840236',
        type_document: 1,
        username: 'luis.lucero',
        email: 'luis.lucero@soulum-code.com',
        cellphone: '923062749',
        code: '123456',
        points: 0,
        status: 1,
        role: '985f69e3-7281-446b-810a-ea2bb588f14a',
        birth_date: '2000-02-02',
      })
      .expect(200);
  });

  it('Get user by id', () => {
    return request(app.getHttpServer())
      .get('/users/201d990e-3bf7-4d00-b689-2393891343e6')
      .expect(200);
  });

  it('Get all users', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('Delete user', () => {
    return request(app.getHttpServer())
      .delete('/users/201d990e-3bf7-4d00-b689-2393891343e6')
      .expect(200);
  });
});
