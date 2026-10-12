export default function DesktopHeader({ v }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px clamp(16px,4vw,32px)', background: 'var(--nav)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <nav aria-label="Основная навигация" style={{ position: 'relative', display: 'flex', gap: '2px', padding: '5px', background: 'var(--beige)', borderRadius: '999px', margin: '0 auto 0 0' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: '5px', bottom: '5px', left: v.navL, width: v.navW, opacity: v.navO, borderRadius: '999px', background: 'var(--surface)', boxShadow: 'var(--sh1)', transition: 'left .45s cubic-bezier(0.22,1,0.36,1),width .45s cubic-bezier(0.22,1,0.36,1),opacity .3s' }}></div>
          {v.deskNav.map((n, i) => (
            <button key={i} data-nav={n.id} onClick={n.go} aria-current={n.cur} style={{ position: 'relative', zIndex: 1, border: 0, background: 'transparent', padding: '9px 18px', borderRadius: '999px', fontWeight: 600, fontSize: '14px', color: n.color, cursor: 'pointer', display: 'flex', gap: '6px', alignItems: 'center', transition: 'color .3s' }}>
              {n.label}
              {n.badge ? (
                <span style={{ minWidth: '18px', height: '18px', padding: '0 5px', borderRadius: '999px', background: n.badgeBg, color: n.badgeFg, fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .4s cubic-bezier(0.22,1,0.36,1)' }}>{n.badgeText}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <button className="hover-lift-shadow" onClick={v.openPoints} aria-label="Сменить точку" style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 14px 0 16px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', minWidth: 0, flex: '0 1 auto', maxWidth: '230px', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1),box-shadow .3s' }}>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, lineHeight: 1.15 }}>
            <span style={{ fontWeight: 700, fontSize: '13.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>{v.pt.name}</span>
            <span style={{ fontSize: '11.5px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{v.pt.short}</span>
          </span>
          <span style={{ color: 'var(--muted)' }}>{v.ics.chevDown}</span>
        </button>
        <button className="hover-tilt" onClick={v.toggleTheme} aria-label={v.themeLabel} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>{v.themeIcon}</button>
        <button data-cart-target="1" onClick={v.openCart} aria-label={v.cartLabel} style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
          {v.ic.bag}
          {v.cartCount ? (
            <span style={{ position: 'absolute', top: '-3px', right: '-3px', minWidth: '20px', height: '20px', padding: '0 5px', borderRadius: '999px', background: 'var(--pink)', color: 'var(--pink-ink)', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>{v.cartCount}</span>
          ) : null}
        </button>
        <button onClick={v.goProfile} aria-label="Профиль" style={{ flex: 'none', width: '44px', height: '44px', borderRadius: '50%', border: 0, background: 'var(--lav)', color: 'var(--lav-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800 }}>{v.avatar}</button>
      </div>
    </header>
  )
}
