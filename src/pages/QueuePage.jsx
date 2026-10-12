import CupArt from '../components/CupArt.jsx'

export default function QueuePage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', paddingTop: 'clamp(16px,3vw,32px)' }}>
      {v.qSkel ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '16px' }}>
          <div style={{ height: '440px', borderRadius: '32px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--surface) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
          <div style={{ height: '440px', borderRadius: '32px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--surface) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
        </div>
      ) : null}
      {v.qErr ? (
        <div role="alert" style={{ background: 'var(--surface)', borderRadius: '28px', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
          <span style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--pink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icl.alert}</span>
          <div style={{ fontWeight: 800, fontSize: '18px' }}>Статус заказа не обновился</div>
          <div style={{ color: 'var(--muted)', fontSize: '14px', maxWidth: '320px' }}>Твой заказ в силе, мы просто не смогли получить данные очереди.</div>
          <button onClick={v.retry} style={{ height: '46px', padding: '0 22px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.refresh} Обновить</button>
        </div>
      ) : null}
      {v.qEmpty ? (
        <div style={{ background: 'var(--surface)', borderRadius: '32px', padding: 'clamp(28px,6vw,56px) 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(1.2)' }}>
              <CupArt tint="#FFF8EF" kind="hot" />
            </div>
          </div>
          <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(26px,4vw,34px)', margin: '6px 0 0' }}>Пока нет активного заказа</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '380px', margin: 0 }}>Закажи напиток, и здесь появится живая очередь: номер, позиция и время, когда забирать.</p>
          <button className="hover-cta-lift" onClick={v.goMenu} style={{ height: '52px', padding: '0 26px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: 'var(--sh2)' }}>Открыть меню {v.ic.arrow}</button>
        </div>
      ) : null}
      {v.qActive ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '16px', alignItems: 'start' }}>
          <section aria-live="polite" style={{ background: v.q2.cardBg, borderRadius: '32px', padding: 'clamp(20px,3vw,30px)', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: 'var(--sh1)', transition: 'background .6s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Номер заказа</span>
              <span data-confetti="1" style={{ padding: '5px 14px', borderRadius: '999px', background: v.q2.pillBg, color: v.q2.pillFg, fontSize: '12.5px', fontWeight: 800, transition: 'background .4s' }}>{v.q2.statusLabel}</span>
            </div>
            <div style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(60px,10vw,88px)', lineHeight: 0.95, letterSpacing: '-.01em' }}>{v.q2.num}</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 140px', background: 'var(--bg)', borderRadius: '22px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>Перед тобой</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', overflow: 'hidden' }}>
                  <span ref={v.posRef} style={{ display: 'inline-block', fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '44px', lineHeight: 1.1 }}>{v.q2.ahead}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{v.q2.aheadWord}</span>
                </div>
              </div>
              <div style={{ flex: '1 1 140px', background: 'var(--bg)', borderRadius: '22px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: 600 }}>Забирать</div>
                <div style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '28px', lineHeight: 1.25, marginTop: '6px' }}>{v.q2.eta}</div>
              </div>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: '24px', padding: '10px 8px 4px' }}>
              <svg viewBox="0 0 600 130" role="img" aria-label={v.q2.trackLabel} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
                <path d="M30 92 C150 12 250 132 320 72 C390 12 480 22 568 82" fill="none" stroke="var(--track)" strokeWidth="12" strokeLinecap="round" strokeDasharray="2 22" />
                <path d="M30 92 C150 12 250 132 320 72 C390 12 480 22 568 82" fill="none" stroke="var(--cap)" strokeWidth="12" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={v.q2.dash} style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)' }} />
                <circle cx="30" cy="92" r="9" fill="var(--cap)" />
                <circle cx="568" cy="82" r="22" fill={v.q2.finishBg} style={{ transition: 'fill .5s' }} />
                <path d="M558 82 l7 7 l13 -14" fill="none" stroke={v.q2.finishFg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <g style={{ transform: `translate(${v.q2.cx}px,${v.q2.cy}px)`, transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)' }}>
                  <circle r="26" fill="var(--surface)" stroke="var(--cap)" strokeWidth="3" />
                  <g style={{ animation: 'wiggle 1.6s ease-in-out infinite', transformOrigin: '0 0' }}>
                    <g transform="translate(-13 -13) scale(1.08)" fill="none" stroke="var(--text)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v2" />
                      <path d="M14 2v2" />
                      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                      <path d="M6 2v2" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <ol aria-label="Статус заказа" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
              {v.q2.steps.map((s, i) => (
                <li key={i} aria-current={s.cur} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                  <span style={{ width: '46px', height: '46px', borderRadius: '50%', background: s.bg, color: s.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .5s,color .5s,transform .5s cubic-bezier(0.22,1,0.36,1)', transform: `scale(${s.sc})` }}>{s.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: s.fw }}>{s.label}</span>
                </li>
              ))}
            </ol>
            {v.q2.isReady ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'popIn .5s cubic-bezier(0.22,1,0.36,1) both' }}>
                <div style={{ fontWeight: 800, fontSize: '17px' }}>Подходи к стойке и назови номер {v.q2.num}</div>
                <button onClick={v.newOrder} style={{ height: '50px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>Забрал(а), новый заказ</button>
              </div>
            ) : null}
          </section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--muted)' }}>Точка получения</div>
              <div style={{ fontWeight: 800, fontSize: '19px' }}>{v.q2.p.name}</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <span style={{ marginTop: '2px' }}>{v.ics.pin}</span>
                <span style={{ minWidth: 0 }}>{v.q2.p.org} · {v.q2.p.addr}</span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                {v.ics.clock}
                <span style={{ minWidth: 0 }}>{v.q2.p.hours} · получение: {v.q2.pickup}</span>
              </div>
              <a href={v.q2.p.route} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center', height: '42px', padding: '0 18px', borderRadius: '999px', background: 'var(--bg)', border: '1px solid var(--line)', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>{v.ics.nav} Построить маршрут</a>
            </section>
            <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '16px' }}>Перед тобой в очереди</span>
                <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>номера анонимны</span>
              </div>
              {v.q2.hasAhead ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {v.q2.aheadList.map((a, i) => (
                    <span key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '8px 14px', borderRadius: '999px', background: a.bg, color: a.fg, fontWeight: 700, fontSize: '14px', animation: 'popIn .4s cubic-bezier(0.22,1,0.36,1) both' }}>
                      {a.num}
                      {a.first ? (
                        <span style={{ fontSize: '11.5px', fontWeight: 600 }}>· готовится</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              ) : null}
              {v.q2.noAhead ? (
                <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Никого, твой заказ следующий у бариста.</div>
              ) : null}
            </section>
            <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 800, fontSize: '16px' }}>Состав</div>
              {v.q2.lines.map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '14px' }}>
                  <span>
                    {l.qty} × {l.name}{' '}
                    <span style={{ color: 'var(--muted)' }}>{l.desc}</span>
                  </span>
                  <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{l.sumT}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '15px', paddingTop: '8px', borderTop: '1px dashed var(--line)' }}>
                <span>Итого · самовывоз</span>
                <span>{v.q2.totalT}</span>
              </div>
              {v.q2.notReady ? (
                <>
                  <button onClick={v.askCancel} disabled={v.q2.cancelDisabled} style={{ marginTop: '6px', height: '46px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--pink-ink)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', opacity: v.q2.cancelOp }}>Отменить заказ</button>
                  <div style={{ fontSize: '12.5px', color: 'var(--muted)', textAlign: 'center' }}>{v.q2.cancelHint}</div>
                </>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}
    </div>
  )
}
