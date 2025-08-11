export class LoginDto {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createdLogin(): LoginDto {
    return new LoginDto(process.env.USER || '', process.env.PASSWORD || '')
  }
}
