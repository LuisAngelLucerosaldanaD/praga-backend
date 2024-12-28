import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

describe('Role controller CRUD', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a role', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({
        id: '985f69e3-7281-446b-810a-ea2bb588f14a',
        name: 'Admin',
        description: 'Administrator',
      })
      .expect(201);
  });

  it('Update role', () => {
    return request(app.getHttpServer())
      .put('/roles')
      .send({
        id: '985f69e3-7281-446b-810a-ea2bb588f14a',
        name: 'Admin',
        description: 'Administrator updated',
      })
      .expect(200);
  });

  it('Get role by id', () => {
    return request(app.getHttpServer())
      .get('/roles/985f69e3-7281-446b-810a-ea2bb588f14a')
      .expect(200);
  });

  it('Get all roles', () => {
    return request(app.getHttpServer()).get('/roles').expect(200);
  });

  it('Delete role', () => {
    return request(app.getHttpServer())
      .delete('/roles/985f69e3-7281-446b-810a-ea2bb588f14a')
      .expect(200);
  });
});
