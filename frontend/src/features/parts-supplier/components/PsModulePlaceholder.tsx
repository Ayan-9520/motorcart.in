import type { ReactNode } from "react";
import { PartsSupplierShell } from "./PartsSupplierShell";

type Props = {
  title: string;
  description: string;
  features: string[];
  children?: ReactNode;
};

export function PsModulePlaceholder({ title, description, features, children }: Props) {
  return (
    <PartsSupplierShell title={title} description={description}>
      <ul className="psp-feature-list">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {children}
    </PartsSupplierShell>
  );
}
