// Fictional but realistic travel data for the Travel Tours design showcase.

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
  coordinates: { x: number; y: number }; // legacy, no longer used
  lat: number;
  lng: number;
};

export type PackageMood = {
  pace: "relaxing" | "adventurous";
  landscape: "beach" | "mountains" | "mixed";
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
  mood: PackageMood;
};

export type VisaPackage = {
  slug: string;
  country: string;
  title: string;
  visaType: string;
  price: number;
  turnaround: string;
  summary: string;
  image: string;
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
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    region: "Asia",
    tagline: "Golden temples, longtail boats, and jungle mornings",
    description:
      "Wake to monks chanting in Chiang Mai, drift between limestone islands in the Andaman Sea, and end each day at a riverside table in Bangkok. Thailand still surprises those who slow down.",
    bestTime: "November – February",
    duration: "8 – 12 nights",
    fromPrice: 3480,
    image: U("photo-1528181304800-259b08848526"),
    gallery: [
      U("photo-1552465011-b4e21bf6e79a"),
      U("photo-1506665531195-3566af2b4dfa"),
      U("photo-1563492065-1a5b1e5fb0e0"),
      U("photo-1554797589-7241bb691973"),
    ],
    highlights: [
      "Longtail cruise through Phang Nga Bay",
      "Alms-giving at dawn in Chiang Mai",
      "Private dinner in a khlong-side teak house",
      "Elephant sanctuary visit with a conservation biologist",
    ],
    coordinates: { x: 76, y: 55 },
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    region: "Asia",
    tagline: "Rainforest, straits, and the world's best hawker stalls",
    description:
      "Kuala Lumpur's skyline gives way to Penang's shophouse lanes, and both give way to the ancient rainforest of Taman Negara. A country that rewards curiosity, one plate at a time.",
    bestTime: "March – October",
    duration: "7 – 10 nights",
    fromPrice: 2980,
    image: U("photo-1596422846543-75c6fc197f07"),
    gallery: [
      U("photo-1580237072353-751acb27a3fb"),
      U("photo-1583417319070-4a69db38a482"),
      U("photo-1571317084911-c48d0a7bce15"),
      U("photo-1588416936097-41850ab3d86d"),
    ],
    highlights: [
      "Guided hawker crawl through George Town",
      "Rainforest canopy walk in Taman Negara",
      "Batu Caves at first light",
      "Private tea plantation tour in the Cameron Highlands",
    ],
    coordinates: { x: 76, y: 60 },
    lat: 3.139,
    lng: 101.6869,
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    tagline: "A city-state built for the future, grounded in tradition",
    description:
      "Rooftop bars over Marina Bay, hawker centres tucked into HDB estates, and a Botanic Gardens that still feels like a jungle. Singapore is a masterclass in doing many things at once.",
    bestTime: "February – April",
    duration: "3 – 5 nights",
    fromPrice: 2680,
    image: U("photo-1525625293386-3f8f99389edd"),
    gallery: [
      U("photo-1508964942454-1a56651d54ac"),
      U("photo-1533628635777-112b2239b1c7"),
      U("photo-1567360425618-1594206637d2"),
      U("photo-1555217851-6141535bd771"),
    ],
    highlights: [
      "Private tour of Gardens by the Bay after hours",
      "Chef-guided hawker centre dinner",
      "Peranakan heritage walk in Katong",
      "Rooftop sundowners at Marina Bay Sands",
    ],
    coordinates: { x: 77, y: 62 },
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    slug: "china",
    name: "China",
    country: "China",
    region: "Asia",
    tagline: "Great Wall dawns and Yangtze slow water",
    description:
      "Walk an unrestored stretch of the Great Wall at sunrise, dine in a hutong courtyard in Beijing, and drift through the Three Gorges at the pace they were meant to be seen.",
    bestTime: "April – May, September – October",
    duration: "10 – 14 nights",
    fromPrice: 5280,
    image: U("photo-1508804185872-d7badad00f7d"),
    gallery: [
      U("photo-1547981609-4b6bfe67ca0b"),
      U("photo-1540960927-25d54103f0d3"),
      U("photo-1513415564515-763d91423bdd"),
      U("photo-1503435980610-a51f3ddfee50"),
    ],
    highlights: [
      "Private sunrise hike on a wild stretch of the Great Wall",
      "After-hours access to the Forbidden City",
      "Slow cruise through the Three Gorges",
      "Tea ceremony in a Hangzhou tea master's studio",
    ],
    coordinates: { x: 78, y: 40 },
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    slug: "usa",
    name: "United States",
    country: "USA",
    region: "Americas",
    tagline: "Canyons, coastlines, and the great open road",
    description:
      "From the red rock of the Southwest to the misty forests of the Pacific Northwest — the United States rewards long journeys, thoughtfully planned, and a willingness to stray from the interstate.",
    bestTime: "April – October",
    duration: "10 – 14 nights",
    fromPrice: 6480,
    image: U("photo-1485871981521-5b1fd3805eee"),
    gallery: [
      U("photo-1477959858617-67f85cf4f1df"),
      U("photo-1501594907352-04cda38ebc29"),
      U("photo-1502602898657-3e91760cbb34"),
      U("photo-1493707553966-283afac8c358"),
    ],
    highlights: [
      "Private helicopter over the Grand Canyon",
      "Chef's table dinner in the West Village",
      "Sunrise at Zabriskie Point, Death Valley",
      "Pacific Coast Highway with a photographer guide",
    ],
    coordinates: { x: 22, y: 40 },
    lat: 40.7128,
    lng: -74.006,
  },
  {
    slug: "canada",
    name: "Canada",
    country: "Canada",
    region: "Americas",
    tagline: "Turquoise lakes, glacier peaks, and boreal quiet",
    description:
      "Trace the Icefields Parkway between Banff and Jasper, canoe on Moraine Lake at first light, and end each day beside a wood stove in a mountain lodge. Canada is the pace you had forgotten.",
    bestTime: "June – September",
    duration: "8 – 11 nights",
    fromPrice: 5980,
    image: U("photo-1503614472-8c93d56cd601"),
    gallery: [
      U("photo-1519832979-6fa011b87667"),
      U("photo-1489447068241-b3490214e879"),
      U("photo-1476610182048-b716b8518aae"),
      U("photo-1464822759023-fed622ff2c3b"),
    ],
    highlights: [
      "Private canoe on Moraine Lake at sunrise",
      "Guided walk on the Athabasca Glacier",
      "Grizzly viewing in the Great Bear Rainforest",
      "Old Quebec walking tour with a historian",
    ],
    coordinates: { x: 20, y: 28 },
    lat: 51.4968,
    lng: -115.9281,
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    country: "Indonesia",
    region: "Asia",
    tagline: "Rice terraces, temple mornings, and the quieter islands",
    description:
      "Beyond Bali's south coast lie the mist-shrouded terraces of Ubud, the wilder beaches of Sumba, and the dragon islands of Komodo. A country of 17,000 islands and no shortage of firsts.",
    bestTime: "May – September",
    duration: "8 – 12 nights",
    fromPrice: 4280,
    image: U("photo-1537996194471-e657df975ab4"),
    gallery: [
      U("photo-1512100356356-de1b84283e18"),
      U("photo-1518509562904-e7ef99cddc85"),
      U("photo-1555400038-63f5ba517a47"),
      U("photo-1546484475-7f7bd55792da"),
    ],
    highlights: [
      "Private cliffside villa in Uluwatu",
      "Sunrise hike on Mount Batur",
      "Boat expedition through Komodo National Park",
      "Weaving workshop with a Sumba textile master",
    ],
    coordinates: { x: 80, y: 68 },
    lat: -8.4095,
    lng: 115.1889,
  },
  {
    slug: "egypt",
    name: "Egypt",
    country: "Egypt",
    region: "Africa",
    tagline: "Pyramids at dawn and a Nile that still moves slowly",
    description:
      "Sail a private dahabiya between Luxor and Aswan, breakfast in view of the Giza plateau, and step into tombs that most visitors will never see. Egypt is quieter than you think, if you plan it well.",
    bestTime: "October – April",
    duration: "9 – 12 nights",
    fromPrice: 5680,
    image: U("photo-1539768942893-daf53e448371"),
    gallery: [
      U("photo-1568322445389-f64ac2515020"),
      U("photo-1580332449516-d5a7c8b4e2b8"),
      U("photo-1590101155726-746e88a1f3f6"),
      U("photo-1583991364150-be7fbca7b0e8"),
    ],
    highlights: [
      "Private early access to the Great Pyramid",
      "Dahabiya sail from Esna to Aswan",
      "Egyptologist-led visit to Valley of the Kings",
      "Sunset felucca in Aswan with a local musician",
    ],
    coordinates: { x: 55, y: 45 },
    lat: 30.0444,
    lng: 31.2357,
  },
  {
    slug: "armenia",
    name: "Armenia",
    country: "Armenia",
    region: "Asia",
    tagline: "Ancient monasteries in a landscape of quiet peaks",
    description:
      "Cliffside monasteries, walnut orchards, and one of the oldest wine regions in the world. Armenia is a country you leave promising yourself you'll come back — and most of our travelers do.",
    bestTime: "May – October",
    duration: "6 – 9 nights",
    fromPrice: 3280,
    image: U("photo-1610294928006-8b6a7f671cd3"),
    gallery: [
      U("photo-1567168539593-59673ababaae"),
      U("photo-1602517340036-fc9d3fd8b0f2"),
      U("photo-1596436889106-be35e843f974"),
      U("photo-1580128637422-30fa0f7f30a4"),
    ],
    highlights: [
      "Private visit to Geghard Monastery",
      "Areni wine tasting in a family cellar",
      "Hike to Tatev via the world's longest cable car",
      "Yerevan supra dinner with a local historian",
    ],
    coordinates: { x: 60, y: 40 },
    lat: 40.1792,
    lng: 44.4991,
  },
];

