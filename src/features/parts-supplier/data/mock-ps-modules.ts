/** Extended mock entities for enterprise module pages */

export type PsRfqRequest = {
  id: string;
  ref: string;
  buyer: string;
  buyerType: "dealer" | "garage" | "workshop";
  city: string;
  lines: number;
  value: number;
  status: "open" | "quoted" | "negotiating" | "won" | "lost";
  createdAt: string;
};

export type PsGstInvoice = {
  id: string;
  invoiceNo: string;
  orderNo: string;
  buyer: string;
  amount: number;
  gst: number;
  status: "paid" | "pending" | "credit_note";
  date: string;
};

export type PsProcurementPo = {
  id: string;
  poNo: string;
  vendor: string;
  items: number;
  amount: number;
  eta: string;
  status: "draft" | "sent" | "partial" | "received";
};

export type PsDispatchJob = {
  id: string;
  orderNo: string;
  customer: string;
  warehouse: string;
  items: number;
  priority: "high" | "normal";
  slaHours: number;
  status: "pick" | "pack" | "ready";
};

export type PsRack = {
  id: string;
  warehouse: string;
  zone: string;
  rack: string;
  bin: string;
  sku: string;
  qty: number;
};

export type PsLowStockItem = {
  sku: string;
  name: string;
  brand: string;
  stock: number;
  moq: number;
  daysLeft: number;
  warehouse: string;
};

export type PsDeadStockItem = {
  sku: string;
  name: string;
  qty: number;
  daysAging: number;
  value: number;
  suggestion: string;
};

export type PsWhatsAppThread = {
  id: string;
  contact: string;
  type: "garage" | "dealer";
  lastMessage: string;
  unread: number;
  lastAt: string;
};

export const MOCK_RFQS: PsRfqRequest[] = [
  {
    id: "rfq-1",
    ref: "RFQ-2405-018",
    buyer: "Sharma Auto Garage",
    buyerType: "garage",
    city: "Gurgaon",
    lines: 12,
    value: 84200,
    status: "negotiating",
    createdAt: "2026-05-18",
  },
  {
    id: "rfq-2",
    ref: "RFQ-2405-022",
    buyer: "Delhi Motors",
    buyerType: "dealer",
    city: "Delhi",
    lines: 48,
    value: 412000,
    status: "quoted",
    createdAt: "2026-05-19",
  },
  {
    id: "rfq-3",
    ref: "RFQ-2405-025",
    buyer: "Noida Service Hub",
    buyerType: "workshop",
    city: "Noida",
    lines: 6,
    value: 28500,
    status: "open",
    createdAt: "2026-05-20",
  },
];

export const MOCK_INVOICES: PsGstInvoice[] = [
  {
    id: "inv-1",
    invoiceNo: "APH/25-26/1842",
    orderNo: "PS-ORD-8821",
    buyer: "Sharma Auto Garage",
    amount: 28450,
    gst: 5121,
    status: "paid",
    date: "2026-05-19",
  },
  {
    id: "inv-2",
    invoiceNo: "APH/25-26/1843",
    orderNo: "PS-ORD-8824",
    buyer: "Delhi Motors",
    amount: 156800,
    gst: 28224,
    status: "pending",
    date: "2026-05-20",
  },
];

export const MOCK_POS: PsProcurementPo[] = [
  {
    id: "po-1",
    poNo: "PO-BOSCH-042",
    vendor: "Bosch India — Gurgaon DC",
    items: 24,
    amount: 428000,
    eta: "22 May",
    status: "sent",
  },
  {
    id: "po-2",
    poNo: "PO-CASTROL-011",
    vendor: "Castrol Distributor NCR",
    items: 80,
    amount: 312000,
    eta: "24 May",
    status: "partial",
  },
];

