import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { ProductDocument } from 'src/product/product.model/product.model';
import { CreateTopPageDto } from 'src/top-page/dto/create.top-page.dto';
import { TopPageDocument } from 'src/top-page/top-page.model/top-page.model';

const testTopPage: CreateTopPageDto = {
  firstCategory: 1,
  secondCategory: 'Development',
  alias: 'typescript',
  title: 'Course UI Designers',
  category: 'typescript',
  hh: {
    count: 300,
    juniorSalary: 100,
    middleSalary: 200,
    seniorSalary: 500,
  },
  advantages: [
    {
      title: 'Faster development',
      description: 'My descriptrion',
    },
  ],
  seoText: 'Test for seo',
  tagsTitle: 'Get Knowlege',
  tags: ['typescript', 'Javascript'],
};

const testFindByAlias = 'typescript';

describe('Top-page Controller (e2e)', () => {
  let app: INestApplication;
  let pageId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/top-page/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send(testTopPage)
      .expect(201)
      .then(({ body }: request.Response) => {
        pageId = body._id;
        expect(pageId).toBeDefined();
      });
  });

  it('/top-page/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/top-page/' + pageId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(pageId);
      });
  });

  it('/top-page/:id (PATCH) - success update', async () => {
    return request(app.getHttpServer())
      .patch('/top-page/' + pageId)
      .send({ ...testTopPage, firstCategory: 3 })
      .expect(200);
  });

  it('/top-page/:id (PATCH) - fail id', async () => {
    return request(app.getHttpServer())
      .patch('/top-page/' + new Types.ObjectId().toHexString())
      .send({ ...testTopPage, firstCategory: 3 })
      .expect(404, {
        statusCode: 404,
        message: 'Page with this id not found',
        error: 'Not Found',
      });
  });

  it('/top-page/byalias/:alias by alias (POST) - success', async () => {
    return request(app.getHttpServer())
      .get('/top-page/byAlias/' + testFindByAlias)
      .send()
      .expect(200)
      .then(({ body }: request.Response) => {
        const response = body as TopPageDocument;
        expect(response).toBeDefined();
      });
  });

  it('/top-page/byalias/:alias by alias (POST) - success', async () => {
    return request(app.getHttpServer())
      .get('/top-page/byAlias/' + 'undefinedAlias')
      .send()
      .expect(404);
  });

  it('/top-page/find by first category (POST) - fail category', async () => {
    return request(app.getHttpServer())
      .post('/top-page/find')
      .send({ ...testTopPage, firstCategory: 3 })
      .expect(200);
  });

  it('/top-page/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/top-page/' + pageId)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
