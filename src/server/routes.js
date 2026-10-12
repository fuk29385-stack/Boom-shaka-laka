import { currentUser, matchesPassword, normaliseLogin, publicUser, register, tokenFor } from './auth.js'
import { menu, points } from './data.js'
import { body, error, json, method, query } from './http.js'
import { createOrderNumber, db, findMenuItem, findPoint, id } from './store.js'

const cleanText = value => String(value || '').trim()

export function getMenu(request) {
  const blocked = method(request, ['GET']); if (blocked) return blocked
  const pointId = query(request).get('pointId')
  if (pointId && !findPoint(pointId)) return error('Точка не найдена', 404)
  return json(menu.filter(item => !pointId || item.availableAt.includes(pointId)))
}

export function getPoints(request) {
  const blocked = method(request, ['GET']); if (blocked) return blocked
  return json(points)
}

export async function authRegister(request) {
  const blocked = method(request, ['POST']); if (blocked) return blocked
  const input = await body(request)
  if (!input) return error('Ожидается JSON')
  const user = await register(input)
  if (user === 'exists') return error('Пользователь с таким телефоном или email уже есть', 409)
  if (!user) return error('Проверьте имя, телефон или email и пароль (минимум 6 символов)')
  return json({ user: publicUser(user), token: tokenFor(user) }, 201)
}

export async function authLogin(request) {
  const blocked = method(request, ['POST']); if (blocked) return blocked
  const input = await body(request)
  const user = db.users.find(item => item.login === normaliseLogin(input?.login))
  if (!user || !(await matchesPassword(input?.password || '', user.passwordHash))) return error('Неверный телефон/email или пароль', 401)
  return json({ user: publicUser(user), token: tokenFor(user) })
}

export function authMe(request) {
  const blocked = method(request, ['GET']); if (blocked) return blocked
  const user = currentUser(request)
  return user ? json({ user: publicUser(user) }) : error('Требуется авторизация', 401)
}

export function getReviews(request) {
  const blocked = method(request, ['GET']); if (blocked) return blocked
  const pointId = query(request).get('pointId')
  if (pointId && !findPoint(pointId)) return error('Точка не найдена', 404)
  return json(db.reviews.filter(review => !pointId || review.pointId === pointId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
}

export async function postReview(request) {
  const blocked = method(request, ['POST']); if (blocked) return blocked
  const input = await body(request)
  const rating = Number(input?.rating), text = cleanText(input?.text)
  if (!findPoint(input?.pointId)) return error('Точка не найдена', 404)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return error('Оценка должна быть от 1 до 5')
  if (text.length < 3 || text.length > 1000) return error('Отзыв должен содержать от 3 до 1000 символов')
  const user = currentUser(request)
  const review = { id: id(), name: user?.name || cleanText(input.name) || 'Гость', pointId: input.pointId, rating, text, tags: Array.isArray(input.tags) ? input.tags.slice(0, 4).map(cleanText).filter(Boolean) : [], createdAt: new Date().toISOString() }
  db.reviews.unshift(review)
  return json(review, 201)
}

export async function postFeedback(request) {
  const blocked = method(request, ['POST']); if (blocked) return blocked
  const input = await body(request), name = cleanText(input?.name), contact = cleanText(input?.contact), message = cleanText(input?.message)
  if (name.length < 2 || !contact || message.length < 10) return error('Укажите имя, контакт и сообщение от 10 символов')
  const feedback = { id: id(), name, contact, message, createdAt: new Date().toISOString(), status: 'new' }
  db.feedback.push(feedback)
  return json({ id: feedback.id, status: 'received' }, 201)
}

export async function postOrder(request) {
  const blocked = method(request, ['POST']); if (blocked) return blocked
  const input = await body(request), point = findPoint(input?.pointId)
  if (!point) return error('Точка не найдена', 404)
  if (point.status === 'closed') return error('Эта точка сейчас закрыта', 409)
  if (input.fulfillmentType && input.fulfillmentType !== 'pickup') return error('Доставка пока недоступна', 501)
  if (!Array.isArray(input.items) || !input.items.length) return error('Корзина пуста')
  let total = 0
  const items = []
  for (const line of input.items) {
    const item = findMenuItem(line.id), quantity = Number(line.quantity || line.qty)
    if (!item || !item.availableAt.includes(point.id)) return error('Одна из позиций недоступна в этой точке', 409)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) return error('Количество каждой позиции — от 1 до 20')
    const unitPrice = item.price + Number(line.additionsPrice || 0)
    if (!Number.isFinite(unitPrice) || unitPrice < item.price || unitPrice > item.price + 1000) return error('Некорректная цена добавок')
    total += unitPrice * quantity
    items.push({ id: item.id, name: item.name, quantity, unitPrice, additions: line.additions || null })
  }
  const order = { id: id(), number: createOrderNumber(point), pointId: point.id, userId: currentUser(request)?.id || null, items, total, status: 'accepted', queueAhead: point.queue, pickupTime: input.pickupTime || 'asap', fulfillmentType: 'pickup', createdAt: new Date().toISOString() }
  db.orders.push(order); point.queue += 1
  return json(order, 201)
}

export function getQueue(request) {
  const blocked = method(request, ['GET']); if (blocked) return blocked
  const orderId = query(request).get('orderId'), number = query(request).get('number')
  const order = db.orders.find(item => item.id === orderId || item.number === number)
  if (!order) return error('Заказ не найден', 404)
  return json({ id: order.id, number: order.number, pointId: order.pointId, status: order.status, ahead: Math.max(0, order.queueAhead), estimatedMinutes: order.status === 'ready' ? 0 : Math.max(3, order.queueAhead * 2 + 3), pickupTime: order.pickupTime })
}
