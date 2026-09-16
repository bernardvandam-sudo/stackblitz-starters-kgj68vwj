'use client';

import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { useEffect, useMemo, useState } from "react";

const euro = (n) => `€ ${Number(n).toFixed(3).replace('.', ',')}`;
const vol = (n) => Number(n).toLocaleString('nl-NL');

export default function Market() {
  const [orders, setOrders] = useState([]);
  const [side, setSide] = useState('buy');
  const [volume, setVolume] = useState('1000000');
  const [priceMode, setPriceMode] = useState('market');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('LRE-E');
  const [year, setYear] = useState('2027');
  const [duration, setDuration] = useState('30D');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ere-market-orders') || '[]');
      const clean = Array.isArray(saved) ? saved.filter((o) => Number(o.price) !== 1.1) : [];
      localStorage.setItem('ere-market-orders', JSON.stringify(clean));
      setOrders(clean);
    } catch (_) {}
  }, []);

  const visible = orders.filter((o) => o.type === type && o.year === year);
  const buys = visible.filter((o) => o.side === 'buy').sort((a,b) => b.price - a.price);
  const sells = visible.filter((o) => o.side === 'sell').sort((a,b) => a.price - b.price);
  const bestBid = buys[0]?.price ?? null;
  const bestAsk = sells[0]?.price ?? null;
  const mid = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : null;

  const depth = useMemo(() => {
    let cumulative = 0;
    return [...sells.slice(0, 8).map((o) => { cumulative += o.volume; return {...o, cumulative}; }), ...buys.slice(0, 8).map((o) => { cumulative += o.volume; return {...o, cumulative}; })];
  }, [sells, buys]);

  const mailBody = `Nieuwe handelsaanvraag ERE Market\n\nType: ${side === 'buy' ? 'Kopen' : 'Verkopen'}\nERE-type: ${type}\nERE-jaar: ${year}\nVolume: ${volume} ERE\nPrijs: ${priceMode === 'market' ? 'Marktprijs' : `€ ${price} per ERE`}\nLooptijd: ${duration}\n\nBedrijf: ${company}\nContactpersoon: ${contact}\nE-mail: ${email}\nTelefoon: ${phone}\n\nERE Market kan de aanvraag beoordelen en rechtstreeks contact opnemen.`;

  const customerMessage = `Hallo ${contact || ''},\n\nBedankt voor uw handelsaanvraag bij ERE Market. We hebben uw ${side === 'buy' ? 'koopvraag' : 'verkoopaanbod'} ontvangen voor ${vol(Number(volume))} ERE ${type}, ERE-jaar ${year}.\n\nPrijskeuze: ${priceMode === 'market' ? 'Marktprijs' : `eigen prijs van €${price} per ERE`}.\nLooptijd: ${duration === 'DAY' ? '1 handelsdag' : duration === '30D' ? '30 dagen' : 'tot intrekking'}.\n\nERE Market beoordeelt de aanvraag en kan rechtstreeks contact opnemen wanneer er een passende tegenpartij of RFQ-mogelijkheid is. Een aanvraag is nog geen transactie; prijs, volume, tegenpartij en overdracht worden afzonderlijk overeengekomen.\n\nHartelijke groet,\nBernard van Dam\nERE Market`;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const submitOrder = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const v = Number(volume);
    const p = priceMode === 'market' ? (side === 'buy' ? (bestAsk || 0) : (bestBid || 0)) : Number(String(price).replace(',', '.'));
    if (!v || (priceMode === 'price' && !p) || !company || !contact || !email || !phone) { form.reportValidity(); return; }
    const newOrder = { id: Date.now(), side, volume: v, price: p || 0, priceMode, year, type, company, duration };
    const next = [newOrder, ...orders];
    setOrders(next);
    try { localStorage.setItem('ere-market-orders', JSON.stringify(next)); } catch (_) {}
    setMessage(`${side === 'buy' ? 'Koopvraag' : 'Aanbod'} ontvangen. ERE Market heeft de aanvraag per e-mail ontvangen.`);
    form.submit();
  };

  return <main>
    <SiteNav />

    <section className="marketPage marketPro">
      <div className="marketKicker"><span>ERE MARKET</span><b>HANDELSPLATFORM</b><i>GEEN CENTRALE BEURS</i></div>
      <div className="marketTitle"><div><h1>Vraag & aanbod<br/><em>en prijs in één beeld.</em></h1><p>Een handelsomgeving waarin kopers en verkopers hun vraag of aanbod kunnen aanmelden. ERE Market beoordeelt de aanvragen, brengt passende partijen bij elkaar en kan transacties bilateraal afwikkelen.</p></div><div className="marketStatus"><b/><span>MARKTSTATUS</span><strong>{mid ? euro(mid) : 'Momenteel geen prijs'}</strong><small>{bestBid ? `Vraag ${euro(bestBid)}` : 'Momenteel geen kooporders'} · {bestAsk ? `Aanbod ${euro(bestAsk)}` : 'Momenteel geen verkooporders'}</small></div></div>

      <div className="marketTabs"><button className="active" type="button" onClick={()=>scrollTo("orderbook")}>ORDER BOOK</button><button type="button" onClick={()=>scrollTo("price-history")}>PRICE DEVELOPMENT</button><button type="button" onClick={()=>scrollTo("market-depth")}>MARKET DEPTH</button><button type="button" onClick={()=>scrollTo("rfq-orders")}>RFQ / ORDERS</button></div>

      <form className="orderEntry proOrder" action="https://formsubmit.co/bernardvandam@gmail.com" method="POST" target="marketMailFrame" onSubmit={submitOrder}>
        <input type="hidden" name="_subject" value="Nieuwe ERE handelsaanvraag — ERE Market" />
        <input type="hidden" name="_replyto" value={email} />
        <input type="hidden" name="_cc" value={email} />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_url" value="https://eremarket.nl/markt" />
        <input type="hidden" name="Handelsaanvraag" value={mailBody} />
        <input type="hidden" name="Begeleidende boodschap" value={customerMessage} />
        <div className="sideSwitch"><button type="button" className={side==='buy'?'selected':''} onClick={()=>setSide('buy')}>KOPEN</button><button type="button" className={side==='sell'?'selected':''} onClick={()=>setSide('sell')}>VERKOPEN</button></div>
        <label>ERE-TYPE<select name="ERE-type" value={type} onChange={e=>setType(e.target.value)}><option>LRE-E</option><option>BRE-E</option><option>ZRE-E</option></select></label>
        <label>ERE-JAAR<select name="ERE-jaar" value={year} onChange={e=>setYear(e.target.value)}><option>2026</option><option>2027</option><option>2028</option></select></label>
        <label>VOLUME ERE<input name="Volume" value={volume} onChange={e=>setVolume(e.target.value)} inputMode="numeric" required /></label>
        <label>PRIJS<select name="Prijskeuze" value={priceMode} onChange={e=>setPriceMode(e.target.value)}><option value="market">Marktprijs</option><option value="price">Eigen prijs</option></select></label>
        {priceMode === 'price' ? <label>PRIJS / ERE<input name="Prijs" value={price} onChange={e=>setPrice(e.target.value)} inputMode="decimal" placeholder="bijv. 0,46" required /></label> : <div className="marketPriceChoice"><span>MARKTPRIJS</span><b>{side === 'buy' ? (bestAsk ? euro(bestAsk) : 'wordt vastgesteld') : (bestBid ? euro(bestBid) : 'wordt vastgesteld')}</b><small>De beschikbare vraag en het aanbod vormen het uitgangspunt voor de beoordeling.</small></div>}
        <label>LOOPTIJD<select name="Looptijd" value={duration} onChange={e=>setDuration(e.target.value)}><option value="DAY">1 handelsdag</option><option value="30D">30 dagen</option><option value="GTC">Tot intrekking</option></select></label>
        <label>BEDRIJF<input name="Bedrijf" value={company} onChange={e=>setCompany(e.target.value)} required /></label>
        <label>CONTACTPERSOON<input name="Contactpersoon" value={contact} onChange={e=>setContact(e.target.value)} required /></label>
        <label>E-MAIL<input name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <label>TELEFOON<input name="Telefoon" value={phone} onChange={e=>setPhone(e.target.value)} required /></label>
        <button className="button buttonPrimary orderButton" type="submit">Aanvraag indienen →</button>
      </form>
      {message && <div className="orderMessage">✓ {message}</div>}
      <iframe title="handelsaanvraag verzending" name="marketMailFrame" className="hiddenFrame" />

      <div id="price-history" className="marketGridTop marketAnchorTarget">
        <div className="marketPanel pricePanel"><div className="panelHeading"><span>PRIJSONTWIKKELING · {type} · {year}</span><b>TRANSACTIEGEGEVENS</b></div><div className="marketEmpty"><strong>Momenteel geen prijshistorie in ERE Market.</strong><p>De ERE Market is jong. Zodra ERE Market transacties vastlegt, worden hier gerealiseerde prijzen, volumes en handelsmomenten per ERE-type en ERE-jaar zichtbaar.</p><span>Momenteel geen historische transacties in deze weergave</span></div></div>
        <div id="market-depth" className="marketPanel depthPanel marketAnchorTarget"><div className="panelHeading"><span>MARKET DEPTH</span><b>VRAAG EN AANBOD</b></div>{depth.length ? <div className="depthList">{depth.map((d,i)=><div key={i} className={d.side}><span>{d.side==='buy'?'VRAAG':'AANBOD'}</span><b>{d.price ? euro(d.price) : 'Marktprijs'}</b><em>{vol(d.volume)}</em><small>{vol(d.cumulative)} cumulatief</small></div>)}</div> : <div className="marketEmpty compact"><strong>Momenteel geen orders in dit marktsegment.</strong><p>Elke ingediende koopvraag of verkoopaanvraag kan hier onderdeel worden van de marktdiepte zodra deze door ERE Market is ontvangen.</p></div>}</div>
      </div>

      <div id="orderbook" className="orderBookPro marketAnchorTarget"><div className="bookColumn"><div className="bookTitle buyTitle">VRAAG · KOPEN <span>{vol(buys.reduce((s,x)=>s+x.volume,0))} ERE</span></div><div className="bookHeaders"><span>PRIJS</span><span>VOLUME</span><span>CUM.</span></div>{buys.length ? buys.map((o,i)=><div className="proRow buy" key={o.id}><strong>{o.price ? euro(o.price) : 'Marktprijs'}</strong><span>{vol(o.volume)}</span><small>{vol(buys.slice(0,i+1).reduce((s,x)=>s+x.volume,0))}</small></div>) : <div className="bookEmpty">Momenteel geen koopvragen. <button type="button" onClick={()=>setSide('buy')}>Plaats een koopvraag</button></div>}</div><div className="spreadBox"><span>BESTE VRAAG</span><strong>{bestBid ? euro(bestBid) : '—'}</strong><i>VERSCHIL</i><b>{bestBid && bestAsk ? euro(bestAsk-bestBid) : '—'}</b><i>BESTE AANBOD</i><strong>{bestAsk ? euro(bestAsk) : '—'}</strong><small>{mid ? `Marktcentrum ${euro(mid)}` : 'De marktprijs ontstaat uit vraag en aanbod.'}</small></div><div className="bookColumn"><div className="bookTitle sellTitle">AANBOD · VERKOPEN <span>{vol(sells.reduce((s,x)=>s+x.volume,0))} ERE</span></div><div className="bookHeaders"><span>PRIJS</span><span>VOLUME</span><span>CUM.</span></div>{sells.length ? sells.map((o,i)=><div className="proRow sell" key={o.id}><strong>{o.price ? euro(o.price) : 'Marktprijs'}</strong><span>{vol(o.volume)}</span><small>{vol(sells.slice(0,i+1).reduce((s,x)=>s+x.volume,0))}</small></div>) : <div className="bookEmpty">Momenteel geen verkoopaanbod. <button type="button" onClick={()=>setSide('sell')}>Plaats aanbod</button></div>}</div></div>

      <div id="rfq-orders" className="marketFooterGrid marketAnchorTarget"><div><h3>Wat ziet u hier?</h3><p>Het orderboek brengt koopvragen en verkoopaanbod voor hetzelfde ERE-type en ERE-jaar samen. Een aanvraag is een opdracht aan ERE Market om vraag of aanbod te beoordelen; een transactie ontstaat pas nadat prijs, volume, tegenpartij en overdracht zijn overeengekomen.</p></div><div><h3>RFQ / orders</h3><p>Wilt u niet zelf een prijs bepalen? Kies <b>Marktprijs</b>. Wilt u een eigen prijs meegeven, kies <b>Eigen prijs</b>. ERE Market ontvangt uw aanvraag per e-mail en kan u benaderen voor een concrete transactie of een RFQ met één of meer tegenpartijen.</p><p className="rfqExplain">Bij een RFQ vraagt ERE Market bij passende marktpartijen een prijs op voor uw volume. U krijgt vervolgens een voorstel met de relevante voorwaarden. U bepaalt daarna of u wilt doorgaan.</p></div><div><h3>Waarom staat er een jaar bij?</h3><p>ERE’s worden per kalenderjaar geregistreerd. Daarom moet bij een handelsaanvraag duidelijk zijn op welk ERE-jaar het volume betrekking heeft. Daarom noemen we het op dit platform gewoon het ERE-jaar.</p></div></div>
      <div className="marketShare"><span>DEEL / CAMPAGNE</span><a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Feremarket.nl%2Fmarkt" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://wa.me/?text=https%3A%2F%2Feremarket.nl%2Fmarkt" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="mailto:?subject=ERE%20Market%20markt&body=https%3A%2F%2Feremarket.nl%2Fmarkt">E-mail ↗</a></div><p className="marketDisclaimer">ERE Market is geen centrale beurs. De Nederlandse markt voor ERE's is nieuw en de beschikbare marktdata is daarom momenteel beperkt. Die dataset wordt rijker naarmate vraag, aanbod en gerealiseerde transacties toenemen. De NEa bepaalt geen handelsprijs.</p>
    </section>
    <a className="whatsappFloat" href="https://wa.me/31625050039?text=Hallo%20ERE%20Market%2C%20ik%20heb%20een%20vraag%20over%20de%20ERE market." target="_blank" rel="noopener noreferrer">WhatsApp <span>↗</span></a>
  </main>;
}
