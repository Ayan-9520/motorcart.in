import { Navigate } from "react-router-dom";
import { DEFAULT_SERVICE_BOOK_PATH } from "../lib/service-book-routes";

/** `/services/book` without id → default periodic service booking */
export function ServiceBookRedirectPage() {
  return <Navigate to={DEFAULT_SERVICE_BOOK_PATH} replace />;
}
