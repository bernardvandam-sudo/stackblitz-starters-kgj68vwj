import Link from "next/link";
import SiteNav from "../components/SiteNav";
import ShareKit from "../components/ShareKit";
import { pageMetadata } from "../metadata";
import { JsonLd, SITE_URL, breadcrumbSchema } from "../components/JsonLd";

export const metadata = pageMetadata({ title: 'Hoe werkt de ERE-keten?', description: 'Uitleg over ERE’s, elektriciteit, mobiele machines, bemeting, REV, verificatie en marktverhandeling.', path: '/hoe-het-werkt' });

const officialLinks = [
  ["Nederlandse Emissieautoriteit (NEa)", "ERE's, REV en de regels voor inboeken", "https://www.emissieautoriteit.nl/regelgeving/hernieuwbare-energie-voor-vervoer-eres/wat-is-de-brandstoftransitie-vervoer/eres"],
  ["NEa · Inboeken elektriciteit", "De technische voorwaarden voor elektriciteit en mobiele machines", "https://www.emissieautoriteit.nl/regelgeving/hernieuwbare-energie-voor-vervoer-eres/inboeken-hernieuwbare-energie-vervoer/inboeken-elektriciteit"],
  ["NEa · Inboekdienstverleners", "Drempel, machtigingen, administratie en verantwoordelijkheid", "https://www.emissieautoriteit.nl/regelgeving/hernieuwbare-energie-voor-vervoer-eres/inboeken-hernieuwbare-energie-vervoer/inboekdienstverleners"],
  ["NEa · Autorisatie en toegang", "De actuele eisen voor een REV-rekening en inboekdienstverlener", "https://www.emissieautoriteit.nl/registers-en-portalen/register-energie-voor-vervoer/autorisatie-en-toegang"],
];

const facts = [
  ["01", "Een ERE is een verhandelbare eenheid", "1 ERE staat voor 1 kg CO₂eq-ketenemissiereductie ten opzichte van de fossiele referentiewaarde. De eenheid wordt in het REV bijgehouden en kan worden overgedragen."],
  ["02", "De NEa maakt de markt niet", "De NEa beheert en controleert het register en de regels. Vraag, aanbod en financiële afhandeling ontstaan tussen marktpartijen; de NEa bepaalt de handelsprijs niet."],
  ["03", "Mobiele machines zijn sinds 2026 relevant", "Elektriciteit geleverd aan mobiele machines kan LRE-E opleveren. De NEa noemt onder meer heftrucks, graafmachines, tractoren, mobiele kranen en bulldozers. De lijst is niet-limitatief."],
  ["04", "Bewijsvoering is onderdeel van de waarde", "Niet alleen kWh tellen. EAN, eigendom van de aansluiting, bemeterd leverpunt, MID-bewijs, meetdata, machtiging en een controleerbare administratie horen bij de keten."],
];

const machineLinks = { logistiek: "/ere/logistiek-en-distributie", bouw: "/ere/bouw-en-infra", landbouw: "/ere/landbouw-en-bosbouw", overig: "/ere/overig-elektrisch-vervoer" };

