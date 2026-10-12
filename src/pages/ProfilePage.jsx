export default function ProfilePage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both', padding: 'clamp(16px,4vw,48px) 0', display: 'flex', justifyContent: 'center' }}>
      <section style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'var(--surface)', borderRadius: '32px', padding: '26px', boxShadow: 'var(--sh1)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--lav)', color: 'var(--lav-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '30px', flex: 'none', animation: 'pop .5s cubic-bezier(0.22,1,0.36,1) both' }}>{v.avatar}</span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '28px', lineHeight: 1.1, margin: 0 }}>Привет, {v.userName}</h1>
            <div style={{ fontSize: '14px', color: 'var(--muted)' }}>{v.userContact} · любимая точка: {v.favName}</div>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: '28px', padding: '8px', boxShadow: 'var(--sh1)', display: 'flex', flexDirection: 'column' }}>
          <button className="hover-bg" onClick={v.goQueue} style={{ display: 'flex', gap: '14px', alignItems: 'center', minHeight: '56px', padding: '0 16px', border: 0, background: 'transparent', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', textAlign: 'left' }}>
            <span style={{ color: 'var(--muted)' }}>{v.ic.hourglass}</span>
            <span style={{ flex: '1' }}>Мой заказ</span>
            <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>{v.orderShort}</span>
          </button>
          <button className="hover-bg" onClick={v.goContacts} style={{ display: 'flex', gap: '14px', alignItems: 'center', minHeight: '56px', padding: '0 16px', border: 0, background: 'transparent', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', textAlign: 'left' }}>
            <span style={{ color: 'var(--muted)' }}>{v.ic.message}</span>
            <span style={{ flex: '1' }}>Связь и FAQ</span>
            {v.ics.chevRight}
          </button>
          <button className="hover-bg" onClick={v.toggleTheme} style={{ display: 'flex', gap: '14px', alignItems: 'center', minHeight: '56px', padding: '0 16px', border: 0, background: 'transparent', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', textAlign: 'left' }}>
            <span style={{ color: 'var(--muted)' }}>{v.themeIcon}</span>
            <span style={{ flex: '1' }}>Тёмная тема</span>
            <span style={{ width: '46px', height: '28px', borderRadius: '999px', background: v.swBg, position: 'relative', transition: 'background .3s' }}>
              <span style={{ position: 'absolute', top: '3px', left: v.swL, width: '22px', height: '22px', borderRadius: '50%', background: 'var(--surface)', boxShadow: 'var(--sh1)', transition: 'left .35s cubic-bezier(0.22,1,0.36,1)' }}></span>
            </span>
          </button>
          <button className="hover-bg" onClick={v.logout} style={{ display: 'flex', gap: '14px', alignItems: 'center', minHeight: '56px', padding: '0 16px', border: 0, background: 'transparent', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', textAlign: 'left', color: 'var(--pink-ink)' }}>
            {v.ic.logout}
            <span style={{ flex: '1' }}>Выйти</span>
          </button>
        </div>
      </section>
    </div>
  )
}
