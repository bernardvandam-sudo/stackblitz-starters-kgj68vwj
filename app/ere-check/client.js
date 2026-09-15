'use client';

import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { useMemo, useState } from "react";

const ERE_FACTOR = 0.3327;
const MARKET_PRICE = 0.46;
const HOURS = { "1 ploeg": 1800, "2 ploegen": 3600, "3 ploegen": 5400, "24/7": 7000 };

const MACHINE_TYPES = [
  { id: "heftruck", label: "Elektrische heftrucks", note: "Voor laden, lossen en intern transport", kwh: 4.0, icon: "HF" },
  { id: "reachtruck", label: "Reachtrucks", note: "Voor hoge stellingen en smalle gangpaden", kwh: 3.2, icon: "RT" },
  { id: "orderpicker", label: "Orderpicktrucks", note: "Voor orderverzameling en orderverplaatsing", kwh: 2.5, icon: "OP" },
  { id: "palletwagen", label: "Elektrische palletwagens", note: "Meeloop- en meerijdend intern transport", kwh: 1.5, icon: "PW" },
  { id: "stapelaar", label: "Stapelaars", note: "Voor heffen, verplaatsen en intern transport", kwh: 2.5, icon: "ST" },
  { id: "trekker", label: "Elektrische trekkers", note: "Voor karren, trailers en intern yard transport", kwh: 3.5, icon: "TR" },
  { id: "smalle-gangen", label: "Smalle-gangentrucks", note: "Voor zeer smalle magazijngangen", kwh: 3.4, icon: "VG" },
  { id: "anders", label: "Andere mobiele machines", note: "Bijvoorbeeld elektrisch mobiel materieel dat hier niet tussen staat", kwh: 4.0, icon: "+" },
];

const money = (n) => Math.round(n).toLocaleString("nl-NL");
const number = (n) => Math.round(n).toLocaleString("nl-NL");

