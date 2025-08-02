import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'
import { StatusCodes } from 'http-status-codes'

const loginUrl = 'https://backend.tallinn-learning.ee/login/student'
const orderUrl = 'https://backend.tallinn-learning.ee/orders'

const customerName = 'Sergei'
const customerPhone = '37255894563'
const comment = 'Please deliver ASAP'

test('should authorize, create, get and delete order via API', async ({ request }) => {
  // Authorization
  const loginData = new LoginDto('testautomvl', 'whs4s5qbYbfT2n')
  const loginResponse = await request.post(loginUrl, {
    data: loginData,
  })

  expect(loginResponse.status()).toBe(StatusCodes.OK)

  const jwt = await loginResponse.text()
  expect(jwt).toBeTruthy()

  // Creating an order
  const orderData = new OrderDto('OPEN', 1, customerName, customerPhone, comment, 0)
  const createOrderResponse = await request.post(orderUrl, {
    data: orderData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  expect(createOrderResponse.status()).toBe(StatusCodes.OK)
  const orderJson = await createOrderResponse.json()
  const orderId = orderJson.id
  expect(orderId).toBeDefined()
  expect(orderJson.customerName).toBe(customerName)
  expect(orderJson.customerPhone).toBe(customerPhone)

  // Receiving the order
  const getOrderResponse = await request.get(`${orderUrl}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
  const getOrderJson = await getOrderResponse.json()
  expect(getOrderJson.id).toBe(orderId)
  expect(getOrderJson.customerName).toBe(customerName)

  // Deleting an order
  const deleteOrder = await request.delete(`${orderUrl}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const deleteOrderResponse = await deleteOrder.json()
  console.log('Order Deleted:', deleteOrderResponse)
  expect(deleteOrder.status()).toBe(StatusCodes.OK)
})
