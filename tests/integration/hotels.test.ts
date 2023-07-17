import supertest from 'supertest';
import httpStatus from 'http-status';
import { cleanDb } from '../helpers';
import app, { init } from '@/app'
import * as jwt from 'jsonwebtoken'

beforeAll(async () =>{
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);