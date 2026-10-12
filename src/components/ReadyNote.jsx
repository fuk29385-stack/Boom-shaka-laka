export default function ReadyNote({ v }) {
  return (
    <div style={{ position: 'fixed', left: 0, right: 0, top: '12px', zIndex: 130, display: 'flex', justifyContent: 'center', padding: '0 12px' }}>
      <div role="alert" style={{ width: '100%', maxWidth: '420px', display: 'flex', gap: '12px', alignItems: 'center', padding: '14px', borderRadius: '26px', background: 'var(--surface)', boxShadow: 'var(--sh3)', animation: 'toastIn .5s cubic-bezier(0.22,1,0.36,1) both' }}>
        <span style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--sage)', color: 'var(--sage-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{v.ic.bell}</span>
        <div style={{ flex: '1', minWidth: 0, lineHeight: 1.3 }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Monster Coffee · сейчас</div>
          <div style={{ fontWeight: 800, fontSize: '15px' }}>Твой кофе готов!</div>
          <div style={{ fontSize: '13.5px' }}>Забери на точке «{v.q2.p.name}», заказ {v.q2.num}</div>
        </div>
        <button onClick={v.closeNote} aria-label="Закрыть уведомление" style={{ width: '40px', height: '40px', borderRadius: '50%', border: 0, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>{v.ics.x}</button>
      </div>
    </div>
  )
}
