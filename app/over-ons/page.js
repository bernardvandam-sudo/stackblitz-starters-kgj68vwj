import Link from "next/link";
import SiteNav from "../components/SiteNav";
import ShareKit from "../components/ShareKit";
import { pageMetadata } from "../metadata";
import { JsonLd, SITE_URL, breadcrumbSchema } from "../components/JsonLd";

export const metadata = pageMetadata({ title: 'Over ERE Market', description: 'Waarom ERE Market bestaat, hoe we de ERE-keten organiseren en welke energie- en marktkennis daarachter zit.', path: '/over-ons' });

const timeline = [
  ["2012+", "Energieprojecten", "Ervaring met ontwikkeling, exploitatie en zakelijke energiesystemen."],
  ["Daarna", "Techniek & exploitatie", "Van techniek en productie naar sturen op betrouwbare prestaties, kWh en rendement."],
  ["Vervolgens", "Output & contracten", "Ervaring met zakelijke afspraken waarin aantoonbare energie-output en prestaties centraal staan."],
  ["B2B", "Energie & markt", "Steeds meer focus op zakelijke energievragen, marktwerking, data en waarde."],
  ["Nu", "ERE Market", "Die ervaring komt samen in één digitale keten: van machine en meetdata tot registratie, ERE en verkoop."],
];

export default function About() {
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema([{ name: "ERE Market", url: "" }, { name: 'Over ERE Market', url: '/over-ons' }]), { "@type": "Article", headline: 'Over ERE Market', description: 'Waarom ERE Market bestaat, hoe we de ERE-keten organiseren en welke energie- en marktkennis daarachter zit.', mainEntityOfPage: `${SITE_URL}/over-ons`, dateModified: "2026-09-14", author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` } }] }} />
    <SiteNav />

    <section className="aboutHero">
      <div className="sectionKicker">OVER ERE MARKET</div>
      <h1>Wij nemen de ERE-keten<br/><em>uit handen.</em></h1>
      <p>ERE Market is gebouwd rond één gedachte: de regie nemen in zoveel mogelijk ketenstappen en organisaties van A tot Z ondersteunen, zodat het werk uit handen wordt genomen en de waarde van ERE's zonder gedoe kan worden uitgekeerd.</p>
      <div className="aboutStatement"><strong>Eén regisseur. Minder werk. Meer waarde uit uw elektrische energie.</strong><span>Techniek · data · regelgeving · registratie · verificatie · verkoop</span></div>
    </section>

    <section className="section aboutModern">
      <div className="twoCol"><div><div className="sectionKicker">ONZE MISSIE</div><h2>Uw elektrische energie<br/><em>moet niet eindigen bij de meter.</em></h2></div><div>
        <p><strong>Wij maken de stap van elektriciteit naar waarde eenvoudig.</strong></p>
        <p>Dat begint niet bij een certificaat. Het begint bij de machine, de aansluiting en de kWh. Daarna moet de hele keten kloppen: meten, onderbouwen, registreren, inboeken, controleren en verkopen.</p>
        <p>ERE Market neemt die regie zo ver mogelijk over. We combineren jarenlange ervaring met energieprojecten, exploitatie, zakelijke energievraagstukken en marktwerking met een digitale aanpak. Zo hoeft een organisatie geen eigen ERE-specialisme, extra administratie of losse partijen om zich heen te organiseren.</p>
        <div className="aboutStatement"><strong>Wij nemen verantwoordelijkheid voor de keten. U houdt grip op de waarde.</strong><span>Van machine · naar meetdata · naar ERE · naar verkoop</span></div>
      </div></div>
      <div className="operatingModel"><div><span>01</span><b>Van A tot Z</b><p>We organiseren zoveel mogelijk schakels in één proces, zodat u niet zelf de keten hoeft te coördineren.</p></div><div><span>02</span><b>Techniek én markt</b><p>We begrijpen zowel de fysieke energiestroom als de administratieve en commerciële waarde ervan.</p></div><div><span>03</span><b>Digitaal waar het kan</b><p>Intake, dossier, data, controles en marktinformatie worden zoveel mogelijk digitaal ingericht.</p></div><div><span>04</span><b>Directe verantwoordelijkheid</b><p>Geen groot apparaat om doorheen te werken. Wel korte lijnen en één partij die de samenhang bewaakt.</p></div></div>
    </section>

    <section className="section darkSection timelineSection">
      <div className="sectionKicker">WAAR DIE ERVARING VANDAAN KOMT</div>
      <h2>Van energieprojecten naar<br/><em>digitale ketenregie.</em></h2>
      <div className="timeline">{timeline.map(([year,title,text]) => <div key={year}><span>{year}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    </section>

    <section className="section aboutValue">
      <div className="sectionKicker">WAT DIT VOOR U BETEKENT</div>
      <div className="twoCol"><h2>U hoeft geen<br/><em>ERE-specialist te worden.</em></h2><div>
        <p>De waarde van ERE's zit niet alleen in het aantal kWh. De aansluiting moet kloppen, de meetdata moet herleidbaar zijn, de machtiging moet op orde zijn en de administratie moet controleerbaar zijn.</p>
        <p>Het <strong>Register Energie voor Vervoer (REV)</strong> is het register van de Nederlandse Emissieautoriteit waarin leveringen worden geregistreerd en ERE's worden bijgehouden. Voor organisaties die niet zelfstandig aan de drempel voldoen, is een inboekdienstverlener de route om de elektriciteit te laten inboeken.</p>
        <div className="responsibilityGrid"><div><b>WIJ REGELEN</b><span>intake · technische beoordeling · dossier · machtiging · inboeking · markt</span></div><div><b>U LEVERT</b><span>de basisgegevens, toegang en medewerking die nodig zijn om de keten te onderbouwen</span></div><div><b>RESULTAAT</b><span>een controleerbare ERE-keten met zo min mogelijk werk aan uw kant</span></div></div>
        <Link href="/ere-check" className="button buttonPrimary">Ontdek uw ERE-potentieel →</Link>
      </div></div>
    </section>

    <section className="section aboutContact"><div className="contactBox"><div><div className="sectionKicker">DIRECT CONTACT</div><h2>Een vraag over uw<br/><em>elektrische vloot?</em></h2><p>Korte lijnen. Een inhoudelijk antwoord. En als het interessant is: direct door naar de ERE Check.</p></div><div className="contactActions"><a className="button buttonPrimary" href="mailto:bernardvandam@gmail.com">E-mail ERE Market →</a></div></div></section>

    <section className="section campaignSection"><ShareKit url="https://eremarket.nl/ere-check" title="ERE Market — elektrische vloot"/></section>
    <footer className="footer"><div className="brand"><span className="brandMark">ERE</span><span>MARKET</span></div><span>Ketenregie voor de nieuwe energiemarkt.</span><ShareKit compact /><Link href="/markt">ERE Market →</Link></footer>
  </main>;
}
