// Use explicit path — on Windows, `@/app` can resolve to `App.tsx` (case-insensitive FS).
import { AppProviders } from "@/app/AppProviders";

export default function App() {
  return <AppProviders />;
}