const machineGroups = [
  {
    id: "logistiek",
    kicker: "01 · LOGISTIEK & DISTRIBUTIE",
    title: "Interne e-vehicles zijn onze kern.",
    intro: "Hier ligt de primaire focus van ERE Market: elektriciteit die op logistieke locaties rechtstreeks naar zelfrijdende interne transportmiddelen gaat.",
    items: [
      ["Elektrische heftrucks", "De NEa noemt (vork)heftrucks expliciet als voorbeeld van mobiele machines. Denk aan laden, lossen, verplaatsen en intern stapelen."],
      ["Reachtrucks", "Voor hoge magazijnstellingen en smalle gangen. De machine is zelfrijdend en wordt daarom technisch beoordeeld als mobiele machine; de meetconstructie blijft bepalend."],
      ["Orderpicktrucks", "Elektrische orderverzamelaars en orderpickers voor intern transport. Vooral interessant op locaties met veel draaiuren en een grote vloot."],
      ["Palletwagens & stapelaars", "Meeloop- en meerijdende palletwagens en elektrische stapelaars. Geschiktheid wordt beoordeeld op de feitelijke machine, levering en bemeting."],
      ["Elektrische trekkers", "Voor het trekken van karren, dolly's en trailers op het eigen terrein. Denk aan distributiecentra, productielocaties en warehouses."],
      ["Smalle-gangentrucks", "Specialistische magazijntrucks die vaak veel draaiuren maken. Ook hier is de combinatie van machine, leverpunt en meetdata bepalend."],
    ],
    note: "De NEa-lijst met voorbeelden is niet-limitatief. ERE Market kijkt daarom niet alleen naar de naam van een machine, maar naar de feitelijke mobiele toepassing en de manier waarop elektriciteit wordt geleverd en gemeten."
  },
  {
    id: "bouw",
    kicker: "02 · BOUW & INFRA",
    title: "Elektrisch materieel met veel draaiuren.",
    intro: "Op bouwplaatsen en infralocaties kan elektrisch materieel een grote elektriciteitsvraag vertegenwoordigen. De NEa noemt verschillende typen expliciet.",
    items: [
      ["Elektrische graafmachines", "Door de NEa expliciet genoemd als voorbeeld van een mobiele machine."],
      ["Mobiele kranen", "Ook mobiele kranen worden door de NEa expliciet genoemd. Dit kan interessant zijn bij vaste bouw- en overslaglocaties."],
      ["Bulldozers", "Door de NEa expliciet genoemd. Elektrische uitvoering en de wijze van laden/bemeten worden per locatie beoordeeld."],
      ["Elektrische dumpers", "Zelfrijdend mobiel materieel dat we per type en meetconstructie beoordelen; de NEa-lijst is niet-limitatief."],
      ["Elektrische walsen & wegenbouwmachines", "Mobiele, zelfrijdende machines kunnen interessant zijn wanneer de elektriciteitslevering aantoonbaar aan het vervoer/mobiele werktuig kan worden toegerekend."],
      ["Elektrische verreikers & vergelijkbaar materieel", "Voorbeelden van mobiel materieel dat we per type en meetconstructie beoordelen voordat we een ERE-potentieel bevestigen."],
    ],
    note: "Voor bouw en infra geldt extra nadruk op de leveringsconstructie: het relevante elektriciteitsvolume moet aantoonbaar via een bemeterd leverpunt aan de mobiele machine worden geleverd."
  },
  {
    id: "landbouw",
    kicker: "03 · LANDBOUW & BOSBOUW",
    title: "Van elektrische trekker tot bosbouwmachine.",
    intro: "De NEa noemt landbouwtrekkers, landbouwvoertuigen en bosbouwmachines expliciet. Dat maakt deze sector een duidelijke tweede groeimarkt naast logistiek.",
    items: [
      ["Elektrische tractoren", "De NEa noemt tractoren expliciet. Denk aan laden op het eigen erf of op een agrarische bedrijfslocatie."],
      ["Elektrische landbouwvoertuigen", "Mobiele landbouwvoertuigen die zelf kunnen verplaatsen vallen binnen de categorie die de NEa als voorbeeld noemt."],
      ["Elektrische bosbouwmachines", "Bosbouwmachines worden door de NEa expliciet genoemd als mobiele machines."],
      ["Mobiele werktuigen", "Ook andere zelfrijdende mobiele werktuigen kunnen worden beoordeeld wanneer de feitelijke toepassing en meting passen binnen de inboekregels."],
    ],
    note: "Stationaire machines of installaties vallen niet onder deze route. Losse mobiele accu's die niet als onderdeel van een voertuig worden gebruikt zijn evenmin automatisch inboekbaar."
  },
  {
    id: "overig",
    kicker: "04 · OVERIG ELEKTRISCH VERVOER",
    title: "De keten stopt niet bij het magazijn.",
    intro: "Onze focus blijft intern elektrisch transport. Staat er op dezelfde locatie ook een andere kwalificerende elektrische vervoersstroom, dan beoordelen we die binnen dezelfde keten.",
    items: [
      ["Een elektrische vrachtwagen", "Ook één elektrische vrachtwagen kan relevant zijn wanneer de levering aan het voertuig correct wordt gemeten en aan de geldende voorwaarden voldoet."],
      ["Elektrische bestelwagens & andere wegvoertuigen", "Wanneer de elektriciteit aan vervoer wordt geleverd via een geschikte meetconstructie, kunnen we deze stroom naast de interne vloot beoordelen."],
      ["Laadpunten", "Een laadpunt is op zichzelf niet het certificaat: het gaat om de elektriciteit die aantoonbaar aan vervoer wordt geleverd en gemeten. Eén of meerdere laadpunten kunnen daarom onderdeel van het dossier zijn."],
      ["Verwisselbare voertuigaccu's", "De NEa staat verwisselbare voertuigaccu's toe wanneer ze uitsluitend bestemd en gebruikt worden voor aandrijving van een voertuig. Losse of stationaire batterijen zijn niet automatisch inboekbaar."],
      ["Drijvende werktuigen", "Elektriciteit voor bijvoorbeeld elektrisch aangedreven zandzuigers en baggeraars kan in de sector binnenvaart vallen en BRE-E opleveren."],
      ["Pleziervaartuigen", "De NEa noemt pleziervaartuigen binnen de mobiele machines. De sector en het type ERE worden per levering bepaald."],
    ],
    note: "Hier geldt: eerst kwalificeren, daarna rekenen. We beloven geen ERE's op basis van alleen een laadpunt of machine-naam."
  },
];

