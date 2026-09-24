export const BRAND = {
  name: "Tabble",
  tagline: "Every table becomes your best waiter.",
  email: "hello@tabble.app",
};

export const NAV_ITEMS = [
  { label: "Home", route: "home" as const },
  { label: "Features", route: "features" as const },
  { label: "How it works", route: "how-it-works" as const },
  { label: "Pricing", route: "pricing" as const },
  { label: "About", route: "about" as const },
  { label: "FAQ", route: "faq" as const },
];

export const HERO = {
  eyebrow: "QR dine-in ordering for restaurants",
  headline: "Every table becomes your best waiter.",
  sub: "Tabble puts your menu behind a QR code on the table. Guests browse photos, order from their seats, and pay when they're ready — while every order lands on your kitchen screen the moment they tap.",
  ctaPrimary: "Request early access",
  ctaSecondary: "See how it works",
  trust: "Founding cohort is open — the first 50 restaurants lock founding pricing for life.",
};

export const PROBLEMS = {
  kicker: "The old way",
  headline: "Rush hour is won or lost at the table.",
  intro:
    "On a busy Friday night, your floor has more hungry tables than free hands. The bottleneck was never the kitchen — it's everything that happens between a guest deciding to order and the kitchen hearing about it.",
  pains: [
    {
      title: "Guests wait to order",
      body: "A party sits down, decides in two minutes, then waits for a free waiter to notice them. Appetite cools, orders shrink, reviews mention slow service.",
      ticket: { table: "06", time: "21:42", stamp: "WAITING", stampRot: "-7deg" },
    },
    {
      title: "Orders get lost in translation",
      body: "Scribbled pads, shouted modifications, tickets printed after the waiter walks past the POS. Every hand-off is a place the order can bend.",
      ticket: { table: "11", time: "21:47", stamp: "MISSED", stampRot: "4deg" },
    },
    {
      title: "The bill is where evenings go to die",
      body: "Guests finish dessert, then wait to flag someone down, wait for the machine, wait for change. Your busiest tables sit occupied — not turning.",
      ticket: { table: "02", time: "22:15", stamp: "UNPAID", stampRot: "-5deg" },
    },
  ],
  statLine: [
    { value: "0", label: "app downloads for guests" },
    { value: "1", label: "QR code per table" },
    { value: "3", label: "taps from scan to order" },
  ],
};

export const STEPS = [
  {
    n: "01",
    title: "Guest scans the table QR",
    body: "No app store, no sign-up, no password. Any phone camera opens the menu in the browser in a couple of seconds. The menu already knows the table number.",
    detail: "Works on any smartphone with a camera — Android, iPhone, even older browsers.",
  },
  {
    n: "02",
    title: "They order from their seats",
    body: "A photo-first menu with your modifiers and add-ons. Guests order the first round, then add more rounds without flagging anyone down — bigger tickets, naturally.",
    detail: "Veg/non-veg badges, spice levels, add-on pricing — exactly how your menu already thinks.",
  },
  {
    n: "03",
    title: "Kitchen fires instantly",
    body: "The order lands on your kitchen display the moment it's placed — table number, items, notes, all typed by the guest, not re-entered by a waiter mid-rush.",
    detail: "No printer jams, no lost chits, no 'which table was the extra naan for?'",
  },
  {
    n: "04",
    title: "Guests pay when ready",
    body: "UPI, cards, or wallets — guests pay from the same screen whenever they're done. Tables turn faster, and your staff spend their time on hospitality, not running card machines.",
    detail: "Your counter sees every payment in real time, settled to your bank account.",
  },
];

