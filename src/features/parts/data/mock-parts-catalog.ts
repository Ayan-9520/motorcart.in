import type { HubCategorySlug } from "@/features/marketplace/types";
import type { PartCategorySlug, PartProduct } from "../types";
import { getPartImages } from "./parts-images";

const SELLER = "00000000-0000-0000-0000-000000000001";

function p(
  id: string,
  slug: string,
  name: string,
  cat: PartCategorySlug,
  brand: string,
  price: number,
  orig: number | null,
  wholesale: number,
  stock: number,
  bulk: number,
  rating: number,
  reviews: number,
  compat: string[],
  feat: boolean,
  desc: string,
  imgSeed = 0,
  vehicleHubs?: HubCategorySlug[]
): PartProduct {
  return {
    id,
    sellerId: SELLER,
    name,
    slug,
    categorySlug: cat,
    vehicleHubs,
    brand,
    price,
    originalPrice: orig,
    wholesalePrice: wholesale,
    gstRate: 18,
    stock,
    bulkMinQty: bulk,
    rating,
    reviewCount: reviews,
    images: getPartImages(cat, slug, imgSeed),
    compatibility: compat,
    isFeatured: feat,
    isActive: true,
    description: desc,
    sku: `MC-${slug.slice(0, 12).toUpperCase().replace(/-/g, "")}`,
    partOrigin: "aftermarket",
    mrp: orig ?? price,
    supplierSku: null,
    createdAt: new Date().toISOString(),
  };
}

