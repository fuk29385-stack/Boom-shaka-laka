import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { db, id } from './store.js'

const scrypt = promisify(scryptCallback)
const tokenSecret = process.env.AUTH_SECRET || 'development-only-secret-change-me'

export const normaliseLogin = value => String(value || '').trim().toLowerCase()

export function validLogin(value) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
  const phone = /^\+?[\d\s()-]{10,}$/.test(value)
  return email || phone
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = (await scrypt(password, salt, 64)).toString('hex')
  return `${salt}:${hash}`
}

export async function matchesPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  const actual = Buffer.from(await scrypt(password, salt, 64))
  const expected = Buffer.from(hash, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

function sign(value) { return createHmac('sha256', tokenSecret).update(value).digest('base64url') }

export function tokenFor(user) {
  const payload = Buffer.from(JSON.stringify({ sub: user.id, exp: Date.now() + 7 * 86400000 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function currentUser(request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature || sign(payload) !== signature) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data.exp > Date.now() ? db.users.find(user => user.id === data.sub) || null : null
  } catch { return null }
}

export const publicUser = user => ({ id: user.id, name: user.name, login: user.login, favoritePointId: user.favoritePointId })

export async function register({ name, login, password, favoritePointId }) {
  const cleanLogin = normaliseLogin(login)
  if (!String(name || '').trim() || !validLogin(cleanLogin) || String(password || '').length < 6) return null
  if (db.users.some(user => user.login === cleanLogin)) return 'exists'
  const user = { id: id(), name: name.trim(), login: cleanLogin, passwordHash: await hashPassword(password), favoritePointId: favoritePointId || 'p1', createdAt: new Date().toISOString() }
  db.users.push(user)
  return user
}
