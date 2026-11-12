import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { menuData } from "@/data/menuData";
import { degustacion } from "@/data/degustacion";

const OWNER = "Razia Bibi";
const NIE = "Y4154636E";
const ADDRESS = "C/ Marina Escobar, 1, 47001 Valladolid, España";
const EMAIL = "tulsindian@gmail.com";
const PHONE = "+34 645 94 62 02";
const PHONE_ALT = "+34 983 84 46 07";
const BASE = "https://tulsiindianvalladolid.com";

const menuByCategory = Object.entries(menuData).map(([key, category]) => ({
  key,
  title: category.title,
  items: [
    ...(category.items ?? []).map(item => ({ name: item.name, allergens: item.allergens ?? [] })),
    ...(category.subcategories ?? []).flatMap(sub => sub.items.map(item => ({ name: item.name, allergens: item.allergens ?? [] })))
  ]
}));

const documents: Record<string, { title: string; description: string }> = {
  "aviso-legal": { title: "Aviso legal", description: "Información del titular y condiciones de uso de la web de Tulsi Indian Restaurant." },
  "privacidad": { title: "Política de privacidad", description: "Cómo trata Tulsi Indian Restaurant los datos de reservas y pedidos." },
  "cookies": { title: "Cookies y almacenamiento", description: "Información sobre cookies y almacenamiento local en la web de Tulsi." },
  "alergenos": { title: "Información sobre alérgenos", description: "Información sobre alérgenos de la carta de Tulsi Indian Restaurant." },
  "condiciones-pedidos": { title: "Condiciones de pedidos", description: "Información sobre precios, pago, entrega, recogida y reservas." }
};

function Meta({ slug }: { slug: string }) {
  useEffect(() => {
    const doc = documents[slug];
    if (!doc) return;
    document.title = doc.title + " | Tulsi Indian Restaurant Valladolid";
    const ensure = (selector: string, tag: string, attr: string, value: string) => {
      let node = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!node) {
        node = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
        document.head.appendChild(node);
      }
      node.setAttribute(attr, value);
      return node;
    };
    ensure('meta[name="description"]', "meta", "name", "description").setAttribute("content", doc.description);
    ensure('link[rel="canonical"]', "link", "rel", "canonical").setAttribute("href", BASE + "/#/legal/" + slug);
    return () => { document.title = "Restaurante Indio Tulsi Valladolid | Cocina India Auténtica"; };
  }, [slug]);
  return null;
}

function Shell({ children, title }: { children: React.ReactNode; title: string }) {
  return <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border">
      <div className="container mx-auto px-5 py-5 flex items-center justify-between gap-4">
        <Link to="/" className="text-accent font-semibold hover:underline" aria-label="Volver a la página principal de Tulsi">Tulsi Indian Restaurant</Link>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent"><ArrowLeft size={16}/> Volver a la web</Link>
      </div>
    </header>
    <article className="container mx-auto max-w-4xl px-5 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-accent mb-8">{title}</h1>
      <div className="legal-prose space-y-6 leading-relaxed">{children}</div>
      <nav aria-label="Información legal" className="mt-12 border-t border-border pt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link className="text-accent hover:underline" to="/legal/aviso-legal">Aviso legal</Link>
        <Link className="text-accent hover:underline" to="/legal/privacidad">Privacidad</Link>
        <Link className="text-accent hover:underline" to="/legal/cookies">Cookies</Link>
        <Link className="text-accent hover:underline" to="/legal/alergenos">Alérgenos</Link>
        <Link className="text-accent hover:underline" to="/legal/condiciones-pedidos">Condiciones de pedidos</Link>
      </nav>
    </article>
  </main>;
}

