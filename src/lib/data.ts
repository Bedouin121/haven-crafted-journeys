// Fictional but realistic travel data for the Aeris design showcase.

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  bestTime: string;
  duration: string;
  fromPrice: number;
  image: string;
  gallery: string[];
  highlights: string[];
  coordinates: { x: number; y: number }; // % on world map
};

export type Package = {
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  nights: number;
  price: number;
  style: "Luxury" | "Adventure" | "Cultural" | "Family" | "Romantic";
  rating: number;
  reviews: number;
  image: string;
  summary: string;
  inclusions: string[];
  itinerary: { day: number; title: string; body: string }[];
};

export type Testimonial = {
  name: string;
  location: string;
  trip: string;
  quote: string;
  rating: number;
  avatar: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  body: string[];
};

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Destination[] = [
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    tagline: "Temple mornings and lantern-lit lanes",
    description:
      "Wander bamboo groves at first light, share tea with a Zen priest, and settle into a ryokan overlooking a moss-quiet garden. Kyoto rewards those who slow down.",
    bestTime: "March – May, October – November",
    duration: "7 – 10 nights",
    fromPrice: 4890,
    image: U("photo-1493976040374-85c8e12f0c0e"),
    gallery: [
      U("photo-1545569341-9eb8b30979d9"),
      U("photo-1478436127897-769e1538f1a2"),
      U("photo-1528164344705-47542687000d"),
      U("photo-1524413840807-0c3cb6fa808d"),
    ],
    highlights: [
      "Private tea ceremony with a fifteenth-generation master",
      "Sunrise walk through Arashiyama bamboo",
      "Ryokan stay with private onsen",
      "Guided visit to a working ceramics studio",
    ],
    coordinates: { x: 83, y: 40 },
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    country: "Chile & Argentina",
    region: "South America",
    tagline: "Glaciers, granite spires, and vast silence",
    description:
      "Trek in the shadow of Torres del Paine, cross into Argentina for the calving faces of Perito Moreno, and end each day beside a wood-burning stove in a remote estancia.",
    bestTime: "November – March",
    duration: "9 – 12 nights",
    fromPrice: 7420,
    image: U("photo-1470071459604-3b5ec3a7fe05"),
    gallery: [
      U("photo-1516426122078-c23e76319801"),
      U("photo-1470071459604-3b5ec3a7fe05"),
      U("photo-1418065460487-3e41a6c84dc5"),
      U("photo-1454496522488-7a8e488e8606"),
    ],
    highlights: [
      "Guided W-trek with expert mountaineers",
      "Zodiac approach to Grey Glacier",
      "Estancia horseback riding at dusk",
      "Private flight over the Southern Ice Field",
    ],
    coordinates: { x: 30, y: 82 },
  },
  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    tagline: "Lemon groves above an impossible blue",
    description:
      "A private wooden gozzo skims the coastline while you drift between Positano, Praiano, and hidden coves. Long lunches, cliffside terraces, and the slow pace of a Mediterranean summer.",
    bestTime: "May – June, September",
    duration: "6 – 8 nights",
    fromPrice: 5980,
    image: U("photo-1523906630133-f6934a1ab2b9"),
    gallery: [
      U("photo-1516483638261-f4dbaf036963"),
      U("photo-1499602378908-64f1adfd4b3d"),
      U("photo-1523906630133-f6934a1ab2b9"),
      U("photo-1527838832700-5059252407fa"),
    ],
    highlights: [
      "Private gozzo cruise to hidden coves",
      "Cooking class with a Michelin-starred nonna",
      "Cliffside villa with sea-facing terraces",
      "After-hours access to Villa Rufolo gardens",
    ],
    coordinates: { x: 53, y: 37 },
  },
  {
    slug: "marrakech",
    name: "Marrakech & Atlas",
    country: "Morocco",
    region: "Africa",
    tagline: "Riads, rugs, and mint tea in the mountains",
    description:
      "Trade the pulse of the medina for the hush of the High Atlas. Sleep in a restored riad, share bread with Berber families, and watch the sun set from a Kasbah terrace.",
    bestTime: "March – May, October – November",
    duration: "7 – 9 nights",
    fromPrice: 3980,
    image: U("photo-1489749798305-4fea3ae63d43"),
    gallery: [
      U("photo-1548013146-72479768bada"),
      U("photo-1553603227-2358aabe821e"),
      U("photo-1509023464722-18d996393ca8"),
      U("photo-1489493585363-d69421e0edd3"),
    ],
    highlights: [
      "Private tour of Yves Saint Laurent's Jardin Majorelle",
      "Mule trek to Berber villages in the Atlas",
      "Traditional hammam and argan oil ritual",
      "Kasbah dinner under the stars",
    ],
    coordinates: { x: 47, y: 45 },
  },
  {
    slug: "iceland",
    name: "Iceland",
    country: "Iceland",
    region: "Europe",
    tagline: "Fire, ice, and the northern sky",
    description:
      "Circumnavigate the island by private 4x4 with a glaciologist guide. Ice caves in the morning, geothermal baths at dusk, and — if the sky obliges — the aurora dancing overhead.",
    bestTime: "September – March (aurora)",
    duration: "6 – 8 nights",
    fromPrice: 6540,
    image: U("photo-1500534623283-312aade485b7"),
    gallery: [
      U("photo-1504829857797-ddff29c27927"),
      U("photo-1531168556467-80aace0d0144"),
      U("photo-1520681279154-51b3fb4ea0f8"),
      U("photo-1483347756197-71ef80e95f73"),
    ],
    highlights: [
      "Private ice cave expedition with glaciologist",
      "Geothermal bath at the Retreat at Blue Lagoon",
      "Aurora hunting with astronomer guide",
      "Helicopter landing on a volcano rim",
    ],
    coordinates: { x: 47, y: 22 },
  },
  {
    slug: "kenya",
    name: "Kenya Safari",
    country: "Kenya",
    region: "Africa",
    tagline: "The great migration, up close",
    description:
      "Track lion prides at first light, follow the migration across the Mara from a private conservancy, and end each day beside a fire pit as the acacias silhouette against a copper sky.",
    bestTime: "July – October",
    duration: "8 – 10 nights",
    fromPrice: 9280,
    image: U("photo-1516426122078-c23e76319801"),
    gallery: [
      U("photo-1547970810-dc1eac37d174"),
      U("photo-1534177616072-ef7dc120449d"),
      U("photo-1523805009345-7448845a9e53"),
      U("photo-1549366021-9f761d040a94"),
    ],
    highlights: [
      "Private conservancy with off-road access",
      "Hot-air balloon safari at sunrise",
      "Community visit with Maasai elders",
      "Bush breakfast on the plains",
    ],
    coordinates: { x: 58, y: 62 },
  },
];