export const FEATURES = {
  kicker: "What's inside",
  headline: "An ordering system that works the way your floor works.",
  hero: {
    title: "A menu that sells while you sleep",
    body: "Your menu, photographed beautifully, organised exactly how you serve it. Mark items sold-out with one tap from the counter, change a price at 11pm for tomorrow's lunch, add the weekend special in seconds. Guests see it live — no reprints, no stickers over old prices.",
    points: [
      "Photo-first menu with sections and modifiers",
      "Sold-out toggles and instant price updates",
      "Multilingual menus — English, Hindi, regional",
      "Weekend specials and time-based menus",
    ],
  },
  items: [
    {
      icon: "chef",
      title: "Live kitchen display",
      body: "Every order arrives with table number, items and guest notes — already digital, never re-typed. Cook, mark served, done.",
    },
    {
      icon: "wallet",
      title: "Payments built in",
      body: "UPI, cards and wallets on the guest's phone. Fewer card-machine laps, faster table turns.",
    },
    {
      icon: "bar",
      title: "Sales insights",
      body: "See best-sellers, slow movers, peak hours and table-turn times. Decide next week's menu with data, not hunches.",
    },
    {
      icon: "store",
      title: "Multi-outlet",
      body: "Run several locations from one login. Menus, prices and reports — central or per-outlet, your call.",
    },
    {
      icon: "smartphone",
      title: "No app for guests",
      body: "The whole flow runs in the browser. Guests scan, order, pay — nothing to install, nothing to remember.",
    },
    {
      icon: "users",
      title: "Gentle on staff",
      body: "Waiters stop taking orders and start serving them. Less training, fewer errors, calmer shifts.",
    },
  ],
};

export const FOUNDING = {
  kicker: "Founding cohort",
  headline: "Be one of the first 50 restaurants on Tabble.",
  body: "We're onboarding restaurants personally, one by one, and building the product with the people who use it. Founding restaurants get a deal that will never repeat:",
  board: {
    label: "Founding table",
    status: "50 seats · one time only",
    hover: "Table №",
    hoverSuffix: "— yours to claim",
    caption: "One seat per restaurant. When the fiftieth seat is claimed, founding pricing closes for good.",
  },
  perks: [
    {
      title: "Founding pricing, locked for life",
      body: "Whatever plan you choose stays at founding rates for as long as you're with us.",
    },
    {
      title: "Your menu, set up by us",
      body: "We build your menu, structure your modifiers and guide the photo style — you review and go live.",
    },
    {
      title: "A direct line to the founders",
      body: "Not a support queue. You tell us what your floor needs; we ship it and tell you when it's live.",
    },
    {
      title: "Priority on everything",
      body: "New features, new payment methods, new cities — founding restaurants go first, always.",
    },
  ],
  cta: "Request early access",
};

export const PROOF = {
  kicker: "Behind the pass",
  headline: "Every order lands the moment it's placed.",
  sub: "This is the screen your kitchen runs on. Table numbers, items, guest-typed notes — no waiter re-entry, no shouted modifications, no printer between the guest and the chef.",
  liveChip: "Order #1042 · Table 6 · just placed",
  callouts: [
    "Guest-typed notes reach the chef unedited",
    "New orders light up the instant they land",
    "Runs on any tablet or browser you already own",
  ],
  stats: [
    { value: "0s", label: "from guest tap to kitchen screen" },
    { value: "0", label: "orders re-typed by your staff" },
    { value: "0", label: "printers, ink and paper rolls" },
  ],
};

export const FAQS = [
  {
    q: "Do my guests need to download an app?",
    a: "No. Tabble runs entirely in the phone's browser — guests scan the QR code on the table and the menu opens instantly. No app store, no sign-up, no password to remember. That's deliberate: every download step loses half your guests.",
  },
  {
    q: "What about payments — how does the money reach me?",
    a: "Guests can pay with UPI, cards, or wallets directly from the ordering screen. Payments are processed by a licensed payment gateway and settled to your bank account. You keep using cash if a guest prefers it — Tabble never locks you in.",
  },
  {
    q: "How long does it take to get started?",
    a: "For founding restaurants, we set up your menu for you — items, sections, modifiers, photos guidance. Most restaurants review and go live within a few days of their onboarding call. After that, every change is one tap away.",
  },
  {
    q: "Does it work with my kitchen printer or POS?",
    a: "Orders flow to the Tabble kitchen display on any tablet or browser. Printer integrations and POS connections are on the founding roadmap — founding restaurants get them first and help us pick which devices to support.",
  },
  {
    q: "What if the internet drops mid-service?",
    a: "The kitchen display keeps showing every order it has already received, and your floor keeps running on the fallback you already use. We designed Tabble for real restaurants, not demo rooms.",
  },
  {
    q: "What does it cost?",
    a: "There's a free tier to try Tabble on one floor, and paid plans from ₹1,499/month that add payments, insights and more displays. Founding restaurants lock their rate for life. See the pricing page for the full breakdown.",
  },
  {
    q: "Do I need to buy special hardware?",
    a: "No. The kitchen display runs in a browser on any tablet or computer you already own. The QR codes are printed — we send you print-ready files for your table tops.",
  },
  {
    q: "Can waiters still take orders for guests who prefer it?",
    a: "Absolutely. Tabble is an extra pair of hands, not a replacement. Plenty of guests — especially larger tables and families — mix both: some order from the phone, the waiter adds for the rest. Every order lands in the same kitchen queue.",
  },
];

