// Демо-данные из макета. Когда появится бэкенд, их заменят ответы /api.

export const POINTS = [
  { id: 'p1', name: 'Корпус А', org: 'Колледж связи №7', addr: 'ул. Лесная, 12 · 1 этаж, у гардероба', hours: 'с 07:30 до 19:00', status: 'open', queue: 3, letter: 'A' },
  { id: 'p2', name: 'Библиотека', org: 'Политехнический колледж', addr: 'пр. Мира, 45 · корпус Б, 2 этаж', hours: 'с 08:00 до 18:30', status: 'closing', queue: 1, letter: 'B', closesIn: 'закроется через 25 мин' },
  { id: 'p3', name: 'Monster на Садовой', org: 'Городская кофейня', addr: 'ул. Садовая, 7', hours: 'с 08:00 до 22:00', status: 'open', queue: 6, letter: 'C' },
  { id: 'p4', name: 'Кампус Север', org: 'Колледж дизайна', addr: 'ул. Студенческая, 3 · корпус 2', hours: 'с 08:00 до 17:00', status: 'closed', queue: 0, letter: 'D', opensAt: 'Откроется завтра в 08:00' },
];
export const MENU = [{"id":"esp","cat":"classic","name":"Эспрессо","desc":"Чёрный кофе, короткий и насыщенный","price":600,"temp":"hot","milk":false,"img":"/assets/menu/esp.png","tint":"#B98E68"},
  {"id":"ris","cat":"classic","name":"Ристретто","desc":"Короткий эспрессо, меньше воды","price":650,"temp":"hot","milk":false,"img":"/assets/menu/ris.png","tint":"#B98E68"},
  {"id":"lun","cat":"classic","name":"Лунго","desc":"Длинный эспрессо, больше воды","price":700,"temp":"hot","milk":false,"img":"/assets/menu/lun.png","tint":"#B98E68"},
  {"id":"ame","cat":"classic","name":"Американо","desc":"Эспрессо и горячая вода","price":750,"temp":"hot","milk":false,"img":"/assets/menu/ame.png","tint":"#B98E68","pop":true},
  {"id":"lb","cat":"classic","name":"Лонг блэк","desc":"Горячая вода и эспрессо сверху","price":800,"temp":"hot","milk":false,"img":"/assets/menu/lb.png","tint":"#B98E68"},
  {"id":"cap","cat":"milk","name":"Капучино","desc":"Эспрессо, молоко и молочная пена","price":950,"temp":"hot","milk":true,"img":"/assets/menu/cap.png","tint":"#B98E68","pop":true},
  {"id":"lat","cat":"milk","name":"Латте","desc":"Эспрессо, горячее молоко и немного пены","price":1050,"temp":"hot","milk":true,"img":"/assets/menu/lat.png","tint":"#B98E68","pop":true},
  {"id":"flat","cat":"milk","name":"Флэт уайт","desc":"Эспрессо и горячее молоко, меньше пены","price":1150,"temp":"hot","milk":true,"img":"/assets/menu/flat.png","tint":"#B98E68"},
  {"id":"mac","cat":"milk","name":"Макиато","desc":"Эспрессо и немного молока","price":800,"temp":"hot","milk":true,"img":"/assets/menu/mac.png","tint":"#B98E68"},
  {"id":"moc","cat":"milk","name":"Мокко","desc":"Эспрессо, шоколад, молоко и сливки","price":1300,"temp":"hot","milk":true,"img":"/assets/menu/moc.png","tint":"#B98E68","pop":true,"na":["p2"]},
  {"id":"carl","cat":"milk","name":"Карамельный латте","desc":"Эспрессо, молоко и карамель","price":1250,"temp":"hot","milk":true,"img":"/assets/menu/carl.png","tint":"#B98E68"},
  {"id":"van","cat":"milk","name":"Ванильный латте","desc":"Эспрессо, молоко и ваниль","price":1250,"temp":"hot","milk":true,"img":"/assets/menu/van.png","tint":"#B98E68"},
  {"id":"cb","cat":"cold","name":"Колд брю","desc":"Холодный кофе долгой экстракции","price":1100,"temp":"cold","milk":false,"img":"/assets/menu/cb.png","tint":"#B98E68","na":["p2"]},
  {"id":"ice","cat":"cold","name":"Айс латте","desc":"Эспрессо и холодное молоко","price":1150,"temp":"cold","milk":true,"img":"/assets/menu/ice.png","tint":"#B98E68","pop":true},
  {"id":"iam","cat":"cold","name":"Айс американо","desc":"Эспрессо и холодная вода","price":900,"temp":"cold","milk":false,"img":"/assets/menu/iam.png","tint":"#B98E68"},
  {"id":"frap","cat":"cold","name":"Фраппе","desc":"Кофе, лёд, вода или молоко","price":1350,"temp":"cold","milk":true,"img":"/assets/menu/frap.png","tint":"#B98E68","pop":true,"na":["p4"]},
  {"id":"aff","cat":"special","name":"Аффогато","desc":"Эспрессо и шарик мороженого","price":1300,"temp":"cold","milk":false,"img":"/assets/menu/aff.png","tint":"#B98E68"},
  {"id":"tur","cat":"special","name":"Кофе по-турецки","desc":"Мелкий помол, вода и сахар","price":900,"temp":"hot","milk":false,"img":"/assets/menu/tur.png","tint":"#B98E68"},
  {"id":"vie","cat":"special","name":"Венский кофе","desc":"Эспрессо и взбитые сливки","price":1200,"temp":"hot","milk":false,"img":"/assets/menu/vie.png","tint":"#B98E68"},
  {"id":"iri","cat":"special","name":"Ирландский кофе","desc":"Кофе, виски и сливки","price":1500,"temp":"hot","milk":false,"img":"/assets/menu/iri.png","tint":"#B98E68","na":["p1","p2","p4"]}];