export const packages: Package[] = [
  {
    slug: "kyoto-in-quiet",
    title: "Kyoto in Quiet",
    destination: "Kyoto, Japan",
    destinationSlug: "kyoto",
    nights: 8,
    price: 6480,
    style: "Cultural",
    rating: 4.9,
    reviews: 128,
    image: U("photo-1545569341-9eb8b30979d9"),
    summary:
      "An eight-night immersion in Kyoto's craft traditions, from temple mornings and tea ceremonies to a private evening with a maiko in Gion.",
    inclusions: [
      "Seven nights in a garden-view ryokan",
      "Private guide and driver throughout",
      "All temple entries and cultural experiences",
      "Daily breakfast; three curated tasting menus",
      "24/7 concierge with local specialist",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto", body: "Private transfer from Kansai. Evening walk through Gion's lantern-lit lanes with your specialist." },
      { day: 2, title: "Arashiyama at First Light", body: "Sunrise in the bamboo grove before the crowds. Tea at a mountain temple with a Zen priest." },
      { day: 3, title: "Craft & Ceramics", body: "Studio visit with a fifth-generation potter, followed by lunch at a working farm." },
      { day: 4, title: "Tea, Slowly", body: "A private tea ceremony, then an afternoon in the moss gardens of Saihō-ji." },
      { day: 5, title: "Nara Day", body: "A quiet day in Nara — Todai-ji, the deer park, and a family soba lunch." },
      { day: 6, title: "Kaiseki Evening", body: "Cooking class with a Michelin-starred chef, followed by a private dinner." },
      { day: 7, title: "Gion Evening", body: "An intimate performance and conversation with a maiko in a private ochaya." },
      { day: 8, title: "Departure", body: "A slow morning, one last walk, and private transfer to the airport." },
    ],
  },
  {
    slug: "patagonia-wild",
    title: "Patagonia, End of the Earth",
    destination: "Patagonia",
    destinationSlug: "patagonia",
    nights: 10,
    price: 9420,
    style: "Adventure",
    rating: 4.9,
    reviews: 94,
    image: U("photo-1470071459604-3b5ec3a7fe05"),
    summary:
      "A ten-night journey through Torres del Paine and Los Glaciares — expert mountaineer guides, remote estancias, and untouched wilderness.",
    inclusions: [
      "All internal flights and private transfers",
      "Nine nights across three signature lodges",
      "Certified mountaineer and naturalist guides",
      "All meals and daily excursions",
      "Full technical kit provided",
    ],
    itinerary: [
      { day: 1, title: "Santiago to Puerto Natales", body: "Domestic flight south. Evening briefing with your lead guide." },
      { day: 2, title: "Into the Park", body: "Transfer into Torres del Paine. Afternoon walk to Cuernos viewpoint." },
      { day: 3, title: "The Base of the Towers", body: "The classic hike to the base of the granite towers." },
      { day: 4, title: "Grey Glacier", body: "Zodiac approach to the calving face of Grey Glacier." },
      { day: 5, title: "French Valley", body: "A long day into the heart of the massif." },
      { day: 6, title: "Crossing to Argentina", body: "Overland to El Calafate, glacier country." },
      { day: 7, title: "Perito Moreno", body: "A full day on and around the glacier — a rare thing." },
      { day: 8, title: "El Chaltén", body: "Transfer north. Evening walk to a Fitz Roy viewpoint." },
      { day: 9, title: "Laguna de los Tres", body: "The signature hike to the base of Fitz Roy." },
      { day: 10, title: "Departure", body: "Return flight north and onward connections." },
    ],
  },
  {
    slug: "amalfi-slow",
    title: "The Slow Amalfi",
    destination: "Amalfi Coast, Italy",
    destinationSlug: "amalfi-coast",
    nights: 7,
    price: 7180,
    style: "Romantic",
    rating: 4.8,
    reviews: 156,
    image: U("photo-1516483638261-f4dbaf036963"),
    summary:
      "Seven nights of long lunches, sea days, and cliffside villas — the Amalfi as it should be, without the crowds.",
    inclusions: [
      "Cliffside villa with private terrace",
      "Full-day private gozzo with captain",
      "Cooking class with a local nonna",
      "Daily breakfast; three dinner reservations",
      "Private transfers throughout",
    ],
    itinerary: [
      { day: 1, title: "Naples to Positano", body: "Private transfer via the coast road. Aperitivo on the terrace." },
      { day: 2, title: "Sea Day", body: "Full-day gozzo cruise along the coastline, lunch at a cove." },
      { day: 3, title: "Ravello", body: "Villa Rufolo after hours, dinner at a chef's table." },
      { day: 4, title: "Cooking with Nonna", body: "A morning in a family kitchen, an afternoon in the garden." },
      { day: 5, title: "Capri, Privately", body: "Blue Grotto before the crowds; lunch at a private club." },
      { day: 6, title: "Praiano", body: "A slow day. Sea kayaking, reading, a long dinner." },
      { day: 7, title: "Farewell", body: "Breakfast in bed. Transfer to Naples." },
    ],
  },
  {
    slug: "kenya-migration",
    title: "The Great Migration",
    destination: "Kenya",
    destinationSlug: "kenya",
    nights: 9,
    price: 11480,
    style: "Family",
    rating: 5.0,
    reviews: 72,
    image: U("photo-1547970810-dc1eac37d174"),
    summary:
      "Nine nights following the migration through private Mara conservancies — small camps, exceptional guides, and unhurried game drives.",
    inclusions: [
      "Three luxury tented camps",
      "All flights within Kenya",
      "Private vehicle and specialist guide",
      "All meals, drinks, and park fees",
      "Hot-air balloon safari",
    ],
    itinerary: [
      { day: 1, title: "Nairobi", body: "Arrival and overnight at Giraffe Manor." },
      { day: 2, title: "Into the Mara", body: "Bush flight to your first camp." },
      { day: 3, title: "The River Crossing", body: "Early morning drive to the Mara River." },
      { day: 4, title: "Balloon Sunrise", body: "Hot-air balloon safari followed by bush breakfast." },
      { day: 5, title: "Community Day", body: "Visit with Maasai elders, guided walk with warriors." },
      { day: 6, title: "Second Conservancy", body: "Move to a smaller private conservancy." },
      { day: 7, title: "Predators at Dusk", body: "Off-road tracking of a lion pride." },
      { day: 8, title: "Slow Morning", body: "A quiet last day. Sundowners on a kopje." },
      { day: 9, title: "Homeward", body: "Bush flight to Nairobi, onward connections." },
    ],
  },
  {
    slug: "iceland-elements",
    title: "Iceland, The Elements",
    destination: "Iceland",
    destinationSlug: "iceland",
    nights: 7,
    price: 8140,
    style: "Adventure",
    rating: 4.8,
    reviews: 68,
    image: U("photo-1504829857797-ddff29c27927"),
    summary:
      "A private 4x4 circumnavigation with a glaciologist guide — ice caves, black-sand coasts, and northern lights.",
    inclusions: [
      "Private 4x4 and expert driver-guide",
      "Six nights across four hand-picked lodges",
      "Ice cave and glacier excursion",
      "The Retreat at Blue Lagoon",
      "Aurora forecasting concierge",
    ],
    itinerary: [
      { day: 1, title: "Reykjavík", body: "Arrival and dinner at a chef's table." },
      { day: 2, title: "South Coast", body: "Waterfalls, black sand, and a night at Fosshotel Glacier Lagoon." },
      { day: 3, title: "Ice Cave", body: "Private expedition into a blue ice cave." },
      { day: 4, title: "East Fjords", body: "Long drive through fjords, night at a design lodge." },
      { day: 5, title: "North Coast", body: "Whale watching and geothermal soak." },
      { day: 6, title: "The Highlands", body: "A helicopter flight over the interior." },
      { day: 7, title: "Departure", body: "The Retreat at Blue Lagoon, then home." },
    ],
  },
  {
    slug: "marrakech-atlas",
    title: "Riads to Ridgelines",
    destination: "Morocco",
    destinationSlug: "marrakech",
    nights: 8,
    price: 4980,
    style: "Cultural",
    rating: 4.7,
    reviews: 112,
    image: U("photo-1548013146-72479768bada"),
    summary:
      "Four nights in a restored riad and four in the High Atlas — bazaars, hammams, and a slow trek to Berber villages.",
    inclusions: [
      "Boutique riad in the medina",
      "Kasbah lodge in the Atlas mountains",
      "Private guide throughout",
      "Cooking class and hammam ritual",
      "Mule-supported village trek",
    ],
    itinerary: [
      { day: 1, title: "Arrival, Marrakech", body: "Transfer to your riad; slow evening on the roof terrace." },
      { day: 2, title: "The Medina", body: "Private tour of souks, palaces, and hidden courtyards." },
      { day: 3, title: "Jardin Majorelle", body: "Early access, followed by lunch at a designer's home." },
      { day: 4, title: "Hammam & Rest", body: "A traditional hammam ritual; afternoon at leisure." },
      { day: 5, title: "Into the Atlas", body: "Drive south, mint tea with a Berber family." },
      { day: 6, title: "Village Trek", body: "A day-long mule-supported walk between villages." },
      { day: 7, title: "Kasbah Evening", body: "Dinner under the stars on a Kasbah terrace." },
      { day: 8, title: "Return", body: "Drive back to Marrakech, farewell dinner." },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Elena & Marcus Whitfield",
    location: "London, UK",
    trip: "Kyoto in Quiet",
    quote:
      "Aeris understood exactly what we were looking for — not the checklist Kyoto, but the quiet one. Every choice, from the ryokan to the ceramics studio, felt considered.",
    rating: 5,
    avatar: U("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "The Andersen Family",
    location: "Copenhagen, DK",
    trip: "The Great Migration",
    quote:
      "Our guide in the Mara was extraordinary. The children still talk about the morning we watched the river crossing. It felt private, respectful, and genuinely wild.",
    rating: 5,
    avatar: U("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "David Okafor",
    location: "New York, US",
    trip: "Patagonia, End of the Earth",
    quote:
      "Ten days, three lodges, and not a single hitch. The guides were world-class. I've traveled a lot — this was the best planned trip of my life.",
    rating: 5,
    avatar: U("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    name: "Aya Tanaka",
    location: "Singapore",
    trip: "The Slow Amalfi",
    quote:
      "The pace was perfect. We felt looked after without being managed. The cooking class with Nonna was worth the entire trip on its own.",
    rating: 5,
    avatar: U("photo-1487412720507-e7ab37603c6f", 200),
  },
];

export const articles: Article[] = [
  {
    slug: "kyoto-in-november",
    title: "Kyoto in November: The Case for the Shoulder Season",
    excerpt:
      "The temples glow copper, the crowds soften, and the ryokans open their kotatsu. Our specialist on why late autumn is the quietly correct time to visit.",
    category: "Guides",
    readTime: "6 min read",
    date: "November 4, 2026",
    author: "Naomi Fujita",
    image: U("photo-1528360983277-13d401cdc186"),
    body: [
      "There is a particular quality to the light in Kyoto in early November — low, warm, and slightly amber, as if the city has been dipped in honey. It is, for those in the know, the moment to go.",
      "The great crush of cherry-blossom season is six months behind us. The New Year rush is still two months ahead. The maples turn — Tofuku-ji becomes almost impossibly beautiful — and the temples empty out by four in the afternoon.",
      "Our advice, always, is to go slowly. Book three or four nights longer than feels sensible. Add a day in Nara. Say yes to the tea ceremony, even if you're tired. The best of Kyoto happens quietly, and only if you make room for it.",
    ],
  },
  {
    slug: "packing-for-patagonia",
    title: "Packing for Patagonia (Without Overpacking)",
    excerpt:
      "The weather changes four times a day. The wind is a constant. Here's exactly what our guides carry — and what they leave behind.",
    category: "Practical",
    readTime: "8 min read",
    date: "October 21, 2026",
    author: "Tomás Fernández",
    image: U("photo-1470071459604-3b5ec3a7fe05"),
    body: [
      "First principle: layers. Four thin layers will always beat two thick ones. The wind in Patagonia does not negotiate.",
      "Second: waterproof, not water-resistant. There is a meaningful difference and you will discover it, unpleasantly, on the wrong day.",
      "Third: leave the cotton at home. Merino wool base layers, synthetic mid-layers, a hardshell on top. Boots must be broken in — this is not optional.",
    ],
  },
  {
    slug: "quiet-luxury-travel",
    title: "The Case for Quiet Luxury in Travel",
    excerpt:
      "Fewer things, better chosen. Why the future of high-end travel looks less like a five-star hotel and more like a good friend's very well-connected cousin.",
    category: "Perspective",
    readTime: "5 min read",
    date: "October 9, 2026",
    author: "Clara Whitmore",
    image: U("photo-1519677100203-a0e668c92439"),
    body: [
      "Luxury, in travel, used to mean a certain kind of hotel: marble lobbies, gold taps, a concierge in a tailcoat. It is beginning, quietly, to mean something else.",
      "The clients we speak to now — thirty-somethings, forty-somethings, often families — do not want the marble. They want the fisherman's cottage with the extraordinary chef. They want the guide who knows the shepherd. They want time, and quiet, and access.",
      "It is a more difficult thing to deliver than the marble. It is, we think, also the more interesting one.",
    ],
  },
  {
    slug: "iceland-aurora",
    title: "How to Actually See the Northern Lights",
    excerpt:
      "The aurora doesn't run on a schedule. Here's how our Iceland specialists plan around cloud, KP index, and the one thing most travelers forget.",
    category: "Guides",
    readTime: "7 min read",
    date: "September 28, 2026",
    author: "Kári Jónsson",
    image: U("photo-1483347756197-71ef80e95f73"),
    body: [
      "Everyone asks about the KP index. It matters, but not as much as the cloud cover forecast. A KP 6 night under a blanket of cloud is just a dark night.",
      "The thing most travelers forget: eyes need twenty minutes to adjust. Fifteen minutes on a phone screen and you're starting over.",
      "Our approach: base yourselves outside the city, work with a local astronomer, and give it four nights. Almost no one who does all three misses the show.",
    ],
  },
];

export const faqs: { q: string; a: string; category: string }[] = [
  {
    category: "Booking",
    q: "How does a typical Aeris trip come together?",
    a: "Every journey starts with a conversation. A specialist listens to what you're after, sends across a first proposal within five business days, and refines it with you until the details feel right. Only then do we book.",
  },
  {
    category: "Booking",
    q: "How far in advance should I plan?",
    a: "Four to six months is comfortable for most destinations. For safari, Japan in cherry-blossom season, or high-season Antarctica, we recommend nine to twelve months.",
  },
  {
    category: "Pricing",
    q: "What is included in your quoted price?",
    a: "Everything meaningful: accommodation, private guiding, transfers, experiences, and daily breakfast. Long-haul flights, visas, and personal spending are typically separate. Every proposal lists inclusions clearly.",
  },
  {
    category: "Pricing",
    q: "Do you have a minimum trip cost?",
    a: "Yes. Our starting point is around $4,500 per person for shorter journeys. We work with couples, families, and small groups up to twelve.",
  },
  {
    category: "On the road",
    q: "What kind of support do I have while traveling?",
    a: "You'll have a dedicated specialist available 24/7, plus a local partner on the ground in every destination. Most clients hear from us proactively at key moments — the point of a designed trip is that you don't have to think about the logistics.",
  },
  {
    category: "On the road",
    q: "Can you accommodate dietary requirements or accessibility needs?",
    a: "Absolutely. Share what we need to know and we'll build the trip around it — from strict allergies to mobility considerations to traveling with young children.",
  },
  {
    category: "Sustainability",
    q: "How do you think about responsible travel?",
    a: "We work almost exclusively with small, locally-owned partners. We're carbon-transparent on every itinerary and offset through verified projects. Where a destination is under pressure, we say so.",
  },
];

export const stats = [
  { value: "18", suffix: "yrs", label: "Designing quiet journeys" },
  { value: "62", suffix: "", label: "Countries on our map" },
  { value: "4.9", suffix: "/5", label: "Client satisfaction" },
  { value: "94", suffix: "%", label: "Return travelers" },
];