export const PRICING = {
  kicker: "Pricing",
  headline: "Simple pricing. Founding rates locked for life.",
  sub: "Start free, upgrade when it's earning its keep. No hardware to buy, no lock-in contracts — cancel anytime.",
  monthly: [
    {
      name: "Starter",
      price: 0,
      yearly: 0,
      blurb: "Try Tabble on one floor and watch it work.",
      cta: "Start free",
      recommended: false,
      features: [
        "QR menu, up to 30 items",
        "1 outlet, 1 kitchen display",
        "Guest ordering flow",
        "Standard UPI payments",
        "Email support",
      ],
      missing: ["Sales insights", "Multi-outlet", "API access"],
    },
    {
      name: "Growth",
      price: 1499,
      yearly: 14990,
      blurb: "The full ordering system for a busy restaurant.",
      cta: "Request early access",
      recommended: true,
      features: [
        "Unlimited menu items & modifiers",
        "1 outlet, 3 kitchen displays",
        "UPI, cards & wallets",
        "Sales insights & reports",
        "Multilingual menus",
        "Priority chat support",
      ],
      missing: ["Multi-outlet", "API access"],
    },
    {
      name: "Pro",
      price: 3999,
      yearly: 39990,
      blurb: "For chains and high-volume kitchens.",
      cta: "Request early access",
      recommended: false,
      features: [
        "Everything in Growth",
        "Up to 5 outlets, one login",
        "Cross-outlet reports",
        "API access & custom branding",
        "Dedicated onboarding",
        "Founder-direct support line",
      ],
      missing: [],
    },
  ],
  guarantee: [
    {
      title: "Cancel anytime",
      body: "Monthly plans, no contracts. If Tabble isn't earning its keep, you leave — no exit fees, no notice period.",
    },
    {
      title: "No hardware to buy",
      body: "Runs on the tablets and browsers you already own. QR codes are print files we send you.",
    },
    {
      title: "Founding rates are forever",
      body: "Join the founding cohort and your price never goes up for as long as you stay.",
    },
  ],
  compare: {
    columns: ["Starter", "Growth", "Pro"],
    rows: [
      { feature: "QR menu", values: ["Up to 30 items", "Unlimited", "Unlimited"] },
      { feature: "Outlets", values: ["1", "1", "Up to 5"] },
      { feature: "Kitchen displays", values: ["1", "3", "Unlimited*"] },
      { feature: "Payments (UPI, cards, wallets)", values: ["Standard", "Full", "Full"] },
      { feature: "Sales insights", values: [false, true, true] },
      { feature: "Multilingual menus", values: [false, true, true] },
      { feature: "Cross-outlet reports", values: [false, false, true] },
      { feature: "API access", values: [false, false, true] },
      { feature: "Support", values: ["Email", "Priority chat", "Founder line"] },
    ],
  },
  faqs: [
    {
      q: "Is there a setup fee?",
      a: "No setup fee — and for founding restaurants, menu setup is done by us, free. After launch you can edit everything yourself in minutes.",
    },
    {
      q: "What happens after the founding cohort fills up?",
      a: "Pricing stays the same for everyone who joins later — but founding members keep extra perks (free menu setup, founder line, priority features) that new members won't get.",
    },
    {
      q: "Do you take a cut of my orders?",
      a: "On paid plans, no commission on orders. Standard payment-gateway fees apply on card and wallet transactions, same as any payment you'd take today.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes — upgrade or downgrade anytime, and the change applies from your next billing cycle. Founding rates follow you across plans within the cohort terms.",
    },
  ],
};

