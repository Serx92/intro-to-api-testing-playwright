import { test, expect } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const authURL = 'https://backend.tallinn-learning.ee/login/student'
const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

test('Positive: when user credentials matching', async ({ request }) => {
  const loginData = LoginDto.loginWithCorrectData()

  const response = await request.post(authURL, {
    data: loginData,
  })

  const responseBody = await response.text()

  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody).toMatch(jwtRegex)
})

test('Negative:  when user credentials ae wrong', async ({ request }) => {
  const loginData = LoginDto.loginWithInCorrectData()

  const response = await request.post(authURL, {
    data: loginData,
  })

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