export const packages: Package[] = [
  {
    slug: "thailand-slow",
    title: "Thailand, Slowly",
    destination: "Thailand",
    destinationSlug: "thailand",
    nights: 10,
    price: 5480,
    style: "Cultural",
    mood: { pace: "relaxing", landscape: "mixed" },
    rating: 4.9,
    reviews: 142,
    image: U("photo-1528181304800-259b08848526"),
    summary:
      "Ten nights across Bangkok, Chiang Mai, and the Andaman coast — temple mornings, longtail afternoons, and quiet beaches beyond the crowds.",
    inclusions: [
      "Three nights in a riverside Bangkok suite",
      "Boutique lanna-style lodge in Chiang Mai",
      "Private island villa on Koh Yao Noi",
      "All private guides, drivers, and internal flights",
      "24/7 in-country concierge",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", body: "Private transfer, sundowners on a Chao Phraya rooftop." },
      { day: 2, title: "Old Bangkok, Slowly", body: "Wat Pho at first light, longtail through the khlongs." },
      { day: 3, title: "Markets & Craft", body: "Flower market at dawn, a private lunch in a teak house." },
      { day: 4, title: "North to Chiang Mai", body: "Flight north, evening walking food tour." },
      { day: 5, title: "Alms & Elephants", body: "Dawn alms-giving, afternoon at an ethical sanctuary." },
      { day: 6, title: "Doi Suthep", body: "Private visit at dusk when the temple empties." },
      { day: 7, title: "South to the Sea", body: "Flight to Krabi, longtail to your island villa." },
      { day: 8, title: "Phang Nga Bay", body: "Full-day private cruise, lunch on a hidden beach." },
      { day: 9, title: "A Quiet Day", body: "Nothing on the schedule. That is the schedule." },
      { day: 10, title: "Farewell", body: "Slow breakfast, transfer to Phuket for onward flights." },
    ],
  },
  {
    slug: "malaysia-crossings",
    title: "Malaysia, Coast to Canopy",
    destination: "Malaysia",
    destinationSlug: "malaysia",
    nights: 9,
    price: 4680,
    style: "Adventure",
    mood: { pace: "adventurous", landscape: "mixed" },
    rating: 4.8,
    reviews: 88,
    image: U("photo-1596422846543-75c6fc197f07"),
    summary:
      "Nine nights across Kuala Lumpur, Penang, the Cameron Highlands, and the ancient rainforest of Taman Negara.",
    inclusions: [
      "Design hotel in KL and heritage shophouse in George Town",
      "Private hawker guide in Penang",
      "Rainforest lodge in Taman Negara",
      "All internal transfers and private guiding",
      "Daily breakfast and select curated meals",
    ],
    itinerary: [
      { day: 1, title: "Kuala Lumpur", body: "Private transfer, evening at a rooftop above the Petronas Towers." },
      { day: 2, title: "Old KL", body: "Chinatown, Merdeka Square, and a hawker crawl at dusk." },
      { day: 3, title: "Batu Caves", body: "Sunrise visit before the tour buses." },
      { day: 4, title: "Cameron Highlands", body: "Drive north through tea country, private plantation lunch." },
      { day: 5, title: "Into the Jungle", body: "Transfer to Taman Negara for canopy walks and night safari." },
      { day: 6, title: "Rainforest Day", body: "Full day with a naturalist guide." },
      { day: 7, title: "North to Penang", body: "Flight to George Town, evening food walk." },
      { day: 8, title: "Shophouse Life", body: "Guided architecture tour, Peranakan cooking class." },
      { day: 9, title: "Farewell", body: "Slow morning, transfer to Penang airport." },
    ],
  },
  {
    slug: "singapore-signature",
    title: "Singapore, In Three Nights",
    destination: "Singapore",
    destinationSlug: "singapore",
    nights: 4,
    price: 3480,
    style: "Luxury",
    mood: { pace: "relaxing", landscape: "beach" },
    rating: 4.8,
    reviews: 96,
    image: U("photo-1525625293386-3f8f99389edd"),
    summary:
      "Four nights of curated Singapore — hawker centres, botanic mornings, chef's tables, and rooftop views over Marina Bay.",
    inclusions: [
      "Four nights at Raffles or Capella Sentosa",
      "Private chef-guided hawker dinner",
      "After-hours Gardens by the Bay tour",
      "Peranakan heritage walk in Katong",
      "Private transfers throughout",
    ],
    itinerary: [
      { day: 1, title: "Arrival", body: "Transfer, orientation walk, and evening cocktails in the Long Bar." },
      { day: 2, title: "Old & New", body: "Chinatown and Kampong Glam by morning, Marina Bay by night." },
      { day: 3, title: "Green Singapore", body: "Botanic Gardens at dawn, MacRitchie treetop walk." },
      { day: 4, title: "Peranakan Katong", body: "Heritage walk, private tiffin lunch." },
      { day: 5, title: "Farewell", body: "Slow morning, private transfer to Changi." },
    ],
  },
  {
    slug: "china-two-capitals",
    title: "China, Two Capitals and a River",
    destination: "China",
    destinationSlug: "china",
    nights: 12,
    price: 8480,
    style: "Cultural",
    mood: { pace: "relaxing", landscape: "mixed" },
    rating: 4.9,
    reviews: 74,
    image: U("photo-1508804185872-d7badad00f7d"),
    summary:
      "Twelve nights across Beijing, Xi'an, a Yangtze slow cruise, and Shanghai — with private access at the moments that matter.",
    inclusions: [
      "Private Sinologist guide throughout",
      "Sunrise hike on a wild stretch of the Great Wall",
      "After-hours access to the Forbidden City",
      "Owner's suite on a Yangtze cruise",
      "All internal flights and transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Beijing", body: "Private transfer, courtyard dinner in a hutong." },
      { day: 2, title: "Forbidden City", body: "After-hours access with your Sinologist." },
      { day: 3, title: "The Wall", body: "Sunrise hike on an unrestored section." },
      { day: 4, title: "South to Xi'an", body: "Flight south, evening at the Muslim Quarter night market." },
      { day: 5, title: "Terracotta Warriors", body: "Private early access before public opening." },
      { day: 6, title: "Chongqing", body: "Fly to embark your Yangtze cruise." },
      { day: 7, title: "Three Gorges", body: "A day drifting through the great gorges." },
      { day: 8, title: "Shore Excursions", body: "Small-boat tributary and hilltop temple visits." },
      { day: 9, title: "Disembark, Fly East", body: "Onward to Shanghai." },
      { day: 10, title: "Old Shanghai", body: "Former French Concession walking tour." },
      { day: 11, title: "New Shanghai", body: "Bund at dawn, contemporary art in the afternoon." },
      { day: 12, title: "Departure", body: "Private transfer to Pudong." },
    ],
  },
  {
    slug: "usa-southwest",
    title: "The American Southwest",
    destination: "United States",
    destinationSlug: "usa",
    nights: 11,
    price: 8980,
    style: "Adventure",
    mood: { pace: "adventurous", landscape: "mountains" },
    rating: 4.8,
    reviews: 82,
    image: U("photo-1477959858617-67f85cf4f1df"),
    summary:
      "Eleven nights through the canyons and mesas of Utah and Arizona — luxury base camps, private guides, and helicopter access to the Grand Canyon.",
    inclusions: [
      "Amangiri and Amangani suites",
      "Private naturalist guide in every park",
      "Grand Canyon helicopter with lunch on the rim",
      "All 4x4 transfers and hikes",
      "Chef-curated dinners throughout",
    ],
    itinerary: [
      { day: 1, title: "Arrive Las Vegas", body: "Private transfer to Zion." },
      { day: 2, title: "Zion", body: "Angel's Landing before the crowds." },
      { day: 3, title: "Bryce", body: "Sunrise at Bryce Amphitheater." },
      { day: 4, title: "To Amangiri", body: "Transfer through Escalante, evening slot canyon walk." },
      { day: 5, title: "Slot Canyons", body: "Private access to a lesser-known canyon." },
      { day: 6, title: "Horseshoe Bend", body: "Sunset with a photographer guide." },
      { day: 7, title: "Grand Canyon", body: "Helicopter to the North Rim, lunch on the rim." },
      { day: 8, title: "Monument Valley", body: "Private tour with a Navajo guide." },
      { day: 9, title: "Sedona", body: "Vortex hike, evening at a design lodge." },
      { day: 10, title: "Wine Country", body: "Verde Valley tastings." },
      { day: 11, title: "Departure", body: "Transfer to Phoenix." },
    ],
  },
  {
    slug: "canada-rockies",
    title: "The Canadian Rockies",
    destination: "Canada",
    destinationSlug: "canada",
    nights: 9,
    price: 7480,
    style: "Family",
    mood: { pace: "adventurous", landscape: "mountains" },
    rating: 4.9,
    reviews: 108,
    image: U("photo-1503614472-8c93d56cd601"),
    summary:
      "Nine nights between Banff and Jasper — private canoes at first light, glacier walks with a mountaineer, and lodges beside the loudest silence you've ever heard.",
    inclusions: [
      "Fairmont Chateau Lake Louise and Post Hotel",
      "Private canoe at sunrise on Moraine Lake",
      "Guided walk on the Athabasca Glacier",
      "Icefields Parkway with a naturalist driver",
      "All meals in select lodges",
    ],
    itinerary: [
      { day: 1, title: "Calgary to Banff", body: "Private transfer, evening in Banff village." },
      { day: 2, title: "Lake Louise", body: "Sunrise canoe, afternoon Plain of Six Glaciers hike." },
      { day: 3, title: "Moraine Lake", body: "First-light canoe before the public gates open." },
      { day: 4, title: "Yoho", body: "Emerald Lake and Takakkaw Falls." },
      { day: 5, title: "Icefields Parkway", body: "Slow drive north with a naturalist." },
      { day: 6, title: "Athabasca Glacier", body: "Ice walk with a mountaineer." },
      { day: 7, title: "Maligne Lake", body: "Private boat to Spirit Island." },
      { day: 8, title: "Wildlife Morning", body: "Dawn drive with a wildlife guide." },
      { day: 9, title: "Return", body: "Transfer to Jasper station or airport." },
    ],
  },
  {
    slug: "indonesia-islands",
    title: "Indonesia, Between Islands",
    destination: "Indonesia",
    destinationSlug: "indonesia",
    nights: 10,
    price: 6480,
    style: "Romantic",
    mood: { pace: "relaxing", landscape: "beach" },
    rating: 4.8,
    reviews: 118,
    image: U("photo-1537996194471-e657df975ab4"),
    summary:
      "Ten nights across Bali, Sumba, and Komodo — cliffside villas, wild coasts, and the dragon islands, all connected by private boat and flight.",
    inclusions: [
      "Cliffside villa at Uluwatu",
      "NIHI Sumba stay",
      "Private phinisi in Komodo",
      "All internal flights and transfers",
      "Daily breakfast; select curated dinners",
    ],
    itinerary: [
      { day: 1, title: "Arrival, Bali", body: "Transfer to a cliffside villa in Uluwatu." },
      { day: 2, title: "South Coast", body: "Sunset at Uluwatu Temple with a private guide." },
      { day: 3, title: "Ubud", body: "Rice terraces, a weaving workshop." },
      { day: 4, title: "To Sumba", body: "Private flight to NIHI Sumba." },
      { day: 5, title: "Sumba Coast", body: "Horseback ride at dawn on the beach." },
      { day: 6, title: "Village Day", body: "Guided visit to a Marapu village." },
      { day: 7, title: "To Komodo", body: "Fly to Labuan Bajo, board your phinisi." },
      { day: 8, title: "Dragon Island", body: "Rinca sighting with a park ranger." },
      { day: 9, title: "Pink Beach", body: "Snorkel and swim in isolated coves." },
      { day: 10, title: "Return", body: "Fly back to Bali for onward connections." },
    ],
  },
  {
    slug: "egypt-nile-slow",
    title: "The Slow Nile",
    destination: "Egypt",
    destinationSlug: "egypt",
    nights: 10,
    price: 7280,
    style: "Cultural",
    mood: { pace: "relaxing", landscape: "mixed" },
    rating: 4.9,
    reviews: 64,
    image: U("photo-1539768942893-daf53e448371"),
    summary:
      "Ten nights between Cairo, a private dahabiya on the Nile, and the temples of Abu Simbel — with an Egyptologist at your side throughout.",
    inclusions: [
      "Private Egyptologist guide throughout",
      "Four nights on a private dahabiya",
      "Early access to the Pyramids and the Valley of the Kings",
      "Domestic flights included",
      "All meals aboard the dahabiya",
    ],
    itinerary: [
      { day: 1, title: "Cairo", body: "Transfer to a hotel with pyramid views." },
      { day: 2, title: "Giza", body: "Private early access before public opening." },
      { day: 3, title: "Old Cairo", body: "Coptic quarter, Khan el-Khalili at dusk." },
      { day: 4, title: "South to Luxor", body: "Flight south, sunset felucca on the Nile." },
      { day: 5, title: "Valley of the Kings", body: "Private access to a tomb closed to the public." },
      { day: 6, title: "Aboard the Dahabiya", body: "Sail south from Esna." },
      { day: 7, title: "Slow Water", body: "Village stops, a private lunch on a sandbank." },
      { day: 8, title: "Kom Ombo & Edfu", body: "Temples visited without another boat in sight." },
      { day: 9, title: "Aswan", body: "Nubian village visit, sunset in a garden hotel." },
      { day: 10, title: "Abu Simbel & Home", body: "Fly at first light, then home." },
    ],
  },
  {
    slug: "armenia-monasteries",
    title: "Armenia, Monasteries & Wine",
    destination: "Armenia",
    destinationSlug: "armenia",
    nights: 7,
    price: 4180,
    style: "Cultural",
    mood: { pace: "relaxing", landscape: "mountains" },
    rating: 4.8,
    reviews: 42,
    image: U("photo-1610294928006-8b6a7f671cd3"),
    summary:
      "Seven nights through Yerevan, the Areni wine country, and the monasteries of the Debed and Vayots Dzor valleys — small crowds, big landscapes.",
    inclusions: [
      "Boutique stays in Yerevan and the wine country",
      "Private historian guide throughout",
      "Areni cellar tastings",
      "Tatev cable car and monastery visit",
      "Daily breakfast and select supras",
    ],
    itinerary: [
      { day: 1, title: "Yerevan", body: "Private transfer, evening walk around Republic Square." },
      { day: 2, title: "The City", body: "Cascade, Matenadaran manuscripts, an old-town supra." },
      { day: 3, title: "Geghard & Garni", body: "Rock-hewn monastery and the pagan temple." },
      { day: 4, title: "Areni Country", body: "Cellar tastings and Noravank at sunset." },
      { day: 5, title: "South to Tatev", body: "World's longest cable car to a cliffside monastery." },
      { day: 6, title: "Debed Valley", body: "Haghpat and Sanahin — UNESCO monasteries." },
      { day: 7, title: "Return to Yerevan", body: "Slow drive back, farewell dinner." },
      { day: 8, title: "Departure", body: "Private transfer to Zvartnots airport." },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Elena & Marcus Whitfield",
    location: "London, UK",
    trip: "Thailand, Slowly",
    quote:
      "Travel Tours understood exactly what we were looking for — not the checklist Thailand, but the quiet one. From the Chiang Mai alms walk to that hidden island villa, every choice felt considered.",
    rating: 5,
    avatar: U("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "The Andersen Family",
    location: "Copenhagen, DK",
    trip: "The Canadian Rockies",
    quote:
      "Our guide across the Icefields was extraordinary. The kids still talk about the morning canoe on Moraine Lake. It felt private, respectful, and genuinely wild.",
    rating: 5,
    avatar: U("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "David Okafor",
    location: "New York, US",
    trip: "China, Two Capitals and a River",
    quote:
      "Twelve days, three cities, and not a single hitch. The after-hours Forbidden City visit was worth the trip alone. I've traveled a lot — this was the best planned journey of my life.",
    rating: 5,
    avatar: U("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    name: "Aya Tanaka",
    location: "Singapore",
    trip: "Indonesia, Between Islands",
    quote:
      "The pace was perfect. We felt looked after without being managed. The phinisi in Komodo was worth the entire trip on its own.",
    rating: 5,
    avatar: U("photo-1487412720507-e7ab37603c6f", 200),
  },
];

export const articles: Article[] = [
  {
    slug: "thailand-shoulder-season",
    title: "Thailand in November: The Case for the Shoulder Season",
    excerpt:
      "The temples empty out, the beaches quieten, and the food is at its best. Our specialist on why late autumn is the quietly correct time to visit.",
    category: "Guides",
    readTime: "6 min read",
    date: "November 4, 2026",
    author: "Naree Suksri",
    image: U("photo-1528181304800-259b08848526"),
    body: [
      "There is a particular quality to the light in Chiang Mai in early November — low, warm, and slightly amber. It is, for those in the know, the moment to go.",
      "The great crush of high season is still six weeks away. The rains have gone. The temples empty out by four in the afternoon and the night markets stretch to midnight without feeling packed.",
      "Our advice, always, is to go slowly. Book three or four nights longer than feels sensible. Add a day in Chiang Rai. Say yes to the alms walk, even if you're tired. The best of Thailand happens quietly, and only if you make room for it.",
    ],
  },
  {
    slug: "packing-for-the-rockies",
    title: "Packing for the Canadian Rockies (Without Overpacking)",
    excerpt:
      "The weather in the mountains changes four times a day. Here's exactly what our guides carry — and what they leave behind.",
    category: "Practical",
    readTime: "8 min read",
    date: "October 21, 2026",
    author: "Tomás Fernández",
    image: U("photo-1503614472-8c93d56cd601"),
    body: [
      "First principle: layers. Four thin layers will always beat two thick ones. The wind coming off a glacier does not negotiate.",
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
    image: U("photo-1525625293386-3f8f99389edd"),
    body: [
      "Luxury, in travel, used to mean a certain kind of hotel: marble lobbies, gold taps, a concierge in a tailcoat. It is beginning, quietly, to mean something else.",
      "The clients we speak to now — thirty-somethings, forty-somethings, often families — do not want the marble. They want the shophouse hawker meal with the extraordinary chef. They want the guide who knows the temple caretaker. They want time, and quiet, and access.",
      "It is a more difficult thing to deliver than the marble. It is, we think, also the more interesting one.",
    ],
  },
  {
    slug: "egypt-nile-slow",
    title: "How to Actually See Egypt: Slower, Smaller, Sooner",
    excerpt:
      "Skip the mega-cruises. Here's how our Egypt specialists plan around temples, tombs, and the one thing most travelers forget.",
    category: "Guides",
    readTime: "7 min read",
    date: "September 28, 2026",
    author: "Yasmin Farouk",
    image: U("photo-1539768942893-daf53e448371"),
    body: [
      "Everyone asks about the mega-cruises. They matter, but not in the way you think. A 300-passenger boat arriving at Kom Ombo at the same time as three others is not why you came.",
      "The thing most travelers forget: the Egyptian day is bookended by cool. Everything worth doing happens before ten in the morning or after four in the afternoon.",
      "Our approach: use a private dahabiya, work with a working Egyptologist, and give it ten days. Almost no one who does all three regrets it.",
    ],
  },
];

export const faqs: { q: string; a: string; category: string }[] = [
  {
    category: "Booking",
    q: "How does a typical Travel Tours trip come together?",
    a: "Every journey starts with a conversation. A specialist listens to what you're after, sends across a first proposal within five business days, and refines it with you until the details feel right. Only then do we book.",
  },
  {
    category: "Booking",
    q: "How far in advance should I plan?",
    a: "Four to six months is comfortable for most destinations. For the Canadian Rockies in July, Egypt at Christmas, or Bali in August, we recommend nine to twelve months.",
  },
  {
    category: "Pricing",
    q: "What is included in your quoted price?",
    a: "Everything meaningful: accommodation, private guiding, transfers, experiences, and daily breakfast. Long-haul flights, visas, and personal spending are typically separate. Every proposal lists inclusions clearly.",
  },
  {
    category: "Pricing",
    q: "Do you have a minimum trip cost?",
    a: "Yes. Our starting point is around $2,500 per person for shorter journeys. We work with couples, families, and small groups up to twelve.",
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

export const visaPackages: VisaPackage[] = [
  {
    slug: "thailand-tourist",
    country: "Thailand",
    title: "Thailand Tourist Visa",
    visaType: "Tourist",
    price: 95,
    turnaround: "3–5 business days",
    summary: "Single-entry tourist visa for stays up to 60 days. Document review and e-visa submission handled for you.",
    image: U("photo-1528181304800-259b08848526"),
  },
  {
    slug: "malaysia-tourist",
    country: "Malaysia",
    title: "Malaysia Tourist Visa",
    visaType: "Tourist",
    price: 85,
    turnaround: "3–5 business days",
    summary: "Tourist eVisa for stays up to 30 days. Fast-track processing with full document verification.",
    image: U("photo-1596422846543-75c6fc197f07"),
  },
  {
    slug: "singapore-tourist",
    country: "Singapore",
    title: "Singapore Tourist Visa",
    visaType: "Tourist",
    price: 75,
    turnaround: "2–4 business days",
    summary: "Tourist eVisa for stays up to 30 days. Sponsorship and letter coordination when required.",
    image: U("photo-1525625293386-3f8f99389edd"),
  },
  {
    slug: "china-tourist",
    country: "China",
    title: "China Tourist Visa",
    visaType: "Tourist",
    price: 195,
    turnaround: "7–10 business days",
    summary: "L-class tourist visa for single or double entry. Full biometric appointment and embassy submission support.",
    image: U("photo-1508804185872-d7badad00f7d"),
  },
  {
    slug: "usa-tourist",
    country: "United States",
    title: "USA Tourist Visa (B1/B2)",
    visaType: "Tourist",
    price: 285,
    turnaround: "4–8 weeks",
    summary: "B1/B2 visitor visa with DS-160 preparation, interview coaching, and consular appointment scheduling.",
    image: U("photo-1485871981521-5b1fd3805eee"),
  },
  {
    slug: "canada-tourist",
    country: "Canada",
    title: "Canada Tourist Visa",
    visaType: "Tourist",
    price: 195,
    turnaround: "3–6 weeks",
    summary: "Temporary Resident Visa or eTA support, including biometric appointment coordination.",
    image: U("photo-1503614472-8c93d56cd601"),
  },
  {
    slug: "indonesia-tourist",
    country: "Indonesia",
    title: "Indonesia Tourist Visa",
    visaType: "Tourist",
    price: 95,
    turnaround: "3–5 business days",
    summary: "B211A tourist visa for stays up to 60 days, extendable in-country. Full document preparation.",
    image: U("photo-1537996194471-e657df975ab4"),
  },
  {
    slug: "egypt-tourist",
    country: "Egypt",
    title: "Egypt eVisa",
    visaType: "Tourist",
    price: 85,
    turnaround: "2–3 business days",
    summary: "Electronic tourist visa for single or multiple entry. Fast-track processing with document verification.",
    image: U("photo-1539768942893-daf53e448371"),
  },
  {
    slug: "armenia-tourist",
    country: "Armenia",
    title: "Armenia eVisa",
    visaType: "Tourist",
    price: 65,
    turnaround: "2–3 business days",
    summary: "Electronic tourist visa for stays up to 120 days. Simple, fast-track processing.",
    image: U("photo-1610294928006-8b6a7f671cd3"),
  },
  {
    slug: "malaysia-student",
    country: "Malaysia",
    title: "Malaysia Student Visa",
    visaType: "Student",
    price: 320,
    turnaround: "6–8 weeks",
    summary: "Student Pass for study at accredited Malaysian institutions. Full EMGS application, medical, and pre-arrival support.",
    image: U("photo-1596422846543-75c6fc197f07"),
  },
  {
    slug: "dubai-student",
    country: "Dubai",
    title: "Dubai Student Visa",
    visaType: "Student",
    price: 380,
    turnaround: "3–5 weeks",
    summary: "UAE student residence visa for accredited universities in Dubai. Sponsorship letters, medical, and Emirates ID support included.",
    image: U("photo-1512453979798-5ea266f8880c"),
  },
];

export const visaFaqs: { q: string; a: string; category?: string }[] = [
  {
    category: "Process",
    q: "How does Travel Tours handle visa applications?",
    a: "We review your documents, prepare your application, schedule embassy appointments when needed, and submit on your behalf. You'll receive status updates at every stage.",
  },
  {
    category: "Process",
    q: "How long before my trip should I apply?",
    a: "We recommend starting 6–8 weeks before departure for embassy-based visas, and 2–3 weeks for eVisas. Rush processing is available for select countries.",
  },
  {
    category: "Documents",
    q: "What documents will I need?",
    a: "Typically a valid passport, recent photos, proof of travel insurance, flight reservations, and hotel confirmations. Student visas require acceptance letters and financial evidence. We provide a tailored checklist for your destination.",
  },
  {
    category: "Documents",
    q: "Can you help if my application was previously denied?",
    a: "Yes. Our specialists review denial letters, identify gaps, and advise on a strengthened reapplication strategy.",
  },
  {
    category: "Pricing",
    q: "What's included in the visa service fee?",
    a: "Document review, application preparation, embassy submission, and status tracking. Government visa fees are separate and listed transparently on your quote.",
  },
  {
    category: "Pricing",
    q: "Do you offer business and transit visas?",
    a: "Absolutely. Contact us with your travel purpose and we'll match you with the correct visa category and processing timeline.",
  },
];

/** Count tours/packages per destination slug */
export function getTourCount(destinationSlug: string): number {
  return packages.filter((p) => p.destinationSlug === destinationSlug).length;
}