function PendingTasks() {
  return <section className="rounded-xl border border-accent/40 bg-secondary p-6">
    <h2 className="text-2xl font-semibold text-accent mb-3">Información que el titular debe completar o validar</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>Confirmar si el domicilio comercial es también el domicilio a efectos legales y fiscales.</li>
      <li>Confirmar si Tulsi debe indicar datos de inscripción en un registro público.</li>
      <li>Confirmar las condiciones de cancelación y modificación de reservas y pedidos, los plazos de recogida/entrega y el ámbito territorial del reparto.</li>
      <li>Confirmar los plazos de conservación aplicados a consultas, reservas, pedidos, facturación y datos del carrito.</li>
      <li>Confirmar las entidades proveedoras que acceden a los datos, los contratos de encargo y si hay transferencias internacionales y qué garantías las cubren.</li>
      <li>Confirmar la base jurídica final para cada uso de datos, los canales y procedimiento para ejercer derechos, y si corresponde designar un delegado de protección de datos.</li>
      <li>La cocina debe validar por escrito la ficha de alérgenos de cada plato y la información sobre contaminación cruzada.</li>
      <li>Revisar la información de precios, impuestos incluidos, gastos, servicio, pagos y reclamaciones antes de aceptar pedidos.</li>
    </ul>
    <p className="mt-4 text-sm text-muted-foreground">Las menciones pendientes se muestran expresamente para no presentar datos no comprobados como si fueran ciertos.</p>
  </section>;
}

function LegalNotice() {
  return <Shell title="Aviso legal">
    <p>Este sitio web presenta información y servicios de Tulsi Indian Restaurant en Valladolid.</p>
    <section className="rounded-xl border border-border bg-card p-6 space-y-3">
      <h2 className="text-2xl font-semibold text-accent">Titular</h2>
      <p><strong>Titular / razón social:</strong> {OWNER}</p>
      <p><strong>NIE:</strong> {NIE}</p>
      <p className="flex gap-2"><MapPin aria-hidden="true"/><span><strong>Domicilio del negocio:</strong> {ADDRESS}</span></p>
      <p className="flex gap-2"><Mail aria-hidden="true"/><span><strong>Correo:</strong> <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a></span></p>
      <p className="flex gap-2"><Phone aria-hidden="true"/><span><strong>Teléfonos:</strong> <a className="underline" href="tel:+34645946202">{PHONE}</a> · <a className="underline" href="tel:+34983844607">{PHONE_ALT}</a></span></p>
      <p><strong>Registro público:</strong> Pendiente de confirmación por el titular, si resulta exigible.</p>
    </section>
    <h2 className="text-2xl font-semibold text-accent">Uso del sitio</h2>
    <p>El usuario debe utilizar el sitio de forma lícita y no realizar acciones que dañen, sobrecarguen o impidan su funcionamiento. El contenido de la carta y la disponibilidad de platos pueden variar; confirma la información con el restaurante antes de hacer un pedido, especialmente si existe una alergia o intolerancia.</p>
    <p>Las reservas y pedidos online se gestionan a través de Dish. El código también incluye funciones de Supabase para consultar reseñas y tramitar pedidos; el titular debe confirmar qué flujos están activos y qué servicios y encargados participan.</p>
    <p>Para consultas sobre el sitio, contacta con el titular por los canales indicados arriba.</p>
    <PendingTasks/>
  </Shell>;
}

