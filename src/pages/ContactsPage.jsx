export default function ContactsPage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', paddingTop: 'clamp(16px,3vw,32px)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px,5vw,48px)' }}>
      <section>
        <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(34px,5vw,48px)', margin: '0 0 6px' }}>Связь</h1>
        <p style={{ color: 'var(--muted)', margin: '0 0 20px', maxWidth: '520px' }}>Все точки, часы работы и как до нас добраться. Есть вопрос или идея, напиши, ответим в течение дня.</p>
        {v.conSkel ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap: '16px' }}>
            {v.skel4.map((s, i) => (
              <div key={i} style={{ height: '220px', borderRadius: '28px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--surface) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
            ))}
          </div>
        ) : null}
        {v.conErr ? (
          <div role="alert" style={{ background: 'var(--surface)', borderRadius: '28px', padding: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--pink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ic.alert}</span>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontWeight: 800, fontSize: '17px' }}>Не удалось загрузить адреса</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Напиши нам в Telegram, подскажем ближайшую точку.</div>
            </div>
            <button onClick={v.retry} style={{ height: '46px', padding: '0 20px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.refresh} Повторить</button>
          </div>
        ) : null}
        {v.conList ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap: '16px' }}>
            {v.points.map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'var(--sh1)' }}>
                <span style={{ alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '999px', background: p.stBg, color: p.stFg, fontSize: '12px', fontWeight: 800 }}>{p.st}</span>
                <div style={{ fontWeight: 800, fontSize: '18px' }}>{p.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{ marginTop: '2px' }}>{v.ics.pin}</span>
                  <span style={{ minWidth: 0 }}>{p.org} · {p.addr}</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {v.ics.clock}
                  <span style={{ minWidth: 0 }}>{p.hours}</span>
                </div>
                <a className="hover-cta" href={p.route} target="_blank" rel="noopener" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', height: '44px', borderRadius: '999px', background: 'var(--cta)', color: 'var(--cta-ink)', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>{v.ics.nav} Построить маршрут</a>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        <section style={{ flex: '1 1 340px', minWidth: 0, background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(20px,3vw,28px)', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Написать нам</h2>
          {v.fbSent ? (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px', padding: '24px 0' }}>
              <span style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--sage)', color: 'var(--sage-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .55s cubic-bezier(0.22,1,0.36,1) both' }}>{v.icl.check}</span>
              <div style={{ fontWeight: 800, fontSize: '18px' }}>Сообщение отправлено</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Ответим на {v.fbContactShown} в течение дня.</div>
              <button onClick={v.fbReset} style={{ height: '42px', padding: '0 18px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', fontWeight: 700, cursor: 'pointer' }}>Написать ещё</button>
            </div>
          ) : null}
          {v.fbOpen ? (
            <form onSubmit={v.submitFb} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {v.fbFields.map((f, i) => (
                <div key={i} data-field={f.k} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ position: 'relative' }}>
                    <label htmlFor={f.id} style={{ position: 'absolute', left: '20px', top: f.lt, fontSize: f.lfs, color: f.lc, pointerEvents: 'none', transition: 'all .25s cubic-bezier(0.22,1,0.36,1)', fontWeight: 600 }}>{f.label}</label>
                    <input id={f.id} type={f.type} autoComplete={f.ac} value={f.v} onChange={f.onChange} onFocus={f.onFocus} onBlur={f.onBlur} aria-invalid={f.inv} aria-describedby={f.errId} style={{ width: '100%', height: '58px', borderRadius: '20px', border: `1.5px solid ${f.bc}`, boxShadow: f.glow, background: 'var(--bg)', padding: '22px 48px 6px 20px', fontSize: '15px', transition: 'border-color .25s,box-shadow .25s' }} />
                    {f.ok ? (
                      <span style={{ position: 'absolute', right: '16px', top: '19px', color: 'var(--sage-ink)', animation: 'pop .4s cubic-bezier(0.22,1,0.36,1) both' }}>{v.ic.check}</span>
                    ) : null}
                  </div>
                  {f.showErr ? (
                    <span id={f.errId} style={{ fontSize: '12.5px', color: 'var(--pink-ink)', fontWeight: 600, paddingLeft: '20px', animation: 'fadeIn .25s both' }}>{f.err}</span>
                  ) : null}
                </div>
              ))}
              <div data-field="fbMsg" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ position: 'relative' }}>
                  <label htmlFor="f-fbMsg" style={{ position: 'absolute', left: '20px', top: v.fMsg.lt, fontSize: v.fMsg.lfs, color: v.fMsg.lc, pointerEvents: 'none', transition: 'all .25s cubic-bezier(0.22,1,0.36,1)', fontWeight: 600 }}>Сообщение</label>
                  <textarea id="f-fbMsg" value={v.fMsg.v} onChange={v.fMsg.onChange} onFocus={v.fMsg.onFocus} onBlur={v.fMsg.onBlur} aria-invalid={v.fMsg.inv} rows="4" style={{ width: '100%', resize: 'vertical', minHeight: '120px', borderRadius: '22px', border: `1.5px solid ${v.fMsg.bc}`, boxShadow: v.fMsg.glow, background: 'var(--bg)', padding: '28px 20px 12px', fontSize: '15px', transition: 'border-color .25s,box-shadow .25s' }}></textarea>
                </div>
                {v.fMsg.showErr ? (
                  <span style={{ fontSize: '12.5px', color: 'var(--pink-ink)', fontWeight: 600, paddingLeft: '20px' }}>{v.fMsg.err}</span>
                ) : null}
              </div>
              <button className="hover-cta" type="submit" style={{ height: '54px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', transition: 'background .3s' }}>
                {v.fbBusy ? (
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2.5px solid currentColor', borderRightColor: 'transparent', animation: 'spin .7s linear infinite' }}></span>
                ) : null}
                {v.fbBtn}
              </button>
            </form>
          ) : null}
        </section>
        <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(20px,3vw,28px)', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: 0 }}>Мы в сети</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '10px' }}>
              <a className="hover-pop" href="https://t.me" target="_blank" rel="noopener" style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', height: '52px', borderRadius: '999px', background: 'var(--lav)', color: 'var(--lav-ink)', textDecoration: 'none', fontWeight: 700, transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.send} Telegram</a>
              <a className="hover-pop" href="https://instagram.com" target="_blank" rel="noopener" style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', height: '52px', borderRadius: '999px', background: 'var(--pink)', color: 'var(--pink-ink)', textDecoration: 'none', fontWeight: 700, transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.insta} Instagram</a>
              <a className="hover-pop" href="https://wa.me" target="_blank" rel="noopener" style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', height: '52px', borderRadius: '999px', background: 'var(--sage)', color: 'var(--sage-ink)', textDecoration: 'none', fontWeight: 700, transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.phone} WhatsApp</a>
            </div>
          </section>
          <section style={{ background: 'var(--surface)', borderRadius: '28px', padding: 'clamp(20px,3vw,28px)', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px', margin: '0 0 8px' }}>Частые вопросы</h2>
            {v.faq.map((f, i) => (
              <div key={i} style={{ borderRadius: '20px', background: f.bg, transition: 'background .35s' }}>
                <button onClick={f.on} aria-expanded={f.open} aria-controls={f.id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', textAlign: 'left', padding: '14px 16px', border: 0, background: 'transparent', fontWeight: 700, fontSize: '15px', cursor: 'pointer', minHeight: '52px' }}>
                  {f.q}
                  <span style={{ flex: 'none', transform: `rotate(${f.rot})`, transition: 'transform .4s cubic-bezier(0.22,1,0.36,1)' }}>{v.ics.chevDown}</span>
                </button>
                <div id={f.id} style={{ display: 'grid', gridTemplateRows: f.rows, transition: 'grid-template-rows .45s cubic-bezier(0.22,1,0.36,1)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 16px 16px', fontSize: '14.5px', color: 'var(--muted)', textWrap: 'pretty' }}>{f.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
