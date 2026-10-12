// Server-side seed data. A database adapter can replace this module later.
export const points = [
  { id: 'p1', name: 'Корпус А', org: 'Колледж связи №7', addr: 'ул. Лесная, 12 · 1 этаж, у гардероба', hours: '07:30–19:00', status: 'open', queue: 3, letter: 'A' },
  { id: 'p2', name: 'Библиотека', org: 'Политехнический колледж', addr: 'пр. Мира, 45 · корпус Б, 2 этаж', hours: '08:00–18:30', status: 'closing', queue: 1, letter: 'B' },
  { id: 'p3', name: 'Monster на Садовой', org: 'Городская кофейня', addr: 'ул. Садовая, 7', hours: '08:00–22:00', status: 'open', queue: 6, letter: 'C' },
  { id: 'p4', name: 'Кампус Север', org: 'Колледж дизайна', addr: 'ул. Студенческая, 3 · корпус 2', hours: '08:00–17:00', status: 'closed', queue: 0, letter: 'D' },
]

export const menu = [
  { id: 'esp', cat: 'classic', name: 'Эспрессо', price: 600, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'ame', cat: 'classic', name: 'Американо', price: 750, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'cap', cat: 'milk', name: 'Капучино', price: 950, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'lat', cat: 'milk', name: 'Латте', price: 1050, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'flat', cat: 'milk', name: 'Флэт уайт', price: 1150, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'moc', cat: 'milk', name: 'Мокко', price: 1300, availableAt: ['p1', 'p3', 'p4'] },
  { id: 'ice', cat: 'cold', name: 'Айс латте', price: 1150, availableAt: ['p1', 'p2', 'p3', 'p4'] },
  { id: 'cb', cat: 'cold', name: 'Колд брю', price: 1100, availableAt: ['p1', 'p3', 'p4'] },
  { id: 'frap', cat: 'cold', name: 'Фраппе', price: 1350, availableAt: ['p1', 'p2', 'p3'] },
  { id: 'vie', cat: 'special', name: 'Венский кофе', price: 1200, availableAt: ['p1', 'p2', 'p3', 'p4'] },
]

export const reviews = [
  { id: 'r1', name: 'Артём', pointId: 'p1', rating: 5, text: 'Самая быстрая точка в колледже.', tags: ['Быстро', 'Вкусно'], createdAt: '2026-10-10T10:00:00.000Z' },
  { id: 'r2', name: 'Тимур', pointId: 'p3', rating: 5, text: 'Венский кофе — любовь.', tags: ['Уютно'], createdAt: '2026-10-05T10:00:00.000Z' },
]
