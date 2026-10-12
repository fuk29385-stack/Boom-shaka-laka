// Иллюстрация чашки для пустых состояний: hot | cold | dessert
export default function CupArt({ tint = '#E8D2B6', kind = 'hot' }) {
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px', flex: 'none' }}>
      {kind === 'hot' ? (
        <>
          <svg viewBox="0 0 40 30" aria-hidden="true" style={{ position: 'absolute', left: '30px', top: '2px', width: '40px', height: '30px', overflow: 'visible' }}>
            <path d="M12 28 C6 20 18 16 12 6" fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" style={{ opacity: 0.45, animation: 'steam 2.8s ease-in-out infinite' }} />
            <path d="M26 28 C20 20 32 16 26 6" fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" style={{ opacity: 0.45, animation: 'steam 2.8s ease-in-out 1.1s infinite' }} />
          </svg>
          <div style={{ position: 'absolute', left: '12px', bottom: '10px', width: '76px', height: '12px', borderRadius: '50%', background: 'rgba(90,70,54,.14)' }}></div>
          <div style={{ position: 'absolute', left: '62px', bottom: '30px', width: '24px', height: '24px', borderRadius: '50%', border: `6px solid ${tint}` }}></div>
          <div style={{ position: 'absolute', left: '20px', bottom: '16px', width: '52px', height: '42px', background: tint, borderRadius: '6px 6px 26px 26px' }}></div>
          <div style={{ position: 'absolute', left: '20px', bottom: '51px', width: '52px', height: '13px', borderRadius: '50%', background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '7px', borderRadius: '50%', background: 'rgba(120,82,58,.45)' }}></div>
          </div>
        </>
      ) : null}
      {kind === 'cold' ? (
        <>
          <div style={{ position: 'absolute', left: '52px', bottom: '52px', width: '5px', height: '40px', borderRadius: '3px', background: '#E3A7A4', transform: 'rotate(14deg)', transformOrigin: 'bottom' }}></div>
          <div style={{ position: 'absolute', left: '22px', bottom: '8px', width: '56px', height: '10px', borderRadius: '50%', background: 'rgba(90,70,54,.12)' }}></div>
          <div style={{ position: 'absolute', left: '29px', bottom: '12px', width: '42px', height: '62px', borderRadius: '7px 7px 18px 18px', background: tint, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '6px', top: '8px', width: '13px', height: '13px', borderRadius: '4px', background: 'rgba(255,255,255,.55)', transform: 'rotate(12deg)' }}></div>
            <div style={{ position: 'absolute', left: '20px', top: '18px', width: '12px', height: '12px', borderRadius: '4px', background: 'rgba(255,255,255,.45)', transform: 'rotate(-10deg)' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '5px', background: 'rgba(255,255,255,.35)' }}></div>
          </div>
        </>
      ) : null}
      {kind === 'dessert' ? (
        <>
          <div style={{ position: 'absolute', left: '10px', bottom: '12px', width: '80px', height: '14px', borderRadius: '50%', background: 'rgba(90,70,54,.14)' }}></div>
          <div style={{ position: 'absolute', left: '22px', bottom: '20px', width: '56px', height: '34px', borderRadius: '16px 16px 10px 10px', background: tint }}>
            <div style={{ position: 'absolute', left: '4px', right: '4px', top: '6px', height: '7px', borderRadius: '999px', background: 'rgba(255,255,255,.5)' }}></div>
          </div>
          <div style={{ position: 'absolute', left: '44px', bottom: '52px', width: '13px', height: '13px', borderRadius: '50%', background: '#D98C8C' }}></div>
        </>
      ) : null}
    </div>
  )
}
