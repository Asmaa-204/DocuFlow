const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models');

process.env.JWT_SECRET = 'secret';
process.env.JWT_EXPIRES_IN = '1h';

let adminToken, professorToken;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Create users
  await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    password: '123456',
    role: 'administrator'
  });

  await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Prof',
    lastName: 'User',
    email: 'prof@test.com',
    password: '123456',
    role: 'professor'
  });

  // Login users and save tokens
  const adminRes = await request(app).post('/api/v1/auth/login').send({
    email: 'admin@test.com',
    password: '123456'
  });
  adminToken = adminRes.body.data.token;

  const profRes = await request(app).post('/api/v1/auth/login').send({
    email: 'prof@test.com',
    password: '123456'
  });
  professorToken = profRes.body.data.token;
});

describe('Workflow Integration', () => {
  let workflowId, instanceId;

  test('Admin can create a workflow', async () => {
    const res = await request(app)
      .post('/api/v1/workflow')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Workflow',
        description: 'Test workflow description',
        stages: [
          { title: 'Prof submits', stageOrder: 1, role: 'professor' },
          { title: 'Dept review', stageOrder: 2, role: 'department_manager' }
        ]
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.workflow.title).toBe('Test Workflow');
    workflowId = res.body.data.workflow.id;
  });

  test('Professor can create an instance', async () => {
    const res = await request(app)
      .post('/api/v1/instance')
      .set('Authorization', `Bearer ${professorToken}`)
      .send({ workflowId });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.instance.workflowId).toBe(workflowId);
    instanceId = res.body.data.instance.id;
  });

  test('Professor can create a request', async () => {
    const res = await request(app)
      .post('/api/v1/request')
      .set('Authorization', `Bearer ${professorToken}`)
      .send({
        instanceId,
        note: 'Submitting request',
        isDraft: false
      });

    console.log(res.body)
    expect(res.statusCode).toBe(200);
    expect(res.body.data.request.status).toBe('pending');
  });
});
