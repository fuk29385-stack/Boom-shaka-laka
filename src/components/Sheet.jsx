import CupArt from './CupArt.jsx'

export default function Sheet({ v }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: v.sheetAlign, justifyContent: 'center', padding: v.sheetPad }}>
      <div onClick={v.closeSheet} style={{ position: 'absolute', inset: 0, background: 'rgba(58,44,34,.38)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', animation: v.backAnim }}></div>
      <div role="dialog" aria-modal="true" aria-label={v.sheetLabel} style={{ position: 'relative', width: '100%', maxWidth: v.sheetMaxW, maxHeight: '88vh', overflowY: 'auto', background: 'var(--surface)', borderRadius: v.sheetRadius, boxShadow: 'var(--sh3)', padding: '12px clamp(18px,4vw,28px) 26px', animation: v.panelAnim }}>
        <div style={{ position: 'sticky', top: '-12px', zIndex: 2, margin: '-12px -4px 6px', padding: '12px 0 6px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span aria-hidden="true" style={{ width: '44px', height: '5px', borderRadius: '999px', background: 'var(--cap)', opacity: v.grabO }}></span>
          <button onClick={v.closeSheet} aria-label="Закрыть" style={{ position: 'absolute', right: 0, top: '8px', width: '40px', height: '40px', borderRadius: '50%', border: 0, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{v.ic.x}</button>
        </div>
        {v.isItemSheet ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingRight: '30px' }}>
              <div data-sheet-art="1" style={{ position: 'relative', overflow: 'hidden', width: '124px', height: '124px', borderRadius: '26px', background: '#141312', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <img src={v.si.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.22,1,0.36,1),filter .6s' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '28px', lineHeight: 1.1, margin: '0 0 6px' }}>{v.si.name}</h2>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>{v.si.desc}</div>
                <div style={{ fontWeight: 800, marginTop: '6px' }}>от {v.si.priceT}</div>
              </div>
            </div>
            {v.si.isDrink ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Размер</span>
                <div role="radiogroup" aria-label="Размер" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                  {v.si.sizes.map((o, i) => (
                    <button key={i} role="radio" aria-checked={o.pressed} onClick={o.on} style={{ height: '68px', borderRadius: '22px', border: `1.5px solid ${o.bc}`, background: o.bg, color: o.fg, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.2, transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>
                      <span style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '22px' }}>{o.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{o.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {v.si.milk ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Молоко</span>
                <div role="radiogroup" aria-label="Молоко" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {v.si.milks.map((o, i) => (
                    <button key={i} role="radio" aria-checked={o.pressed} onClick={o.on} style={{ height: '42px', padding: '0 16px', borderRadius: '999px', border: `1px solid ${o.bc}`, background: o.bg, color: o.fg, fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{o.label}{o.sub}</button>
                  ))}
                </div>
              </div>
            ) : null}
            {v.si.isDrink ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Сироп</span>
                <div role="radiogroup" aria-label="Сироп" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {v.si.syrups.map((o, i) => (
                    <button key={i} role="radio" aria-checked={o.pressed} onClick={o.on} style={{ height: '42px', padding: '0 16px', borderRadius: '999px', border: `1px solid ${o.bc}`, background: o.bg, color: o.fg, fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{o.label}{o.sub}</button>
                  ))}
                </div>
              </div>
            ) : null}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg)', borderRadius: '999px', padding: '4px' }}>
                <button onClick={v.qtyDec} aria-label="Меньше" style={{ width: '44px', height: '44px', borderRadius: '50%', border: 0, background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ic.minus}</button>
                <span aria-live="polite" style={{ minWidth: '34px', textAlign: 'center', fontWeight: 800, fontSize: '17px' }}>{v.si.qty}</span>
                <button onClick={v.qtyInc} aria-label="Больше" style={{ width: '44px', height: '44px', borderRadius: '50%', border: 0, background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ic.plus}</button>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>Итого</div>
                <div style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px' }}>{v.si.totalT}</div>
              </div>
            </div>
            {v.si.blocked ? (
              <div style={{ padding: '12px 16px', borderRadius: '20px', background: 'var(--pink)', color: 'var(--pink-ink)', fontWeight: 700, fontSize: '14px' }}>{v.si.blockText}</div>
            ) : null}
            <button className="hover-cta press" onClick={v.addFromSheet} disabled={v.si.blocked} style={{ height: '56px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 800, fontSize: '16px', cursor: 'pointer', opacity: v.si.btnOp, transition: 'background .3s,transform .3s cubic-bezier(0.22,1,0.36,1)' }}>Добавить · {v.si.totalT}</button>
          </div>
        ) : null}
        {v.isPointSheet ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Выбери точку</h2>
            {v.points.map((p, i) => (
              <button key={i} onClick={p.onSelect} aria-pressed={p.selected} style={{ display: 'flex', gap: '14px', alignItems: 'center', textAlign: 'left', padding: '16px', borderRadius: '24px', border: `2px solid ${p.selBorder}`, background: 'var(--bg)', cursor: 'pointer' }}>
                <span style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '16px' }}>{p.name}</span>
                    <span style={{ padding: '2px 10px', borderRadius: '999px', background: p.stBg, color: p.stFg, fontSize: '11.5px', fontWeight: 800 }}>{p.st}</span>
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{p.org} · {p.addr}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.load} · {p.hours}</span>
                </span>
                {p.selected ? (
                  <span style={{ color: 'var(--sage-ink)', animation: 'pop .35s both' }}>{v.ic.check}</span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
        {v.isCartSheet ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Твой заказ</h2>
            {v.cartEmpty ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px', padding: '16px 0 8px' }}>
                <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'var(--lav)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CupArt tint="#FFF8EF" kind="cold" />
                </div>
                <div style={{ fontWeight: 800, fontSize: '17px' }}>Корзина пока пустая</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Загляни в меню, там тёплое и вкусное.</div>
                <button onClick={v.goMenu} style={{ height: '46px', padding: '0 22px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer' }}>В меню</button>
              </div>
            ) : null}
            {v.cartHas ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {v.cartLines.map((l, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', borderRadius: '22px', background: 'var(--bg)', animation: 'cardIn .35s cubic-bezier(0.22,1,0.36,1) both' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#141312', position: 'relative', overflow: 'hidden', flex: 'none' }}>
                        <img src={l.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.22,1,0.36,1),filter .6s' }} />
                      </div>
                      <div style={{ flex: '1', minWidth: 0, lineHeight: 1.3 }}>
                        <div style={{ fontWeight: 800, fontSize: '14.5px' }}>{l.name}</div>
                        <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{l.desc}</div>
                        <div style={{ fontWeight: 800, fontSize: '14px', marginTop: '2px' }}>{l.sumT}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'var(--surface)', borderRadius: '999px', padding: '3px' }}>
                        <button onClick={l.dec} aria-label={l.decLabel} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ics.minus}</button>
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 800 }}>{l.qty}</span>
                        <button onClick={l.inc} aria-label={l.incLabel} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ics.plus}</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Способ получения</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', padding: '5px', background: 'var(--bg)', borderRadius: '999px' }}>
                    <button aria-pressed="true" style={{ height: '46px', borderRadius: '999px', border: 0, background: 'var(--surface)', boxShadow: 'var(--sh1)', fontWeight: 800, fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>{v.ics.bag} Самовывоз</button>
                    <button disabled={true} aria-disabled="true" title="Доставка появится позже" style={{ height: '46px', borderRadius: '999px', border: 0, background: 'transparent', fontWeight: 700, fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', cursor: 'not-allowed' }}>
                      {v.ics.truck} Доставка{' '}
                      <span style={{ padding: '2px 8px', borderRadius: '999px', background: 'var(--lav)', color: 'var(--lav-ink)', fontSize: '11px', fontWeight: 800 }}>скоро</span>
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Когда забрать · {v.pt.name}</span>
                  <div role="radiogroup" aria-label="Время получения" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {v.slots.map((o, i) => (
                      <button key={i} role="radio" aria-checked={o.pressed} onClick={o.on} style={{ height: '44px', padding: '0 16px', borderRadius: '999px', border: `1px solid ${o.bc}`, background: o.bg, color: o.fg, fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{o.label}</button>
                    ))}
                  </div>
                </div>
                {v.checkoutBlocked ? (
                  <div style={{ padding: '12px 16px', borderRadius: '20px', background: 'var(--pink)', color: 'var(--pink-ink)', fontWeight: 700, fontSize: '14px' }}>{v.checkoutBlockText}</div>
                ) : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '6px', borderTop: '1px dashed var(--line)' }}>
                  <span style={{ fontWeight: 700 }}>Итого · оплата на точке</span>
                  <span style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '28px', fontVariantNumeric: 'tabular-nums' }}>{v.dispT}</span>
                </div>
                <button className="hover-cta press" onClick={v.placeOrder} disabled={v.checkoutBlocked} style={{ height: '58px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 800, fontSize: '16px', cursor: 'pointer', opacity: v.checkoutOp, transition: 'background .3s,transform .3s cubic-bezier(0.22,1,0.36,1)' }}>Оформить заказ</button>
              </>
            ) : null}
          </div>
        ) : null}
        {v.isCancelSheet ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Отменить заказ {v.q2.num}?</h2>
            <p style={{ margin: 0, color: 'var(--muted)' }}>Бариста ещё не начал готовить, отмена бесплатная. Место в очереди освободится.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={v.closeSheet} style={{ height: '52px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', fontWeight: 700, cursor: 'pointer' }}>Оставить</button>
              <button onClick={v.doCancel} style={{ height: '52px', borderRadius: '999px', border: 0, background: 'var(--pink)', color: 'var(--pink-ink)', fontWeight: 800, cursor: 'pointer' }}>Да, отменить</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
