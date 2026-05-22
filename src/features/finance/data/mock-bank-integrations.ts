import type { BankIntegrationConfig } from "../types";
import { PRIMARY_PARTNER_BANKS } from "./primary-partner-banks";

/** Demo bank API configs when DB table is empty */
export function buildMockBankIntegrations(): BankIntegrationConfig[] {
  const now = new Date().toISOString();
  return PRIMARY_PARTNER_BANKS.map((bank, i) => ({
    id: `mock-int-${bank.id}`,
    bankId: bank.id,
    bankName: bank.name,
    provider: i % 2 === 0 ? "rest" : "webhook",
    apiBaseUrl: `https://api.${bank.id.replace(/-/g, "")}.motorcart.partner/v2`,
    webhookUrl: `https://hooks.motorcart.in/finance/${bank.id}`,
    syncEnabled: i < 4,
    lastSyncAt: i < 4 ? now : null,
    config: { sandbox: false, products: ["auto_loan", "refinance"] },
  }));
}
