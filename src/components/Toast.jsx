export default function Toast({ v }) {
  return (
    <div style={{ position: 'fixed', left: 0, right: 0, top: v.toastTop, zIndex: 120, display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 16px' }}>
      <div role="status" aria-live="polite" style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '12px 18px 12px 12px', borderRadius: '999px', background: 'var(--cta)', color: 'var(--cta-ink)', boxShadow: 'var(--sh3)', fontWeight: 700, fontSize: '14px', animation: 'toastIn .45s cubic-bezier(0.22,1,0.36,1) both', maxWidth: '100%' }}>
        <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{v.toastIcon}</span>
        {v.toastText}
      </div>
    </div>
  )
}