function PrivacyPolicy() {
  return <Shell title="Política de privacidad">
    <p className="rounded-xl border border-accent/40 bg-secondary p-5"><strong>Información básica:</strong> responsable: {OWNER} (NIE {NIE}); domicilio: {ADDRESS}. Se usan los datos de contacto para responder solicitudes y los datos de pedido para tramitar compra, pago, recogida o entrega y atender incidencias. Canal de contacto: <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a>. No envíes información médica o de salud a través de formularios o notas generales.</p>
    <h2 className="text-2xl font-semibold text-accent">Información adicional</h2>
    <h3 className="text-xl font-semibold">Qué datos y para qué</h3>
    <p>La web no tiene actualmente un formulario propio de contacto. Las reservas y pedidos online se ofrecen mediante Dish. Al solicitar una reserva o hacer un pedido, pueden tratarse los datos identificativos y de contacto, los detalles del servicio y, si procede, la dirección de entrega.</p>
    <h3 className="text-xl font-semibold">Base jurídica</h3>
    <p>Para gestionar una reserva, responder una consulta o preparar y cobrar un pedido, la base prevista es la aplicación de medidas precontractuales o la ejecución del contrato solicitado. Los datos necesarios para cumplir deberes fiscales y contables se tratarán conforme a la obligación legal aplicable. El titular debe confirmar la base de cada operación antes de publicar esta información como definitiva.</p>
    <h3 className="text-xl font-semibold">Proveedores y destinatarios</h3>
    <p>Las reservas y pedidos online se ofrecen mediante Dish. El código contiene además funciones de Supabase para consultar reseñas y tramitar pedidos. El titular debe confirmar cuáles están activas, qué datos recibe cada proveedor, los contratos aplicables y sus condiciones de privacidad.</p>
    <h3 className="text-xl font-semibold">Conservación y transferencias</h3>
    <p><strong>Plazos de conservación:</strong> pendientes de confirmación por el titular según la finalidad y los plazos legales aplicables. <strong>Transferencias internacionales:</strong> pendientes de verificar con cada proveedor y sus garantías; no se afirma que no existan.</p>
    <h3 className="text-xl font-semibold">Derechos</h3>
    <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a> e identificando el tratamiento. También puedes reclamar ante la Agencia Española de Protección de Datos (<a className="underline" href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">AEPD</a>). El titular debe confirmar el procedimiento interno y si corresponde un delegado de protección de datos.</p>
    <p>Los datos solicitados para tramitar una reserva o pedido son necesarios para prestar ese servicio; si no se facilitan, puede no ser posible gestionarlo. No se utilizan datos para enviar publicidad en esta web.</p>
    <PendingTasks/>
  </Shell>;
}

function CookiesPolicy() {
  return <Shell title="Cookies y almacenamiento local">
    <p>El código de esta web no incorpora cookies de publicidad, perfilado ni analítica. No se cargan mapas de terceros al visitar la página. Puedes abrir Google Maps voluntariamente mediante un enlace y el widget externo de reservas Dish solo se carga después de pulsar su botón.</p>
    <p>El carrito de compra utiliza el almacenamiento local del navegador para conservar temporalmente el identificador de sesión y los artículos seleccionados. Se usa para que funcione la cesta que el propio usuario ha iniciado. El acceso del personal utiliza almacenamiento técnico para mantener su sesión. No se emplean estas funciones para seguimiento publicitario.</p>
    <p>Al abrir Google Maps o cargar el widget externo de reservas Dish, esos proveedores pueden aplicar sus propias tecnologías y políticas. Esta web no controla las cookies que puedan instalar en sus servicios.</p>
    <p>No hay preferencias opcionales de cookies que gestionar desde este sitio mientras no se instalen tecnologías no necesarias. Si se incorporan analítica, publicidad u otros recursos de terceros en el futuro, deberán revisarse e informarse antes de su activación.</p>
    <PendingTasks/>
  </Shell>;
}

const allergenLabels: Record<string, string> = {
  gluten: "Cereales con gluten", crustaceos: "Crustáceos", huevos: "Huevos", pescado: "Pescado",
  cacahuetes: "Cacahuetes", soja: "Soja", lacteos: "Leche y derivados (incluida la lactosa)",
  frutos_cascara: "Frutos de cáscara", apio: "Apio", mostaza: "Mostaza", sesamo: "Granos de sésamo",
  sulfitos: "Dióxido de azufre y sulfitos", altramuces: "Altramuces", moluscos: "Moluscos"
};

const allergens = [
  "Cereales con gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes",
  "Soja", "Leche y derivados (incluida la lactosa)", "Frutos de cáscara",
  "Apio", "Mostaza", "Granos de sésamo", "Dióxido de azufre y sulfitos",
  "Altramuces", "Moluscos"
];

function AllergenPolicy() {
  return <Shell title="Información sobre alérgenos">
    <p className="rounded-xl border border-accent/50 bg-secondary p-5 text-lg"><strong>Las fichas digitales muestran algunos alérgenos, pero su contenido y exhaustividad están pendientes de validación por cocina.</strong> Confirma ingredientes, trazas y contacto cruzado con el restaurante antes de pedir y al recibirlo. No se afirma que un plato esté libre de alérgenos.</p>
    <p>La normativa europea identifica estas sustancias o productos que causan alergias o intolerancias:</p>
    <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-6">{allergens.map(item => <li key={item}>{item}</li>)}</ul>
    <h2 className="text-2xl font-semibold text-accent">Platos con información pendiente</h2>
    <div className="space-y-4">{menuByCategory.map(category => <details key={category.key} className="rounded-lg border border-border bg-card p-4">
      <summary className="cursor-pointer font-semibold text-accent">{category.title} ({category.items.length})</summary>
      <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">{category.items.map((item, i) => <li key={item.name + i}>{item.name} — <span className="text-muted-foreground">{item.allergens.length ? "registrados: " + item.allergens.map(a => allergenLabels[a] ?? a).join(", ") + "; pendientes de validar por cocina" : "alérgenos pendientes de confirmar por cocina"}</span></li>)}</ul>
    </details>)}
    <details className="rounded-lg border border-border bg-card p-4"><summary className="cursor-pointer font-semibold text-accent">{degustacion.title} ({degustacion.menus.length})</summary><ul className="mt-3 space-y-3">{degustacion.menus.map(menu => { const dishes = [...Object.values(menu.sections).flat().map(item => item.name), "Cheese Naan", "Arroz", "Postre"]; return <li key={menu.name}><strong>{menu.name}</strong><ul className="mt-1 list-disc pl-6">{dishes.map((dish, index) => <li key={dish + index}>{dish} — <span className="text-muted-foreground">alérgenos pendientes de validar por cocina</span></li>)}</ul></li>; })}</ul></details></div>
    <p>Consulta por teléfono antes de hacer el pedido: <a className="underline" href="tel:+34645946202">{PHONE}</a> o <a className="underline" href="tel:+34983844607">{PHONE_ALT}</a>. La cocina debe confirmar también cualquier riesgo de contacto cruzado; esta web no dispone todavía de información confirmada sobre ese punto.</p>
  </Shell>;
}

function OrderTerms() {
  return <Shell title="Condiciones de pedidos">
    <h2 className="text-2xl font-semibold text-accent">Precios y pago</h2>
    <p>La carta muestra precios en euros. Antes de enviar el pedido, revisa en Dish el importe total, posibles gastos, condiciones de recogida o entrega y forma de pago. El titular debe confirmar que estos datos coinciden con la operativa real del restaurante.</p>
    <h2 className="text-2xl font-semibold text-accent">Recogida, entrega y reservas</h2>
    <p>Los pedidos y reservas online se ofrecen mediante Dish. Antes de confirmar, revisa el ámbito territorial, los plazos, gastos y condiciones de cancelación que presente el servicio. El titular debe confirmar que reflejan la operativa real.</p>
    <h2 className="text-2xl font-semibold text-accent">Alérgenos y disponibilidad</h2>
    <p>Consulta la información de alérgenos antes de pedir y confirma con el personal al recibir el pedido. La disponibilidad de la carta puede variar.</p>
    <p>Para cambios, cancelaciones, reclamaciones o incidencias, contacta con el restaurante en <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a> o en los teléfonos publicados. El titular debe completar las condiciones comerciales y los plazos que se aplican realmente.</p>
    <PendingTasks/>
  </Shell>;
}

export default function LegalPages() {
  const { page = "aviso-legal" } = useParams();
  return <><Meta slug={documents[page] ? page : "aviso-legal"} />{
    page === "privacidad" ? <PrivacyPolicy/> :
    page === "cookies" ? <CookiesPolicy/> :
    page === "alergenos" ? <AllergenPolicy/> :
    page === "condiciones-pedidos" ? <OrderTerms/> :
    <LegalNotice/>
  }</>;
}
