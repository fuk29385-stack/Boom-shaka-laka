// Тонкая обёртка над fetch для запросов к бэкенду.
// На Vercel фронт и функции из /api живут на одном домене, поэтому по умолчанию
// база пустая и запросы идут на относительный /api/... Если бэкенд вынесут отдельно,
// достаточно задать VITE_API_URL в настройках проекта.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export async function api(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(BASE + '/api' + path, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error((data && data.error) || `Ошибка запроса: ${res.status}`)
    err.status = res.status
    throw err
  }
  return data
}
