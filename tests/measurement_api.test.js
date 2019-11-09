/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const supertest = require('supertest')
const app = require('../App')
const dbOps = require('../utils/dbutils')


const api = supertest(app)

//Create test database before unit tests
beforeEach(async () => {

  const sql1 =
   `CREATE TABLE IF NOT EXISTS 'measurements'
   ( 'id' TEXT NOT NULL,  
   'name' TEXT NOT NULL, 
   'unit' TEXT NOT NULL, 
   'healthyupper' REAL NOT NULL, 
   'healthylower' REAL NOT NULL )`

  const sql2 = 'DELETE FROM "measurements"'

  const sql3 =
  `INSERT INTO measurements (id, name, unit, healthyupper, healthylower) 
  VALUES ("0", "Testi","kg",10,20)`

  await dbOps.runSql(sql1)
  await dbOps.runSql(sql2)
  await dbOps.runSql(sql3)

})

test('Test measurements are got properly', async () => {

  const res = await api.get('/api/measurements')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.length).toBe(1)

  const obj = res.body[0]

  expect(obj.id).toBeDefined
  expect(obj.name).toBeDefined
  expect(obj.healthyupper).toBeDefined
  expect(obj.healthylower).tobeDefined

})

test('Test measurements are added properly', async () => {

  const all = await api.get('/api/measurements')

  // eslint-disable-next-line no-unused-vars
  const res1 = await api.post('/api/measurements')
    .send(dbOps.examples[0])
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const res2 = await api.get('/api/measurements')

  expect(res2.body.length).toBe(all.body.length +1)
  expect(res2.body[res2.body.length -1].id).toBeDefined()

})

test('Test measurements are deleted properly', async () => {

  const all = await api.get('/api/measurements')

  await api.delete('/api/measurements/0').expect(204)

  const res2 = await api.get('/api/measurements')

  expect(res2.body.length).toBe(all.body.length -1)

})

test('Test measurements are updated properly', async () => {

  await api.put('/api/measurements/0').send(dbOps.examples[1]).expect(200)

  const all = await api.get('/api/measurements')

  expect(all.body[0].name).toBe(dbOps.examples[1].name)

})

test('Broken measurement data can not be added', async () => {

  // eslint-disable-next-line no-unused-vars
  const res1 = await api.post('/api/measurements')
    .send(dbOps.examples[2])
    .expect(400)
    .expect('Content-Type', /application\/json/)

})