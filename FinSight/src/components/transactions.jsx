import React, { useState } from 'react'

// Mock transactions data
const mockTransactions = [
  { id: 1, category: 'Food', subcategory: 'Groceries', amount: 95, date: '2024-04-25' },
  { id: 2, category: 'Food', subcategory: 'Eating Out', amount: 45, date: '2024-04-25' },
  { id: 3, category: 'Housing', subcategory: 'Rent', amount: 1200, date: '2024-04-20' },
  { id: 4, category: 'Transportation', subcategory: 'Gas', amount: 65, date: '2024-04-24' },
  { id: 5, category: 'Food', subcategory: 'Groceries', amount: 72, date: '2024-04-24' },
  { id: 6, category: 'Housing', subcategory: 'Utilities', amount: 120, date: '2024-04-15' },
  { id: 7, category: 'Transportation', subcategory: 'Parking', amount: 25, date: '2024-04-23' },
  { id: 8, category: 'Food', subcategory: 'Dining', amount: 85, date: '2024-04-23' },
  { id: 9, category: 'Social Life', subcategory: 'Shopping', amount: 150, date: '2024-04-22' },
  { id: 10, category: 'Entertainment', subcategory: 'Movies', amount: 35, date: '2024-04-21' },
  { id: 11, category: 'Transportation', subcategory: 'Public Transport', amount: 80, date: '2024-04-20' },
  { id: 12, category: 'Food', subcategory: 'Groceries', amount: 88, date: '2024-04-19' },
]

function Transactions() {
  const [transactions, setTransactions] = useState(mockTransactions)

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.category}</td>
              <td>{tx.subcategory}</td>
              <td>${tx.amount}</td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { mockTransactions, Transactions }
