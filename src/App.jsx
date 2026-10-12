import { Component, createRef } from 'react'
import { POINTS, MENU, CATS, SIZES, MILKS, SYRUPS, TAGS, REVIEWS, FAQ, STATUS, TINTS, TAG_COL } from './data.js'
import { buildIcons } from './icons.js'
import DesktopHeader from './components/DesktopHeader.jsx'
import MobileHeader from './components/MobileHeader.jsx'
import CartBar from './components/CartBar.jsx'
import TabBar from './components/TabBar.jsx'
import Sheet from './components/Sheet.jsx'
import Toast from './components/Toast.jsx'
import ReadyNote from './components/ReadyNote.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import QueuePage from './pages/QueuePage.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { api } from './lib/api.js'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const RM = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; if (m === 1 && h !== 11) return a; if (m >= 2 && m <= 4 && (h < 10 || h >= 20)) return b; return c; };
const rub = n => Math.round(n).toLocaleString('ru-RU') + ' ₸';

const bez = (a, b, c, d, t) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
function trackPos(t) {
  const s = t < .5 ? [[30, 92], [150, 12], [250, 132], [320, 72]] : [[320, 72], [390, 12], [480, 22], [568, 82]];
  const u = t < .5 ? t * 2 : (t - .5) * 2;
  return [bez(s[0][0], s[1][0], s[2][0], s[3][0], u), bez(s[0][1], s[1][1], s[2][1], s[3][1], u)];
}

// Вся логика экрана живёт здесь, renderVals() собирает view-model `v` для компонентов.
// Props для отладки состояний: screenState (normal|loading|empty|error), theme (light|dark), queueSpeed (сек).
export default class App extends Component {
  state = {
    route: 'home', pointId: 'p1', theme: null, w: window.innerWidth,
    cat: 'all', q: '', fTemp: 'all', fMilk: 'all', loading: true, ignoreForced: false,
    sheet: null, sheetClosing: false, cfg: { size: 'M', milk: 'reg', syrup: 'none', qty: 1 },
    cart: [], disp: 0, time: 'asap', order: null, toast: null, readyNote: false,
    user: null, authToken: null, authTab: 'login', form: {}, touched: {}, focus: null, authBusy: false, favPoint: 'p1',
    revPoint: 'all', myRating: 0, hoverRating: 0, revTags: [], revSent: false, revFormPoint: 'p1', reviews: REVIEWS.slice(),
    fbSent: false, fbBusy: false, faqOpen: 0, navL: 0, navW: 0,
  };
  posRef = createRef();
  icons = buildIcons();
  _lt = 0;

