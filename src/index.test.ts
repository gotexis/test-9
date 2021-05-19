import { app } from './index'
import sampleRequest from '../test-data/sample_request.json'
import sampleResponse from '../test-data/sample_response.json'

import request from 'supertest'

describe('Post Endpoints', () => {
  it('should be successful at filtering and mapping shows', async () => {
    const res = await request(app).post('/').send(sampleRequest)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(sampleResponse)
  })

  it('should fail at incorrect json', async () => {
    const res = await request(app).post('/').send('gsadfdsfadsf')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ error: 'Could not decode request: JSON parsing failed' })
  })

  it('should fail at empty json', async () => {
    const res = await request(app).post('/').send({})
    expect(res.statusCode).toEqual(400)
    expect(res.body).toMatchObject({ error: 'Could not decode request: JSON parsing failed' })
  })
})
