export default function TabBar({ v }) {
  return (
    <nav aria-label="Основная навигация" style={{ position: 'fixed', left: '10px', right: '10px', bottom: '10px', zIndex: 60, height: '70px', background: 'var(--surface)', borderRadius: '28px', boxShadow: 'var(--sh3)', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '6px', bottom: '6px', width: 'calc((100% - 12px) / 5)', left: v.tabLeft, opacity: v.tabO, borderRadius: '22px', background: 'var(--beige)', transition: 'left .45s cubic-bezier(0.22,1,0.36,1),opacity .3s' }}></div>
      {v.tabs.map((t, i) => (
        <button key={i} onClick={t.go} aria-current={t.cur} aria-label={t.label} style={{ position: 'relative', border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', color: t.color, cursor: 'pointer', fontSize: '11px', fontWeight: 700, transition: 'color .3s' }}>
          <span style={{ position: 'relative', transform: `translateY(${t.ty})`, transition: 'transform .35s cubic-bezier(0.22,1,0.36,1)' }}>
            {t.icon}
            {t.badge ? (
              <span style={{ position: 'absolute', top: '-5px', right: '-9px', minWidth: '17px', height: '17px', padding: '0 4px', borderRadius: '999px', background: t.badgeBg, color: t.badgeFg, fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface)', animation: 'pop .4s cubic-bezier(0.22,1,0.36,1)' }}>{t.badgeText}</span>
            ) : null}
          </span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
