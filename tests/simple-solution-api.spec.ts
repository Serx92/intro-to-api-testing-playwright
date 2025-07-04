import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should rec1eive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await apiResponse.json())
  console.log('response headers:', apiResponse.headers())
  // Check if the response status is 200
  expect(apiResponse.status()).toBe(200)
})

test('request with  incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const apiResponse = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // Log the response status, body and headers
  console.log('response body:', await apiResponse.json())
  console.log('response headers:', apiResponse.headers())
  // Check if the response status is 400
  expect(apiResponse.status()).toBe(400)
})
test('post order with correct data should receive code 200', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with incorrect payload should receive code 400', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'CLOSED',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})