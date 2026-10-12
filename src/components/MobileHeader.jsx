export default function MobileHeader({ v }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, padding: '10px 14px', background: 'var(--nav)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button onClick={v.openPoints} aria-label="Сменить точку" style={{ flex: '1', minWidth: 0, display: 'flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 12px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '1', lineHeight: 1.15 }}>
          <span style={{ fontWeight: 700, fontSize: '13.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.pt.name}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.pt.short}</span>
        </span>
        <span style={{ color: 'var(--muted)' }}>{v.ics.chevDown}</span>
      </button>
      <button onClick={v.toggleTheme} aria-label={v.themeLabel} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>{v.themeIcon}</button>
      <button data-cart-target="1" onClick={v.openCart} aria-label={v.cartLabel} style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
        {v.ic.bag}
        {v.cartCount ? (
          <span style={{ position: 'absolute', top: '-3px', right: '-3px', minWidth: '20px', height: '20px', padding: '0 5px', borderRadius: '999px', background: 'var(--pink)', color: 'var(--pink-ink)', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>{v.cartCount}</span>
        ) : null}
      </button>
    </header>
  )
}
