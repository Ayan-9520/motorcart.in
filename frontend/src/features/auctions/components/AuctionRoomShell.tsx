import type { ReactNode } from "react";

interface AuctionRoomShellProps {
  header: ReactNode;
  ticker?: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
  footer: ReactNode;
}

export function AuctionRoomShell({ header, ticker, main, sidebar, footer }: AuctionRoomShellProps) {
  return (
    <div className="auc-room min-h-screen">
      <div className="auc-room__inner container mx-auto px-4 py-6 md:py-8">
        {header}
        {ticker}
        <div className="auc-room__grid">
          <div className="auc-room__main">{main}</div>
          <aside className="auc-room__sidebar">{sidebar}</aside>
        </div>
        <div className="auc-room__footer">{footer}</div>
      </div>
    </div>
  );
}
