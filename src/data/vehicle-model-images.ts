import { optimizeImageUrl, unsplash, pexels } from "@/lib/media-urls";

/** Model-specific hero + gallery (Indian market models) */
const MODEL_IMAGES: Record<string, readonly [string, ...string[]]> = {
  "maruti|swift": [
    "https://upload.wikimedia.org/wikipedia/commons/3/3e/2021_Maruti_Suzuki_Swift_ZXi%2B_%2837144753751%29.jpg",
    unsplash("photo-1606669339-cb03abaaf3c0"),
    unsplash("photo-1494976388531-d105849445ff"),
  ],
  "maruti|baleno": [
    unsplash("photo-1606669339-cb03abaaf3c0"),
    unsplash("photo-1503376780353-7e5256eae237"),
    pexels(170811, 1200),
  ],
  "maruti|fronx": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "maruti|brezza": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(112460, 1200),
  ],
  "maruti|grand vitara": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "hyundai|i20": [
    unsplash("photo-1606669339-cb03abaaf3c0"),
    unsplash("photo-1503376780353-7e5256eae237"),
    pexels(1149137, 1200),
  ],
  "hyundai|verna": [
    unsplash("photo-1549317661-bd32c8ce0db2"),
    unsplash("photo-1552512507-d39185625877"),
    pexels(170811, 1200),
  ],
  "hyundai|creta": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    unsplash("photo-1533474119298-1698258718b7"),
  ],
  "hyundai|venue": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(116675, 1200),
  ],
  "hyundai|alcazar": [
    unsplash("photo-1519641471654-76cebc7a341f"),
    unsplash("photo-1617788138017-80837c34d4af"),
    pexels(244206, 1200),
  ],
  "hyundai|ioniq 5": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1619761368361-28717e7ac6b7"),
    pexels(979999, 1200),
  ],
  "tata|punch": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(112460, 1200),
  ],
  "tata|altroz": [
    unsplash("photo-1606669339-cb03abaaf3c0"),
    unsplash("photo-1494976388531-d105849445ff"),
    pexels(1149137, 1200),
  ],
  "tata|nexon": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "tata|harrier": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "tata|safari": [
    unsplash("photo-1519641471654-76cebc7a341f"),
    unsplash("photo-1617788138017-80837c34d4af"),
    pexels(112460, 1200),
  ],
  "tata|nexon ev": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1619761368361-28717e7ac6b7"),
    pexels(979999, 1200),
  ],
  "tata|punch ev": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(979999, 1200),
  ],
  "tata|tiago ev": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1606669339-cb03abaaf3c0"),
    pexels(979999, 1200),
  ],
  "honda|amaze": [
    unsplash("photo-1549317661-bd32c8ce0db2"),
    unsplash("photo-1552512507-d39185625877"),
    pexels(170811, 1200),
  ],
  "honda|elevate": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "honda|city": [
    unsplash("photo-1549317661-bd32c8ce0db2"),
    unsplash("photo-1552512507-d39185625877"),
    pexels(170811, 1200),
  ],
  "mahindra|xuv700": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "mahindra|scorpio-n": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(112460, 1200),
  ],
  "mahindra|thar": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(116675, 1200),
  ],
  "mahindra|xuv300": [
    unsplash("photo-1609521263047-f8f205293f24"),
    unsplash("photo-1619761368361-28717e7ac6b7"),
    pexels(112460, 1200),
  ],
  "mahindra|xuv400": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1617788138017-80837c34d4af"),
    pexels(979999, 1200),
  ],
  "kia|seltos": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "kia|sonet": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(112460, 1200),
  ],
  "toyota|hyryder": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "toyota|innova crysta": [
    unsplash("photo-1519641471654-76cebc7a341f"),
    unsplash("photo-1617788138017-80837c34d4af"),
    pexels(244206, 1200),
  ],
  "toyota|fortuner": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "mg|hector": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "mg|astor": [
    unsplash("photo-1609521263047-f8f205293f24"),
    unsplash("photo-1619761368361-28717e7ac6b7"),
    pexels(112460, 1200),
  ],
  "mg|zs ev": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1617788138017-80837c34d4af"),
    pexels(979999, 1200),
  ],
  "mg|comet ev": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1606669339-cb03abaaf3c0"),
    pexels(979999, 1200),
  ],
  "volkswagen|virtus": [
    unsplash("photo-1549317661-bd32c8ce0db2"),
    unsplash("photo-1552512507-d39185625877"),
    pexels(170811, 1200),
  ],
  "volkswagen|polo": [
    unsplash("photo-1606669339-cb03abaaf3c0"),
    unsplash("photo-1494976388531-d105849445ff"),
    pexels(1149137, 1200),
  ],
  "skoda|kushaq": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(116675, 1200),
  ],
  "ford|ecosport": [
    unsplash("photo-1609521263047-f8f205293f24"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(112460, 1200),
  ],
  "renault|duster": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1533474119298-1698258718b7"),
    pexels(116675, 1200),
  ],
  "nissan|magnite": [
    unsplash("photo-1619761368361-28717e7ac6b7"),
    unsplash("photo-1609521263047-f8f205293f24"),
    pexels(112460, 1200),
  ],
  "jeep|compass": [
    unsplash("photo-1617788138017-80837c34d4af"),
    unsplash("photo-1519641471654-76cebc7a341f"),
    pexels(244206, 1200),
  ],
  "bmw|3 series": [
    unsplash("photo-1618843479313-40f8afb4b4d8"),
    unsplash("photo-1555215695-3004980ad54e"),
    pexels(116675, 1200),
  ],
  "mercedes-benz|c-class": [
    unsplash("photo-1618843479313-40f8afb4b4d8"),
    unsplash("photo-1617531653332-bd46c24b2068"),
    pexels(170811, 1200),
  ],
  "byd|atto 3": [
    unsplash("photo-1593941707879-2c2b2cd97e2a"),
    unsplash("photo-1619761368361-28717e7ac6b7"),
    pexels(979999, 1200),
  ],
  "honda|activa": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "tvs|jupiter": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "hero|splendor": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "bajaj|pulsar": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "royal enfield|classic 350": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "royal enfield|hunter 350": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "yamaha|r15": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "ktm|duke": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "tvs|apache": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "suzuki|access": [
    unsplash("photo-1558981403-c5f9899a1482"),
    unsplash("photo-1568774123-74d5bfff0e2c"),
    pexels(2116473, 1200),
  ],
  "tata|ace": [
    unsplash("photo-1601584111127-372f204f45a6"),
    unsplash("photo-1580674285054-bed31e703add"),
    pexels(3802508, 1200),
  ],
  "tata|407": [
    unsplash("photo-1601584111127-372f204f45a6"),
    unsplash("photo-1580674285054-bed31e703add"),
    pexels(3802508, 1200),
  ],
  "mahindra|bolero pik-up": [
    unsplash("photo-1601584111127-372f204f45a6"),
    unsplash("photo-1580674285054-bed31e703add"),
    pexels(3802508, 1200),
  ],
  "ashok leyland|dost": [
    unsplash("photo-1601584111127-372f204f45a6"),
    unsplash("photo-1580674285054-bed31e703add"),
    pexels(3802508, 1200),
  ],
  "eicher|pro 2049": [
    unsplash("photo-1601584111127-372f204f45a6"),
    unsplash("photo-1580674285054-bed31e703add"),
    pexels(3802508, 1200),
  ],
  "force|traveller": [
    unsplash("photo-1544626217-48d0c016a1df"),
    unsplash("photo-1570125909232-eb175ccef6c0"),
    pexels(3802508, 1200),
  ],
  "tata|winger": [
    unsplash("photo-1544626217-48d0c016a1df"),
    unsplash("photo-1570125909232-eb175ccef6c0"),
    pexels(3802508, 1200),
  ],
  "mahindra|tourister": [
    unsplash("photo-1544626217-48d0c016a1df"),
    unsplash("photo-1570125909232-eb175ccef6c0"),
    pexels(3802508, 1200),
  ],
  "bajaj|re": [
    unsplash("photo-1583121274602-3f282f138f7d"),
    unsplash("photo-1558981403-c5f9899a1482"),
    pexels(2116473, 1200),
  ],
  "piaggio|ape": [
    unsplash("photo-1583121274602-3f282f138f7d"),
    unsplash("photo-1558981403-c5f9899a1482"),
    pexels(2116473, 1200),
  ],
};