  componentDidMount() {
    this.onResize = () => this.setState({ w: window.innerWidth });
    window.addEventListener('resize', this.onResize);
    this.onKey = e => { if (e.key === 'Escape' && this.state.sheet) this.closeSheet(); };
    window.addEventListener('keydown', this.onKey);
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(entries => {
        entries.filter(e => e.isIntersecting).forEach((e, i) => {
          const el = e.target; this.io.unobserve(el); el.style.opacity = '';
          el.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: i * 80, easing: EASE, fill: 'backwards' });
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    }
    this._pp = Object.assign({}, this.props); this._ps = this.state;
    this.startLoad(700);
    if (!RM()) {
      let raf = 0, last = null;
      const run = () => {
        raf = 0; const e = last; if (!e) return;
        const hero = document.querySelector('[data-hero]');
        if (hero) {
          const r = hero.getBoundingClientRect(), nx = (e.clientX - r.left - r.width / 2) / innerWidth, ny = (e.clientY - r.top - r.height / 2) / innerHeight;
          Array.from(hero.children).forEach((el, i) => { const d = [10, 26, 22, 34, 30, 38, 14, 8, 12, 9, 9, 18][i] || 10; el.style.translate = (nx * d).toFixed(1) + 'px ' + (ny * d).toFixed(1) + 'px'; });
        }
        const mg = document.querySelector('[data-magnetic]:hover');
        document.querySelectorAll('[data-magnetic]').forEach(b => { if (b !== mg) b.style.translate = ''; });
        if (mg) { const r = mg.getBoundingClientRect(); mg.style.translate = ((e.clientX - r.left - r.width / 2) * .25).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .35).toFixed(1) + 'px'; }
        const card = e.target.closest && e.target.closest('[data-card]');
        if (this._card && this._card !== card) { const im = this._card.querySelector('[data-art] img'); if (im) im.style.transform = ''; }
        this._card = card;
        if (card) { const im = card.querySelector('[data-art] img'), a = card.querySelector('[data-art]'); if (im && a) { const r = a.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5; im.style.transform = 'scale(1.14) translate(' + (-dx * 10).toFixed(1) + 'px,' + (-dy * 8).toFixed(1) + 'px)'; } }
      };
      this.onMove = e => { last = e; if (!raf) raf = requestAnimationFrame(run); };
      window.addEventListener('pointermove', this.onMove, { passive: true });
      this.onDown = e => {
        const b = e.target.closest && e.target.closest('button,a[href]'); if (!b || b.disabled) return;
        const r = b.getBoundingClientRect(), cs = getComputedStyle(b), clip = document.createElement('div');
        Object.assign(clip.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: cs.borderRadius, overflow: 'hidden', pointerEvents: 'none', zIndex: 9998 });
        const s = Math.max(r.width, r.height) * 2.2, dot = document.createElement('div');
        const dark = cs.backgroundColor && /\(\s*(\d+)/.exec(cs.backgroundColor) && (+(/\(\s*(\d+)/.exec(cs.backgroundColor)[1]) < 140);
        Object.assign(dot.style, { position: 'absolute', left: (e.clientX - r.left - s / 2) + 'px', top: (e.clientY - r.top - s / 2) + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%', background: dark ? 'rgba(255,248,239,.28)' : 'rgba(90,70,54,.14)' });
        clip.appendChild(dot); document.body.appendChild(clip);
        dot.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }], { duration: 650, easing: EASE }).onfinish = () => clip.remove();
      };
      document.addEventListener('pointerdown', this.onDown, { passive: true });
    }
    this.syncBody();
    this.setupReveal();
    this.measureNav();
    if (document.fonts) document.fonts.ready.then(() => this.measureNav());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize); window.removeEventListener('pointermove', this.onMove); document.removeEventListener('pointerdown', this.onDown); window.removeEventListener('keydown', this.onKey);
    clearInterval(this.qt); clearTimeout(this.lt); clearTimeout(this.tt); cancelAnimationFrame(this._raf);
    this.io && this.io.disconnect(); document.body.style.overflow = '';
  }
  componentDidUpdate() {
    const s = this.state, pp = this._pp || {}, ps = this._ps || s;
    this._pp = Object.assign({}, this.props); this._ps = s;
    if (pp.screenState !== this.props.screenState && s.ignoreForced) this.setState({ ignoreForced: false });
    if (pp.theme !== this.props.theme && this.props.theme) this.setState({ theme: this.props.theme });
    if (ps.theme !== s.theme || pp.theme !== this.props.theme) this.syncBody();
    if (ps.route !== s.route || ps.loading !== s.loading || pp.screenState !== this.props.screenState || ps.revPoint !== s.revPoint) this.setupReveal();
    if (ps.route !== s.route || ps.w !== s.w || ps.order !== s.order) this.measureNav();
    if (!!ps.sheet !== !!s.sheet) document.body.style.overflow = s.sheet ? 'hidden' : '';
    const pa = ps.order && ps.order.ahead.length, na = s.order && s.order.ahead.length;
    if (ps.order && s.order && pa !== na && this.posRef.current && !RM())
      this.posRef.current.animate([{ transform: 'translateY(-70%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 480, easing: EASE });
    const cc = s.cart.reduce((a, l) => a + l.qty, 0);
    if (ps.cart !== s.cart && cc !== ps.cart.reduce((a, l) => a + l.qty, 0) && !RM()) document.querySelectorAll('[data-cart-target] > span').forEach(b => b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.6)' }, { transform: 'scale(1)' }], { duration: 450, easing: EASE }));
    const t = this.total();
    if (t !== this._lt) {
      this._lt = t; const from = s.disp, st = performance.now(); cancelAnimationFrame(this._raf);
      if (RM()) { this.setState({ disp: t }); return; }
      const step = now => { const k = Math.min(1, (now - st) / 480), e = 1 - Math.pow(1 - k, 3); this.setState({ disp: from + (t - from) * e }); if (k < 1) this._raf = requestAnimationFrame(step); };
      this._raf = requestAnimationFrame(step);
    }
  }
  themeName() { return this.state.theme || this.props.theme || 'light'; }
  syncBody() { document.body.style.background = this.themeName() === 'dark' ? '#2B211B' : '#FAF6F0'; }
  setupReveal() {
    if (!this.io || RM()) return;
    document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => { el.setAttribute('data-rv', '1'); el.style.opacity = '0'; this.io.observe(el); });
  }
  measureNav() {
    const el = document.querySelector(`[data-nav="${this.state.route}"]`);
    const l = el ? el.offsetLeft : this.state.navL, w = el ? el.offsetWidth : 0;
    if (l !== this.state.navL || w !== this.state.navW) this.setState({ navL: l, navW: w });
  }
  startLoad(ms) { this.setState({ loading: true }); clearTimeout(this.lt); this.lt = setTimeout(() => this.setState({ loading: false }), ms); }
  forced() { return this.state.ignoreForced ? 'normal' : (this.props.screenState || 'normal'); }
  point(id) { return POINTS.find(p => p.id === (id || this.state.pointId)); }
  toast(text, icon) { clearTimeout(this.tt); this.setState({ toast: { text, icon: icon || 'check', id: Date.now() } }); this.tt = setTimeout(() => this.setState({ toast: null }), 2600); }
  go(r) {
    if (this.state.route === r) return;
    this.setState({ route: r, sheet: null, sheetClosing: false });
    window.scrollTo({ top: 0 });
    if (['menu', 'reviews', 'contacts', 'queue'].includes(r)) this.startLoad(480);
  }
  openSheet(sheet, extra) { this.setState(Object.assign({ sheet, sheetClosing: false }, extra || {})); }
  closeSheet() {
    if (!this.state.sheet || this.state.sheetClosing) return;
    if (RM()) return this.setState({ sheet: null });
    this.setState({ sheetClosing: true });
    setTimeout(() => this.setState({ sheet: null, sheetClosing: false }), 240);
  }
  selectPoint(id, goMenu) {
    const same = id === this.state.pointId;
    if (this.state.sheet && this.state.sheet.type === 'point') this.closeSheet();
    if (!same) { this.setState({ pointId: id, revFormPoint: id }); this.startLoad(520); this.toast('Точка: ' + this.point(id).name, 'pin'); }
    if (goMenu) this.go('menu');
  }
  unitPrice(m, c) {
    if (m.cat === 'dessert') return m.price;
    const sz = SIZES.find(x => x.id === c.size), mi = MILKS.find(x => x.id === c.milk), sy = SYRUPS.find(x => x.id === c.syrup);
    return m.price + sz.add + (m.milk ? mi.add : 0) + sy.add;
  }
  total() { return this.state.cart.reduce((a, l) => a + l.unit * l.qty, 0); }
  blockedReason(m) {
    const p = this.point();
    if (p.status === 'closed') return 'Точка закрыта, выбери другую, чтобы заказать';
    if (m && m.na && m.na.includes(p.id)) return 'Этой позиции нет на точке «' + p.name + '»';
    return '';
  }
  addLine(m, c) {
    const desc = m.cat === 'dessert' ? 'десерт' : [c.size, m.milk ? MILKS.find(x => x.id === c.milk).label.toLowerCase() + ' молоко' : null, c.syrup !== 'none' ? SYRUPS.find(x => x.id === c.syrup).label.toLowerCase() : null].filter(Boolean).join(' · ');
    const key = [m.id, c.size, c.milk, c.syrup].join('|'), unit = this.unitPrice(m, c);
    this.setState(s => {
      const i = s.cart.findIndex(l => l.key === key);
      const cart = i >= 0 ? s.cart.map((l, j) => j === i ? Object.assign({}, l, { qty: l.qty + c.qty }) : l) : s.cart.concat([{ key, id: m.id, name: m.name, tint: m.tint, kind: m.kind, img: m.img, unit, qty: c.qty, desc }]);
      return { cart };
    });
  }
  bounceCart() {
    if (RM()) return;
    document.querySelectorAll('[data-cart-target]').forEach(el => el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.28)' }, { transform: 'scale(.9)' }, { transform: 'scale(1)' }], { duration: 520, easing: EASE }));
  }
  fly(src, tint) {
    const tgt = Array.from(document.querySelectorAll('[data-cart-target]')).find(e => e.getBoundingClientRect().width > 0);
    if (RM() || !src || !tgt) return this.bounceCart();
    const a = src.getBoundingClientRect(), b = tgt.getBoundingClientRect(), s = 60;
    const d = document.createElement('div');
    Object.assign(d.style, { position: 'fixed', left: (a.left + a.width / 2 - s / 2) + 'px', top: (a.top + a.height / 2 - s / 2) + 'px', width: s + 'px', height: s + 'px', borderRadius: '50%', background: '#141312 url(' + tint + ') center/cover', zIndex: 9999, pointerEvents: 'none', boxShadow: '0 12px 28px rgba(90,70,54,.28)', border: '3px solid #FFF8EF' });
    document.body.appendChild(d);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    d.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${dx * .45}px,${dy * .45 - 90}px) scale(.85)`, offset: .45 }, { transform: `translate(${dx}px,${dy}px) scale(.2)`, opacity: .5 }], { duration: 720, easing: 'cubic-bezier(.45,0,.25,1)' }).onfinish = () => { d.remove(); this.bounceCart(); };
  }
  quickAdd(e, m) {
    e.stopPropagation();
    const why = this.blockedReason(m);
    if (why) return this.toast(why, 'alert');
    const card = e.currentTarget.closest('[data-card]');
    this.addLine(m, { size: 'M', milk: 'reg', syrup: 'none', qty: 1 });
    this.fly(card && card.querySelector('[data-art]'), m.img);
  }
  addFromSheet() {
    const m = MENU.find(x => x.id === this.state.sheet.itemId);
    if (this.blockedReason(m)) return;
    this.addLine(m, this.state.cfg);
    this.fly(document.querySelector('[data-sheet-art]'), m.img);
    this.closeSheet();
    this.toast('Добавлено: ' + m.name, 'bag');
  }
  slots() {
    const p = this.point(), now = new Date(), out = [{ id: 'asap', label: 'Как можно скорее · ~' + (p.queue * 2 + 3) + ' мин' }];
    const base = new Date(now.getTime() + 15 * 60000); base.setMinutes(Math.ceil(base.getMinutes() / 10) * 10, 0, 0);
    for (let i = 0; i < 3; i++) { const t = new Date(base.getTime() + i * 15 * 60000); const lbl = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0'); out.push({ id: lbl, label: 'к ' + lbl }); }
    return out;
  }
  async placeOrder() {
    const p = this.point();
    if (p.status === 'closed' || !this.state.cart.length) return;
    if (this.state.order && this.state.order.status !== 'ready') return;
    const base = 40 + Math.floor(Math.random() * 40), code = n => p.letter + '-' + String(n).padStart(3, '0');
    const ahead = []; for (let i = p.queue; i > 0; i--) ahead.push(code(base - i));
    const slot = this.slots().find(x => x.id === this.state.time) || this.slots()[0];
    try {
      const created = await api('/orders', { method: 'POST', headers: this.state.authToken ? { Authorization: 'Bearer ' + this.state.authToken } : {}, body: { pointId: p.id, pickupTime: this.state.time, fulfillmentType: 'pickup', items: this.state.cart.map(line => ({ id: line.id, quantity: line.qty, additionsPrice: Math.max(0, line.unit - (MENU.find(item => item.id === line.id)?.price || 0)) })) } });
      const order = { num: created.number, id: created.id, pointId: p.id, initialAhead: created.queueAhead, ahead, step: 0, prep: 0, status: created.status, items: this.state.cart.slice(), total: created.total, fulfillmentType: 'pickup', pickupTime: created.pickupTime === 'asap' ? 'как можно скорее' : created.pickupTime, pickupLabel: slot.label };
      this.setState({ order, cart: [], sheet: null, sheetClosing: false, route: 'queue', readyNote: false, time: 'asap' });
      window.scrollTo({ top: 0 });
      this.toast('Заказ ' + order.num + ' принят', 'check');
      clearInterval(this.qt);
      this.qt = setInterval(() => this.tick(), (this.props.queueSpeed || 4) * 1000);
    } catch (err) { this.toast(err.message || 'Не удалось оформить заказ', 'alert'); }
  }
  tick() {
    const o = this.state.order;
    if (!o || o.status === 'ready') return clearInterval(this.qt);
    const n = Object.assign({}, o, { step: o.step + 1 });
    if (n.ahead.length) { n.ahead = n.ahead.slice(1); if (!n.ahead.length) n.status = 'preparing'; }
    else if (n.status === 'accepted') n.status = 'preparing';
    else { n.prep = o.prep + 1; if (n.prep >= 2) n.status = 'ready'; }
    this.setState({ order: n });
    if (n.status === 'ready') { clearInterval(this.qt); this.setState({ readyNote: true }); setTimeout(() => this.confetti(), 60); clearTimeout(this.nt); this.nt = setTimeout(() => this.setState({ readyNote: false }), 8000); }
  }
  confetti() {
    if (RM()) return;
    const o = document.querySelector('[data-confetti]'); const r = o ? o.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 3, width: 0, height: 0 };
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cols = ['#F4DCDA', '#DCE6D3', '#E5E0F2', '#D9C2A7', '#F6E3C9', '#E3A7A4', '#AFC79E', '#B8ACE0'];
    for (let i = 0; i < 54; i++) {
      const d = document.createElement('div'), s = 6 + Math.random() * 8;
      Object.assign(d.style, { position: 'fixed', left: cx + 'px', top: cy + 'px', width: s + 'px', height: (Math.random() < .5 ? s : s * .45) + 'px', borderRadius: Math.random() < .5 ? '50%' : '3px', background: cols[i % cols.length], zIndex: 10000, pointerEvents: 'none' });
      document.body.appendChild(d);
      const a = Math.random() * Math.PI * 2, v = 90 + Math.random() * 180, dx = Math.cos(a) * v, dy = Math.sin(a) * v - 70;
      d.animate([{ transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .55 }, { transform: `translate(${dx * 1.2}px,${dy + 190}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 1400 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => d.remove();
    }
  }
  shake(sel) { const el = document.querySelector(sel); if (el && !RM()) el.animate([{ transform: 'none' }, { transform: 'translateX(-9px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(4px)' }, { transform: 'none' }], { duration: 420, easing: 'ease-out' }); }
  err(k, v) {
    v = v || '';
    if (k === 'name' || k === 'fbName') return v.trim().length < 2 ? 'Как к тебе обращаться? Минимум 2 буквы' : '';
    if (k === 'login' || k === 'fbContact') { const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), phone = v.replace(/\D/g, '').length >= 10 && /^[+\d\s()-]+$/.test(v.trim()); return email || phone ? '' : 'Нужен телефон (+7…) или email'; }
    if (k === 'pw') return v.length < 6 ? 'Минимум 6 символов' : '';
    if (k === 'fbMsg') return v.trim().length < 10 ? 'Напиши чуть подробнее, от 10 символов' : '';
    return '';
  }
  field(k, label, type, ac) {
    const s = this.state, v = s.form[k] || '', e = this.err(k, v), f = s.focus === k, showErr = !!(s.touched[k] && e), up = f || v.length > 0;
    return {
      k, label, type: type || 'text', ac: ac || 'off', v, id: 'f-' + k, errId: 'e-' + k, err: e, showErr, ok: !e && v.length > 0 && k !== 'revText', inv: showErr ? 'true' : 'false',
      lt: up ? '8px' : '18px', lfs: up ? '11.5px' : '15px', lc: showErr ? 'var(--pink-ink)' : 'var(--muted)',
      bc: showErr ? 'var(--pink-ink)' : f ? 'var(--cap)' : 'var(--line)', glow: f ? '0 0 0 4px var(--glow)' : 'none',
      onChange: ev => { const val = ev.target.value; this.setState(st => ({ form: Object.assign({}, st.form, { [k]: val }) })); },
      onFocus: () => this.setState({ focus: k }),
      onBlur: () => this.setState(st => ({ focus: null, touched: Object.assign({}, st.touched, { [k]: true }) })),
    };
  }
  validate(keys) {
    const form = this.state.form, bad = keys.filter(k => this.err(k, form[k]));
    this.setState(st => { const t = Object.assign({}, st.touched); keys.forEach(k => t[k] = true); return { touched: t }; });
    bad.forEach(k => this.shake(`[data-field="${k}"]`));
    return bad.length === 0;
  }
  async submitAuth(e) {
    e.preventDefault();
    const reg = this.state.authTab === 'register', keys = reg ? ['name', 'login', 'pw'] : ['login', 'pw'];
    if (!this.validate(keys) || this.state.authBusy) return;
    this.setState({ authBusy: true });
    const f = this.state.form;
    try {
      const result = await api('/auth/' + (reg ? 'register' : 'login'), { method: 'POST', body: reg ? { name: f.name.trim(), login: f.login.trim(), password: f.pw, favoritePointId: this.state.favPoint } : { login: f.login.trim(), password: f.pw } });
      const fav = result.user.favoritePointId || this.state.pointId;
      this.setState({ authBusy: false, authToken: result.token, user: { name: result.user.name, contact: result.user.login, fav }, pointId: fav, touched: {} });
      this.toast(reg ? 'Аккаунт создан, добро пожаловать!' : 'С возвращением, ' + result.user.name, 'check');
    } catch (err) {
      this.setState({ authBusy: false });
      this.toast(err.message || 'Не удалось выполнить вход', 'alert');
    }
  }
  async submitFb(e) {
    e.preventDefault();
    if (!this.validate(['fbName', 'fbContact', 'fbMsg']) || this.state.fbBusy) return;
    this.setState({ fbBusy: true });
    try {
      await api('/feedback', { method: 'POST', body: { name: this.state.form.fbName, contact: this.state.form.fbContact, message: this.state.form.fbMsg } });
      this.setState({ fbBusy: false, fbSent: true });
    } catch (err) { this.setState({ fbBusy: false }); this.toast(err.message || 'Не удалось отправить сообщение', 'alert'); }
  }
  async submitReview() {
    const s = this.state;
    if (!s.myRating) { this.shake('[data-stars]'); return this.toast('Поставь оценку звёздами', 'star'); }
    try {
      const saved = await api('/reviews', { method: 'POST', headers: s.authToken ? { Authorization: 'Bearer ' + s.authToken } : {}, body: { name: s.user?.name, pointId: s.revFormPoint, rating: s.myRating, text: (s.form.revText || '').trim() || 'Без комментария, просто понравилось.', tags: s.revTags } });
      const r = { name: saved.name, point: saved.pointId, rating: saved.rating, text: saved.text, tags: saved.tags, date: 'только что' };
      this.setState({ reviews: [r].concat(s.reviews), revSent: true, revPoint: 'all' });
      setTimeout(() => this.setState(st => ({ revSent: false, myRating: 0, hoverRating: 0, revTags: [], form: Object.assign({}, st.form, { revText: '' }) })), 3800);
    } catch (err) { this.toast(err.message || 'Не удалось отправить отзыв', 'alert'); }
  }
  chip(label, active, on, extra) {
    return Object.assign({ label, on, pressed: active ? 'true' : 'false', bg: active ? 'var(--cta)' : 'var(--surface)', fg: active ? 'var(--cta-ink)' : 'var(--text)', bc: active ? 'var(--cta)' : 'var(--line)' }, extra || {});
  }
  stars(n, icon, base) { return [1, 2, 3, 4, 5].map(i => ({ icon, c: i <= Math.round(n) ? '#D9A75F' : 'var(--cap)', d: ((base || 0) + i * 70) + 'ms' })); }
  pv(p, i) {
    const S = STATUS[p.status], q = p.queue, closed = p.status === 'closed';
    const load = closed ? p.opensAt : q === 0 ? 'Очереди нет' : `Сейчас ${q} ${plural(q, 'заказ', 'заказа', 'заказов')}, ~${q * 2} мин`;
    const sel = p.id === this.state.pointId;
    return Object.assign({}, p, {
      st: S.label, stBg: S.bg, stFg: S.fg, isClosed: closed, load, short: closed ? 'закрыта' : p.status === 'closing' ? p.closesIn : (q === 0 ? 'без очереди' : `~${q * 2} мин ожидания`),
      dot: closed ? 'var(--pink-ink)' : q <= 2 ? '#8FAE7E' : q <= 4 ? '#D9A75F' : '#D98C8C', wait: q * 2 + 3,
      selected: sel, selBorder: sel ? 'var(--cap)' : 'transparent', delay: (i || 0) * 60 + 'ms', cta: closed ? 'Посмотреть меню' : 'Заказать здесь',
      route: 'https://yandex.ru/maps/?text=' + encodeURIComponent(p.addr.split(' · ')[0] + ', ' + p.org),
      onSelect: () => this.selectPoint(p.id), onOrder: () => this.selectPoint(p.id, true),
    });
  }
  itemView(m, i) {
    const why = this.blockedReason(m), na = !!(m.na && m.na.includes(this.state.pointId));
    return Object.assign({}, m, {
      priceT: rub(m.price), na, op: na ? '.55' : '1', delay: Math.min(i, 10) * 45 + 'ms', cantAdd: why ? 'true' : 'false',
      aria: m.name + ', ' + rub(m.price) + (na ? ', нет на этой точке' : ''), addLabel: 'Добавить ' + m.name + ' в корзину',
      addBg: why ? 'var(--beige)' : 'var(--cta)', addFg: why ? 'var(--muted)' : 'var(--cta-ink)',
      onOpen: () => this.openSheet({ type: 'item', itemId: m.id }, { cfg: { size: 'M', milk: 'reg', syrup: 'none', qty: 1 } }),
      onKey: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openSheet({ type: 'item', itemId: m.id }, { cfg: { size: 'M', milk: 'reg', syrup: 'none', qty: 1 } }); } },
      onAdd: e => this.quickAdd(e, m),
    });
  }

  renderVals() {
    const s = this.state, I = this.icons, ic = I.m, ics = I.s, icl = I.l;
    const isDesktop = s.w >= 1100, isMobile = !isDesktop, theme = this.themeName();
    const ss = this.forced(), L = s.loading || ss === 'loading', Er = !L && ss === 'error', Em = !L && !Er && ss === 'empty';
    const P = this.point(), pt = this.pv(P);
    const points = POINTS.map((p, i) => this.pv(p, i));
    const o = s.order, active = !!o, ready = active && o.status === 'ready';
    const cartCount = s.cart.reduce((a, l) => a + l.qty, 0);

    const navDef = [['home', 'Главная'], ['menu', 'Меню'], ['queue', 'Очередь'], ['reviews', 'Отзывы'], ['contacts', 'Связь']];
    const badge = active ? { badge: true, badgeText: ready ? 'готов' : '1', badgeBg: ready ? 'var(--sage)' : 'var(--pink)', badgeFg: ready ? 'var(--sage-ink)' : 'var(--pink-ink)' } : { badge: false };
    const deskNav = navDef.map(([id, label]) => Object.assign({ id, label, go: () => this.go(id), cur: s.route === id ? 'page' : undefined, color: s.route === id ? 'var(--text)' : 'var(--muted)' }, id === 'queue' ? badge : { badge: false }));
    const tabDef = [['home', 'Главная', 'home'], ['menu', 'Меню', 'coffee'], ['queue', 'Очередь', 'hourglass'], ['reviews', 'Отзывы', 'star'], ['profile', 'Профиль', 'user']];
    const tabIdx = tabDef.findIndex(t => t[0] === s.route);
    const tabs = tabDef.map(([id, label, icn]) => Object.assign({ label, icon: ic[icn], go: () => this.go(id), cur: s.route === id ? 'page' : undefined, color: s.route === id ? 'var(--text)' : 'var(--muted)', ty: s.route === id ? '-2px' : '0' }, id === 'queue' ? badge : { badge: false }));

    // menu
    const qn = s.q.trim().toLowerCase();
    const filtered = MENU.filter(m => (s.cat === 'all' || m.cat === s.cat) && (!qn || (m.name + ' ' + m.desc).toLowerCase().includes(qn)) && (s.fTemp === 'all' || m.temp === s.fTemp) && (s.fMilk === 'all' || (s.fMilk === 'with' ? m.milk : !m.milk && m.cat !== 'dessert')));
    const items = filtered.map((m, i) => this.itemView(m, i));
    const tog = (key, val) => () => this.setState(st => ({ [key]: st[key] === val ? 'all' : val }));
    const filters = [this.chip('Горячее', s.fTemp === 'hot', tog('fTemp', 'hot')), this.chip('Холодное', s.fTemp === 'cold', tog('fTemp', 'cold')), this.chip('С молоком', s.fMilk === 'with', tog('fMilk', 'with')), this.chip('Без молока', s.fMilk === 'without', tog('fMilk', 'without'))];
    const cats = CATS.map(([id, label]) => this.chip(label, s.cat === id, () => this.setState({ cat: id })));

    // item sheet
    let si = {};
    if (s.sheet && s.sheet.type === 'item') {
      const m = MENU.find(x => x.id === s.sheet.itemId), c = s.cfg, why = this.blockedReason(m);
      const setC = patch => () => this.setState(st => ({ cfg: Object.assign({}, st.cfg, patch) }));
      si = {
        name: m.name, desc: m.desc, tint: m.tint, kind: m.kind, img: m.img, priceT: rub(m.price), isDrink: m.cat !== 'dessert', milk: m.milk, qty: c.qty,
        totalT: rub(this.unitPrice(m, c) * c.qty), blocked: !!why, blockText: why, btnOp: why ? '.45' : '1',
        sizes: SIZES.map(z => this.chip(z.id, c.size === z.id, setC({ size: z.id }), { sub: z.ml + (z.add ? ' · +' + z.add : '') })),
        milks: MILKS.map(z => this.chip(z.label, c.milk === z.id, setC({ milk: z.id }), { sub: z.add ? ' +' + z.add : '' })),
        syrups: SYRUPS.map(z => this.chip(z.label, c.syrup === z.id, setC({ syrup: z.id }), { sub: z.add ? ' +' + z.add : '' })),
      };
    }

    const cartLines = s.cart.map((l, i) => ({
      name: l.name, desc: l.desc, tint: l.tint, kind: l.kind, img: l.img, qty: l.qty, sumT: rub(l.unit * l.qty), decLabel: 'Убрать одну: ' + l.name, incLabel: 'Добавить ещё: ' + l.name,
      inc: () => this.setState(st => ({ cart: st.cart.map((x, j) => j === i ? Object.assign({}, x, { qty: x.qty + 1 }) : x) })),
      dec: () => this.setState(st => ({ cart: st.cart.map((x, j) => j === i ? Object.assign({}, x, { qty: x.qty - 1 }) : x).filter(x => x.qty > 0) })),
    }));
    const slots = this.slots().map(x => this.chip(x.label, s.time === x.id, () => this.setState({ time: x.id })));
    const orderBusy = active && !ready;
    const checkoutBlockText = P.status === 'closed' ? 'Точка «' + P.name + '» закрыта. ' + P.opensAt + '. Или выбери открытую точку.' : orderBusy ? 'У тебя уже есть активный заказ ' + o.num + '. Дождись выдачи, чтобы оформить новый.' : '';

    // queue
    let q2 = { p: {} };
    if (o) {
      const total = o.initialAhead + 3, prog = ready ? 100 : Math.min(92, Math.max(4, (o.step / total) * 100));
      const [cx, cy] = trackPos(prog / 100), op = this.pv(this.point(o.pointId)), si2 = o.status === 'accepted' ? 0 : o.status === 'preparing' ? 1 : 2;
      const n = o.ahead.length;
      q2 = {
        num: o.num, p: op, ahead: n, aheadWord: plural(n, 'заказ', 'заказа', 'заказов'), isReady: ready, notReady: !ready,
        eta: ready ? 'Готов!' : o.status === 'preparing' ? '~2 мин' : '~' + (n * 2 + 2) + ' мин',
        statusLabel: ['Принят', 'Готовится', 'Готов к выдаче'][si2],
        pillBg: ['var(--lav)', 'var(--peach)', 'var(--surface)'][si2], pillFg: ['var(--lav-ink)', 'var(--peach-ink)', 'var(--sage-ink)'][si2],
        cardBg: ready ? 'var(--sage)' : 'var(--surface)', dash: String(100 - prog), cx: cx.toFixed(1), cy: cy.toFixed(1),
        finishBg: ready ? 'var(--sage-ink)' : 'var(--track)', finishFg: ready ? 'var(--sage)' : 'var(--muted)',
        trackLabel: 'Прогресс заказа: ' + Math.round(prog) + '%',
        steps: [['Принят', 'check'], ['Готовится', 'coffee'], ['Готов к выдаче', 'bag']].map(([label, icn], i) => ({ label, icon: ic[icn], cur: i === si2 ? 'step' : undefined, bg: i < si2 ? 'var(--sage)' : i === si2 ? 'var(--cta)' : 'var(--beige)', fg: i < si2 ? 'var(--sage-ink)' : i === si2 ? 'var(--cta-ink)' : 'var(--muted)', sc: i === si2 ? '1.08' : '1', fw: i === si2 ? '800' : '600' })),
        hasAhead: n > 0, noAhead: n === 0 && !ready,
        aheadList: o.ahead.map((num, i) => ({ num, first: i === 0, bg: i === 0 ? 'var(--peach)' : 'var(--bg)', fg: i === 0 ? 'var(--peach-ink)' : 'var(--text)' })),
        lines: o.items.map(l => ({ name: l.name, desc: l.desc, qty: l.qty, sumT: rub(l.unit * l.qty) })), totalT: rub(o.total), pickup: o.pickupTime,
        cancelDisabled: o.status !== 'accepted', cancelOp: o.status === 'accepted' ? '1' : '.45',
        cancelHint: o.status === 'accepted' ? 'Отменить можно, пока бариста не начал готовить' : 'Заказ уже готовится, отмена недоступна',
      };
    }

    // reviews
    const revAll = s.reviews, revF = s.revPoint === 'all' ? revAll : revAll.filter(r => r.point === s.revPoint);
    const avgN = revF.length ? revF.reduce((a, r) => a + r.rating, 0) / revF.length : 0;
    const avgAllN = revAll.reduce((a, r) => a + r.rating, 0) / revAll.length;
    const revView = (r, i) => ({
      name: r.name, text: r.text, date: r.date, ini: r.name[0], av: TINTS[i % 4], pointName: this.point(r.point).name, aria: 'Оценка ' + r.rating + ' из 5', i: Math.min(i, 6),
      stars: this.stars(r.rating, I.star14, 120), hasTags: r.tags.length > 0, tagList: r.tags.map(t => ({ label: t, bg: TAG_COL[t][0], fg: TAG_COL[t][1] })),
    });
    const shownRating = s.hoverRating || s.myRating;
    const rateWords = ['выбери звёзды', 'плохо', 'так себе', 'нормально', 'хорошо', 'отлично!'];

    // sheet
    const closing = s.sheetClosing;
    const fbFields = [this.field('fbName', 'Имя', 'text', 'name'), this.field('fbContact', 'Телефон или email', 'text', 'email')];
    const authFields = s.authTab === 'login' ? [this.field('login', 'Телефон или email', 'text', 'username'), this.field('pw', 'Пароль', 'password', 'current-password')] : [this.field('name', 'Имя', 'text', 'given-name'), this.field('login', 'Телефон или email', 'text', 'username'), this.field('pw', 'Пароль', 'password', 'new-password')];
    const link = fn => e => { e.preventDefault(); fn(); };
    const cartBar = cartCount > 0 && s.route === 'menu' && !s.sheet;

    return {
      theme, isDesktop, isMobile, wordmark: s.w >= 1240 ? 'inline' : 'none', ic, ics, icl, pt, points, skel4: [1, 2, 3, 4], skel8: [1, 2, 3, 4, 5, 6, 7, 8],
      bottomPad: isMobile ? (cartBar ? '170px' : '100px') : (cartBar ? '110px' : '24px'),
      themeIcon: theme === 'dark' ? ic.sun : ic.moon, themeLabel: theme === 'dark' ? 'Светлая тема' : 'Тёмная тема',
      toggleTheme: () => this.setState({ theme: theme === 'dark' ? 'light' : 'dark' }),
      swBg: theme === 'dark' ? 'var(--sage-ink)' : 'var(--cap)', swL: theme === 'dark' ? '21px' : '3px',
      deskNav, navL: s.navL + 'px', navW: s.navW + 'px', navO: s.navW ? '1' : '0', tabs, tabLeft: `calc(6px + (100% - 12px) * ${Math.max(0, tabIdx)} / 5)`, tabO: tabIdx >= 0 ? '1' : '0',
      cartCount, cartLabel: cartCount ? `Корзина: ${cartCount} шт., ${rub(this.total())}` : 'Корзина пуста',
      avatar: s.user ? s.user.name[0].toUpperCase() : ic.user,
      isHome: s.route === 'home', isMenu: s.route === 'menu', isQueue: s.route === 'queue', isReviews: s.route === 'reviews', isContacts: s.route === 'contacts',
      isAuth: s.route === 'profile' && !s.user, isProfile: s.route === 'profile' && !!s.user,
      goHome: () => this.go('home'), goMenu: () => this.go('menu'), goQueue: () => this.go('queue'), goReviews: () => this.go('reviews'), goContacts: () => this.go('contacts'), goProfile: () => this.go('profile'),
      goMenuLink: link(() => this.go('menu')), goQueueLink: link(() => this.go('queue')), goReviewsLink: link(() => this.go('reviews')), goContactsLink: link(() => this.go('contacts')),
      scrollHow: () => { const el = document.getElementById('how'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: RM() ? 'auto' : 'smooth' }); },
      retry: () => { this.setState({ ignoreForced: true }); this.startLoad(600); },
      how: [
        { n: '1', title: 'Выбери точку', text: 'Свой корпус или ближайшую кофейню, сразу видно, где сейчас свободнее.', icon: icl.pin, bg: 'var(--pink)', fg: 'var(--pink-ink)' },
        { n: '2', title: 'Закажи напиток', text: 'Размер, молоко, сироп и время, к которому нужно приготовить.', icon: icl.coffee, bg: 'var(--sage)', fg: 'var(--sage-ink)' },
        { n: '3', title: 'Забери без очереди', text: 'Следи за очередью онлайн. Пришёл на перемене, а кофе уже ждёт.', icon: icl.bag, bg: 'var(--lav)', fg: 'var(--lav-ink)' },
      ],
      homeSkel: L, homeErr: Er, homeEmpty: Em, homeList: !L && !Er && !Em,
      popular: MENU.filter(m => m.pop).map((m, i) => this.itemView(m, i)),
      slideNext: () => { const el = document.querySelector('[data-slider]'); el && el.scrollBy({ left: 236, behavior: 'smooth' }); },
      slidePrev: () => { const el = document.querySelector('[data-slider]'); el && el.scrollBy({ left: -236, behavior: 'smooth' }); },
      miniReviews: revAll.filter(r => r.rating === 5).slice(0, 3).map(revView), avgAll: avgAllN.toFixed(1).replace('.', ','),
      openPoints: () => this.openSheet({ type: 'point' }),
      openList: points.filter(p => p.status !== 'closed'),
      chipsTop: isDesktop ? '72px' : '64px',
      q: s.q, onSearch: e => this.setState({ q: e.target.value }), filters, cats, items,
      menuSkel: L, menuErr: Er, menuEmpty: Em || (!L && !Er && items.length === 0), menuGrid: !L && !Er && !Em && items.length > 0,
      emptyTitle: Em ? 'Меню этой точки пока пустое' : 'Ничего не нашлось', emptyText: Em ? 'Бариста обновляют витрину. Загляни чуть позже или выбери другую точку.' : 'Попробуй другое слово или сними фильтры.',
      resetFilters: () => this.setState({ q: '', cat: 'all', fTemp: 'all', fMilk: 'all', ignoreForced: true }),
      qSkel: L, qErr: Er, qEmpty: !L && !Er && (Em || !o), qActive: !L && !Er && !Em && !!o, q2, posRef: this.posRef,
      askCancel: () => { if (o && o.status === 'accepted') this.openSheet({ type: 'cancel' }); },
      doCancel: () => { clearInterval(this.qt); this.setState({ order: null, sheet: null, readyNote: false }); this.toast('Заказ отменён', 'x'); },
      newOrder: () => { this.setState({ order: null, readyNote: false }); this.go('menu'); },
      closeNote: () => this.setState({ readyNote: false }), readyNote: s.readyNote && !!o,
      revFilters: [this.chip('Все точки', s.revPoint === 'all', () => this.setState({ revPoint: 'all' }))].concat(POINTS.map(p => this.chip(p.name, s.revPoint === p.id, () => this.setState({ revPoint: p.id })))),
      revSkel: L, revErr: Er, revEmpty: !L && !Er && (Em || revF.length === 0), revList: !L && !Er && !Em && revF.length > 0,
      avg: avgN.toFixed(1).replace('.', ','), avgStars: this.stars(avgN, I.star24), revCountText: 'на основе ' + revF.length + ' ' + plural(revF.length, 'отзыва', 'отзывов', 'отзывов'),
      dist: [5, 4, 3, 2, 1].map((n, i) => { const c = revF.filter(r => r.rating === n).length; return { n, count: c, pct: (revF.length ? c / revF.length * 100 : 0) + '%', delay: i * 80 + 'ms' }; }),
      revCards: revF.map(revView), revSent: s.revSent, revFormOpen: !s.revSent,
      revFormPoints: POINTS.map(p => this.chip(p.name, s.revFormPoint === p.id, () => this.setState({ revFormPoint: p.id }))),
      formStars: [1, 2, 3, 4, 5].map(i => ({
        icon: I.star24, checked: s.myRating === i ? 'true' : 'false', aria: i + ' из 5', c: i <= shownRating ? '#D9A75F' : 'var(--cap)', bg: i <= shownRating ? 'var(--peach)' : 'var(--bg)',
        on: e => { this.setState({ myRating: i }); if (!RM()) e.currentTarget.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35) rotate(-12deg)' }, { transform: 'scale(1)' }], { duration: 420, easing: EASE }); },
        enter: () => this.setState({ hoverRating: i }),
      })),
      starLeave: () => this.setState({ hoverRating: 0 }), rateWord: rateWords[shownRating],
      tagChips: TAGS.map(t => this.chip(t, s.revTags.includes(t), () => this.setState(st => ({ revTags: st.revTags.includes(t) ? st.revTags.filter(x => x !== t) : st.revTags.concat([t]) })))),
      fRev: this.field('revText', ''), submitReview: () => this.submitReview(),
      conSkel: L, conErr: Er, conList: !L && !Er,
      fbFields, fMsg: this.field('fbMsg', 'Сообщение'), submitFb: e => this.submitFb(e), fbSent: s.fbSent, fbOpen: !s.fbSent, fbBusy: s.fbBusy, fbBtn: s.fbBusy ? 'Отправляем…' : 'Отправить',
      fbContactShown: s.form.fbContact || 'твой контакт',
      fbReset: () => this.setState(st => ({ fbSent: false, form: Object.assign({}, st.form, { fbMsg: '' }), touched: {} })),
      faq: FAQ.map(([q, a], i) => ({ q, a, id: 'faq-' + i, open: s.faqOpen === i ? 'true' : 'false', rows: s.faqOpen === i ? '1fr' : '0fr', rot: s.faqOpen === i ? '180deg' : '0deg', bg: s.faqOpen === i ? 'var(--bg)' : 'transparent', on: () => this.setState({ faqOpen: s.faqOpen === i ? -1 : i }) })),
      authTitle: s.authTab === 'login' ? 'С возвращением' : 'Давай знакомиться', authSub: s.authTab === 'login' ? 'Войди, чтобы видеть свои заказы' : 'Минута, и кофе без очереди',
      isLoginTab: s.authTab === 'login', isRegTab: s.authTab === 'register', tabPillL: s.authTab === 'login' ? '5px' : '50%',
      tabLogin: () => this.setState({ authTab: 'login', touched: {} }), tabReg: () => this.setState({ authTab: 'register', touched: {} }),
      authFields, favChips: POINTS.map(p => this.chip(p.name, s.favPoint === p.id, () => this.setState({ favPoint: p.id }))),
      submitAuth: e => this.submitAuth(e), authBusy: s.authBusy, authBtn: s.authBusy ? 'Секунду…' : s.authTab === 'login' ? 'Войти' : 'Создать аккаунт',
      tgLogin: () => { this.setState({ user: { name: 'Аня', contact: '@anya_tg', fav: s.pointId } }); this.toast('Вход через Telegram выполнен', 'send'); },
      userName: s.user ? s.user.name : '', userContact: s.user ? s.user.contact : '', favName: s.user ? this.point(s.user.fav).name : '',
      orderShort: o ? o.num + ' · ' + (ready ? 'готов' : o.status === 'preparing' ? 'готовится' : 'принят') : 'нет активного',
      logout: () => { this.setState({ user: null, form: {}, touched: {} }); this.toast('Ты вышел из аккаунта', 'logout'); },
      showCartBar: cartBar, cartBarL: isDesktop ? 'auto' : '12px', cartBarR: isDesktop ? '24px' : '12px', cartBarB: isDesktop ? '24px' : '92px', cartBarW: isDesktop ? '420px' : 'auto',
      cartPointText: pt.name + ' · самовывоз', dispT: rub(s.disp), openCart: () => this.openSheet({ type: 'cart' }),
      sheetOpen: !!s.sheet, isItemSheet: !!s.sheet && s.sheet.type === 'item', isPointSheet: !!s.sheet && s.sheet.type === 'point', isCartSheet: !!s.sheet && s.sheet.type === 'cart', isCancelSheet: !!s.sheet && s.sheet.type === 'cancel',
      sheetLabel: s.sheet ? { item: si.name || 'Напиток', point: 'Выбор точки', cart: 'Корзина', cancel: 'Отмена заказа' }[s.sheet.type] : '',
      si, closeSheet: () => this.closeSheet(), addFromSheet: () => this.addFromSheet(),
      qtyDec: () => this.setState(st => ({ cfg: Object.assign({}, st.cfg, { qty: Math.max(1, st.cfg.qty - 1) }) })),
      qtyInc: () => this.setState(st => ({ cfg: Object.assign({}, st.cfg, { qty: Math.min(9, st.cfg.qty + 1) }) })),
      sheetAlign: isDesktop ? 'center' : 'flex-end', sheetPad: isDesktop ? '24px' : '0', sheetMaxW: isDesktop ? '540px' : '100%', sheetRadius: isDesktop ? '32px' : '32px 32px 0 0', grabO: isDesktop ? '0' : '1',
      panelAnim: closing ? (isDesktop ? 'popOut .22s ease both' : 'sheetDown .24s ease-in both') : (isDesktop ? `popIn .4s ${EASE} both` : `sheetUp .45s ${EASE} both`),
      backAnim: closing ? 'fadeOut .24s ease both' : 'fadeIn .3s ease both',
      cartEmpty: !s.cart.length, cartHas: s.cart.length > 0, cartLines, slots,
      checkoutBlocked: !!checkoutBlockText, checkoutBlockText, checkoutOp: checkoutBlockText ? '.45' : '1', placeOrder: () => this.placeOrder(),
      toast: !!s.toast, toastText: s.toast ? s.toast.text : '', toastIcon: s.toast ? ics[s.toast.icon] || ics.check : null, toastTop: isDesktop ? '84px' : '70px',
    };
  }

  render() {
    const v = this.renderVals()
    return (
      <div data-theme={v.theme} style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Golos Text',system-ui,sans-serif", fontSize: '15px', lineHeight: 1.55, position: 'relative', transition: 'background-color .45s cubic-bezier(0.22,1,0.36,1),color .45s', paddingBottom: v.bottomPad }}>
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 300, opacity: 0.05, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}></div>
        {v.isDesktop ? <DesktopHeader v={v} /> : null}
        {v.isMobile ? <MobileHeader v={v} /> : null}
        <main style={{ position: 'relative', zIndex: 2, maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(16px,4vw,32px)' }}>
          {v.isHome ? <HomePage v={v} /> : null}
          {v.isMenu ? <MenuPage v={v} /> : null}
          {v.isQueue ? <QueuePage v={v} /> : null}
          {v.isReviews ? <ReviewsPage v={v} /> : null}
          {v.isContacts ? <ContactsPage v={v} /> : null}
          {v.isAuth ? <AuthPage v={v} /> : null}
          {v.isProfile ? <ProfilePage v={v} /> : null}
        </main>
        {v.showCartBar ? <CartBar v={v} /> : null}
        {v.isMobile ? <TabBar v={v} /> : null}
        {v.sheetOpen ? <Sheet v={v} /> : null}
        {v.toast ? <Toast v={v} /> : null}
        {v.readyNote ? <ReadyNote v={v} /> : null}
      </div>
    )
  }
}
