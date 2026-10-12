import CupArt from '../components/CupArt.jsx'

export default function MenuPage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', paddingTop: 'clamp(16px,3vw,32px)' }}>
      <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(18px,3vw,26px)', boxShadow: 'var(--sh1)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ minWidth: 0, flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', borderRadius: '999px', background: v.pt.stBg, color: v.pt.stFg, fontSize: '12px', fontWeight: 800, transition: 'background .4s,color .4s' }}>{v.pt.st}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600 }}>{v.pt.load}</span>
          </div>
          <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', lineHeight: 1.1, margin: 0 }}>{v.pt.name}</h1>
          <div style={{ color: 'var(--muted)', fontSize: '14px', display: 'flex', gap: '6px', alignItems: 'center' }}>
            {v.ics.pin}
            <span style={{ minWidth: 0 }}>{v.pt.org} · {v.pt.addr} · {v.pt.hours}</span>
          </div>
        </div>
        <button className="hover-beige" onClick={v.openPoints} style={{ height: '46px', padding: '0 20px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.pin} Сменить точку</button>
      </section>
      {v.pt.isClosed ? (
        <section role="status" style={{ marginTop: '14px', background: 'var(--pink)', color: 'var(--pink-ink)', borderRadius: '28px', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px', animation: 'popIn .45s cubic-bezier(0.22,1,0.36,1) both' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ flex: 'none' }}>{v.ic.moon}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px' }}>Точка сейчас закрыта</div>
              <div style={{ fontSize: '14px' }}>{v.pt.opensAt}. Заказать можно на открытых точках:</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {v.openList.map((op, i) => (
              <button key={i} onClick={op.onSelect} style={{ height: '40px', padding: '0 16px', borderRadius: '999px', border: 0, background: 'var(--surface)', color: 'var(--text)', fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{op.name} · ~{op.wait} мин</button>
            ))}
          </div>
        </section>
      ) : null}
      <section style={{ position: 'sticky', top: v.chipsTop, zIndex: 20, background: 'var(--bg)', padding: '16px 0 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <label style={{ flex: '1 1 260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '18px', color: 'var(--muted)', pointerEvents: 'none' }}>{v.ic.search}</span>
            <input className="focus-glow" type="search" value={v.q} onChange={v.onSearch} placeholder="Латте, мокко, колд брю…" aria-label="Поиск по меню" style={{ width: '100%', height: '50px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--surface)', padding: '0 18px 0 50px', fontSize: '15px', transition: 'box-shadow .3s,border-color .3s' }} />
          </label>
          <div role="group" aria-label="Фильтры" style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {v.filters.map((c, i) => (
              <button key={i} onClick={c.on} aria-pressed={c.pressed} style={{ height: '50px', padding: '0 16px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{c.label}</button>
            ))}
          </div>
        </div>
        <div role="tablist" aria-label="Категории" style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
          {v.cats.map((c, i) => (
            <button className="hover-nudge" key={i} role="tab" aria-selected={c.pressed} onClick={c.on} style={{ height: '42px', padding: '0 18px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{c.label}</button>
          ))}
        </div>
      </section>
      {v.menuSkel ? (
        <div aria-busy="true" aria-label="Загружаем меню" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap: '14px', paddingTop: '6px' }}>
          {v.skel8.map((s, i) => (
            <div key={i} style={{ borderRadius: '26px', background: 'var(--surface)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ height: '118px', borderRadius: '20px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--bg) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
              <div style={{ height: '14px', width: '70%', borderRadius: '8px', background: 'var(--beige)' }}></div>
              <div style={{ height: '12px', width: '90%', borderRadius: '8px', background: 'var(--beige)' }}></div>
              <div style={{ height: '36px', width: '100%', borderRadius: '999px', background: 'var(--beige)' }}></div>
            </div>
          ))}
        </div>
      ) : null}
      {v.menuErr ? (
        <div role="alert" style={{ marginTop: '8px', background: 'var(--surface)', borderRadius: '28px', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
          <span style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--pink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icl.alert}</span>
          <div style={{ fontWeight: 800, fontSize: '18px' }}>Меню не загрузилось</div>
          <div style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '320px' }}>Похоже, связь с точкой пропала. Попробуй ещё раз через пару секунд.</div>
          <button onClick={v.retry} style={{ height: '46px', padding: '0 22px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.refresh} Повторить</button>
        </div>
      ) : null}
      {v.menuEmpty ? (
        <div style={{ marginTop: '8px', background: 'var(--surface)', borderRadius: '28px', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--lav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CupArt tint="#FFF8EF" kind="hot" />
          </div>
          <div style={{ fontWeight: 800, fontSize: '18px' }}>{v.emptyTitle}</div>
          <div style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '320px' }}>{v.emptyText}</div>
          <button onClick={v.resetFilters} style={{ height: '46px', padding: '0 22px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', fontWeight: 700, cursor: 'pointer' }}>Сбросить фильтры</button>
        </div>
      ) : null}
      {v.menuGrid ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,160px),1fr))', gap: '14px', paddingTop: '6px' }}>
          {v.items.map((it, i) => (
            <div className="hover-card" key={i} data-card="1" role="button" tabIndex="0" onClick={it.onOpen} onKeyDown={it.onKey} aria-label={it.aria} style={{ position: 'relative', background: 'var(--surface)', borderRadius: '26px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: 'var(--sh1)', cursor: 'pointer', opacity: it.op, animation: `cardIn .5s cubic-bezier(0.22,1,0.36,1) ${it.delay} both`, transition: 'transform .35s cubic-bezier(0.22,1,0.36,1),box-shadow .35s' }}>
              <div data-art="1" style={{ position: 'relative', overflow: 'hidden', height: '118px', borderRadius: '20px', background: '#141312', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={it.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.22,1,0.36,1),filter .6s' }} />
                {it.na ? (
                  <span style={{ position: 'absolute', left: '8px', top: '8px', padding: '3px 10px', borderRadius: '999px', background: 'var(--surface)', color: 'var(--muted)', fontSize: '11px', fontWeight: 800 }}>нет на этой точке</span>
                ) : null}
              </div>
              <div style={{ padding: '0 4px', display: 'flex', flexDirection: 'column', gap: '2px', flex: '1' }}>
                <div style={{ fontWeight: 800, fontSize: '15.5px', lineHeight: 1.25 }}>{it.name}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.desc}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px 0 4px' }}>
                <span style={{ fontWeight: 800, fontSize: '15.5px' }}>{it.priceT}</span>
                <button className="hover-plus press-deep" onClick={it.onAdd} aria-label={it.addLabel} aria-disabled={it.cantAdd} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 0, background: it.addBg, color: it.addFg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform .45s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.plus}</button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
