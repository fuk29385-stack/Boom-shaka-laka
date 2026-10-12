export default function ReviewsPage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', paddingTop: 'clamp(16px,3vw,32px)' }}>
      <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(34px,5vw,48px)', margin: '0 0 18px' }}>Отзывы</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: '2 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div role="group" aria-label="Фильтр по точкам" style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {v.revFilters.map((c, i) => (
              <button key={i} onClick={c.on} aria-pressed={c.pressed} style={{ height: '42px', padding: '0 16px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{c.label}</button>
            ))}
          </div>
          {v.revSkel ? (
            <>
              {v.skel4.map((s, i) => (
                <div key={i} style={{ height: '150px', borderRadius: '28px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--surface) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
              ))}
            </>
          ) : null}
          {v.revErr ? (
            <div role="alert" style={{ background: 'var(--surface)', borderRadius: '28px', padding: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--pink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ic.alert}</span>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontWeight: 800, fontSize: '17px' }}>Отзывы не загрузились</div>
                <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Попробуй обновить страницу.</div>
              </div>
              <button onClick={v.retry} style={{ height: '46px', padding: '0 20px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.refresh} Повторить</button>
            </div>
          ) : null}
          {v.revEmpty ? (
            <div style={{ background: 'var(--surface)', borderRadius: '28px', padding: '36px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--lav)', color: 'var(--lav-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icl.star}</span>
              <div style={{ fontWeight: 800, fontSize: '18px' }}>Здесь пока тихо</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>О этой точке ещё никто не написал, будь первым.</div>
            </div>
          ) : null}
          {v.revList ? (
            <>
              <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(20px,3vw,28px)', boxShadow: 'var(--sh1)', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '150px' }}>
                  <div style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '64px', lineHeight: 1 }}>{v.avg}</div>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {v.avgStars.map((s, i) => (
                      <span key={i} style={{ color: s.c, animation: `starPop .5s cubic-bezier(0.22,1,0.36,1) ${s.d} both` }}>{s.icon}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{v.revCountText}</div>
                </div>
                <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {v.dist.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700 }}>
                      <span style={{ width: '12px' }}>{d.n}</span>
                      <div style={{ flex: '1', height: '10px', borderRadius: '999px', background: 'var(--beige)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: d.pct, borderRadius: '999px', background: '#D9A75F', transformOrigin: 'left', animation: `growX .9s cubic-bezier(0.22,1,0.36,1) ${d.delay} both`, transition: 'width .6s cubic-bezier(0.22,1,0.36,1)' }}></div>
                      </div>
                      <span style={{ width: '22px', textAlign: 'right', color: 'var(--muted)' }}>{d.count}</span>
                    </div>
                  ))}
                </div>
              </section>
              {v.revCards.map((r, i) => (
                <article key={i} data-reveal={r.i} style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: r.av, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--text)', flex: 'none' }}>{r.ini}</span>
                    <div style={{ flex: '1', minWidth: 0, lineHeight: 1.25 }}>
                      <div style={{ fontWeight: 800 }}>{r.name}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{r.pointName} · {r.date}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }} aria-label={r.aria}>
                      {r.stars.map((s, i2) => (
                        <span key={i2} style={{ color: s.c, animation: `starPop .5s cubic-bezier(0.22,1,0.36,1) ${s.d} both` }}>{s.icon}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', textWrap: 'pretty' }}>{r.text}</div>
                  {r.hasTags ? (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {r.tagList.map((t, i2) => (
                        <span key={i2} style={{ padding: '3px 12px', borderRadius: '999px', background: t.bg, color: t.fg, fontSize: '12px', fontWeight: 700 }}>{t.label}</span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </>
          ) : null}
        </div>
        <aside style={{ flex: '1 1 320px', minWidth: 0, position: 'sticky', top: '96px', background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(20px,3vw,26px)', boxShadow: 'var(--sh2)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {v.revSent ? (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px', padding: '24px 0' }}>
              <span style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--sage)', color: 'var(--sage-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .55s cubic-bezier(0.22,1,0.36,1) both' }}>{v.icl.check}</span>
              <div style={{ fontWeight: 800, fontSize: '18px' }}>Спасибо за отзыв!</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Он уже в ленте, бариста точно прочитают.</div>
            </div>
          ) : null}
          {v.revFormOpen ? (
            <>
              <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Оставить отзыв</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Точка</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {v.revFormPoints.map((c, i) => (
                    <button key={i} onClick={c.on} aria-pressed={c.pressed} style={{ height: '38px', padding: '0 14px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all .3s' }}>{c.label}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span id="rate-l" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Оценка · {v.rateWord}</span>
                <div data-stars="1" role="radiogroup" aria-labelledby="rate-l" onMouseLeave={v.starLeave} style={{ display: 'flex', gap: '6px' }}>
                  {v.formStars.map((s, i) => (
                    <button className="hover-star press-deep" key={i} role="radio" aria-checked={s.checked} aria-label={s.aria} onClick={s.on} onMouseEnter={s.enter} style={{ width: '48px', height: '48px', borderRadius: '50%', border: 0, background: s.bg, color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform .25s cubic-bezier(0.22,1,0.36,1),background .25s,color .25s' }}>{s.icon}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)' }}>Что понравилось</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {v.tagChips.map((c, i) => (
                    <button key={i} onClick={c.on} aria-pressed={c.pressed} style={{ height: '38px', padding: '0 14px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center', transition: 'all .3s cubic-bezier(0.22,1,0.36,1)' }}>{c.label}</button>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <label htmlFor="f-revText" style={{ position: 'absolute', left: '18px', top: v.fRev.lt, fontSize: v.fRev.lfs, color: v.fRev.lc, pointerEvents: 'none', transition: 'all .25s cubic-bezier(0.22,1,0.36,1)', fontWeight: 600 }}>Пара слов (необязательно)</label>
                <textarea id="f-revText" value={v.fRev.v} onChange={v.fRev.onChange} onFocus={v.fRev.onFocus} onBlur={v.fRev.onBlur} rows="4" style={{ width: '100%', resize: 'vertical', minHeight: '110px', borderRadius: '22px', border: `1.5px solid ${v.fRev.bc}`, boxShadow: v.fRev.glow, background: 'var(--bg)', padding: '28px 18px 12px', fontSize: '15px', transition: 'border-color .25s,box-shadow .25s' }}></textarea>
              </div>
              <button className="hover-cta-lift" onClick={v.submitReview} style={{ height: '52px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1),background .3s' }}>Опубликовать</button>
            </>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
