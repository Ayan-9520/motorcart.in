import { Plug, RefreshCw } from "lucide-react";
import type { BankIntegrationConfig } from "../types";

interface BankIntegrationPanelProps {
  configs: BankIntegrationConfig[];
}

export function BankIntegrationPanel({ configs }: BankIntegrationPanelProps) {
  if (!configs.length) {
    return (
      <p className="text-sm text-muted-foreground rounded-xl border border-dashed p-6">
        Bank API configs appear after migration 00013. Architecture supports REST webhooks and partner sync.
      </p>
    );
  }

  return (
    <ul className="fin-integrations">
      {configs.map((c) => (
        <li key={c.id} className="fin-integrations__row">
          <div className="fin-integrations__icon">
            <Plug className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{c.bankName ?? "Partner bank"}</p>
            <p className="text-xs text-muted-foreground truncate">
              {c.provider.toUpperCase()} · {c.apiBaseUrl ?? "API URL pending"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Webhook: {c.webhookUrl ?? "Configure in partner portal"}
            </p>
          </div>
          <span className={`fin-integrations__badge ${c.syncEnabled ? "fin-integrations__badge--on" : ""}`}>
            {c.syncEnabled ? (
              <>
                <RefreshCw className="h-3 w-3" /> Live
              </>
            ) : (
              "Standby"
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