export const CONTACT_TOPICS = [
  "General question",
  "Request access",
  "Partnership",
  "Press",
  "Something else",
];

export const OUTLET_OPTIONS = [
  "1 outlet",
  "2–5 outlets",
  "6–20 outlets",
  "20+ outlets",
];

export const CURRENT_SETUP_OPTIONS = [
  "Paper menu + waiters",
  "WhatsApp / phone orders",
  "Aggregator apps only",
  "Existing POS system",
  "Something else",
];

export const LEGAL = {
  terms: {
    title: "Terms of Service",
    updated: "Last updated: September 2026",
    sections: [
      {
        h: "1. About these terms",
        p: "These terms govern your use of the Tabble platform, including the guest ordering flow, the restaurant dashboard, and related services. Tabble is currently in a founding-cohort phase, which means features may evolve quickly and some capabilities described on this site may still be rolling out. By requesting access or using Tabble, you agree to these terms.",
      },
      {
        h: "2. Your account",
        p: "You are responsible for the accuracy of the information you provide about your restaurant, for keeping your login credentials secure, and for the content of the menu you publish through Tabble — including prices, descriptions, allergen claims, and photos. You confirm you have the rights to any imagery and branding you upload.",
      },
      {
        h: "3. Payments and fees",
        p: "Guest payments are processed by third-party licensed payment gateways. Gateway fees, settlement cycles, and refunds follow the gateway's terms, which we will share with you during onboarding. Plan subscription fees are billed in advance, monthly or yearly depending on your choice, and can be cancelled at any time without exit fees.",
      },
      {
        h: "4. Founding cohort",
        p: "Founding-cohort benefits — locked pricing, free menu setup, founder-direct support, and priority access to new features — are offered to restaurants that join during the founding window. These benefits are personal to your restaurant and continue for as long as you remain an active subscriber without interruption.",
      },
      {
        h: "5. Acceptable use",
        p: "You agree not to use Tabble to publish unlawful content, to misrepresent food attributes (including allergens), or to attempt to disrupt the service. We may suspend accounts that put guests, diners, or the platform at risk.",
      },
      {
        h: "6. Service availability",
        p: "We aim for a dependable service and will communicate planned maintenance in advance. Tabble is offered without warranty of uninterrupted availability; in a live restaurant environment, always keep your existing fallback processes available.",
      },
      {
        h: "7. Changes and contact",
        p: "We may update these terms as the product grows — material changes will be communicated to account holders in advance. Questions about these terms can be sent to the contact address on our contact page.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: September 2026",
    sections: [
      {
        h: "1. What we collect",
        p: "For restaurant accounts: your name, business name, contact details, and the menu content you publish. For guest orders: the minimum needed to run an order — table identifier, order contents, and payment confirmation from the gateway. We do not sell personal data, and we do not run advertising trackers on the ordering flow.",
      },
      {
        h: "2. How we use it",
        p: "To operate the ordering service, process payments through licensed gateways, provide support, and improve the product. Aggregate, de-identified ordering patterns (like best sellers by hour) may be used to build the insights you see in your own dashboard.",
      },
      {
        h: "3. Where data lives",
        p: "Order and account data are stored on secured infrastructure. Payment details are handled entirely by the payment gateway — card numbers and UPI credentials never touch Tabble's servers.",
      },
      {
        h: "4. Your rights",
        p: "You can request an export or deletion of your account data at any time. Guest-facing data (an individual order) is retained only as long as needed for accounting and dispute resolution, per applicable law.",
      },
      {
        h: "5. Contact",
        p: "Privacy questions or requests can be sent through the contact page. We respond to all verified data requests within a reasonable timeframe.",
      },
    ],
  },
};
