export const json = (data, status = 200, headers = {}) => Response.json(data, {
  status,
  headers: { 'Cache-Control': 'no-store', ...headers },
})

export const error = (message, status = 400, details) => json({ error: message, ...(details ? { details } : {}) }, status)

export async function body(request) {
  try { return await request.json() } catch { return null }
}

export function method(request, allowed) {
  if (allowed.includes(request.method)) return null
  return error('Метод не поддерживается', 405, { allowed })
}

export function query(request) { return new URL(request.url).searchParams }