export const MOCK_DISPATCH: PsDispatchJob[] = [
  {
    id: "ord-1",
    orderNo: "PS-ORD-8830",
    customer: "Sharma Auto Garage",
    warehouse: "Okhla Phase-II",
    items: 6,
    priority: "high",
    slaHours: 4,
    status: "pick",
  },
  {
    id: "ord-2",
    orderNo: "PS-ORD-8831",
    customer: "Noida Service Hub",
    warehouse: "Okhla Phase-II",
    items: 14,
    priority: "normal",
    slaHours: 12,
    status: "pack",
  },
  {
    id: "ord-3",
    orderNo: "PS-ORD-8828",
    customer: "Delhi Motors",
    warehouse: "Bhiwadi Hub",
    items: 32,
    priority: "high",
    slaHours: 6,
    status: "ready",
  },
];

export const MOCK_RACKS: PsRack[] = [
  { id: "r1", warehouse: "Okhla", zone: "A", rack: "A-14", bin: "B2", sku: "BOSCH-BP-CRETA", qty: 142 },
  { id: "r2", warehouse: "Okhla", zone: "B", rack: "B-03", bin: "B1", sku: "CASTROL-EDGE-5W30", qty: 88 },
  { id: "r3", warehouse: "Bhiwadi", zone: "C", rack: "C-08", bin: "B4", sku: "EXIDE-65AH", qty: 36 },
];

export const MOCK_LOW_STOCK: PsLowStockItem[] = [
  { sku: "NGK-BKR6E", name: "NGK Spark Plug BKR6E", brand: "NGK", stock: 8, moq: 50, daysLeft: 2, warehouse: "Okhla" },
  { sku: "MAHLE-OF-HY", name: "Mahle Oil Filter — Hyundai", brand: "Mahle", stock: 14, moq: 40, daysLeft: 5, warehouse: "Okhla" },
  { sku: "SKF-WB-CRETA", name: "SKF Wheel Bearing Kit", brand: "SKF", stock: 6, moq: 20, daysLeft: 3, warehouse: "Bhiwadi" },
];

export const MOCK_DEAD_STOCK: PsDeadStockItem[] = [
  { sku: "VALEO-CLUTCH-KIT", name: "Valeo Clutch Kit", qty: 24, daysAging: 128, value: 186000, suggestion: "B2B RFQ −8%" },
  { sku: "MOBIL-0W20-OLD", name: "Mobil 0W-20 (old pack)", qty: 42, daysAging: 96, value: 84000, suggestion: "Bundle with Castrol" },
];

export const MOCK_WHATSAPP: PsWhatsAppThread[] = [
  { id: "w1", contact: "Sharma Auto Garage", type: "garage", lastMessage: "Reorder brake pads ×4", unread: 2, lastAt: "2m ago" },
  { id: "w2", contact: "Delhi Motors", type: "dealer", lastMessage: "Send quotation RFQ-2405-022", unread: 0, lastAt: "1h ago" },
  { id: "w3", contact: "Noida Service Hub", type: "garage", lastMessage: "Invoice for PS-ORD-8821", unread: 1, lastAt: "3h ago" },
];

export const MOCK_CATEGORIES = [
  { name: "Brake parts", count: 142, slug: "brake" },
  { name: "Engine oil & lubricants", count: 88, slug: "lubricants" },
  { name: "Filters", count: 96, slug: "filters" },
  { name: "Batteries", count: 34, slug: "batteries" },
  { name: "Tyres", count: 28, slug: "tyres" },
  { name: "Suspension", count: 52, slug: "suspension" },
];

export const MOCK_BRANDS = [
  "Bosch",
  "Exide",
  "Amaron",
  "SKF",
  "NGK",
  "Castrol",
  "Mobil",
  "Mahle",
  "Valeo",
];

export const MOCK_AUTOMATION_RULES = [
  { id: "a1", name: "Low stock WhatsApp", trigger: "stock < MOQ", active: true },
  { id: "a2", name: "Dispatch SLA reminder", trigger: "pending > 12h", active: true },
  { id: "a3", name: "Auto GST invoice", trigger: "order delivered", active: true },
  { id: "a4", name: "Abandoned cart nudge", trigger: "cart idle 24h", active: false },
  { id: "a5", name: "Dead stock clearance", trigger: "aging > 90d", active: true },
];
