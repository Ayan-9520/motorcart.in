/**
 * Master catalog — real Indian makes/models for listing generation.
 * Prices are indicative ex-showroom / market (INR) as of 2024–25.
 */

export const INDIAN_CITIES = [
  { city: "Mumbai", state: "Maharashtra", areas: ["Andheri West", "Thane", "Navi Mumbai", "Borivali"] },
  { city: "Delhi NCR", state: "Delhi", areas: ["Rohini", "Karol Bagh", "Noida Sector 62", "Gurgaon"] },
  { city: "Bangalore", state: "Karnataka", areas: ["Whitefield", "Koramangala", "Electronic City", "Indiranagar"] },
  { city: "Hyderabad", state: "Telangana", areas: ["Gachibowli", "Madhapur", "Kukatpally", "Banjara Hills"] },
  { city: "Chennai", state: "Tamil Nadu", areas: ["OMR", "Anna Nagar", "Velachery", "T Nagar"] },
  { city: "Pune", state: "Maharashtra", areas: ["Hinjewadi", "Kothrud", "Wakad", "Chakan"] },
  { city: "Ahmedabad", state: "Gujarat", areas: ["SG Highway", "Navrangpura", "Bopal", "Gandhinagar"] },
  { city: "Kolkata", state: "West Bengal", areas: ["Salt Lake", "Park Street", "New Town", "Howrah"] },
  { city: "Jaipur", state: "Rajasthan", areas: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "C-Scheme"] },
  { city: "Lucknow", state: "Uttar Pradesh", areas: ["Gomti Nagar", "Aliganj", "Hazratganj", "Alambagh"] },
] as const;

export const DEALERS_MASTER = [
  { id: "d-mumbai-1", name: "AutoMax Motors", slug: "automax-mumbai", city: "Mumbai", phone: "919876543210", rating: 4.8, verified: true },
  { id: "d-mumbai-2", name: "Premium Cars Mumbai", slug: "premium-cars-mumbai", city: "Mumbai", phone: "919876543211", rating: 4.6, verified: true },
  { id: "d-delhi-1", name: "Capital Wheels", slug: "capital-wheels-delhi", city: "Delhi NCR", phone: "919811223344", rating: 4.7, verified: true },
  { id: "d-delhi-2", name: "Maruti Arena Delhi", slug: "maruti-arena-delhi", city: "Delhi NCR", phone: "919811223345", rating: 4.5, verified: true },
  { id: "d-blr-1", name: "GreenDrive EV", slug: "greendrive-bangalore", city: "Bangalore", phone: "919988776655", rating: 4.9, verified: true },
  { id: "d-blr-2", name: "South India Motors", slug: "south-india-motors", city: "Bangalore", phone: "919988776656", rating: 4.6, verified: true },
  { id: "d-hyd-1", name: "Fleet Masters Hyderabad", slug: "fleet-masters-hyd", city: "Hyderabad", phone: "919933445566", rating: 4.4, verified: false },
  { id: "d-chennai-1", name: "Southern Wheels", slug: "southern-wheels", city: "Chennai", phone: "919944556677", rating: 4.7, verified: true },
  { id: "d-pune-1", name: "BikeHub Pune", slug: "bikehub-pune", city: "Pune", phone: "919977889900", rating: 4.5, verified: true },
  { id: "d-pune-2", name: "Commercial Motors Pune", slug: "commercial-motors-pune", city: "Pune", phone: "919922334455", rating: 4.5, verified: true },
  { id: "d-ahm-1", name: "Toyota Plus Ahmedabad", slug: "toyota-plus-ahmedabad", city: "Ahmedabad", phone: "919966778899", rating: 4.9, verified: true },
  { id: "d-kol-1", name: "Kia Motors Kolkata", slug: "kia-kolkata", city: "Kolkata", phone: "919955667788", rating: 4.8, verified: true },
  { id: "d-jaipur-1", name: "EV Junction Jaipur", slug: "ev-junction-jaipur", city: "Jaipur", phone: "919988990011", rating: 4.3, verified: true },
  { id: "d-luck-1", name: "Heartland Autos", slug: "heartland-autos", city: "Lucknow", phone: "919900112233", rating: 4.4, verified: true },
] as const;

