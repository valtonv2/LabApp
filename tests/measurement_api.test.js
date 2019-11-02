const supertest = require('supertest')
const app = require('../App')
const sqlite = require('sqlite3')
const dbOps = require('../utils/dbutils')


const api = supertest(app)

//Create test database before unit tests
beforeEach(async () => {

    const sql1 = 'CREATE TABLE IF NOT EXISTS "measurements" ( `id` TEXT NOT NULL, `name` TEXT NOT NULL, `healthyupper` INTEGER NOT NULL, `healthylower` INTEGER NOT NULL )'
    const sql2 = 'DELETE FROM "measurements"'
   
    await dbOps.runSql(sql1)
    await dbOps.runSql(sql2)
    
})

test('Test measurements are added properly', async () => {

   const res1 = await api.post('/api/measurements')
                         .send(dbOps.examples[0])
                         .expect(200)
                         .expect('Content-Type', /application\/json/)

    const res2 = await api.get('/api/measurements')
                          .expect(200)
                          .expect('Content-Type', /application\/json/)



   expect(res2.body.length).toBe(1)
   expect(res2.body[0].id).toBeDefined()

})