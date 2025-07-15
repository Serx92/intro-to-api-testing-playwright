import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { ChecklistDto } from './dto/order-dto'

const baseURL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('should return NEGATIVE decision for high risk client', async ({ request }) => {
  const requestBody = ChecklistDto.negativeDecision()

  const rawResponse = await request.post(baseURL, { data: requestBody })
  expect.soft(rawResponse.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('should return POSITIVE decision with MEDIUM risk', async ({ request }) => {
  const requestBody = ChecklistDto.positiveMediumRisk()

  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
})

test('should return POSITIVE decision with LOW risk', async ({ request }) => {
  const requestBody = ChecklistDto.positiveLowRisk()

  const rawResponse = await request.post(baseURL, {
    data: requestBody,
  })
  console.log('response status:', rawResponse.status())
  console.log('response body:', await rawResponse.json())
  expect.soft(rawResponse.status()).toBe(StatusCodes.OK)
})
