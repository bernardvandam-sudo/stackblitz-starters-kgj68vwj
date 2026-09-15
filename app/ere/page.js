import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { ERE_PAGES } from "./data";
import { JsonLd, SITE_URL, breadcrumbSchema } from "../components/JsonLd";
import { pageMetadata } from "../metadata";

export const metadata = pageMetadata({ title: "ERE kennisbank", description: "Praktische uitleg over ERE's, elektrische heftrucks, mobiele machines, MLOEA, MID-meting en ERE-opbrengst.", path: "/ere" });

const groups = [
  ["Intern elektrisch transport", ["elektrische-heftrucks", "reachtrucks", "orderpicktrucks", "palletwagens-en-stapelaars", "elektrische-trekkers"]],
  ["Techniek & berekening", ["elektrische-mobiele-machines", "mloea", "mid-meter", "ere-opbrengst-berekenen"]],
  ["Sectoren", ["logistiek-en-distributie", "bouw-en-infra", "landbouw-en-bosbouw", "overig-elektrisch-vervoer"]]
];

export default function EREKnowledge() {
  return <main>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema([{ name: "ERE Market", url: "" }, { name: "ERE kennis", url: "/ere" }]), { "@type": "CollectionPage", name: "ERE kennisbank", description: "Praktische uitleg over ERE's en elektrische mobiliteit.", url: `${SITE_URL}/ere` }] }} />
    <SiteNav />
    <section className="knowledgeHero"><div className="sectionKicker">ERE KENNISBANK</div><h1>De vragen achter de<br/><em>ERE-waarde.</em></h1><p>Van een elektrische heftruck tot MLOEA en MID-meting: hier leggen we de belangrijkste onderdelen van de ERE-keten uit. Helder voor ondernemers, technisch genoeg voor een serieus dossier.</p><div className="sourceBadge"><span>ACTUELE BASIS</span><strong>NEa · REV · elektrische mobiliteit</strong></div></section>
    <section className="section knowledgeSection"><div className="twoCol"><div><div className="sectionKicker">WAAR BEGIN JE?</div><h2>Niet bij de prijs.<br/><em>Bij de kWh.</em></h2></div><div><p>Een ERE-opbrengst begint bij elektriciteit die aantoonbaar aan vervoer of een mobiele machine wordt geleverd. Daarna komen bemeting, bewijsvoering, inboeken, verificatie en marktverhandeling.</p><Link href="/ere-check" className="button buttonPrimary">Bereken uw ERE-potentieel →</Link></div></div></section>
    {groups.map(([group, slugs]) => <section className="section knowledgeIndex" key={group}><div className="sectionKicker">{group.toUpperCase()}</div><div className="knowledgeCards">{slugs.map((slug) => { const p = ERE_PAGES[slug]; return <Link href={`/ere/${slug}`} className="knowledgeCard" key={slug}><span>{p.kicker}</span><h3>{p.title}</h3><p>{p.description}</p><b>Lees verder →</b></Link>; })}</div></section>)}
    <section className="section darkSection"><div className="twoCol"><div><div className="sectionKicker">OFFICIËLE BRONNEN</div><h2>Regels eerst.<br/><em>Marketing daarna.</em></h2></div><div><p>ERE Market gebruikt de officiële NEa-regels als uitgangspunt. De kennisbank is bedoeld als praktische uitleg en vervangt geen formele beoordeling van uw aansluiting, meetinrichting of dossier.</p><a className="button buttonPrimary" href="https://www.emissieautoriteit.nl/regelgeving/hernieuwbare-energie-voor-vervoer-eres/inboeken-hernieuwbare-energie-vervoer/inboeken-elektriciteit" target="_blank" rel="noreferrer">Bekijk NEa · inboeken elektriciteit ↗</a></div></div></section>
  </main>;
}