export type VehicleTemplate = {
  brand: string;
  model: string;
  variants: string[];
  bodyType: string;
  category: "new-cars" | "used-cars" | "bikes" | "trucks" | "buses" | "ev";
  fuels: string[];
  transmissions: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  kmsMax: number;
  features: string[];
  newOnly?: boolean;
  usedOnly?: boolean;
  imageKey: keyof typeof IMAGE_POOL;
};

export const IMAGE_POOL = {
  suv: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
  sedan: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
  hatch: "https://images.unsplash.com/photo-1494976388531-d105849445ff?w=800&q=80",
  ev: "https://images.unsplash.com/photo-1593941707879-2c2b2cd97e2a?w=800&q=80",
  bike: "https://images.unsplash.com/photo-1558981403-c5f9899a1482?w=800&q=80",
  truck: "https://images.unsplash.com/photo-1601584111127-372f204f45a6?w=800&q=80",
  bus: "https://images.unsplash.com/photo-1544626217-48d0c016a1df?w=800&q=80",
  auto: "https://images.unsplash.com/photo-1583121274602-3f282f138f7d?w=800&q=80",
  mpv: "https://images.unsplash.com/photo-1519641471654-76cebc7a341f?w=800&q=80",
  luxury: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
};

export const VEHICLE_TEMPLATES: VehicleTemplate[] = [
  // —— Hatchbacks & sedans (new) ——
  { brand: "Maruti", model: "Swift", variants: ["LXI", "VXI", "ZXI", "ZXI+"], bodyType: "Hatchback", category: "new-cars", fuels: ["Petrol", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 650000, priceMax: 950000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["ABS", "Dual Airbags", "Smartplay"], newOnly: true, imageKey: "hatch" },
  { brand: "Maruti", model: "Baleno", variants: ["Sigma", "Delta", "Zeta", "Alpha"], bodyType: "Hatchback", category: "new-cars", fuels: ["Petrol", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 720000, priceMax: 1020000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Head-Up Display", "360 Camera"], newOnly: true, imageKey: "hatch" },
  { brand: "Maruti", model: "Fronx", variants: ["Sigma", "Delta", "Zeta", "Alpha Turbo"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 780000, priceMax: 1280000, yearMin: 2024, yearMax: 2025, kmsMax: 5000, features: ["Sunroof", "Wireless Charger"], newOnly: true, imageKey: "suv" },
  { brand: "Hyundai", model: "i20", variants: ["Magna", "Sportz", "Asta"], bodyType: "Hatchback", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 750000, priceMax: 1150000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["BOSE Audio", "Sunroof"], newOnly: true, imageKey: "hatch" },
  { brand: "Hyundai", model: "Verna", variants: ["EX", "S", "SX", "SX(O)"], bodyType: "Sedan", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 1100000, priceMax: 1750000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["ADAS", "Ventilated Seats"], newOnly: true, imageKey: "sedan" },
  { brand: "Tata", model: "Punch", variants: ["Pure", "Adventure", "Accomplished", "Creative"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 620000, priceMax: 1120000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["Safety Pack", "Sunroof"], newOnly: true, imageKey: "suv" },
  { brand: "Tata", model: "Altroz", variants: ["XE", "XM", "XZ", "XZ+"], bodyType: "Hatchback", category: "new-cars", fuels: ["Petrol", "Diesel", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 680000, priceMax: 1180000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["Harmon Kardon", "iRA Connected"], newOnly: true, imageKey: "hatch" },
  { brand: "Honda", model: "Amaze", variants: ["V", "VX", "ZX"], bodyType: "Sedan", category: "new-cars", fuels: ["Petrol", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 780000, priceMax: 1120000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Honda Sensing"], newOnly: true, imageKey: "sedan" },
  // —— SUVs (new) ——
  { brand: "Hyundai", model: "Creta", variants: ["E", "EX", "S", "SX", "SX(O)"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1150000, priceMax: 1980000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["Panoramic Sunroof", "ADAS", "Ventilated Seats"], newOnly: true, imageKey: "suv" },
  { brand: "Hyundai", model: "Venue", variants: ["E", "S", "SX", "SX(O)"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 850000, priceMax: 1420000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["BlueLink", "Sunroof"], newOnly: true, imageKey: "suv" },
  { brand: "Hyundai", model: "Alcazar", variants: ["Prestige", "Platinum", "Signature"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Automatic"], priceMin: 1650000, priceMax: 2180000, yearMin: 2024, yearMax: 2025, kmsMax: 5000, features: ["6/7 Seater", "Captain Seats"], newOnly: true, imageKey: "suv" },
  { brand: "Tata", model: "Nexon", variants: ["Smart", "Pure", "Creative", "Fearless"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 820000, priceMax: 1520000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["Safety 5-Star", "Sunroof"], newOnly: true, imageKey: "suv" },
  { brand: "Tata", model: "Harrier", variants: ["Smart", "Pure", "Adventure", "Fearless"], bodyType: "SUV", category: "new-cars", fuels: ["Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1520000, priceMax: 2280000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Land Rover DNA", "Panoramic"], newOnly: true, imageKey: "suv" },
  { brand: "Tata", model: "Safari", variants: ["Smart", "Pure", "Adventure", "Accomplished"], bodyType: "SUV", category: "new-cars", fuels: ["Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1620000, priceMax: 2480000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["7 Seater", "ADAS"], newOnly: true, imageKey: "suv" },
  { brand: "Mahindra", model: "XUV700", variants: ["MX", "AX3", "AX5", "AX7"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1420000, priceMax: 2680000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["ADAS", "Sony 3D Audio"], newOnly: true, imageKey: "suv" },
  { brand: "Mahindra", model: "Scorpio-N", variants: ["Z4", "Z6", "Z8", "Z8 L"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1320000, priceMax: 2280000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["4XPLOR", "Sunroof"], newOnly: true, imageKey: "suv" },
  { brand: "Mahindra", model: "Thar", variants: ["AX", "LX", "LX Hard Top"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1180000, priceMax: 1780000, yearMin: 2024, yearMax: 2025, kmsMax: 5000, features: ["4x4", "Convertible"], newOnly: true, imageKey: "suv" },
  { brand: "Kia", model: "Seltos", variants: ["HTE", "HTK", "HTX", "GTX+"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1120000, priceMax: 2180000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["BOSE", "ADAS Level 2"], newOnly: true, imageKey: "suv" },
  { brand: "Kia", model: "Sonet", variants: ["HTE", "HTK", "HTX", "GTX+"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 820000, priceMax: 1520000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["Sunroof", "Ventilated Seats"], newOnly: true, imageKey: "suv" },
  { brand: "Toyota", model: "Hyryder", variants: ["E", "S", "G", "V"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Hybrid"], transmissions: ["Manual", "Automatic"], priceMin: 1180000, priceMax: 1980000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Strong Hybrid", "AWD"], newOnly: true, imageKey: "suv" },
  { brand: "Toyota", model: "Innova Crysta", variants: ["GX", "VX", "ZX"], bodyType: "MPV", category: "new-cars", fuels: ["Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1980000, priceMax: 2680000, yearMin: 2024, yearMax: 2025, kmsMax: 5000, features: ["7 Seater", "Captain Seats"], newOnly: true, imageKey: "mpv" },
  { brand: "Toyota", model: "Fortuner", variants: ["4x2 AT", "4x4 MT", "Legender"], bodyType: "SUV", category: "new-cars", fuels: ["Diesel", "Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 3580000, priceMax: 5280000, yearMin: 2024, yearMax: 2025, kmsMax: 4000, features: ["4x4", "Premium Interior"], newOnly: true, imageKey: "suv" },
  { brand: "Honda", model: "Elevate", variants: ["SV", "V", "VX", "ZX"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 1120000, priceMax: 1680000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Honda Sensing", "Sunroof"], newOnly: true, imageKey: "suv" },
  { brand: "MG", model: "Hector", variants: ["Style", "Super", "Smart", "Sharp"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1520000, priceMax: 2180000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["i-Smart", "Panoramic"], newOnly: true, imageKey: "suv" },
  { brand: "MG", model: "Astor", variants: ["Style", "Super", "Smart", "Sharp"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 1020000, priceMax: 1480000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["AI Assistant", "ADAS"], newOnly: true, imageKey: "suv" },
  { brand: "Volkswagen", model: "Virtus", variants: ["Comfortline", "Highline", "Topline"], bodyType: "Sedan", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 1180000, priceMax: 1780000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["German Build", "Sunroof"], newOnly: true, imageKey: "sedan" },
  { brand: "Skoda", model: "Kushaq", variants: ["Active", "Ambition", "Style", "Monte Carlo"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 1120000, priceMax: 1780000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Virtual Cockpit"], newOnly: true, imageKey: "suv" },
  { brand: "Maruti", model: "Brezza", variants: ["LXI", "VXI", "ZXI", "ZXI+"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "CNG"], transmissions: ["Manual", "Automatic"], priceMin: 880000, priceMax: 1420000, yearMin: 2024, yearMax: 2025, kmsMax: 7000, features: ["Smart Hybrid"], newOnly: true, imageKey: "suv" },
  { brand: "Maruti", model: "Grand Vitara", variants: ["Sigma", "Delta", "Zeta", "Alpha"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Hybrid"], transmissions: ["Manual", "Automatic"], priceMin: 1120000, priceMax: 1980000, yearMin: 2024, yearMax: 2025, kmsMax: 6000, features: ["Strong Hybrid", "Panoramic"], newOnly: true, imageKey: "suv" },
  { brand: "Mahindra", model: "XUV300", variants: ["MX1", "MX2", "AX5", "AX7"], bodyType: "SUV", category: "new-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 820000, priceMax: 1280000, yearMin: 2024, yearMax: 2025, kmsMax: 8000, features: ["Sunroof", "Dual Zone AC"], newOnly: true, imageKey: "suv" },
  // —— Pre-owned cars (popular listings) ——
  { brand: "Hyundai", model: "Creta", variants: ["E", "S", "SX", "SX(O)"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 850000, priceMax: 1650000, yearMin: 2019, yearMax: 2023, kmsMax: 65000, features: ["Sunroof", "Service History"], usedOnly: true, imageKey: "suv" },
  { brand: "Maruti", model: "Swift", variants: ["VXI", "ZXI"], bodyType: "Hatchback", category: "used-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 450000, priceMax: 820000, yearMin: 2018, yearMax: 2023, kmsMax: 55000, features: ["Certified"], usedOnly: true, imageKey: "hatch" },
  { brand: "Honda", model: "City", variants: ["V", "VX", "ZX"], bodyType: "Sedan", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 720000, priceMax: 1350000, yearMin: 2018, yearMax: 2023, kmsMax: 60000, features: ["Honda Sensing"], usedOnly: true, imageKey: "sedan" },
  { brand: "Toyota", model: "Innova Crysta", variants: ["GX", "VX", "ZX"], bodyType: "MPV", category: "used-cars", fuels: ["Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1450000, priceMax: 2350000, yearMin: 2018, yearMax: 2023, kmsMax: 90000, features: ["7 Seater"], usedOnly: true, imageKey: "mpv" },
  { brand: "Mahindra", model: "Thar", variants: ["AX", "LX"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 980000, priceMax: 1580000, yearMin: 2020, yearMax: 2024, kmsMax: 45000, features: ["4x4"], usedOnly: true, imageKey: "suv" },
  { brand: "Kia", model: "Seltos", variants: ["HTK", "HTX", "GTX"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Automatic"], priceMin: 1050000, priceMax: 1850000, yearMin: 2020, yearMax: 2024, kmsMax: 50000, features: ["BOSE"], usedOnly: true, imageKey: "suv" },
  { brand: "Tata", model: "Nexon", variants: ["XM", "XZ+", "Creative"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 620000, priceMax: 1180000, yearMin: 2019, yearMax: 2023, kmsMax: 55000, features: ["5-Star Safety"], usedOnly: true, imageKey: "suv" },
  { brand: "Ford", model: "EcoSport", variants: ["Ambiente", "Trend", "Titanium"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 520000, priceMax: 920000, yearMin: 2017, yearMax: 2021, kmsMax: 75000, features: ["Sunroof"], usedOnly: true, imageKey: "suv" },
  { brand: "Volkswagen", model: "Polo", variants: ["Trendline", "Comfortline", "Highline"], bodyType: "Hatchback", category: "used-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 420000, priceMax: 780000, yearMin: 2017, yearMax: 2021, kmsMax: 60000, features: ["Build Quality"], usedOnly: true, imageKey: "hatch" },
  { brand: "Renault", model: "Duster", variants: ["RXE", "RXL", "RXZ"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual"], priceMin: 580000, priceMax: 1050000, yearMin: 2017, yearMax: 2022, kmsMax: 80000, features: ["AWD Option"], usedOnly: true, imageKey: "suv" },
  { brand: "Nissan", model: "Magnite", variants: ["XE", "XL", "XV"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol"], transmissions: ["Manual", "Automatic"], priceMin: 520000, priceMax: 880000, yearMin: 2021, yearMax: 2024, kmsMax: 35000, features: ["Turbo CVT"], usedOnly: true, imageKey: "suv" },
  { brand: "Jeep", model: "Compass", variants: ["Sport", "Longitude", "Limited"], bodyType: "SUV", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Manual", "Automatic"], priceMin: 1250000, priceMax: 2180000, yearMin: 2019, yearMax: 2023, kmsMax: 55000, features: ["4x4"], usedOnly: true, imageKey: "suv" },
  { brand: "BMW", model: "3 Series", variants: ["320d", "330i", "M340i"], bodyType: "Sedan", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Automatic"], priceMin: 2850000, priceMax: 5200000, yearMin: 2019, yearMax: 2023, kmsMax: 45000, features: ["Luxury"], usedOnly: true, imageKey: "luxury" },
  { brand: "Mercedes-Benz", model: "C-Class", variants: ["C200", "C220d", "C300"], bodyType: "Sedan", category: "used-cars", fuels: ["Petrol", "Diesel"], transmissions: ["Automatic"], priceMin: 3200000, priceMax: 5800000, yearMin: 2019, yearMax: 2023, kmsMax: 40000, features: ["MBUX"], usedOnly: true, imageKey: "luxury" },
  // —— EV ——
  { brand: "Tata", model: "Nexon EV", variants: ["Creative", "Fearless", "Empowered"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 1250000, priceMax: 1850000, yearMin: 2023, yearMax: 2025, kmsMax: 35000, features: ["437 km Range", "Fast Charge"], imageKey: "ev" },
  { brand: "Tata", model: "Punch EV", variants: ["Smart", "Adventure", "Empowered"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 1020000, priceMax: 1520000, yearMin: 2024, yearMax: 2025, kmsMax: 15000, features: ["315 km Range"], imageKey: "ev" },
  { brand: "Tata", model: "Tiago EV", variants: ["XT", "XZ+", "XZ+ Tech LUX"], bodyType: "Hatchback", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 780000, priceMax: 1180000, yearMin: 2023, yearMax: 2025, kmsMax: 25000, features: ["City EV"], imageKey: "ev" },
  { brand: "MG", model: "ZS EV", variants: ["Excite", "Exclusive"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 1180000, priceMax: 2280000, yearMin: 2022, yearMax: 2025, kmsMax: 45000, features: ["i-Smart"], imageKey: "ev" },
  { brand: "MG", model: "Comet EV", variants: ["Pace", "Play", "Plush"], bodyType: "Hatchback", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 720000, priceMax: 880000, yearMin: 2024, yearMax: 2025, kmsMax: 12000, features: ["City Car"], imageKey: "ev" },
  { brand: "BYD", model: "Atto 3", variants: ["Dynamic", "Superior"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 2480000, priceMax: 3480000, yearMin: 2023, yearMax: 2025, kmsMax: 20000, features: ["Blade Battery"], imageKey: "ev" },
  { brand: "Mahindra", model: "XUV400", variants: ["EC", "EL", "EL Pro"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 1580000, priceMax: 1980000, yearMin: 2023, yearMax: 2025, kmsMax: 28000, features: ["456 km Range"], imageKey: "ev" },
  { brand: "Hyundai", model: "Ioniq 5", variants: ["RWD", "AWD"], bodyType: "SUV", category: "ev", fuels: ["Electric"], transmissions: ["Automatic"], priceMin: 4680000, priceMax: 5280000, yearMin: 2023, yearMax: 2025, kmsMax: 15000, features: ["Ultra Fast Charge"], imageKey: "ev" },
  // —— Bikes ——
  { brand: "Honda", model: "Activa", variants: ["6G", "125", "H-Smart"], bodyType: "Scooter", category: "bikes", fuels: ["Petrol"], transmissions: ["Automatic"], priceMin: 78000, priceMax: 118000, yearMin: 2023, yearMax: 2025, kmsMax: 18000, features: ["H-Smart"], imageKey: "bike" },
  { brand: "TVS", model: "Jupiter", variants: ["Drum", "Disc", "125"], bodyType: "Scooter", category: "bikes", fuels: ["Petrol"], transmissions: ["Automatic"], priceMin: 72000, priceMax: 105000, yearMin: 2023, yearMax: 2025, kmsMax: 15000, features: ["SmartXonnect"], imageKey: "bike" },
  { brand: "Hero", model: "Splendor", variants: ["XTEC", "Plus", "i3s"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 72000, priceMax: 98000, yearMin: 2023, yearMax: 2025, kmsMax: 12000, features: ["i3s"], imageKey: "bike" },
  { brand: "Bajaj", model: "Pulsar", variants: ["125", "150", "NS200", "NS400"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 105000, priceMax: 385000, yearMin: 2022, yearMax: 2025, kmsMax: 22000, features: ["ABS"], imageKey: "bike" },
  { brand: "Royal Enfield", model: "Classic 350", variants: ["Signals", "Dark", "Chrome"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 195000, priceMax: 248000, yearMin: 2023, yearMax: 2025, kmsMax: 15000, features: ["Tripper"], imageKey: "bike" },
  { brand: "Royal Enfield", model: "Hunter 350", variants: ["Metro", "Metro Rebel", "Canyon"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 152000, priceMax: 185000, yearMin: 2023, yearMax: 2025, kmsMax: 12000, features: ["Lightweight"], imageKey: "bike" },
  { brand: "Yamaha", model: "R15", variants: ["V4", "M"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 178000, priceMax: 218000, yearMin: 2023, yearMax: 2025, kmsMax: 10000, features: ["VVA"], imageKey: "bike" },
  { brand: "KTM", model: "Duke", variants: ["200", "250", "390"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 198000, priceMax: 348000, yearMin: 2023, yearMax: 2025, kmsMax: 8000, features: ["TFT"], imageKey: "bike" },
  { brand: "TVS", model: "Apache", variants: ["RTR 160", "RTR 180", "RR 310"], bodyType: "Bike", category: "bikes", fuels: ["Petrol"], transmissions: ["Manual"], priceMin: 125000, priceMax: 285000, yearMin: 2022, yearMax: 2025, kmsMax: 18000, features: ["Race Tuned"], imageKey: "bike" },
  { brand: "Suzuki", model: "Access", variants: ["125", "Burgman"], bodyType: "Scooter", category: "bikes", fuels: ["Petrol"], transmissions: ["Automatic"], priceMin: 82000, priceMax: 118000, yearMin: 2023, yearMax: 2025, kmsMax: 14000, features: ["SEP Engine"], imageKey: "bike" },
  // —— Trucks & commercial ——
  { brand: "Tata", model: "Ace", variants: ["Gold", "HT+", "EV"], bodyType: "Truck", category: "trucks", fuels: ["Diesel", "CNG", "Electric"], transmissions: ["Manual"], priceMin: 580000, priceMax: 1180000, yearMin: 2021, yearMax: 2025, kmsMax: 85000, features: ["Last Mile"], imageKey: "truck" },
  { brand: "Tata", model: "407", variants: ["Gold SFC", "Gold LHD"], bodyType: "Truck", category: "trucks", fuels: ["Diesel"], transmissions: ["Manual"], priceMin: 1050000, priceMax: 1450000, yearMin: 2019, yearMax: 2024, kmsMax: 120000, features: ["LCV"], imageKey: "truck" },
  { brand: "Mahindra", model: "Bolero Pik-Up", variants: ["CBC", "BC"], bodyType: "Truck", category: "trucks", fuels: ["Diesel"], transmissions: ["Manual"], priceMin: 920000, priceMax: 1180000, yearMin: 2020, yearMax: 2024, kmsMax: 95000, features: ["Payload"], imageKey: "truck" },
  { brand: "Ashok Leyland", model: "Dost", variants: ["Lite", "Plus", "Strong"], bodyType: "Truck", category: "trucks", fuels: ["Diesel", "CNG"], transmissions: ["Manual"], priceMin: 780000, priceMax: 1080000, yearMin: 2020, yearMax: 2024, kmsMax: 90000, features: ["Commercial"], imageKey: "truck" },
  { brand: "Eicher", model: "Pro 2049", variants: ["Standard", "CNG"], bodyType: "Truck", category: "trucks", fuels: ["Diesel", "CNG"], transmissions: ["Manual"], priceMin: 1180000, priceMax: 1380000, yearMin: 2021, yearMax: 2024, kmsMax: 80000, features: ["Fleet"], imageKey: "truck" },
  // —— Buses ——
  { brand: "Force", model: "Traveller", variants: ["3350", "3700"], bodyType: "Bus", category: "buses", fuels: ["Diesel"], transmissions: ["Manual"], priceMin: 1450000, priceMax: 2280000, yearMin: 2019, yearMax: 2024, kmsMax: 150000, features: ["26 Seater"], imageKey: "bus" },
  { brand: "Tata", model: "Winger", variants: ["3200", "3700"], bodyType: "Bus", category: "buses", fuels: ["Diesel"], transmissions: ["Manual"], priceMin: 1280000, priceMax: 1980000, yearMin: 2020, yearMax: 2024, kmsMax: 120000, features: ["Staff Transport"], imageKey: "bus" },
  { brand: "Mahindra", model: "Tourister", variants: ["Cosmo", "Excelo"], bodyType: "Bus", category: "buses", fuels: ["Diesel"], transmissions: ["Manual"], priceMin: 1680000, priceMax: 2580000, yearMin: 2019, yearMax: 2023, kmsMax: 180000, features: ["Luxury Coach"], imageKey: "bus" },
  // —— Auto ——
  { brand: "Bajaj", model: "RE", variants: ["Compact", "Maxima"], bodyType: "Auto", category: "used-cars", fuels: ["CNG", "Petrol"], transmissions: ["Manual"], priceMin: 280000, priceMax: 420000, yearMin: 2022, yearMax: 2025, kmsMax: 65000, features: ["Passenger"], usedOnly: true, imageKey: "auto" },
  { brand: "Piaggio", model: "Ape", variants: ["City", "Xtra"], bodyType: "Auto", category: "used-cars", fuels: ["CNG", "Diesel"], transmissions: ["Manual"], priceMin: 320000, priceMax: 480000, yearMin: 2021, yearMax: 2025, kmsMax: 55000, features: ["Cargo"], usedOnly: true, imageKey: "auto" },
];

export const COLORS = [
  "White", "Silver", "Grey", "Black", "Red", "Blue", "Pearl White", "Brown", "Green", "Orange",
];
