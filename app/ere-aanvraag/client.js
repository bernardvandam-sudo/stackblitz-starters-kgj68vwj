'use client';

import Link from "next/link";
import { useState } from "react";
import SiteNav from "../components/SiteNav";

const TODAY = new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date());
const YEAR = "2027";

export default function EreAanvraag(){
  const [sent,setSent]=useState(false);
  const [f,setF]=useState({company:"",address:"",kvk:"",representative:"",email:"",ean:"",authority:false,nea:false,inspection:false,mandate:false,signature:""});
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const valid=f.company.trim()&&f.address.trim()&&f.kvk.trim()&&f.representative.trim()&&f.email.trim()&&f.ean.trim()&&f.authority&&f.nea&&f.inspection&&f.mandate&&f.signature.trim();
  const mandateText=`ERE-AANVRAAG EN MACHTIGING — ${YEAR}\n\nOnderneming: ${f.company}\nVestigingsadres: ${f.address}\nHandelsregister/KvK: ${f.kvk}\nVertegenwoordigingsbevoegde: ${f.representative}\nE-mail: ${f.email}\nEAN: ${f.ean}\nAfgiftedatum: ${TODAY}\nGeldigheidsduur: 01-01-${YEAR} t/m 31-12-${YEAR}\n\nDe onderneming machtigt ERE Market voor het volledige kalenderjaar ${YEAR} om namens de onderneming de voor ERE's in aanmerking komende elektriciteitsleveringen aan vervoer te registreren en in te boeken in het Register Energie voor Vervoer (REV), overeenkomstig de dienstverlening van ERE Market.\n\nDe onderneming geeft de Nederlandse Emissieautoriteit (NEa) toestemming om relevante gegevens over de aansluiting(en) bij de distributiebeheerder/netbeheerder op te vragen en in te zien voor haar toezichttaken binnen de ERE-systematiek.\n\nDe onderneming verklaart dat de inboekverificateur van ERE Market op de locatie waar elektriciteit aan vervoer wordt geleverd een controle mag uitvoeren en mag vaststellen of de leveringsconstructie aan de inboekvoorwaarden voldoet.\n\nDe machtiging geldt uitsluitend voor het volledige kalenderjaar ${YEAR} en wordt niet stilzwijgend verlengd. De onderneming kan per kalenderjaar slechts één inboekdienstverlener voor dezelfde ERE-inboekingen aanstellen.\n\nElektronische handtekening: ${f.signature}`;
  const customerMessage=`Hallo ${f.representative||""},\n\nUw ERE-aanvraag voor ${YEAR} is ontvangen.\n\nU heeft ERE Market gemachtigd om het ERE-traject voor uw onderneming voor het volledige kalenderjaar ${YEAR} te verzorgen. De technische gegevens hoeven op dit moment nog niet compleet te zijn.\n\nWAT GEBEURT ER NU?\nWij controleren uw aanvraag en gaan daarna gericht na welke aanvullende gegevens nodig zijn. Denk bijvoorbeeld aan aansluitgegevens, bemeting, kWh-data, laadpunten en bewijsstukken.\n\nU hoeft nu niets opnieuw in te vullen. Als wij aanvullende informatie nodig hebben, nemen wij rechtstreeks contact met u op.\n\nUw aanvraag geldt voor ${YEAR}, van 1 januari tot en met 31 december, en wordt niet stilzwijgend verlengd.\n\nHartelijke groet,\nERE Market`;
  const submit=e=>{e.preventDefault();const form=e.currentTarget;if(!form.checkValidity()||!valid){form.reportValidity();return;}form.submit();setSent(true);};

  return <main className="checkPage"><SiteNav/><div className="wrap">
    <header className="intro">
      <div className="eyebrow"><i/> STAP 2 · ERE-AANVRAAG</div>
      <h1>Uw ERE-aanvraag<br/><em>voor 2027.</em></h1>
      <p>Een korte formele stap om ERE Market voor uw onderneming te laten werken. Uw technische dossier hoeft nu nog niet compleet te zijn.</p>
      <small>± 1 minuut · alleen de noodzakelijke gegevens · technische details later</small>
    </header>
    <div className="bar"><span style={{width:"100%"}}/></div>
    {!sent ? <form className="card authorizationForm" action="https://formsubmit.co/bernardvandam@gmail.com" method="POST" target="authorizationMailFrame" onSubmit={submit}>
      <input type="hidden" name="_subject" value="ERE-aanvraag 2027 ontvangen — ERE Market"/>
      <input type="hidden" name="_replyto" value={f.email}/>
      <input type="hidden" name="_autoresponse" value={customerMessage}/>
      <input type="hidden" name="_template" value="table"/>
      <input type="hidden" name="_url" value="https://eremarket.nl/ere-aanvraag"/>
      <input type="hidden" name="ERE-machtiging" value={mandateText}/>

      <section className="formSection"><div className="stepTag">01 · UW ONDERNEMING</div><h2>Met wie gaan we werken?</h2><p className="sub">Deze gegevens zijn onderdeel van de formele ondernemingsmachtiging. Meer technische informatie hoeft u nu nog niet aan te leveren.</p>
        <div className="formGrid">
          <Field label="Bedrijfsnaam"><input name="Bedrijfsnaam" required value={f.company} onChange={e=>set("company",e.target.value)} /></Field>
          <Field label="Handelsregister / KvK"><input name="KvK" required value={f.kvk} onChange={e=>set("kvk",e.target.value)} /></Field>
          <Field label="Vestigingsadres"><input name="Vestigingsadres" required value={f.address} onChange={e=>set("address",e.target.value)} placeholder="Straat, huisnummer, postcode en plaats" /></Field>
          <Field label="Vertegenwoordigingsbevoegde"><input name="Vertegenwoordiger" required value={f.representative} onChange={e=>set("representative",e.target.value)} /></Field>
          <Field label="E-mailadres"><input name="email" type="email" required value={f.email} onChange={e=>set("email",e.target.value)} /></Field>
          <Field label="EAN-aansluiting"><input name="EAN" required inputMode="numeric" pattern="[0-9]{18}" minLength="18" maxLength="18" placeholder="18 cijfers" value={f.ean} onChange={e=>set("ean",e.target.value.replace(/\D/g,""))}/></Field>
        </div>
      </section>

      <section className="formSection"><div className="stepTag">02 · 2027</div><h2>Regel uw ERE-aanvraag op tijd.</h2>
        <div className="bindingNotice"><strong>Uw aanvraag geldt voor 2027</strong><p>De ERE-machtiging wordt altijd voor een volledig kalenderjaar afgegeven. Wilt u dat ERE Market vanaf <b>1 januari 2027</b> voor uw onderneming kan werken, regel deze aanvraag dan vóór de start van het nieuwe kalenderjaar.</p><p><b>Geldigheid:</b> 01-01-2027 t/m 31-12-2027 · geen stilzwijgende verlenging.</p></div>
      </section>

      <section className="formSection"><div className="stepTag">03 · WAT GEEFT U AAN?</div><h2>De formele opdracht aan ERE Market.</h2>
        <div className="mandateText">
          <p><b>De onderneming machtigt ERE Market</b> voor het volledige kalenderjaar 2027 om namens de onderneming de voor ERE's in aanmerking komende elektriciteitsleveringen aan vervoer te registreren en in te boeken in het Register Energie voor Vervoer (REV), overeenkomstig de dienstverlening van ERE Market.</p>
          <p>De onderneming geeft de NEa toestemming om relevante gegevens over de aansluiting(en) bij de distributiebeheerder/netbeheerder op te vragen en in te zien voor haar toezichttaken binnen de ERE-systematiek.</p>
          <p>De onderneming verklaart dat de inboekverificateur van ERE Market op de locatie waar elektriciteit aan vervoer wordt geleverd een controle mag uitvoeren en mag vaststellen of de leveringsconstructie aan de inboekvoorwaarden voldoet.</p>
          <p>De machtiging geldt uitsluitend voor het volledige kalenderjaar 2027 en wordt niet stilzwijgend verlengd.</p>
        </div>
        <label className="legalCheck"><input type="checkbox" required checked={f.authority} onChange={e=>set("authority",e.target.checked)}/><span>Ik verklaar dat ik bevoegd ben om deze onderneming te vertegenwoordigen.</span></label>
        <label className="legalCheck"><input type="checkbox" required checked={f.mandate} onChange={e=>set("mandate",e.target.checked)}/><span>Ik geef ERE Market deze opdracht voor het volledige kalenderjaar 2027.</span></label>
        <label className="legalCheck"><input type="checkbox" required checked={f.nea} onChange={e=>set("nea",e.target.checked)}/><span>Ik geef de NEa toestemming om relevante aansluitgegevens voor haar toezicht op te vragen.</span></label>
        <label className="legalCheck"><input type="checkbox" required checked={f.inspection} onChange={e=>set("inspection",e.target.checked)}/><span>Ik geef de inboekverificateur van ERE Market toestemming de leveringslocatie te controleren.</span></label>
      </section>

      <section className="formSection"><div className="stepTag">04 · ONDERTEKENEN</div><h2>Maak uw aanvraag compleet.</h2><p className="sub">Uw digitale ondertekening bevestigt de hierboven beschreven machtiging voor 2027.</p>
        <Field label="Elektronische handtekening · volledige naam"><input name="Elektronische handtekening" required value={f.signature} onChange={e=>set("signature",e.target.value)} placeholder="Typ uw volledige naam" /></Field>
      </section>

      <div className="bindingNotice"><strong>ERE-aanvraag voor 2027</strong><p>Door in te dienen geeft u ERE Market de formele machtiging voor het volledige kalenderjaar 2027. Daarna hoeft uw technische dossier nog niet compleet te zijn: wij vragen ontbrekende gegevens gericht bij u op.</p><p><b>Afgiftedatum:</b> {TODAY}</p></div>
      <button className="next full" type="submit" disabled={!valid}>ERE-aanvraag voor 2027 ondertekenen <span>→</span></button>
      <small className="formNote">Na verzending ontvangt u een bevestiging. ERE Market controleert daarna het dossier en neemt contact op als aanvullende informatie nodig is.</small>
    </form> : <div className="card"><div className="sentBox"><strong>✓ Uw ERE-aanvraag voor 2027 is ontvangen.</strong><p>De formele aanvraag is verzonden. U hoeft nu niet uw hele technische dossier compleet te maken. Wij controleren wat er nodig is en nemen contact met u op als we aanvullende gegevens nodig hebben.</p><Link href="/ere-dossier" className="button buttonPrimary">Dossier later aanvullen →</Link><p><small>U kunt dit ook later doen. Het technische dossier staat los van de reeds ingediende aanvraag.</small></p></div></div>}
    <button className="back" onClick={()=>window.location.href="/ere-check"}>← Terug naar ERE Check</button>
  </div><iframe title="ERE aanvraag verzending" name="authorizationMailFrame" className="hiddenFrame"/></main>;
}
function Field({label,children}){return <label className="field"><span>{label}</span>{children}</label>}