export default function HowItWorks() {
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema([{ name: "ERE Market", url: "" }, { name: 'Hoe werkt de ERE-keten?', url: '/hoe-het-werkt' }]), { "@type": "Article", headline: 'Hoe werkt de ERE-keten?', description: 'Uitleg over ERE’s, elektriciteit, mobiele machines, bemeting, REV, verificatie en marktverhandeling.', mainEntityOfPage: `${SITE_URL}/hoe-het-werkt`, dateModified: "2026-09-14", author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` } }] }} />
    <SiteNav />

    <section className="knowledgeHero">
      <div className="sectionKicker">KENNIS · REGELGEVING · MARKT</div>
      <h1>Hoe werkt de ERE-keten?<br/><em>En waar zit de echte complexiteit?</em></h1>
      <p>ERE's zijn geen gewone groene certificaten. Achter één verkoopbare eenheid zitten wetgeving, meetdata, bewijsvoering, REV-administratie, verificatie en markttransactie. Op deze pagina leggen we de keten uit — met de officiële bronnen erbij.</p>
      <div className="sourceBadge"><span>OFFICIËLE BRONNEN</span><strong>NEa · Overheid · REV</strong></div>
    </section>

    <section className="section knowledgeSection">
      <div className="twoCol"><div><div className="sectionKicker">DE BASIS</div><h2>Van beleid naar<br/><em>verhandelbare waarde.</em></h2></div><div><p>De Nederlandse ERE-systematiek is onderdeel van de brandstoftransitieverplichting. Brandstofleveranciers moeten jaarlijks voldoende emissiereductie aantonen. Zij kunnen ERE's creëren door hernieuwbare energie te leveren en in te boeken, of ERE's van andere marktpartijen kopen.</p><p>De NEa voert de regeling uit, beheert het REV en houdt toezicht. Voor elektriciteit is vanaf 2026 de inboekdienstverlener de route waarmee meerdere klanten geaggregeerd kunnen worden bediend.</p><div className="sourceCards">{officialLinks.map(([title,text,url]) => <a href={url} target="_blank" rel="noreferrer" key={title}><span>{title}</span><strong>{text}</strong><b>Officiële bron ↗</b></a>)}</div></div></div>
    </section>

    <section className="section darkSection knowledgeDark">
      <div className="sectionKicker">DE KETEN</div>
      <div className="knowledgeFlow">
        <div><span>01</span><h3>Elektriciteit</h3><p>Een machine of voertuig ontvangt elektriciteit via een levering die aan vervoer kan worden toegerekend.</p></div>
        <div><span>02</span><h3>Bemeting</h3><p>Het relevante kWh-volume moet aantoonbaar en herleidbaar zijn naar het vervoer of de mobiele machine.</p></div>
        <div><span>03</span><h3>Inboeken</h3><p>Een bevoegde inboeker registreert de levering in het REV en ontvangt ERE-E.</p></div>
        <div><span>04</span><h3>Verificatie</h3><p>De administratie en inboekingen worden jaarlijks onafhankelijk gecontroleerd.</p></div>
        <div><span>05</span><h3>Handel</h3><p>De ERE's kunnen worden overgedragen aan partijen die ze binnen de betreffende sector nodig hebben.</p></div>
      </div>
    </section>

    <section className="section knowledgeSection">
      <div className="sectionKicker">WELKE MACHINES?</div>
      <div className="twoCol"><div><h2>Van magazijnvloer<br/><em>tot bouwplaats.</em></h2></div><div><p>Onze commerciële focus ligt op intern elektrisch transport. Dat is waar ERE Market het grootste verschil wil maken: grote vloten, veel draaiuren en een bestaande elektriciteitsstroom die nog niet als ERE-keten is ingericht.</p><p>Daarom hebben we de belangrijkste toepassingen hieronder verder uitgesplitst. De NEa noemt expliciete voorbeelden, maar de lijst is niet-limitatief. Uiteindelijk beoordelen we altijd de feitelijke machine, de aansluiting, het bemeterde leverpunt en de bewijsvoering.</p></div></div>
      <div className="machineCategoryGrid">{machineGroups.map((group) => <a key={group.id} href={machineLinks[group.id] || `#${group.id}`} className="machineCategoryCard"><span>{group.kicker}</span><h3>{group.title}</h3><p>{group.intro}</p><b>Bekijk machines →</b></a>)}</div>
    </section>

    {machineGroups.map((group) => <section className="section machineDetail" id={group.id} key={group.id}>
      <div className="sectionKicker">{group.kicker}</div>
      <div className="twoCol"><div><h2>{group.title}</h2></div><div><p>{group.intro}</p></div></div>
      <div className="machineList">{group.items.map(([title,text], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      <div className="machineNote">{group.note}</div>
    </section>)}

    <section className="section knowledgeSection">
      <div className="sectionKicker">WAT MOET ER KLOPPEN?</div>
      <h2 className="wideHeading">De waarde zit niet alleen in de kWh.<br/><em>De bewijsbare kWh zijn de waarde.</em></h2>
      <div className="factGrid">{facts.map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
      <div className="technicalGrid">
        <div><h3>Bemeterd leverpunt</h3><p>De NEa beschrijft dit als het punt waar elektriciteit aan het voertuig of de mobiele machine wordt geleverd en de hoeveelheid wordt gemeten. In de praktijk zijn dit verkoopmeters.</p></div>
        <div><h3>MID en exclusiviteit</h3><p>Wanneer een aansluiting of secundair allocatiepunt niet uitsluitend voor vervoer wordt gebruikt, moet de levering via een MID-gecertificeerde meter aantoonbaar worden gemaakt. Vanaf 2027 is een externe MID-meter buiten de laadpaal niet meer toegestaan als route voor deze situatie.</p></div>
        <div><h3>100% hernieuwbaar</h3><p>Voor bedrijven kan onder voorwaarden 100% hernieuwbare elektriciteit worden aangetoond. Bij gemengde stromen kan tijdsintervalmeting nodig zijn om de hernieuwbare stroom aan vervoer toe te rekenen.</p></div>
        <div><h3>Kalenderjaar</h3><p>Een machtiging geldt voor één of meer volledige kalenderjaren en mag niet stilzwijgend worden verlengd. Per kalenderjaar kan een onderneming maar één inboekdienstverlener aanstellen.</p></div>
      </div>
    </section>

    <section className="section marketMechanics">
      <div className="sectionKicker">VRAAG & AANBOD</div>
      <div className="twoCol"><h2>Waarom ontstaat<br/><em>een marktprijs?</em></h2><div><p>De verplichting creëert vraag. Aanbieders creëren ERE's door hernieuwbare energie in te boeken. Omdat partijen kunnen kiezen tussen zelf creëren en kopen, ontstaat een markt voor schaarse, sectorgebonden ERE's.</p><p>Belangrijk: de NEa is geen beurs. Bedrijven maken onderlinge handelsafspraken over volume, prijs, levering en betaling. Binnen het REV vindt de administratieve overdracht plaats; de financiële afhandeling gebeurt daarbuiten.</p><Link href="/markt" className="button buttonPrimary">Bekijk de ERE Market →</Link></div></div>
      <div className="marketPrinciples"><div><b>Vraag</b><span>Partijen met een verplichting zoeken volume dat past bij hun sector en type ERE.</span></div><div><b>Aanbod</b><span>Inboekers brengen ERE's op de markt die daadwerkelijk zijn gecreëerd.</span></div><div><b>Prijs</b><span>Prijzen ontstaan uit bilaterale transacties en vraag en aanbod. Een schermprijs is niet automatisch een gerealiseerde transactie.</span></div><div><b>Timing</b><span>Het ERE-jaar, beschikbaarheid, overdracht en betaalmoment beïnvloeden de economische waarde.</span></div></div>
    </section>

    <section className="section specialistCall">
      <div><div className="sectionKicker">WAAROM ERE MARKET?</div><h2>Dit is geen administratief vinkje.<br/><em>Dit is ketenregie.</em></h2></div>
      <div><p>Een goede ERE-keten vraagt dat techniek, meetdata, regelgeving, machtigingen, verificatie, REV en handel op elkaar aansluiten. Precies daar zit onze rol: één specialistische ketenregisseur die de losse schakels organiseert en bewaakt.</p><p>De markt groeit snel. Dat maakt een controleerbaar proces belangrijker, niet minder belangrijk.</p><Link href="/ere-check" className="button buttonPrimary">Laat ons uw keten beoordelen →</Link></div>
    </section>

    <section className="section campaignSection"><ShareKit url="https://eremarket.nl/hoe-het-werkt" title="ERE Market — hoe werkt de ERE-keten?"/></section>
    <footer className="footer"><div className="brand"><span className="brandMark">ERE</span><span>MARKET</span></div><span>Van energie-expertise naar digitale ketenregie.</span><ShareKit compact /><Link href="/ere-aanvraag">2e ERE-aanvraag →</Link></footer>
    <a className="whatsappFloat" href="https://wa.me/31625050039?text=Hallo%20ERE%20Market%2C%20ik%20heb%20een%20vraag%20over%20ERE%27s." target="_blank" rel="noopener noreferrer">WhatsApp <span>↗</span></a>
  </main>;
}