export default function EreCheck() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [f, setF] = useState({ machines: [], counts: {}, operation: "", company: "", name: "", email: "", phone: "" });
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const toggleMachine = (id) => setF((x) => ({ ...x, machines: x.machines.includes(id) ? x.machines.filter((m) => m !== id) : [...x.machines, id] }));
  const setCount = (id, value) => setF((x) => ({ ...x, counts: { ...x.counts, [id]: value } }));
  const estimatedHours = HOURS[f.operation] || 0;

  const calculation = useMemo(() => {
    const rows = f.machines.map((id) => {
      const type = MACHINE_TYPES.find((m) => m.id === id);
      const count = Number(f.counts[id]) || 0;
      const annualKwh = Math.round(count * estimatedHours * type.kwh);
      return { ...type, count, annualKwh };
    });
    const totalKwh = rows.reduce((sum, row) => sum + row.annualKwh, 0);
    const ere = Math.round(totalKwh * ERE_FACTOR);
    const value = Math.round(ere * MARKET_PRICE);
    return { rows, totalKwh, ere, value };
  }, [f.machines, f.counts, estimatedHours]);

  const countsComplete = f.machines.length > 0 && f.machines.every((id) => Number(f.counts[id]) > 0);
  const machineText = calculation.rows.map((r) => `${r.label}: ${r.count}`).join("; ");
  const secondScanUrl = "https://eremarket.nl/ere-aanvraag";
  const customerMessage = [
    `Hallo ${f.name || ""},`,
    "",
    "Dank voor uw ERE Check. We hebben uw eerste berekening ontvangen.",
    "",
    "UW EERSTE BEREKENING",
    `Elektrische machines: ${machineText || "—"}`,
    `Bedrijfsvoering: ${f.operation || "—"}`,
    `Berekend elektriciteitsvolume: ${number(calculation.totalKwh)} kWh per jaar`,
    `Berekend ERE-volume: ${number(calculation.ere)} ERE`,
    `Rekenwaarde bij €0,46 per ERE: €${money(calculation.value)}`,
    "",
    "WAT BETEKENT DIT?",
    "Dit is een eerste rekenkundige inschatting. De uiteindelijke inboekbaarheid wordt bepaald door de aansluiting, bemeting, levering aan vervoer, bewijsvoering en de geldende ERE-regels.",
    "",
    "DE ERE MARKET",
    "De ERE Market heeft inmiddels echte transacties en openbare prijsreferenties. Uw uiteindelijke opbrengst hangt af van het volume dat daadwerkelijk kan worden ingeboekt en de marktprijs op het moment van verkoop.",
    "",
    "DE VOLGENDE STAP",
    "Als u dit potentieel verder wilt laten beoordelen, kunt u de technische en juridische aanvraag rechtstreeks starten. Daar hoeft nog niet alle technische informatie compleet te zijn: de machtiging en de basisgegevens vormen het uitgangspunt; ontbrekende informatie kunnen we daarna gericht opvragen.",
    secondScanUrl,
    "",
    "U ontvangt deze e-mail als bevestiging van uw aanvraag. Wij nemen de gegevens eerst inhoudelijk door voordat wij bevestigen welke elektriciteit daadwerkelijk kan worden ingeboekt.",
    "",
    "Hartelijke groet,",
    "Bernard van Dam",
    "ERE Market",
  ].join("\n");

  const body = [
    "Nieuwe ERE Check aanvraag", "", `Bedrijf: ${f.company}`, `Naam: ${f.name}`, `E-mail: ${f.email}`, `Telefoon: ${f.phone}`, "",
    `Elektrisch materieel: ${machineText}`, `Ploegen: ${f.operation}`, `Berekend jaarverbruik: ${number(calculation.totalKwh)} kWh/jaar`,
    `Berekend ERE-volume: ${number(calculation.ere)}`, `Berekende waarde bij €${MARKET_PRICE.toFixed(2)} per ERE: €${money(calculation.value)}`, "",
    `Tweede stap: ${secondScanUrl}`,
  ].join("\n");

  const submitLead = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.submit();
    setSubmitted(true);
  };

  return <main className="checkPage">
    <SiteNav />
    <div className="wrap">
      <header className="intro">
        <div className="eyebrow"><i /> VOOR LOGISTIEK · DC · WAREHOUSING</div>
        <h1>Heeft uw locatie een <em>elektrische vloot?</em></h1>
        <p>Laat eerst zien welke interne transportmiddelen u gebruikt. U kunt meerdere typen tegelijk selecteren.</p>
        <small>Gratis · vrijblijvend · geen EAN nodig</small>
      </header>
      <div className="bar"><span style={{ width: `${step * 25}%` }} /></div>
      <section className="card">
        {step === 1 && <Step title="Welke elektrische interne transportmiddelen gebruikt u?" sub="Selecteer alle typen die op deze locatie worden gebruikt. In de volgende stap vragen we per type hoeveel u ervan heeft.">
          <div className="choices">{MACHINE_TYPES.map((m) => <button type="button" className={f.machines.includes(m.id) ? "choice selected" : "choice"} onClick={() => toggleMachine(m.id)} key={m.id}><span className="choiceMain"><span className="choiceIcon">{m.icon}</span><span><strong>{m.label}</strong><small>{m.note}</small></span></span><b>{f.machines.includes(m.id) ? "✓" : "＋"}</b></button>)}</div>
          <div className="selectionBar"><span>{f.machines.length === 0 ? "Nog niets geselecteerd" : <><strong>{f.machines.length}</strong> {f.machines.length === 1 ? "type geselecteerd" : "typen geselecteerd"}</>}</span><span>Meerdere antwoorden mogelijk</span></div>
          <Next disabled={!f.machines.length} onClick={() => setStep(2)} />
        </Step>}
        {step === 2 && <Step title="Hoeveel heeft u van elk type?" sub="Vul per geselecteerd type het aantal machines in. Een schatting is prima.">
          <div className="machineInputs">{f.machines.map((id) => { const m = MACHINE_TYPES.find((x) => x.id === id); return <label key={id}>{m.label}<input type="number" min="1" placeholder="bijv. 10" value={f.counts[id] || ""} onChange={(e) => setCount(id, e.target.value)} /></label>; })}</div>
          <Next disabled={!countsComplete} onClick={() => setStep(3)} />
        </Step>}
        {step === 3 && <Step title="Hoeveel ploegen draait uw operatie?" sub="Dit bepaalt hoeveel bedrijfsuren we voor de eerste berekening per machine rekenen.">
          <div className="choices">{Object.entries(HOURS).map(([x, h]) => <button type="button" className={f.operation === x ? "choice selected" : "choice"} onClick={() => set("operation", x)} key={x}><span><strong>{x}</strong><small>± {number(h)} bedrijfsuren per jaar</small></span><b>→</b></button>)}</div>
          {f.operation && <div className="calcBox"><strong>Uw rekenbasis</strong>{calculation.rows.map((r) => <p key={r.id}>{r.count} × {number(estimatedHours)} uur × {String(r.kwh).replace(".", ",")} kWh/uur = <b>{number(r.annualKwh)} kWh</b></p>)}<p className="total"><b>Totaal berekend: {number(calculation.totalKwh)} kWh/jaar</b></p></div>}
          <Next disabled={!f.operation} onClick={() => setStep(4)} />
        </Step>}
        {step === 4 && <Result calculation={calculation} f={f} set={set} submitLead={submitLead} submitted={submitted} body={body} customerMessage={customerMessage} />}
      </section>
      <button className="back" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>← Terug</button>
    </div>
    <a className="whatsappFloat" href="https://wa.me/31625050039?text=Hallo%20ERE%20Market%2C%20ik%20heb%20een%20vraag%20over%20ERE%27s." target="_blank" rel="noopener noreferrer" aria-label="Chat met ERE Market via WhatsApp">WhatsApp <span>↗</span></a>
  </main>;
}

