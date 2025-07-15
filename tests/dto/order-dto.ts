export class OrderDto {
  // define fields of the class
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  // create a constructor Ctrl + N or Cmd + N (Mac)
  constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = 0
  }
}

export class ChecklistDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static negativeDecision(): ChecklistDto {
    return new ChecklistDto(-500, 1000, 22, false, 15000, 36)
  }

  static positiveMediumRisk(): ChecklistDto {
    return new ChecklistDto(2500, 500, 30, true, 5000, 12)
  }

  static positiveLowRisk(): ChecklistDto {
    return new ChecklistDto(20000, 0, 30, true, 500, 6)
  }
}
