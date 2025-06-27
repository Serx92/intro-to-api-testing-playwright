import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

// GET valid ID
test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

// GET invalid ID
test('request with incorrect id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// POST valid order
test('post order with correct data should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
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
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// POST invalid order
test('post order with incorrect payload should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'CLOSED', // invalid status
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

// PUT valid existing order
test('put order with correct id and data should receive code 200', async ({ request }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })


  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// PUT non-existing order
test('put order with non-existing id should receive code 400', async ({ request }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 999,
  }

  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/999', {
    data: requestBody,
    headers: requestHeaders,
  })

  console.log('PUT 404 response status:', response.status())
  console.log('PUT 404 response body:', await response.text())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DELETE valid ID
test('delete order with correct id should receive code 204', async ({ request }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456',
  }

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })

  console.log('DELETE response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

// DELETE invalid ID
test('delete order with non-existing id should receive code 400', async ({ request }) => {
  const requestHeaders: { api_key: string } = {
    api_key: '1234567890123456',
  }

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/999', {
    headers: requestHeaders,
  })

  console.log('DELETE 400 response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})