function Step({ title, sub, children }) { return <div className="step"><div className="stepTag">ERE CHECK</div><h2>{title}</h2><p className="sub">{sub}</p>{children}</div>; }
function Next({ disabled, onClick }) { return <button type="button" className="next" disabled={disabled} onClick={onClick}>Volgende stap <span>→</span></button>; }

function Result({ calculation, f, set, submitLead, submitted, body, customerMessage }) {
  const { totalKwh, ere, value, rows } = calculation;
  return <div className="result">
    <div className="stepTag">UW EERSTE BEREKENING</div>
    <h2>Uw locatie heeft <em>potentieel.</em></h2>
    <p className="sub">Deze berekening is rechtstreeks gebaseerd op de door u gekozen machines, de aantallen en het aantal ploegen.</p>
    <div className="numbers"><div><label>ELEKTRICITEIT</label><strong>{number(totalKwh)}</strong><small>kWh / jaar</small></div><div><label>ERE’S</label><strong>{number(ere)}</strong><small>{number(totalKwh)} × 0,3327</small></div><div><label>BEREKENDE WAARDE</label><strong>€{money(value)}</strong><small>{number(ere)} × €0,46</small></div></div>
    <div className="formula"><strong>Hoe is dit berekend?</strong><p>We nemen per geselecteerd type het aantal machines, vermenigvuldigen dat met de bedrijfsuren van uw gekozen ploegensysteem en met een geschat elektriciteitsverbruik per machine-uur.</p>{rows.map((r) => <p key={r.id}><b>{r.count} × {r.label}</b> × {number(HOURS[f.operation])} uur × {String(r.kwh).replace(".", ",")} kWh/uur = <b>{number(r.annualKwh)} kWh</b></p>)}<p><b>Totaal</b> · {number(totalKwh)} kWh × 0,3327 ERE/kWh = <b>{number(ere)} ERE</b></p><p><b>Berekende waarde</b> · {number(ere)} ERE × €0,46 = <b>€{money(value)}</b></p><small>De ERE Check is een eerste berekening. De werkelijke ERE’s worden later bepaald op basis van aantoonbaar en inboekbaar elektriciteitsverbruik.</small></div>
    <div className="marketNote"><b>Over de waarde</b><p>Voor deze eerste check gebruiken we €0,46 per ERE als rekenprijs. De marktprijs kan veranderen en de uiteindelijke opbrengst hangt af van de ERE’s die voor uw situatie daadwerkelijk kunnen worden ingeboekt.</p></div>
    {!submitted ? <form className="lead" action="https://formsubmit.co/bernardvandam@gmail.com" method="POST" target="ereMailFrame" onSubmit={submitLead}>
      <input type="hidden" name="_subject" value="Nieuwe ERE Check aanvraag — ERE Market" />
      <input type="hidden" name="_replyto" value={f.email} />
      <input type="hidden" name="_cc" value={f.email} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_url" value="https://eremarket.nl/ere-check" />
      <input type="hidden" name="ERE Check" value={body} />
      <input type="hidden" name="Begeleidende boodschap" value={customerMessage} />
      <div><h3>Wilt u weten wat uw elektrisch wagenpark daadwerkelijk kan opleveren?</h3><p>Dan is de volgende stap dat uw aansluiting, bemeting en andere relevante gegevens worden gecontroleerd. U ontvangt een bevestiging per e-mail. Daarna kunt u stap 2 afronden: de technische en juridische aanvraag.</p><p>Die tweede stap is bewust uitgebreider: daar verzamelen we de gegevens en bewijsstukken die nodig zijn om het dossier te beoordelen.</p></div>
      <input required name="Bedrijfsnaam" placeholder="Bedrijfsnaam" value={f.company} onChange={e => set("company", e.target.value)} />
      <input required name="Contactpersoon" placeholder="Naam contactpersoon" value={f.name} onChange={e => set("name", e.target.value)} />
      <input required name="email" type="email" placeholder="E-mailadres" value={f.email} onChange={e => set("email", e.target.value)} />
      <input required name="Telefoon" type="tel" placeholder="Telefoonnummer" value={f.phone} onChange={e => set("phone", e.target.value)} />
      <textarea name="Berekening" value={body} readOnly />
      <button className="next full" type="submit">Verzend gegevens · u ontvangt een kopie <span>→</span></button>
      <small className="formNote">De bevestiging gaat naar het opgegeven e-mailadres. ERE Market ontvangt dezelfde aanvraag. Bij de eerste verzending kan FormSubmit een eenmalige activatie naar ERE Market vragen.</small>
    </form> : <div className="sentBox"><strong>✓ Aanvraag verzonden.</strong><p>Uw aanvraag is naar ERE Market gestuurd en een kopie is naar {f.email} verzonden. In die e-mail staat ook de link naar de ERE-aanvraag en machtiging.</p><Link href="/ere-aanvraag" className="button buttonPrimary">Start de 2e ERE Check · ERE-aanvraag →</Link></div>}
    <iframe title="email verzending" name="ereMailFrame" className="hiddenFrame" />
  </div>;
}