export const CATS = [['all', 'Всё'], ['classic', 'Классика'], ['milk', 'С молоком'], ['cold', 'Холодные'], ['special', 'Особые']];
export const SIZES = [{ id: 'S', ml: '250 мл', add: 0 }, { id: 'M', ml: '350 мл', add: 200 }, { id: 'L', ml: '450 мл', add: 350 }];
export const MILKS = [{ id: 'reg', label: 'Обычное', add: 0 }, { id: 'oat', label: 'Овсяное', add: 200 }, { id: 'alm', label: 'Миндальное', add: 250 }, { id: 'coc', label: 'Кокосовое', add: 250 }];
export const SYRUPS = [{ id: 'none', label: 'Без сиропа', add: 0 }, { id: 'van', label: 'Ваниль', add: 150 }, { id: 'car', label: 'Карамель', add: 150 }, { id: 'lav', label: 'Лаванда', add: 200 }];
export const TAGS = ['Вкусно', 'Быстро', 'Уютно', 'Вежливо'];
export const REVIEWS = [
  { name: 'Артём', point: 'p1', rating: 5, text: 'Самая быстрая точка в колледже. Айс-латте на десять из десяти.', tags: ['Быстро', 'Вкусно'], date: 'сегодня' },
  { name: 'Аня К.', point: 'p1', rating: 5, text: 'Заказываю капучино на второй паре, на перемене просто забираю. Ни одной очереди за месяц.', tags: ['Быстро'], date: '2 дня назад' },
  { name: 'Тимур', point: 'p3', rating: 5, text: 'Венский кофе просто любовь. Уютно, можно посидеть с ноутом после пар.', tags: ['Уютно', 'Вкусно'], date: 'неделю назад' },
  { name: 'Лиза М.', point: 'p2', rating: 4, text: 'Удобно, что видно очередь. Иногда к обеду заканчивается колд брю.', tags: ['Быстро'], date: '3 дня назад' },
  { name: 'Глеб', point: 'p1', rating: 5, text: 'Бариста запоминают заказ, это очень приятно.', tags: ['Вежливо'], date: 'вчера' },
  { name: 'Соня', point: 'p3', rating: 4, text: 'Флэт уайт вкусный, хочется ещё больше альтернативного молока.', tags: ['Вкусно'], date: '2 недели назад' },
  { name: 'Дима Р.', point: 'p4', rating: 5, text: 'Тёплая точка прямо в корпусе, идеально перед парой по рисунку.', tags: ['Уютно'], date: 'месяц назад' },
  { name: 'Вика', point: 'p2', rating: 3, text: 'В пиковое время ждала дольше, чем показывало приложение.', tags: [], date: '5 дней назад' },
];
export const FAQ = [
  ['Как работает заказ заранее?', 'Выбираешь точку, собираешь напиток и время получения. Бариста сразу видит заказ, а ты, живую очередь в разделе «Очередь».'],
  ['Можно отменить заказ?', 'Да, пока он в статусе «Принят». Как только бариста начал готовить, отмена недоступна.'],
  ['Как оплатить?', 'Пока на точке при получении, картой или по QR. Онлайн-оплата появится вместе с доставкой.'],
  ['Будет ли доставка?', 'Да, готовим доставку по кампусу. Новости в нашем Telegram.'],
  ['Что если я опоздаю?', 'Напиток ждёт на полке выдачи 15 минут. Если остыл, бариста приготовит заново.'],
];
export const STATUS = {
  open: { label: 'Открыта', bg: 'var(--sage)', fg: 'var(--sage-ink)' },
  closing: { label: 'Скоро закроется', bg: 'var(--peach)', fg: 'var(--peach-ink)' },
  closed: { label: 'Закрыта', bg: 'var(--pink)', fg: 'var(--pink-ink)' },
};
export const TINTS = ['var(--pink)', 'var(--sage)', 'var(--lav)', 'var(--peach)'];
export const TAG_COL = { 'Вкусно': ['var(--pink)', 'var(--pink-ink)'], 'Быстро': ['var(--sage)', 'var(--sage-ink)'], 'Уютно': ['var(--lav)', 'var(--lav-ink)'], 'Вежливо': ['var(--peach)', 'var(--peach-ink)'] };
