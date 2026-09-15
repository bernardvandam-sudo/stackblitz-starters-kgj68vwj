import Link from "next/link";
import SiteNav from "./components/SiteNav";
import ShareKit from "./components/ShareKit";
import { JsonLd, SITE_URL, breadcrumbSchema } from "./components/JsonLd";

const sectors = [
  ["Logistiek & distributie", "Heftrucks, reachtrucks, orderpickers, palletwagens en ander intern elektrisch transport.", "/ere/logistiek-en-distributie"],
  ["Bouw & infra", "Elektrische graafmachines, mobiele kranen, bulldozers en ander mobiel materieel.", "/ere/bouw-en-infra"],
  ["Landbouw & bosbouw", "Elektrische tractoren, landbouwvoertuigen, bosbouwmachines en mobiele werktuigen.", "/ere/landbouw-en-bosbouw"],
  ["Overig elektrisch vervoer", "Een elektrische vrachtwagen, laadpunt of andere kwalificerende vervoersstroom kan onderdeel worden van dezelfde ERE-keten.", "/ere/overig-elektrisch-vervoer"],
];

const steps = [
  ["01", "Check", "Ontdek in twee minuten of uw elektrische machines interessant zijn."],
  ["02", "Controle", "Wij controleren aansluiting, bemeting en de benodigde gegevens."],
  ["03", "Inboeken", "Geschikte elektriciteitsleveringen worden administratief verwerkt."],
  ["04", "Verhandelen", "Wij bundelen uw ERE’s en brengen ze op de markt."],
  ["05", "Uitbetalen", "U ziet volume, verkoop en opbrengst in één overzicht."],
];

