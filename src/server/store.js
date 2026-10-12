import { randomUUID } from 'node:crypto'
import { menu, points, reviews as initialReviews } from './data.js'

// This is intentionally process-local for the prototype. Replace with Postgres,
// Redis, KV, etc. before relying on it in production/serverless at scale.
const state = globalThis.__monsterCoffeeStore ?? {
  users: [], orders: [], reviews: initialReviews.map(review => ({ ...review })), feedback: [],
}
globalThis.__monsterCoffeeStore = state

export const db = state
export const findPoint = id => points.find(point => point.id === id)
export const findMenuItem = id => menu.find(item => item.id === id)

export function createOrderNumber(point) {
  const number = String(100 + state.orders.length + point.queue).padStart(3, '0')
  return `${point.letter}-${number}`
}

export const id = () => randomUUID()
