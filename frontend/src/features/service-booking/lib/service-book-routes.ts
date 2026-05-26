/** Default catalog service for “Book service” CTAs without a specific service id */
export const DEFAULT_SERVICE_BOOK_ID = "s1";

export const DEFAULT_SERVICE_BOOK_PATH = `/services/book/${DEFAULT_SERVICE_BOOK_ID}`;

export function serviceBookPath(serviceId?: string): string {
  return serviceId ? `/services/book/${serviceId}` : DEFAULT_SERVICE_BOOK_PATH;
}