export const MOCK_PARTS_CATALOG: PartProduct[] = [
  // —— Tyres ——
  p("p-t01", "michelin-primacy-5-205-55-r16", "Michelin Primacy 5 — 205/55 R16", "tyres", "Michelin", 8499, 9999, 7200, 80, 2, 4.8, 1204, ["Honda City", "Hyundai Verna", "Skoda Slavia"], true, "Premium touring tyre. Low noise, 6-year warranty. Tubeless."),
  p("p-t02", "apollo-amazer-4g-165-80-r14", "Apollo Amazer 4G Life — 165/80 R14", "tyres", "Apollo", 3899, 4499, 3100, 120, 4, 4.5, 2890, ["Maruti Swift", "Alto", "WagonR"], false, "India's highest-selling hatchback tyre. 65,000 km warranty."),
  p("p-t03", "mrf-zlx-195-65-r15", "MRF ZLX — 195/65 R15", "tyres", "MRF", 5299, 5999, 4400, 64, 2, 4.6, 1560, ["Hyundai Creta", "Kia Seltos"], true, "All-terrain comfort for compact SUVs."),
  p("p-t04", "bridgestone-turanza-215-60-r16", "Bridgestone Turanza T005 — 215/60 R16", "tyres", "Bridgestone", 11299, 12999, 9600, 42, 2, 4.9, 890, ["Toyota Innova Crysta", "MG Hector"], true, "OEM fitment grade. Wet grip A-rated."),
  p("p-t05", "ceat-securo-175-65-r14", "CEAT SecuraDrive — 175/65 R14", "tyres", "CEAT", 3299, 3799, 2650, 95, 4, 4.4, 2100, ["Maruti Dzire", "Swift"], false, "Fuel-efficient tread for city commutes."),
  p("p-t06", "goodyear-assurance-185-65-r15", "Goodyear Assurance TripleMax 2 — 185/65 R15", "tyres", "Goodyear", 4599, 5299, 3750, 58, 2, 4.7, 1340, ["Honda Amaze", "Tata Tigor"], false, "Aquaplaning resistant compound."),

  // —— Battery ——
  p("p-b01", "exide-mileage-65ah", "Exide Mileage 65Ah — DIN 65", "battery", "Exide", 6299, 6999, 5400, 45, 1, 4.7, 4200, ["Sedan", "Compact SUV"], true, "Maintenance-free. 55-month pro-rata warranty."),
  p("p-b02", "amaron-pro-60ah", "Amaron PRO 60Ah — DIN 55", "battery", "Amaron", 5899, 6499, 5000, 60, 1, 4.6, 3560, ["Hatchback", "Sedan"], true, "High cranking amps for Indian summers."),
  p("p-b03", "luminous-evo-din-70", "Luminous EVO DIN 70 — 70Ah", "battery", "Luminous", 7499, 8299, 6200, 28, 1, 4.5, 890, ["Innova", "XUV700"], false, "Calcium silver alloy grids."),
  p("p-b04", "tata-green-battery-45ah", "Tata Green Battery 45Ah", "battery", "Tata Green", 4299, 4799, 3600, 72, 2, 4.4, 1780, ["Alto", "Santro", "Tiago"], false, "Eco-friendly recycled lead."),

  // —— Brake ——
  p("p-br01", "bosch-brake-pad-front-kit", "Bosch QuietCast Front Brake Pad Set", "brake-parts", "Bosch", 3299, 3999, 2650, 34, 2, 4.7, 1640, ["Hyundai Creta", "Kia Seltos"], true, "Ceramic compound — low dust, OE equivalent."),
  p("p-br02", "brembo-brake-fluid-dot4", "Brembo Premium DOT 4 Brake Fluid — 1L", "brake-parts", "Brembo", 899, 1099, 720, 200, 4, 4.8, 920, ["All vehicles"], false, "Dry boiling point 265°C."),
  p("p-br03", "mando-brake-disc-creta", "Mando Front Brake Disc — Creta", "brake-parts", "Mando", 4899, 5699, 4100, 18, 1, 4.6, 340, ["Hyundai Creta 2018+"], true, "Ventilated rotor. Anti-corrosion coating."),
  p("p-br04", "aisin-brake-caliper-rebuild", "Aisin Brake Caliper Repair Kit", "brake-parts", "Aisin", 2199, null, 1750, 22, 2, 4.3, 156, ["Maruti Swift", "Dzire"], false, "Complete seal & pin kit."),

  // —— Engine ——
  p("p-e01", "mann-oil-filter-hu612x", "MANN Filter HU 612x Oil Filter", "engine-parts", "MANN", 649, 799, 520, 90, 6, 4.6, 4330, ["VW", "Skoda", "Audi 1.5 TSI"], false, "OEM supplier. 15,000 km change interval."),
  p("p-e02", "k-n-cone-air-intake", "K&N 57i Performance Induction Kit", "engine-parts", "K&N", 12499, 14999, 10200, 12, 1, 4.8, 510, ["Honda City", "Civic"], true, "Washable filter. +5–8 HP gain."),
  p("p-e03", "bosch-spark-plug-set-4", "Bosch Double Platinum Spark Plug Set (4)", "engine-parts", "Bosch", 1899, 2299, 1500, 55, 2, 4.7, 2890, ["Petrol hatchback/sedan"], true, "FR7DC+ equivalent. 60,000 km life."),
  p("p-e04", "gates-timing-belt-kit", "Gates PowerGrip Timing Belt Kit", "engine-parts", "Gates", 6899, 7999, 5600, 14, 1, 4.5, 420, ["Hyundai i20 Diesel"], false, "Includes tensioner & idler."),
  p("p-e05", "denso-radiator-coolant-5l", "Denso Long Life Coolant — 5L", "engine-parts", "Denso", 1299, 1499, 1050, 88, 2, 4.6, 1120, ["All vehicles"], false, "Ethylene glycol. −37°C protection."),

  // —— Lubricants ——
  p("p-l01", "castrol-edge-5w30-4l", "Castrol EDGE 5W-30 — 4L", "lubricants", "Castrol", 4599, 4999, 3800, 55, 2, 4.9, 8400, ["Turbo petrol", "Diesel"], true, "Full synthetic. Titanium FST technology."),
  p("p-l02", "motul-8100-xcess-5w40", "Motul 8100 X-cess 5W-40 — 5L", "lubricants", "Motul", 6899, 7499, 5600, 40, 2, 4.8, 2890, ["European imports", "VW group"], true, "ACEA C3. Low SAPS for DPF."),
  p("p-l03", "shell-helix-ultra-0w20", "Shell Helix Ultra 0W-20 — 3.5L", "lubricants", "Shell", 3999, 4499, 3300, 48, 2, 4.7, 1560, ["Hybrid", "New gen petrol"], false, "Factory fill spec for many OEMs."),
  p("p-l04", "servo-matic-atf-4l", "Indian Oil Servo Matic ATF — 4L", "lubricants", "Servo", 1899, 2199, 1550, 70, 2, 4.5, 980, ["Automatic transmission"], false, "Dexron III compatible."),

  // —— Electronics ——
  p("p-el01", "pioneer-carplay-dmh", "Pioneer DMH-ZF9590BT — Wireless CarPlay", "electronics", "Pioneer", 22999, 26999, 18900, 18, 1, 4.85, 512, ["Universal double-DIN"], true, "9\" capacitive. Wireless Android Auto."),
  p("p-el02", "bosch-reverse-camera-hd", "Bosch HD Reverse Camera with Guidelines", "electronics", "Bosch", 3499, 3999, 2800, 70, 2, 4.5, 1210, ["All cars"], false, "IP67. Night vision assist."),
  p("p-el03", "philips-led-headlight-h7", "Philips Ultinon Pro H7 LED Pair", "electronics", "Philips", 5999, 6999, 4900, 32, 1, 4.8, 2340, ["H7 socket vehicles"], true, "Road legal ECE R10. 5800K."),
  p("p-el04", "valeo-horn-twin-pack", "Valeo Twin Tone Horn Kit — 12V", "electronics", "Valeo", 1299, 1599, 1050, 110, 4, 4.4, 890, ["All 12V vehicles"], false, "110 dB. Plug-and-play harness."),

  // —— Accessories ——
  p("p-a01", "3m-premium-car-mats", "3M Custom Fit Floor Mats — 5 Seater SUV", "accessories", "3M", 2899, 3499, 2300, 44, 4, 4.6, 1670, ["Creta", "Seltos", "Nexon"], false, "Anti-skid nib backing. All-weather."),
  p("p-a02", "thule-roof-rack-wingbar", "Thule WingBar Edge — Flush Mount", "accessories", "Thule", 18999, 21999, 15800, 8, 1, 4.9, 320, ["Compact SUV"], true, "Aerodynamic. 75 kg load rating."),
  p("p-a03", "mothers-carnauba-wax", "Mothers California Gold Carnauba Wax", "accessories", "Mothers", 1899, 2199, 1500, 65, 2, 4.7, 2100, ["All paint types"], false, "Deep gloss. UV protection."),
  p("p-a04", "philips-go-pure-cabin-filter", "Philips GoPure 5212 Cabin Air Purifier", "accessories", "Philips", 8999, 10499, 7400, 24, 1, 4.6, 450, ["Universal 12V"], true, "HEPA H13. PM2.5 removal."),

  // —— Body ——
  p("p-bo01", "oem-front-bumper-swift", "OEM Front Bumper Shell — Swift 2018+", "body-parts", "Maruti Suzuki", 12499, 14299, 9800, 6, 1, 4.4, 145, ["Maruti Swift"], false, "Primed. Ready for paint match."),
  p("p-bo02", "magna-side-mirror-power", "Power ORVM Assembly — Hyundai i20", "body-parts", "Magna", 2499, 2999, 2000, 25, 2, 4.3, 312, ["Hyundai i20"], false, "Electric fold. Turn indicator LED."),
  p("p-bo03", "fender-liner-creta-set", "Front Fender Liner Set — Creta (Pair)", "body-parts", "Hyundai Genuine", 1899, 2299, 1500, 30, 2, 4.5, 88, ["Hyundai Creta"], false, "Splash protection. Direct fit."),

  // —— Interior ——
  p("p-i01", "leather-seat-cover-premium", "Premium Leatherette Seat Cover — 5 Seater", "interior-parts", "AutoStyle", 8999, 10999, 7200, 15, 1, 4.7, 1340, ["Creta", "Seltos", "XUV700"], true, "Airbag compatible. Perforated."),
  p("p-i02", "oem-ac-vent-grille", "Dashboard AC Vent Grille Set — Polo", "interior-parts", "VW Genuine", 1899, null, 1500, 40, 4, 4.2, 188, ["VW Polo"], false, "Direct snap-fit. Charcoal finish."),
  p("p-i03", "ambient-led-footwell-kit", "RGB Ambient LED Footwell Kit — App Control", "interior-parts", "Xenon", 2499, 2999, 2000, 50, 2, 4.5, 670, ["Universal"], true, "20 colours. Music sync mode."),
  p("p-i04", "steering-wheel-cover-suede", "Suede Steering Wheel Cover — 38 cm", "interior-parts", "AutoStyle", 899, 1099, 720, 120, 4, 4.3, 2100, ["Universal"], false, "Anti-slip grip. Hand-stitched.", 0),

  // —— Bikes ——
  p("p-bk01", "mrf-revzr-110-70-r17", "MRF Revz FC1 — 110/70 R17 Front", "tyres", "MRF", 4299, 4999, 3500, 55, 2, 4.7, 890, ["KTM Duke", "Apache RTR"], true, "Sport radial. Wet grip compound.", 1, ["bikes"]),
  p("p-bk02", "ceat-zoom-plus-scooter", "CEAT Zoom Plus — 90/90 R12 Scooter", "tyres", "CEAT", 1899, 2199, 1550, 90, 4, 4.5, 2100, ["Activa", "Jupiter", "Access"], false, "Low rolling resistance for scooters.", 2, ["bikes"]),
  p("p-bk03", "motul-7100-4t-10w50", "Motul 7100 4T 10W-50 — 1L", "lubricants", "Motul", 899, 1049, 720, 120, 4, 4.8, 3400, ["Performance bikes"], true, "Ester synthetic. Race proven.", 0, ["bikes"]),
  p("p-bk04", "did-x-ring-chain-kit", "D.I.D X-Ring Chain & Sprocket Kit", "engine-parts", "D.I.D", 8499, 9999, 7200, 18, 1, 4.9, 560, ["Ninja", "R15", "RC 390"], true, "20,000 km service interval.", 1, ["bikes"]),
  p("p-bk05", "ngk-iridium-bike-plug", "NGK Iridium IX — Single (bike)", "engine-parts", "NGK", 449, 549, 360, 200, 4, 4.6, 1200, ["Single-cylinder bikes"], false, "Long-life iridium centre electrode.", 2, ["bikes"]),
  p("p-bk06", "bosch-bike-horn-disc", "Bosch Compact Disc Horn — 12V bike", "electronics", "Bosch", 599, 749, 480, 150, 4, 4.4, 2100, ["All bikes"], false, "90 dB. Low amp draw.", 0, ["bikes"]),
  p("p-bk07", "exide-bike-battery-9ah", "Exide Xplore 9Ah Bike Battery", "battery", "Exide", 1299, 1499, 1050, 80, 2, 4.5, 890, ["150cc+ bikes"], false, "AGM maintenance-free.", 1, ["bikes"]),

  // —— Trucks & HCV ——
  p("p-tr01", "apollo-endutrax-315-80-r225", "Apollo EnduTrax MA518 — 315/80 R22.5", "tyres", "Apollo", 28999, 32999, 24500, 24, 2, 4.6, 420, ["BharatBenz", "Tata Prima"], true, "Mileage compound for highway haul.", 0, ["trucks"]),
  p("p-tr02", "wabco-air-brake-valve", "WABCO Relay Emergency Valve", "brake-parts", "WABCO", 12499, 14499, 10200, 12, 1, 4.7, 180, ["HCV air brake"], true, "OEM spec relay valve.", 1, ["trucks"]),
  p("p-tr03", "fleetguard-hydraulic-filter", "Fleetguard HF35375 Hydraulic Filter", "engine-parts", "Fleetguard", 2499, 2999, 2000, 45, 2, 4.5, 340, ["JCB", "Backhoe loaders"], false, "10 micron glass media.", 2, ["trucks", "equipment"]),
  p("p-tr04", "bosch-truck-headlamp-led", "Bosch LED Headlamp Unit — 24V truck", "electronics", "Bosch", 8999, 10499, 7400, 20, 1, 4.6, 120, ["24V HCV"], false, "ECE R112 compliant beam.", 0, ["trucks"]),
  p("p-tr05", "castrol-vectrax-15w40-20l", "Castrol Vecton 15W-40 CH-4 — 20L", "lubricants", "Castrol", 8999, 9999, 7400, 35, 2, 4.7, 890, ["Diesel trucks"], true, "Heavy-duty diesel protection.", 1, ["trucks"]),

  // —— Buses & fleet ——
  p("p-bs01", "goodyear-bus-295-80-r225", "Goodyear KMAX D — 295/80 R22.5", "tyres", "Goodyear", 31999, 35999, 26800, 16, 2, 4.8, 210, ["Volvo", "Scania coaches"], true, "Regional coach mileage leader.", 0, ["buses"]),
  p("p-bs02", "valeo-bus-ac-compressor", "Valeo TM16 Bus AC Compressor", "engine-parts", "Valeo", 28999, null, 24000, 6, 1, 4.6, 88, ["AC coaches"], true, "R134a compatible. OEM fit.", 1, ["buses"]),
  p("p-bs03", "3m-bus-floor-mat-roll", "3M Nomad Bus Floor Matting — 15m roll", "accessories", "3M", 18999, 21999, 15800, 8, 1, 4.5, 45, ["City buses"], false, "Anti-slip heavy traffic grade.", 2, ["buses"]),

  // —— Auto / commercial 3W ——
  p("p-au01", "lovato-cng-reducer-kit", "Lovato CNG Reducer & Solenoid Kit", "engine-parts", "Lovato", 8999, 10499, 7400, 22, 1, 4.5, 340, ["Auto rickshaw CNG"], true, "Italian regulator. ARAI listed.", 0, ["auto"]),
  p("p-au02", "bajaj-auto-clutch-bell", "Bajaj RE Compact Clutch Bell Housing", "engine-parts", "Bajaj", 3499, 3999, 2800, 30, 2, 4.4, 560, ["Bajaj RE"], false, "Genuine spare. Heat treated.", 1, ["auto"]),
  p("p-au03", "minda-auto-headlamp-led", "Minda LED Headlamp — 12V auto", "electronics", "Minda", 1299, 1599, 1050, 60, 2, 4.3, 890, ["E-rickshaw", "Auto"], false, "DOT pattern lens.", 2, ["auto", "bikes"]),

  // —— Equipment & agri ——
  p("p-eq01", "gates-hydraulic-hose-2sn", "Gates 2SN Hydraulic Hose — per metre", "accessories", "Gates", 899, 1099, 720, 200, 4, 4.6, 120, ["Excavators", "Loaders"], false, "400 bar WP. MSHA approved.", 0, ["equipment"]),
  p("p-eq02", "cat-style-bucket-tooth", "Rock Chisel Bucket Tooth — CAT J250", "body-parts", "Vertex", 1899, 2199, 1500, 40, 4, 4.4, 210, ["JCB 3DX", "CAT mini"], false, "Forged steel. Pin included.", 1, ["equipment"]),
  p("p-eq03", "mann-hydraulic-return-filter", "MANN HD 517/1 Hydraulic Return Filter", "engine-parts", "MANN", 1299, 1599, 1050, 55, 2, 4.5, 180, ["Hydraulic systems"], false, "Glass fibre media 10 µm.", 2, ["equipment", "trucks"]),

  // —— EV ——
  p("p-ev01", "abb-type2-ac-charger-7kw", "ABB Terra AC Wallbox — Type 2, 7.4 kW", "electronics", "ABB", 45999, 52999, 38000, 12, 1, 4.85, 120, ["Home & office EV"], true, "OCPP 1.6J. RFID + app.", 0, ["ev", "cars"]),
  p("p-ev02", "exide-ev-12v-aux-battery", "Exide E-Ride 12V Aux Battery — EV", "battery", "Exide", 8999, 9999, 7400, 28, 1, 4.6, 340, ["Nexon EV", "ZS EV"], false, "Deep cycle for 12V systems.", 1, ["ev"]),
  p("p-ev03", "lubricants-ev-transmission-fluid", "Shell E-Transmission Fluid — 1L", "lubricants", "Shell", 1899, 2199, 1550, 48, 2, 4.5, 220, ["EV reduction gear"], false, "Insulating properties for e-motors.", 2, ["ev"]),
];

export const PARTS_CATALOG_STATS = {
  total: MOCK_PARTS_CATALOG.length,
  featured: MOCK_PARTS_CATALOG.filter((p) => p.isFeatured).length,
  categories: [...new Set(MOCK_PARTS_CATALOG.map((p) => p.categorySlug))].length,
} as const;
