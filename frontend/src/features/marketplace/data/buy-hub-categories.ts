import type { HubCategoryItem } from "../types";

export const BUY_HUB_CATEGORIES: HubCategoryItem[] = [
  {
    id: "cars",
    label: "Cars",
    description: "Hatchback, sedan, SUV & luxury",
    icon: "Car",
    stats: { new: "45K+", used: "2.1L+" },
  },
  {
    id: "bikes",
    label: "Bikes",
    description: "Motorcycles & scooters",
    icon: "Bike",
    stats: { new: "18K+", used: "85K+" },
  },
  {
    id: "trucks",
    label: "Trucks",
    description: "LCV, HCV & pickups",
    icon: "Truck",
    stats: { new: "4.2K+", used: "12K+" },
  },
  {
    id: "buses",
    label: "Buses",
    description: "School, staff & tourist coaches",
    icon: "Bus",
    stats: { new: "1.2K+", used: "3K+" },
  },
  {
    id: "auto",
    label: "Auto",
    description: "Passenger & cargo three-wheelers",
    icon: "CarTaxiFront",
    stats: { new: "8K+", used: "22K+" },
  },
  {
    id: "equipment",
    label: "Equipment",
    description: "Tractors, excavators & industrial",
    icon: "Tractor",
    stats: { new: "2.5K+", used: "6K+" },
  },
  {
    id: "ev",
    label: "Electric",
    description: "EV cars, bikes & commercial",
    icon: "Zap",
    stats: { new: "12K+", used: "28K+" },
  },
];
