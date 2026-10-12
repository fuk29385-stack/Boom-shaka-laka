// Пример serverless-функции Vercel: GET /api/health
// Новые эндпоинты добавляются файлами рядом, например api/menu.js -> /api/menu
export function GET() {
  return Response.json({ ok: true, time: new Date().toISOString() })
}
