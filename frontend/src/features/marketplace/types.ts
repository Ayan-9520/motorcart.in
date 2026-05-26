export type HubCategorySlug =
  | "cars"
  | "bikes"
  | "trucks"
  | "buses"
  | "auto"
  | "equipment"
  | "ev";

export type VehicleConditionSlug = "new" | "used";

export interface HubCategoryItem {
  id: HubCategorySlug;
  label: string;
  description: string;
  icon: string;
  stats: { new: string; used: string };
}

export interface SellHubCategoryItem {
  id: HubCategorySlug;
  label: string;
  description: string;
  icon: string;
  hint: string;
}
