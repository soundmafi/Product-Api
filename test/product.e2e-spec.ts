import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductDocument } from 'src/product/product.model/product.model';
const testProduct: CreateProductDto = {
  image: 'ice.jpeg',
  title: 'ice',
  price: 10,
  oldPrrice: 20,
  credit: 30,
  description: 'Good ice for coctails',
  advantages: 'cold',
  disAdvantages: 'Destroy under sun',
  categories: ['Cat999', 'Cat2'],
  tags: ['tasg1', 'tag2', 'tag3'],
  characteristics: [
    {
      name: 'char1',
      value: '10',
    },
    {
      name: 'char2',
      value: '20',
    },
  ],
};

const testFindCategory = {
  category: 'Cat999',
  limit: 10,
};

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let productId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/product/create')
      .send(testProduct)
      .expect(201)
      .then(({ body }: request.Response) => {
        productId = body._id;
        expect(productId).toBeDefined();
      });
  });

  it('/product/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/product/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(productId);
      });
  });

  it('/product/:id (PATCH) - success update', async () => {
    return request(app.getHttpServer())
      .patch('/product/' + productId)
      .send({ ...testProduct, description: 'Good for traum' })
      .expect(200);
  });

  it('/product/:id (PATCH) - fail id', async () => {
    return request(app.getHttpServer())
      .patch('/product/' + new Types.ObjectId().toHexString())
      .send({ ...testProduct, description: 'Good for traum' })
      .expect(404, {
        statusCode: 404,
        message: 'Product with this id not found',
        error: 'Not Found',
      });
  });

  it('/product/find by category (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/product/find')
      .send(testFindCategory)
      .expect(200)
      .then(({ body }: request.Response) => {
        const response = body as Array<ProductDocument>;
        expect(response.length).toBe(1);
      });
  });

  it('/product/find by category (POST) - fail category', async () => {
    return request(app.getHttpServer())
      .post('/product/find')
      .send({ ...testFindCategory, category: 'Cat1000' })
      .expect(200)
      .then(({ body }: request.Response) => {
        const response = body as Array<ProductDocument>;
        expect(response.length).toBe(0);
      });
  });

  it('/product/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/product/' + productId)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