const FALLBACK_BY_BODY: Record<string, string[]> = {
  Hatchback: [unsplash("photo-1606669339-cb03abaaf3c0"), unsplash("photo-1494976388531-d105849445ff")],
  Sedan: [unsplash("photo-1549317661-bd32c8ce0db2"), unsplash("photo-1552512507-d39185625877")],
  SUV: [unsplash("photo-1617788138017-80837c34d4af"), unsplash("photo-1609521263047-f8f205293f24")],
  MPV: [unsplash("photo-1519641471654-76cebc7a341f"), unsplash("photo-1617788138017-80837c34d4af")],
  Bike: [unsplash("photo-1558981403-c5f9899a1482"), unsplash("photo-1568774123-74d5bfff0e2c")],
  Scooter: [unsplash("photo-1558981403-c5f9899a1482"), unsplash("photo-1449429966343-7f4b5b5b5b5b")],
  Truck: [unsplash("photo-1601584111127-372f204f45a6"), unsplash("photo-1580674285054-bed31e703add")],
  Bus: [unsplash("photo-1544626217-48d0c016a1df"), unsplash("photo-1570125909232-eb175ccef6c0")],
  Auto: [unsplash("photo-1583121274602-3f282f138f7d"), unsplash("photo-1558981403-c5f9899a1482")],
  default: [unsplash("photo-1492144534655-ae79c964c9d7"), unsplash("photo-1617788138017-80837c34d4af")],
};

function modelKey(brand: string, model: string): string {
  return `${brand.trim().toLowerCase()}|${model.trim().toLowerCase()}`;
}

export function getModelImages(
  brand: string,
  model: string,
  bodyType: string,
  seed = 0
): string[] {
  const key = modelKey(brand, model);
  const set = MODEL_IMAGES[key] ?? FALLBACK_BY_BODY[bodyType] ?? FALLBACK_BY_BODY.default!;
  const hero = set[seed % set.length]!;
  const gallery = set.map((u) => optimizeImageUrl(u, { w: 1200, h: 800 }));
  const unique = [...new Set([hero, ...gallery])];
  return unique.slice(0, 4);
}
