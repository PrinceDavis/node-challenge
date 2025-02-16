export interface Expense {
    amount_in_cents: number
    merchant_name: string
    date_created: string
    currency: string
    user_id: string
    status: string
    id: string
}

export interface readExpensesInputs {
    merchantName?: string
    pageSize?: string
    currency?: string
    status?: string
    sortBy?: string
    page?: string
    userId: string
  }
