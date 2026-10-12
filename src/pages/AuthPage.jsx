import CupArt from '../components/CupArt.jsx'

export default function AuthPage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', padding: 'clamp(16px,4vw,48px) 0', display: 'flex', justifyContent: 'center' }}>
      <section style={{ width: '100%', maxWidth: '460px', background: 'var(--surface)', borderRadius: '32px', padding: 'clamp(22px,4vw,34px)', boxShadow: 'var(--sh2)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', overflow: 'hidden' }}>
            <div style={{ transform: 'scale(.62)' }}>
              <CupArt tint="#FFF8EF" kind="hot" />
            </div>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '28px', lineHeight: 1.1, margin: 0 }}>{v.authTitle}</h1>
            <div style={{ fontSize: '14px', color: 'var(--muted)' }}>{v.authSub}</div>
          </div>
        </div>
        <div role="tablist" aria-label="Вход или регистрация" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '5px', background: 'var(--beige)', borderRadius: '999px' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: '5px', bottom: '5px', width: 'calc(50% - 5px)', left: v.tabPillL, borderRadius: '999px', background: 'var(--surface)', boxShadow: 'var(--sh1)', transition: 'left .45s cubic-bezier(0.22,1,0.36,1)' }}></div>
          <button role="tab" aria-selected={v.isLoginTab} onClick={v.tabLogin} style={{ position: 'relative', height: '44px', border: 0, background: 'transparent', fontWeight: 700, cursor: 'pointer', borderRadius: '999px' }}>Вход</button>
          <button role="tab" aria-selected={v.isRegTab} onClick={v.tabReg} style={{ position: 'relative', height: '44px', border: 0, background: 'transparent', fontWeight: 700, cursor: 'pointer', borderRadius: '999px' }}>Регистрация</button>
        </div>
        <form onSubmit={v.submitAuth} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {v.authFields.map((f, i) => (
            <div key={i} data-field={f.k} style={{ display: 'flex', flexDirection: 'column', gap: '4px', animation: 'popIn .35s cubic-bezier(0.22,1,0.36,1) both' }}>
              <div style={{ position: 'relative' }}>
                <label htmlFor={f.id} style={{ position: 'absolute', left: '20px', top: f.lt, fontSize: f.lfs, color: f.lc, pointerEvents: 'none', transition: 'all .25s cubic-bezier(0.22,1,0.36,1)', fontWeight: 600 }}>{f.label}</label>
                <input id={f.id} type={f.type} autoComplete={f.ac} value={f.v} onChange={f.onChange} onFocus={f.onFocus} onBlur={f.onBlur} aria-invalid={f.inv} aria-describedby={f.errId} style={{ width: '100%', height: '58px', borderRadius: '20px', border: `1.5px solid ${f.bc}`, boxShadow: f.glow, background: 'var(--bg)', padding: '22px 48px 6px 20px', fontSize: '15px', transition: 'border-color .25s,box-shadow .25s' }} />
                {f.ok ? (
                  <span style={{ position: 'absolute', right: '16px', top: '19px', color: 'var(--sage-ink)', animation: 'pop .4s cubic-bezier(0.22,1,0.36,1) both' }}>{v.ic.check}</span>
                ) : null}
                {f.showErr ? (
                  <span style={{ position: 'absolute', right: '16px', top: '19px', color: 'var(--pink-ink)' }}>{v.ic.alert}</span>
                ) : null}
              </div>
              {f.showErr ? (
                <span id={f.errId} style={{ fontSize: '12.5px', color: 'var(--pink-ink)', fontWeight: 600, paddingLeft: '20px', animation: 'fadeIn .25s both' }}>{f.err}</span>
              ) : null}
            </div>
          ))}
          {v.isRegTab ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', animation: 'popIn .35s cubic-bezier(0.22,1,0.36,1) both' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', paddingLeft: '4px' }}>Любимая точка</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {v.favChips.map((c, i) => (
                  <button key={i} type="button" onClick={c.on} aria-pressed={c.pressed} style={{ height: '40px', padding: '0 14px', borderRadius: '999px', border: `1px solid ${c.bc}`, background: c.bg, color: c.fg, fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all .3s' }}>{c.label}</button>
                ))}
              </div>
            </div>
          ) : null}
          <button className="hover-cta-nudge" type="submit" style={{ marginTop: '4px', height: '54px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', transition: 'background .3s,transform .3s cubic-bezier(0.22,1,0.36,1)' }}>
            {v.authBusy ? (
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2.5px solid currentColor', borderRightColor: 'transparent', animation: 'spin .7s linear infinite' }}></span>
            ) : null}
            {v.authBtn}
          </button>
        </form>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '13px' }}>
          <span style={{ flex: '1', height: '1px', background: 'var(--line)' }}></span>
          или
          <span style={{ flex: '1', height: '1px', background: 'var(--line)' }}></span>
        </div>
        <button className="hover-pop-sm" onClick={v.tgLogin} style={{ height: '54px', borderRadius: '999px', border: 0, background: 'var(--lav)', color: 'var(--lav-ink)', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.send} Войти через Telegram</button>
        <div style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center' }}>Продолжая, ты соглашаешься с правилами сервиса</div>
      </section>
    </div>
  )
}