export default function Home() {
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema([{ name: "ERE Market", url: "" }]), { "@type": "WebSite", name: "ERE Market", url: SITE_URL, description: "ERE's uit elektrische mobiliteit: beoordeling, inboeking en marktverhandeling." }] }} />
      <SiteNav />

      <section className="hero">
        <div className="heroGrid" />
        <div className="heroContent">
          <div className="eyebrow"><span /> FOCUS OP INTERN ELEKTRISCH TRANSPORT · LOGISTIEK · DC · WAREHOUSING</div>
          <h1>Maak van uw elektrische energie <em>marktwaarde.</em></h1>
          <p className="heroLead">Uw elektrische heftrucks, reachtrucks en andere interne transportmiddelen verbruiken al veel elektriciteit. Onder voorwaarden kan die elektriciteit ERE’s opleveren. Wij regelen de keten van beoordeling, registratie en verkoop. Onze focus ligt op intern elektrisch transport; staat er daarnaast één elektrische vrachtwagen, een ander elektrisch wegvoertuig of één of meer laadpunten op dezelfde locatie, dan beoordelen we die in dezelfde keten wanneer ze aan de ERE-voorwaarden voldoen.</p>
          <div className="heroActions">
            <Link href="/ere-check" className="button buttonPrimary">Bereken uw ERE-potentieel <span>→</span></Link>
            <Link href="/hoe-het-werkt" className="textLink">Bekijk hoe het werkt</Link><Link href="/ere-aanvraag" className="textLink">Heeft u de eerste scan al gedaan? Start stap 2 →</Link>
          </div>
          <div className="heroMeta"><span>Gratis</span><i /><span>Vrijblijvend</span><i /><span>In 2 minuten</span></div>
        </div>

        <div className="heroPanel">
          <div className="panelTop"><span>VOORBEELDWAARDE</span><span className="live"><b /> REKENVOORBEELD</span></div>
          <div className="panelNumber">€<strong>153.000</strong></div>
          <div className="panelLine"><span>1.000.000 kWh</span><span>≈ 333.000 ERE</span></div>
          <div className="valueBar"><span /></div>
          <div className="panelLine"><span>ERE-prijs</span><span>€0,46 / ERE</span></div>
          <p>Rekenvoorbeeld op basis van 0,3327 ERE/kWh en €0,46 per ERE. Werkelijke ERE-volumes en opbrengsten hangen af van de inboekbare elektriciteit en de marktprijs.</p>
        </div>
      </section>

      <section className="proofStrip">
        <div><strong>ELEKTRISCHE MACHINES</strong><span>De bron van emissiereductie en waardecreatie door ERE’s</span></div>
        <div><strong>REGISTRATIE</strong><span>Bemeting & bewijsvoering</span></div>
        <div><strong>MARKT</strong><span>Bundelen & verhandelen</span></div>
        <div><strong>DATA</strong><span>Inzicht per locatie</span></div>
      </section>

      <section className="section intro" id="wat-zijn-eres">
        <div className="sectionKicker">DE WAARDE DIE AL OP UW TERREIN STAAT</div>
        <div className="twoCol">
          <h2>Wat is een ERE?<br /><em>En waarom is die geld waard?</em></h2>
          <div>
            <p>ERE staat voor Emissiereductie-eenheid. Eén ERE staat voor één kilogram CO₂-equivalent ketenemissiereductie. De overheid gebruikt dit marktmechanisme om de uitstoot van vervoer verder te verlagen.</p>
            <p>Brandstofleveranciers hebben een jaarlijkse brandstoftransitieverplichting en kunnen ERE’s kopen om daaraan te voldoen. Heeft uw bedrijf geschikte elektrische machines, dan kan de elektriciteit daarvoor onder voorwaarden worden ingeboekt. ERE Market regelt de keten van registratie tot verkoop.</p>
            <Link href="/ere-check" className="arrowLink">Ontdek wat uw locatie kan opleveren →</Link>
          </div>
        </div>
        <div className="simpleFlow">
          <div><b>1</b><span>Uw machines gebruiken elektriciteit</span></div>
          <div><b>2</b><span>Geschikte kWh worden ingeboekt</span></div>
          <div><b>3</b><span>Daarvoor ontstaan ERE’s</span></div>
          <div><b>4</b><span>Wij verkopen ze</span></div>
          <div><b>5</b><span>U ontvangt uw opbrengst</span></div>
        </div>
        <div className="momentum"><strong>De markt is er nu.</strong><span>De ERE-systematiek geldt sinds 1 januari 2026. Het Register Energie voor Vervoer (REV) van de NEa is het register waarin inboekingen worden geregistreerd en ERE’s worden bijgehouden.</span></div>
      </section>

      <section className="section darkSection">
        <div className="sectionKicker">VOOR WIE</div>
        <div className="sectionHead"><h2>Van magazijnvloer<br /><em>tot elektrisch vervoer.</em></h2><p>Onze kern is intern elektrisch transport: heftrucks, reachtrucks, orderpickers, palletwagens, stapelaars, trekkers en ander mobiel materieel op logistieke locaties. De focus blijft intern transport. Als op dezelfde locatie ook een elektrische vrachtwagen, ander wegvoertuig of kwalificerend laadpunt aanwezig is, kan dat binnen dezelfde ERE-keten worden beoordeeld.</p></div>
        <div className="sectorGrid">
          {sectors.map(([title, text, href], i) => <Link href={href} className="sectorCard" key={title}><span className="cardNumber">0{i + 1}</span><h3>{title}</h3><p>{text}</p><span className="cardArrow">→</span></Link>)}
        </div>
      </section>

      <section className="section process">
        <div className="sectionKicker">VAN ELEKTRICITEIT NAAR ERE</div>
        <div className="sectionHead"><h2>Van productie<br /><em>naar verkoop.</em></h2><p>ERE Market organiseert de keten van technische controle tot marktverkoop.</p></div>
        <div className="steps">{steps.map(([num, title, text]) => <div className="step" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section className="section knowledgeTeaser">
        <div><div className="sectionKicker">KENNISBANK</div><h2>De vragen achter<br /><em>de ERE-waarde.</em></h2><p>Van elektrische heftruck tot MLOEA en MID-meting: lees hoe de keten werkt en welke gegevens bepalen of elektriciteit kan worden ingeboekt.</p></div>
        <div className="knowledgeTeaserLinks"><Link href="/ere/elektrische-heftrucks">Elektrische heftrucks →</Link><Link href="/ere/reachtrucks">Reachtrucks →</Link><Link href="/ere/mloea">MLOEA →</Link><Link href="/ere/ere-opbrengst-berekenen">ERE-opbrengst berekenen →</Link><Link href="/ere">Bekijk de volledige kennisbank →</Link></div>
      </section>

      <section className="section acquisition">
        <div className="acqBox"><div><div className="sectionKicker">START HIER</div><h2>Begin nu met uw<br /><em>ERE-potentieel.</em></h2><p>Start zonder EAN of documenten. In twee minuten ziet u of uw locatie interessant is.</p></div><div className="heroActions"><Link href="/ere-check" className="button buttonPrimary">Doe de gratis ERE Check →</Link><Link href="/ere-aanvraag" className="textLink">Naar stap 2: ERE-aanvraag →</Link></div></div>
      </section>

      <section className="section campaignSection"><ShareKit url="https://eremarket.nl/ere-check" title="ERE Market — ERE Check"/></section>
    <footer className="footer"><div className="brand"><span className="brandMark">ERE</span><span>MARKET</span></div><span>Van energie-expertise naar digitale ketenregie.</span><ShareKit compact /><div className="footerLinks"><Link href="/ere">ERE kennis →</Link><Link href="/hoe-het-werkt">Hoe het werkt →</Link><Link href="/ere-aanvraag">2e ERE-aanvraag →</Link></div></footer>
      <a className="whatsappFloat" href="https://wa.me/31625050039?text=Hallo%20ERE%20Market%2C%20ik%20heb%20een%20vraag%20over%20ERE%27s." target="_blank" rel="noopener noreferrer">WhatsApp <span>↗</span></a>
    </main>
  );
}
