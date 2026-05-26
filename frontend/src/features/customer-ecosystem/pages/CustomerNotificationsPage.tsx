import { useEffect } from "react";
import { CustomerNotificationsList } from "../components/CustomerNotificationsList";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerNotificationsPage() {
  const { data, readNotification } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "Notifications" });
  }, []);

  return (
    <CustomerEcosystemPage
      title="Notifications"
      description={`${data?.unreadNotifications ?? 0} unread — EMI, insurance, service & marketplace alerts.`}
    >
      <CustomerNotificationsList
        notifications={data?.notifications ?? []}
        onMarkRead={(id) => void readNotification(id)}
      />
    </CustomerEcosystemPage>
  );
}
