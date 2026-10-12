export default function HomePage({ v }) {
  return (
    <div style={{ animation: 'pageIn .5s cubic-bezier(0.22,1,0.36,1) both' }}>
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(20px,5vw,64px)', padding: 'clamp(24px,6vw,72px) 0 clamp(24px,5vw,56px)' }}>
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          <h1 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(40px,7vw,70px)', lineHeight: 1.02, letterSpacing: '-.01em', margin: '0 0 18px', textWrap: 'balance', animation: 'heroRise .9s cubic-bezier(0.22,1,0.36,1) both' }}>Кофе без очереди между парами</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: 'var(--muted)', maxWidth: '460px', margin: '0 0 28px', textWrap: 'pretty', animation: 'heroRise .9s cubic-bezier(0.22,1,0.36,1) .12s both' }}>Закажи заранее прямо из аудитории, следи за живой очередью и забирай напиток ровно к перемене.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', animation: 'heroRise .9s cubic-bezier(0.22,1,0.36,1) .24s both' }}>
            <button className="hover-hero press" data-magnetic="1" onClick={v.goMenu} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '54px', padding: '0 28px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: 'var(--sh2)', transition: 'transform .3s cubic-bezier(0.22,1,0.36,1),background .3s,box-shadow .3s' }}>Заказать заранее {v.ic.arrow}</button>
            <button onClick={v.scrollHow} style={{ height: '54px', padding: '0 6px', border: 0, background: 'none', fontWeight: 600, fontSize: '15px', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationColor: 'var(--cap)' }}>Как это работает</button>
          </div>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', minWidth: 0 }}>
          <div data-hero="1" aria-hidden="true" style={{ position: 'relative', width: 'min(380px,100%)', aspectRatio: '1/1', animation: 'popIn .9s cubic-bezier(0.22,1,0.36,1) .15s both' }}>
            <div style={{ position: 'absolute', inset: '7%', background: 'var(--pink)', animation: 'blob 12s ease-in-out infinite', borderRadius: '58% 42% 55% 45%/48% 55% 45% 52%' }}></div>
            <div style={{ position: 'absolute', top: '2%', right: '4%', width: '24%', aspectRatio: '1', borderRadius: '50%', background: 'var(--lav)', animation: 'floaty 6s ease-in-out infinite' }}></div>
            <div style={{ position: 'absolute', bottom: '6%', left: 0, width: '18%', aspectRatio: '1', borderRadius: '50%', background: 'var(--sage)', animation: 'floaty 7s ease-in-out 1s infinite' }}></div>
            <div style={{ position: 'absolute', top: '16%', left: '12%', width: '7%', height: '10%', borderRadius: '50%', background: '#9C7356', '--r': '-28deg', animation: 'floaty 5s ease-in-out .4s infinite', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '1.5px', height: '76%', marginTop: '12%', background: 'rgba(255,240,225,.6)', borderRadius: '2px' }}></div>
            </div>
            <div style={{ position: 'absolute', top: '30%', right: '12%', width: '6%', height: '9%', borderRadius: '50%', background: '#B48D6C', '--r': '24deg', animation: 'floaty 6s ease-in-out 1.6s infinite', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '1.5px', height: '76%', marginTop: '12%', background: 'rgba(255,240,225,.6)', borderRadius: '2px' }}></div>
            </div>
            <div style={{ position: 'absolute', bottom: '18%', right: '8%', width: '6.5%', height: '9.5%', borderRadius: '50%', background: '#8C6A4F', '--r': '60deg', animation: 'floaty 5.5s ease-in-out .9s infinite', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '1.5px', height: '76%', marginTop: '12%', background: 'rgba(255,240,225,.6)', borderRadius: '2px' }}></div>
            </div>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', left: '33%', bottom: '51%', width: '34%', height: '30%', overflow: 'visible' }}>
              <path d="M28 98 C14 76 42 62 28 40 S38 12 28 0" fill="none" stroke="var(--muted)" strokeWidth="6" strokeLinecap="round" style={{ animation: 'steam 3.2s ease-in-out infinite' }} />
              <path d="M52 98 C38 76 66 62 52 40 S62 12 52 0" fill="none" stroke="var(--muted)" strokeWidth="6" strokeLinecap="round" style={{ animation: 'steam 3.2s ease-in-out 1s infinite' }} />
              <path d="M76 98 C62 76 90 62 76 40 S86 12 76 0" fill="none" stroke="var(--muted)" strokeWidth="6" strokeLinecap="round" style={{ animation: 'steam 3.2s ease-in-out 2s infinite' }} />
            </svg>
            <div style={{ position: 'absolute', left: '13%', width: '74%', bottom: '13%', height: '10%', borderRadius: '50%', background: '#FFF8EF', boxShadow: '0 14px 30px rgba(90,70,54,.16)' }}></div>
            <div style={{ position: 'absolute', left: '64%', bottom: '28%', width: '18%', height: '17%', borderRadius: '50%', border: '11px solid #FFF8EF' }}></div>
            <div style={{ position: 'absolute', left: '27%', width: '46%', bottom: '18%', height: '30%', background: '#FFF8EF', borderRadius: '8% 8% 50% 50%/10% 10% 62% 62%' }}></div>
            <div style={{ position: 'absolute', left: '27%', width: '46%', bottom: '42%', height: '12%', borderRadius: '50%', background: '#FFF8EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '84%', height: '66%', borderRadius: '50%', background: '#B98E68' }}></div>
            </div>
            <div style={{ position: 'absolute', left: '-2%', bottom: '3%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px 10px 10px', borderRadius: '22px', background: 'var(--surface)', boxShadow: 'var(--sh2)', animation: 'floaty 6s ease-in-out .5s infinite' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--sage)', color: 'var(--sage-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ics.check}</span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Заказ A-047</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>готов к перемене</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="how" style={{ padding: 'clamp(24px,5vw,48px) 0' }}>
        <h2 data-reveal="0" style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', margin: '0 0 22px' }}>Как это работает</h2>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: '28px 40px' }}>
          {v.how.map((h, i) => (
            <li key={i} data-reveal={i} style={{ borderTop: '1.5px solid var(--cap)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: "'Yeseva One',Georgia,serif", fontSize: '44px', lineHeight: 1, color: 'var(--cap)' }}>{h.n}</span>
              <span style={{ fontWeight: 700, fontSize: '18px' }}>{h.title}</span>
              <span style={{ fontSize: '15px', color: 'var(--muted)', textWrap: 'pretty', maxWidth: '300px' }}>{h.text}</span>
            </li>
          ))}
        </ol>
      </section>
      <section style={{ padding: 'clamp(24px,5vw,48px) 0' }}>
        <div data-reveal="0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '12px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', margin: 0 }}>Точки рядом</h2>
          <button onClick={v.goContacts} style={{ background: 'none', border: 0, padding: '8px 4px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center', color: 'var(--text)' }}>Адреса и часы {v.ics.chevRight}</button>
        </div>
        {v.homeSkel ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))', gap: '16px' }}>
            {v.skel4.map((s, i) => (
              <div key={i} style={{ height: '200px', borderRadius: '28px', background: 'linear-gradient(90deg,var(--beige) 25%,var(--surface) 50%,var(--beige) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s linear infinite' }}></div>
            ))}
          </div>
        ) : null}
        {v.homeErr ? (
          <div role="alert" style={{ background: 'var(--surface)', borderRadius: '28px', padding: '28px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--pink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ic.alert}</span>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <div style={{ fontWeight: 800, fontSize: '17px' }}>Не получилось загрузить точки</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Проверь интернет, мы попробуем ещё раз.</div>
            </div>
            <button onClick={v.retry} style={{ height: '46px', padding: '0 20px', borderRadius: '999px', border: 0, background: 'var(--cta)', color: 'var(--cta-ink)', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>{v.ics.refresh} Повторить</button>
          </div>
        ) : null}
        {v.homeEmpty ? (
          <div style={{ background: 'var(--surface)', borderRadius: '28px', padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Рядом пока нет точек, но скоро откроемся и в твоём колледже.</div>
        ) : null}
        {v.homeList ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))', gap: '16px' }}>
            {v.points.map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'var(--sh1)', outline: `2px solid ${p.selBorder}`, outlineOffset: '-2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '999px', background: p.stBg, color: p.stFg, fontSize: '12px', fontWeight: 800 }}>{p.st}</span>
                  {p.selected ? (
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Твоя точка</span>
                  ) : null}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '18px' }}>{p.name}</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--muted)' }}>{p.org} · {p.addr}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, marginTop: 'auto' }}>{p.load}</div>
                <button className="hover-beige" onClick={p.onOrder} style={{ height: '44px', borderRadius: '999px', border: '1px solid var(--line)', background: 'var(--bg)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background .3s' }}>{p.cta}</button>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      <section style={{ padding: 'clamp(24px,5vw,48px) 0' }}>
        <div data-reveal="0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '12px', marginBottom: '22px' }}>
          <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', margin: 0 }}>Популярное</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={v.slidePrev} aria-label="Назад" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(180deg)' }}>{v.ics.chevRight}</button>
            <button onClick={v.slideNext} aria-label="Вперёд" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.ics.chevRight}</button>
          </div>
        </div>
        <div data-slider="1" style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', padding: '6px 4px 18px', margin: '0 -4px', scrollBehavior: 'smooth' }}>
          {v.popular.map((it, i) => (
            <div className="hover-card" key={i} data-card="1" role="button" tabIndex="0" onClick={it.onOpen} onKeyDown={it.onKey} aria-label={it.name} style={{ flex: '0 0 220px', scrollSnapAlign: 'start', background: 'var(--surface)', borderRadius: '28px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'var(--sh1)', cursor: 'pointer', opacity: it.op, transition: 'transform .35s cubic-bezier(0.22,1,0.36,1),box-shadow .35s' }}>
              <div data-art="1" style={{ position: 'relative', overflow: 'hidden', height: '140px', borderRadius: '22px', background: '#141312', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={it.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s cubic-bezier(0.22,1,0.36,1),filter .6s' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '16px', padding: '0 4px' }}>{it.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                <span style={{ fontWeight: 800 }}>{it.priceT}</span>
                <button className="hover-plus press-md" onClick={it.onAdd} aria-label={it.addLabel} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 0, background: it.addBg, color: it.addFg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform .45s cubic-bezier(0.22,1,0.36,1)' }}>{v.ic.plus}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 'clamp(24px,5vw,48px) 0' }}>
        <div data-reveal="0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '12px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,38px)', margin: 0 }}>Говорят гости</h2>
          <button onClick={v.goReviews} style={{ background: 'none', border: 0, padding: '8px 4px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center', color: 'var(--text)' }}>{v.avgAll} из 5 · все отзывы {v.ics.chevRight}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '16px' }}>
          {v.miniReviews.map((r, i) => (
            <div key={i} style={{ background: 'var(--surface)', borderRadius: '28px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'var(--sh1)' }}>
              <div style={{ display: 'flex', gap: '3px', color: '#D9A75F' }}>
                {r.stars.map((s, i2) => (
                  <span key={i2} style={{ color: s.c, animation: `starPop .5s cubic-bezier(0.22,1,0.36,1) ${s.d} both` }}>{s.icon}</span>
                ))}
              </div>
              <div style={{ fontSize: '15px', textWrap: 'pretty' }}>«{r.text}»</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: r.av, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>{r.ini}</span>
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{r.name}</span>
                  <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{r.pointName}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer data-reveal="0" style={{ margin: 'clamp(24px,5vw,48px) 0 24px', background: 'var(--beige)', borderRadius: '32px', padding: 'clamp(24px,4vw,40px)', display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontFamily: "'Yeseva One',Georgia,serif", fontWeight: 400, fontSize: '26px' }}>Monster Coffee</div>
          <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Кофейни в колледжах и в городе. Заказывай заранее и забирай без очереди.</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            <span style={{ fontWeight: 800, marginBottom: '4px' }}>Разделы</span>
            <a href="#" onClick={v.goMenuLink}>Меню</a>
            <a href="#" onClick={v.goQueueLink}>Очередь</a>
            <a href="#" onClick={v.goReviewsLink}>Отзывы</a>
            <a href="#" onClick={v.goContactsLink}>Связь и FAQ</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
            <span style={{ fontWeight: 800, marginBottom: '4px' }}>Мы в сети</span>
            <a href="https://t.me" target="_blank" rel="noopener">Telegram</a>
            <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
            <a href="https://wa.me" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
        <div style={{ width: '100%', fontSize: '12.5px', color: 'var(--muted)' }}>© 2026 Monster Coffee</div>
      </footer>
    </div>
  )
}
