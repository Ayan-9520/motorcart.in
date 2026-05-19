import * as XLSX from "xlsx";
import { z } from "zod";
import { COLUMN_ALIASES, INVENTORY_COLUMNS, SAMPLE_ROW, type InventoryColumn } from "./inventory-columns";
import type { ParsedInventoryRow, RowValidationError } from "../types";

const rowSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  variant: z.string().optional(),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  fuel: z.string().min(1),
  transmission: z.string().min(1),
  kmsDriven: z.number().min(0),
  ownership: z.number().int().min(1).max(5),
  price: z.number().positive("Price must be positive"),
  color: z.string().optional(),
  registrationState: z.string().min(1, "Registration state is required"),
  description: z.string().optional(),
  dealerPrice: z.number().positive().optional(),
  discount: z.number().min(0).max(100).optional(),
  mainImageUrl: z.string().url().optional().or(z.literal("")),
});

function normalizeHeader(h: string): InventoryColumn | null {
  const key = h.trim().toLowerCase();
  return COLUMN_ALIASES[key] ?? (INVENTORY_COLUMNS.includes(h.trim() as InventoryColumn) ? (h.trim() as InventoryColumn) : null);
}

function parseNumber(val: unknown): number | undefined {
  if (val == null || val === "") return undefined;
  const n = Number(String(val).replace(/[,₹\s]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function mapRawRow(row: Record<string, unknown>, rowNumber: number): { data?: ParsedInventoryRow; errors: RowValidationError[] } {
  const errors: RowValidationError[] = [];
  const get = (col: InventoryColumn) => {
    const key = Object.keys(row).find((k) => normalizeHeader(k) === col);
    return key ? row[key] : undefined;
  };

  const brand = String(get("Brand") ?? "").trim();
  const model = String(get("Model") ?? "").trim();
  const year = parseNumber(get("Year"));
  const price = parseNumber(get("Price"));
  const kms = parseNumber(get("KM Driven"));
  const owners = parseNumber(get("Ownership"));

  if (!brand) errors.push({ row: rowNumber, field: "Brand", message: "Brand is required" });
  if (!model) errors.push({ row: rowNumber, field: "Model", message: "Model is required" });
  if (year == null) errors.push({ row: rowNumber, field: "Year", message: "Valid year required" });
  if (price == null) errors.push({ row: rowNumber, field: "Price", message: "Valid price required" });
  if (kms == null) errors.push({ row: rowNumber, field: "KM Driven", message: "Valid KM required" });
  if (owners == null) errors.push({ row: rowNumber, field: "Ownership", message: "Valid ownership required" });

  if (errors.length) return { errors };

  const parsed: ParsedInventoryRow = {
    rowNumber,
    brand,
    model,
    variant: String(get("Variant") ?? "").trim() || undefined,
    year: year!,
    fuel: String(get("Fuel") ?? "Petrol").trim(),
    transmission: String(get("Transmission") ?? "Manual").trim(),
    kmsDriven: kms!,
    ownership: owners!,
    price: price!,
    color: String(get("Color") ?? "").trim() || undefined,
    registrationState: String(get("Registration State") ?? "Maharashtra").trim(),
    description: String(get("Description") ?? "").trim() || undefined,
    dealerPrice: parseNumber(get("Dealer Price")),
    discount: parseNumber(get("Discount")),
    mainImageUrl: String(get("Main Image URL") ?? "").trim() || undefined,
  };

  const result = rowSchema.safeParse({
    brand: parsed.brand,
    model: parsed.model,
    variant: parsed.variant,
    year: parsed.year,
    fuel: parsed.fuel,
    transmission: parsed.transmission,
    kmsDriven: parsed.kmsDriven,
    ownership: parsed.ownership,
    price: parsed.price,
    color: parsed.color,
    registrationState: parsed.registrationState,
    description: parsed.description,
    dealerPrice: parsed.dealerPrice,
    discount: parsed.discount,
    mainImageUrl: parsed.mainImageUrl || undefined,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      errors.push({ row: rowNumber, field: issue.path.join("."), message: issue.message });
    });
    return { errors };
  }

  return { data: parsed, errors: [] };
}

export function parseWorkbook(buffer: ArrayBuffer): {
  rows: ParsedInventoryRow[];
  errors: RowValidationError[];
} {
  const wb = XLSX.read(buffer, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  const rows: ParsedInventoryRow[] = [];
  const errors: RowValidationError[] = [];

  json.forEach((raw, idx) => {
    const rowNumber = idx + 2;
    const empty = Object.values(raw).every((v) => v === "" || v == null);
    if (empty) return;

    const { data, errors: rowErrors } = mapRawRow(raw, rowNumber);
    if (rowErrors.length) errors.push(...rowErrors);
    else if (data) rows.push(data);
  });

  return { rows, errors };
}

export function parseCSV(text: string): { rows: ParsedInventoryRow[]; errors: RowValidationError[] } {
  const wb = XLSX.read(text, { type: "string" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return parseWorkbook(buffer);
}

export function downloadSampleTemplate() {
  const ws = XLSX.utils.json_to_sheet([SAMPLE_ROW], { header: [...INVENTORY_COLUMNS] });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inventory");
  XLSX.writeFile(wb, "motorcart-inventory-template.xlsx");
}

export function parsedRowToVehiclePayload(
  row: ParsedInventoryRow,
  dealer: { city: string; state: string; dealerType: string }
) {
  const discountPct = row.discount ?? 0;
  const finalPrice = row.dealerPrice ?? row.price;
  const category =
    dealer.dealerType === "bike_dealer"
      ? "bikes"
      : dealer.dealerType === "truck_dealer"
        ? "trucks"
        : dealer.dealerType === "new_car_dealer"
          ? "new-cars"
          : "used-cars";

  const fuel = row.fuel.toLowerCase();
  const bodyType =
    category === "bikes" ? "Bike" : category === "trucks" ? "Truck" : "SUV";

  return {
    title: `${row.year} ${row.brand} ${row.model}${row.variant ? ` ${row.variant}` : ""}`,
    brand: row.brand,
    model: row.model,
    variant: row.variant,
    year: row.year,
    price: finalPrice,
    originalPrice: discountPct > 0 ? row.price : undefined,
    fuelType: row.fuel,
    transmission: row.transmission,
    bodyType,
    category,
    kmsDriven: row.kmsDriven,
    owners: row.ownership,
    color: row.color,
    city: dealer.city,
    state: row.registrationState || dealer.state,
    description: row.description,
    images: row.mainImageUrl ? [row.mainImageUrl] : [],
    condition: row.kmsDriven < 100 ? ("new" as const) : ("used" as const),
    metadata: {
      discountPercent: discountPct,
      specifications: generateAISpecs(row),
      importSource: "bulk_upload",
    },
  };
}

export function generateAISpecs(row: ParsedInventoryRow): Record<string, string> {
  const specs: Record<string, string> = {
    engine: row.fuel === "Electric" ? "Electric Motor" : `${row.fuel} Engine`,
    transmission: row.transmission,
    mileage: row.fuel === "Electric" ? "300+ km/charge" : row.fuel === "Diesel" ? "18–22 kmpl" : "14–18 kmpl",
  };
  if (row.brand === "Hyundai" || row.brand === "Maruti") specs.safety = "6 Airbags, ABS, ESC";
  if (row.year >= 2023) specs.infotainment = "Touchscreen, Apple CarPlay";
  return specs;
}

export function detectDuplicates(
  rows: ParsedInventoryRow[],
  existing: { brand: string; model: string; year: number; kms_driven: number }[]
): Map<number, string> {
  const dupes = new Map<number, string>();
  const keys = new Set(existing.map((v) => `${v.brand}|${v.model}|${v.year}|${v.kms_driven}`.toLowerCase()));

  rows.forEach((r) => {
    const key = `${r.brand}|${r.model}|${r.year}|${r.kmsDriven}`.toLowerCase();
    if (keys.has(key)) dupes.set(r.rowNumber, "Duplicate: same brand, model, year & KM already in inventory");
    keys.add(key);
  });

  return dupes;
}
