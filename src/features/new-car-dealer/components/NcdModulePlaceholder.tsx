import type { ReactNode } from "react";
import { NewCarDealerShell } from "./NewCarDealerShell";

type NcdModulePlaceholderProps = {
  title: string;
  description: string;
  features: string[];
  children?: ReactNode;
};

export function NcdModulePlaceholder({ title, description, features, children }: NcdModulePlaceholderProps) {
  return (
    <NewCarDealerShell title={title} description={description}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <li key={f} className="ncd-feature-chip">
            <span className="ncd-feature-chip__dot" />
            {f}
          </li>
        ))}
      </ul>
      {children}
    </NewCarDealerShell>
  );
}
