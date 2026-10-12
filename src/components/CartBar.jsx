export default function CartBar({ v }) {
  return (
    <div style={{ position: 'fixed', zIndex: 55, left: v.cartBarL, right: v.cartBarR, bottom: v.cartBarB, width: v.cartBarW, animation: 'popIn .45s cubic-bezier(0.22,1,0.36,1) both' }}>
      <button className="hover-lift" onClick={v.openCart} aria-label={v.cartLabel} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', height: '64px', padding: '0 10px 0 14px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', boxShadow: 'var(--sh3)', cursor: 'pointer', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)' }}>
        <span data-cart-target="1" style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {v.ic.bag}
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', minWidth: '20px', height: '20px', padding: '0 5px', borderRadius: '999px', background: 'var(--pink)', color: 'var(--pink-ink)', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.cartCount}</span>
        </span>
        <span style={{ flex: '1', textAlign: 'left', display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 800, fontSize: '15px' }}>Корзина</span>
          <span style={{ fontSize: '12.5px', opacity: 0.8 }}>{v.cartPointText}</span>
        </span>
        <span style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '20px', fontVariantNumeric: 'tabular-nums' }}>{v.dispT}</span>
        <span style={{ height: '44px', padding: '0 18px', borderRadius: '999px', background: 'var(--cta-ink)', color: 'var(--cta)', display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '14px' }}>Оформить</span>
      </button>
    </div>
  )
}
