/* =====================================================================
   CONTENIDO DE LA WEB  ·  Este es el ÚNICO archivo que hay que editar
   para cambiar textos, servicios, precios, horario, teléfono, fotos
   y colores. Para otro salón: duplica la carpeta y cambia este archivo.

   Textos traducibles: { es: "…", en: "…" }.
   Si un texto solo tiene versión en español (o es un texto simple),
   se mostrará en español también con el idioma inglés activo.

   Fotos: pon la ruta en src (p. ej. "img/mi-foto.webp"). Si dejas
   src: "", se verá un hueco marcado con su tamaño recomendado.
   Las fotos actuales son de stock (ver FOTOS-STOCK.md).
   ===================================================================== */

window.SALON = {

  /* ---------- Franja de propuesta (pon show: false para quitarla) ---------- */
  proposalBanner: {
    show: true,
    text: { es: "Propuesta de diseño para Turmalina Salón de Belleza", en: "Design proposal for Turmalina Salón de Belleza" }
  },

  /* ---------- Idiomas ---------- */
  languages: ["es", "en"],
  defaultLanguage: "es",

  /* ---------- Colores y tipografías ---------- */
  theme: {
    rubellite: "#7E2643",   // rubelita: color principal (botones, titulares destacados)
    indigo: "#2F5D6B",      // indicolita: azul petróleo (galería, enlaces)
    amber: "#C7883C",       // ámbar: vetas y detalles
    amberText: "#8A5A1F",   // ámbar oscuro para textos pequeños sobre fondo claro
    stone: "#ECE8E4",       // piedra: fondo general
    stoneLight: "#F6F3F0",  // piedra clara: fondos alternos
    ink: "#1F1B1E",         // chorlo: texto y pie
    // Si cambias de tipografía, cambia también el <link> de Google Fonts en index.html
    fontDisplay: "'Marcellus', 'Times New Roman', serif",
    fontBody: "'Hanken Grotesk', system-ui, sans-serif"
  },

  /* ---------- Datos del negocio ---------- */
  business: {
    name: "Turmalina Salón de Belleza",
    shortName: "Turmalina",
    tagline: { es: "Salón de Belleza", en: "Beauty Salon" },
    phone: "+34663641738",          // formato internacional para el enlace de llamada
    phoneDisplay: "663 64 17 38",   // como se ve escrito
    whatsapp: "",                   // EDITABLE: número de WhatsApp en formato 34600000000. Vacío = botón oculto
    whatsappMessage: { es: "Hola, quería pedir cita en Turmalina.", en: "Hi, I'd like to book an appointment at Turmalina." },
    address: {
      street: "C/ Alcalá 414",
      building: "Centro Comercial Alcalá Norte",
      unit: { es: "Planta 1, Local 13", en: "1st floor, Unit 13" },
      postalCode: "28027",
      city: "Madrid",
      district: "Ciudad Lineal",
      region: "Comunidad de Madrid",
      country: "ES"
    },
    mapsQuery: "Turmalina Salón de Belleza, Calle de Alcalá 414, 28027 Madrid",
    rating: { value: 4.7, count: 150, source: "Google" },   // valoración y nº de reseñas
    siteUrl: "https://turmalina-salon.example.com/"         // EDITABLE: dominio definitivo
  },

  /* ---------- Horario (formato 24 h; null = cerrado) ----------
     Orden: lunes, martes, miércoles, jueves, viernes, sábado, domingo */
  hours: [
    ["10:00", "20:00"],
    ["10:00", "20:00"],
    ["10:00", "20:00"],
    ["10:00", "20:00"],
    ["10:00", "20:00"],
    ["10:00", "19:00"],
    null
  ],

  /* ---------- SEO (las etiquetas Open Graph están también en index.html) ---------- */
  seo: {
    title: { es: "Turmalina Salón de Belleza | Peluquería y estética en Ciudad Lineal", en: "Turmalina Salón de Belleza | Hair and beauty salon in Ciudad Lineal, Madrid" },
    description: { es: "Peluquería unisex, manicura, depilación, faciales y tratamientos corporales en el C.C. Alcalá Norte (C/ Alcalá 414, Madrid), junto al metro Ciudad Lineal. Llama al 663 64 17 38.", en: "Unisex hairdressing, manicures, waxing, facials and body treatments at Alcalá Norte shopping centre (C/ Alcalá 414, Madrid), next to Ciudad Lineal metro." }
  },

  /* ---------- Textos de la interfaz ---------- */
  ui: {
    skip: { es: "Saltar al contenido", en: "Skip to content" },
    menu: { es: "Menú", en: "Menu" },
    close: { es: "Cerrar", en: "Close" },
    call: { es: "Llamar", en: "Call" },
    directions: { es: "Cómo llegar", en: "Get directions" },
    whatsapp: { es: "WhatsApp", en: "WhatsApp" },
    languageLabel: { es: "Idioma", en: "Language" },
    openNow: { es: "Abierto ahora", en: "Open now" },
    closedNow: { es: "Cerrado ahora", en: "Closed now" },
    closesAt: { es: "cierra a las", en: "closes at" },
    opensAt: { es: "abre", en: "opens" },
    closed: { es: "Cerrado", en: "Closed" },
    today: { es: "hoy", en: "today" },
    from: { es: "desde", en: "from" },
    photo: { es: "Foto", en: "Photo" },
    recommended: { es: "recomendado", en: "recommended" },
    before: { es: "Antes", en: "Before" },
    after: { es: "Después", en: "After" },
    compareLabel: { es: "Desliza para comparar antes y después", en: "Slide to compare before and after" },
    ratingText: { es: "{value} en {source}, más de {count} reseñas", en: "{value} on {source}, {count}+ reviews" },
    ratingShort: { es: "más de {count} reseñas en {source}", en: "{count}+ reviews on {source}" },
    sampleText: { es: "Texto de ejemplo", en: "Sample text" },
    samplePrice: { es: "Precios de ejemplo, editables", en: "Sample prices, editable" }
  },

  nav: [
    { id: "servicios", label: { es: "Servicios", en: "Services" } },
    { id: "galeria", label: { es: "Antes y después", en: "Before & after" } },
    { id: "opiniones", label: { es: "Opiniones", en: "Reviews" } },
    { id: "visitanos", label: { es: "Horario", en: "Opening hours" } },
    { id: "contacto", label: { es: "Contacto", en: "Contact" } }
  ],

  /* ---------- 1. Inicio ---------- */
  hero: {
    title: { es: "Belleza con trato de toda la vida.", en: "Beauty, with old-fashioned care." },
    text: {
      es: "Peluquería para mujer y hombre, manicura, depilación y tratamientos faciales y corporales. Te escuchamos, te aconsejamos y te dejamos como quieres.",
      en: "Hairdressing for women and men, manicures, waxing, facials and body treatments. We listen, we advise, and you leave looking the way you want."
    },
    where: { es: "Planta 1, Local 13 del C.C. Alcalá Norte, junto al metro Ciudad Lineal.", en: "1st floor, Unit 13, Alcalá Norte shopping centre, next to Ciudad Lineal metro." },
    image: { src: "img/hero-salon.webp", size: "840 × 1050", alt: { es: "Peluquera peinando a una clienta en el salón", en: "Hairdresser styling a client in the salon" }, label: { es: "salón o clienta", en: "salon or client" } }
  },

  /* ---------- 2. Servicios (precios de ejemplo) ---------- */
  services: {
    title: { es: "Servicios y precios", en: "Services and prices" },
    intro: {
      es: "Todo lo que necesitas en un mismo salón. Te confirmamos el precio exacto al pedir cita, según tu pelo y el tratamiento.",
      en: "Everything you need in one salon. We'll confirm the exact price when you book, depending on your hair and treatment."
    },
    categories: [
      {
        id: "peluqueria",
        name: { es: "Peluquería", en: "Hair" },
        blurb: { es: "Para mujer y hombre: corte, color y peinado.", en: "For women and men: cuts, colour and styling." },
        image: { src: "img/servicio-peluqueria.webp", size: "800 × 600", alt: { es: "Peluquero cortando el pelo con tijeras", en: "Hairdresser cutting hair with scissors" }, label: { es: "peluquería", en: "hair" } },
        items: [
          { name: { es: "Corte de señora", en: "Women's cut" }, price: 16 },
          { name: { es: "Corte de caballero", en: "Men's cut" }, price: 11 },
          { name: { es: "Lavar y peinar", en: "Wash and blow-dry" }, price: 13 },
          { name: { es: "Color", en: "Colour" }, price: 30 },
          { name: { es: "Mechas", en: "Highlights" }, price: 42 },
          { name: { es: "Alisado de keratina", en: "Keratin smoothing" }, price: 90 },
          { name: { es: "Peinado de fiesta", en: "Occasion styling" }, price: 28 }
        ]
      },
      {
        id: "manos-pies",
        name: { es: "Manos y pies", en: "Hands and feet" },
        blurb: { es: "Manicura y pedicura, clásica o semipermanente.", en: "Manicures and pedicures, classic or gel." },
        image: { src: "img/servicio-manos.webp", size: "800 × 600", alt: { es: "Manicura en el salón", en: "Manicure at the salon" }, label: { es: "manicura", en: "manicure" } },
        items: [
          { name: { es: "Manicura", en: "Manicure" }, price: 11 },
          { name: { es: "Manicura semipermanente", en: "Gel manicure" }, price: 17 },
          { name: { es: "Pedicura", en: "Pedicure" }, price: 20 },
          { name: { es: "Pedicura semipermanente", en: "Gel pedicure" }, price: 26 }
        ]
      },
      {
        id: "depilacion",
        name: { es: "Depilación", en: "Waxing" },
        blurb: { es: "Con cera, rápida y con cuidado de la piel.", en: "Wax hair removal, quick and gentle on the skin." },
        image: { src: "img/servicio-depilacion.webp", size: "800 × 600", alt: { es: "Cera tibia preparada para depilar", en: "Warm wax ready for waxing" }, label: { es: "depilación", en: "waxing" } },
        items: [
          { name: { es: "Cejas", en: "Eyebrows" }, price: 6 },
          { name: { es: "Labio superior", en: "Upper lip" }, price: 4 },
          { name: { es: "Axilas", en: "Underarms" }, price: 7 },
          { name: { es: "Medias piernas", en: "Half legs" }, price: 14 },
          { name: { es: "Piernas completas", en: "Full legs" }, price: 22 }
        ]
      },
      {
        id: "facial",
        name: { es: "Tratamientos faciales", en: "Facials" },
        blurb: { es: "Limpieza, hidratación y cuidado según tu piel.", en: "Cleansing, hydration and care for your skin type." },
        image: { src: "img/servicio-facial.webp", size: "800 × 600", alt: { es: "Clienta recibiendo un tratamiento facial", en: "Client receiving a facial" }, label: { es: "facial", en: "facial" } },
        items: [
          { name: { es: "Higiene facial", en: "Deep-cleansing facial" }, price: 35 },
          { name: { es: "Tratamiento hidratante", en: "Hydrating facial" }, price: 40 },
          { name: { es: "Tratamiento antiedad", en: "Anti-ageing facial" }, price: 48 }
        ]
      },
      {
        id: "corporal",
        name: { es: "Tratamientos corporales", en: "Body treatments" },
        blurb: { es: "Masajes, presoterapia y cavitación.", en: "Massage, pressotherapy and cavitation." },
        image: { src: "img/servicio-corporal.webp", size: "800 × 600", alt: { es: "Masaje de espalda en cabina", en: "Back massage in a treatment room" }, label: { es: "corporal", en: "body" } },
        items: [
          { name: { es: "Masaje relajante (30 min)", en: "Relaxing massage (30 min)" }, price: 25 },
          { name: { es: "Masaje relajante (60 min)", en: "Relaxing massage (60 min)" }, price: 40 },
          { name: { es: "Presoterapia (sesión)", en: "Pressotherapy (session)" }, price: 20 },
          { name: { es: "Cavitación (sesión)", en: "Cavitation (session)" }, price: 30 }
        ]
      }
    ]
  },

  /* ---------- 3. Galería antes / después ----------
     AVISO: las parejas actuales son la MISMA foto de stock con un retoque
     de color en la de "antes". Sustitúyelas por fotos reales del salón. */
  gallery: {
    title: { es: "Antes y después", en: "Before and after" },
    intro: { es: "Desliza sobre la foto para ver el cambio.", en: "Slide across the photo to see the change." },
    pairs: [
      {
        label: { es: "Color", en: "Colour" },
        before: { src: "img/color-antes.webp", size: "880 × 1100", alt: { es: "Melena apagada antes del color", en: "Dull hair before colouring" } },
        after: { src: "img/color-despues.webp", size: "880 × 1100", alt: { es: "Melena con color luminoso después", en: "Bright, glossy colour after" } }
      },
      {
        label: { es: "Mechas", en: "Highlights" },
        before: { src: "img/mechas-antes.webp", size: "880 × 1100", alt: { es: "Melena sin brillo antes de las mechas", en: "Flat hair before highlights" } },
        after: { src: "img/mechas-despues.webp", size: "880 × 1100", alt: { es: "Melena con mechas balayage después", en: "Hair with balayage highlights after" } }
      },
      {
        label: { es: "Manicura", en: "Manicure" },
        before: { src: "img/manicura-antes.webp", size: "880 × 1100", alt: { es: "Manos antes de la manicura", en: "Hands before the manicure" } },
        after: { src: "img/manicura-despues.webp", size: "880 × 1100", alt: { es: "Manos con manicura terminada", en: "Hands with finished manicure" } }
      }
    ]
  },

  /* ---------- 4. Por qué elegirnos y opiniones ---------- */
  why: {
    title: { es: "Por qué nos eligen", en: "Why clients choose us" },
    points: [
      { title: { es: "Te conocemos por tu nombre", en: "We know you by name" }, text: { es: "Recordamos tu color, tu corte y cómo te gusta. No tienes que explicarlo cada vez.", en: "We remember your colour, your cut and how you like it. No need to explain it every time." } },
      { title: { es: "Te aconsejamos de verdad", en: "Honest advice" }, text: { es: "Te decimos qué te conviene y qué productos usar en casa para que el resultado dure.", en: "We tell you what suits you and which products to use at home so the result lasts." } },
      { title: { es: "Al lado del metro", en: "Next to the metro" }, text: { es: "En la planta 1 del C.C. Alcalá Norte, local 13, a un paso del metro Ciudad Lineal.", en: "On the first floor of Alcalá Norte shopping centre, unit 13, steps from Ciudad Lineal metro." } }
    ],
    reviews: {
      title: { es: "Lo que dicen nuestros clientes", en: "What our clients say" },
      // TEXTO DE EJEMPLO: sustituir por reseñas reales con permiso de sus autores
      items: [
        { name: "Carmen R.", service: { es: "Color y peinado", en: "Colour and styling" }, text: { es: "Vengo desde hace años. Me aconsejan con sinceridad y siempre salgo con el color que quería.", en: "I've been coming for years. They give honest advice and I always leave with the colour I wanted." } },
        { name: "Pilar G.", service: { es: "Tratamiento facial", en: "Facial" }, text: { es: "Me explicaron qué necesitaba mi piel y qué usar en casa. Se nota la diferencia.", en: "They explained what my skin needed and what to use at home. I can see the difference." } },
        { name: "Javier M.", service: { es: "Corte de caballero", en: "Men's cut" }, text: { es: "Rápido, bien hecho y con buena conversación. Lo tengo al lado del metro.", en: "Quick, well done and good conversation. And it's right by the metro." } }
      ]
    }
  },

  /* ---------- 5. Horario y ubicación ---------- */
  visit: {
    title: { es: "Horario y cómo llegar", en: "Opening hours and directions" },
    findUs: {
      // EDITABLE: confirmar indicaciones con el dueño
      es: "Estamos en la planta 1 del Centro Comercial Alcalá Norte, en el local 13.",
      en: "We're on the first floor of Alcalá Norte shopping centre, in unit 13."
    },
    transport: {
      es: "Muy cerca del metro Ciudad Lineal (línea 5).",
      en: "Very close to Ciudad Lineal metro station (line 5)."
    },
    hoursTitle: { es: "Horario", en: "Opening hours" },
    mapTitle: { es: "Mapa de Google con la ubicación del salón", en: "Google map showing the salon's location" }
  },

  /* ---------- 6. Contacto ---------- */
  contact: {
    title: { es: "Pide tu cita", en: "Book your appointment" },
    text: {
      es: "Llámanos y te buscamos hueco. Si tienes dudas sobre un tratamiento, pregúntanos sin compromiso.",
      en: "Give us a call and we'll find you a slot. If you have questions about a treatment, just ask."
    }
  },

  /* ---------- 7. Pie y páginas legales ---------- */
  footer: {
    legal: [
      { href: "legal/aviso-legal.html", label: { es: "Aviso legal", en: "Legal notice" } },
      { href: "legal/privacidad.html", label: { es: "Privacidad", en: "Privacy" } },
      { href: "legal/cookies.html", label: { es: "Cookies", en: "Cookies" } }
    ],
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." }
  },

  // Datos para las páginas legales (EDITABLE: completar con los datos reales del titular)
  legal: {
    owner: "[Nombre y apellidos o razón social]",
    taxId: "[NIF/CIF]",
    email: "[correo@ejemplo.com]",
    registry: "[Datos registrales, si es sociedad]",
    updated: "noviembre de 2026"
  }
};
