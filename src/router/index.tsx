import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { KycPage } from "@/pages/KycPage";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { DashboardHome } from "@/pages/dashboard/DashboardHome";
import { VehicleListingPage } from "@/features/vehicles/pages/VehicleListingPage";
import { VehicleDetailPage } from "@/features/vehicles/pages/VehicleDetailPage";
import { VehicleComparePage } from "@/features/vehicles/pages/VehicleComparePage";
import { NewCarsHubPage } from "@/features/new-cars/pages/NewCarsHubPage";
import { NewCarsListingPage } from "@/features/new-cars/pages/NewCarsListingPage";
import { PreownedCarsHubPage } from "@/features/preowned-cars/pages/PreownedCarsHubPage";
import { PreownedCarsListingPage } from "@/features/preowned-cars/pages/PreownedCarsListingPage";
import { DealerDashboardLayout } from "@/layouts/DealerDashboardLayout";
import { DealerOverviewPage } from "@/features/dealer-crm/pages/DealerOverviewPage";
import { DealerInventoryCRMPage } from "@/features/dealer-crm/pages/DealerInventoryCRMPage";
import { DealerLeadsPage } from "@/features/dealer-crm/pages/DealerLeadsPage";
import { DealerEnquiriesPage } from "@/features/dealer-crm/pages/DealerEnquiriesPage";
import { DealerAnalyticsPage } from "@/features/dealer-crm/pages/DealerAnalyticsPage";
import { DealerWhatsAppPage } from "@/features/dealer-crm/pages/DealerWhatsAppPage";
import { DealerTeamPage } from "@/features/dealer-crm/pages/DealerTeamPage";
import { DealerCallsPage } from "@/features/dealer-crm/pages/DealerCallsPage";
import { AuctionListingPage } from "@/features/auctions/pages/AuctionListingPage";
import { AuctionRoomPage } from "@/features/auctions/pages/AuctionRoomPage";
import { AuctionAdminPage } from "@/features/auctions/pages/AuctionAdminPage";
import { FinanceMarketplacePage } from "@/features/finance/pages/FinanceMarketplacePage";
import { LoanComparePage } from "@/features/finance/pages/LoanComparePage";
import { LoanApplyPage } from "@/features/finance/pages/LoanApplyPage";
import { CustomerLoansPage } from "@/features/finance/pages/CustomerLoansPage";
import { LoanDetailPage } from "@/features/finance/pages/LoanDetailPage";
import { DsaPortalPage } from "@/features/finance/pages/DsaPortalPage";
import { DsaApplicationsPage } from "@/features/finance/pages/DsaApplicationsPage";
import { LenderDashboardPage } from "@/features/finance/pages/LenderDashboardPage";
import { LenderApplicationsPage } from "@/features/finance/pages/LenderApplicationsPage";
import { FinanceDashboardLayout } from "@/layouts/FinanceDashboardLayout";
import { PartsListingPage } from "@/features/parts/pages/PartsListingPage";
import { PartDetailPage } from "@/features/parts/pages/PartDetailPage";
import { PartsCartPage } from "@/features/parts/pages/PartsCartPage";
import { PartsCheckoutPage } from "@/features/parts/pages/PartsCheckoutPage";
import { PartsOrdersListPage } from "@/features/parts/pages/PartsOrdersListPage";
import { PartsOrderDetailPage } from "@/features/parts/pages/PartsOrderDetailPage";
import { PartInvoicePage } from "@/features/parts/pages/PartInvoicePage";
import { PartsSupplierLayout } from "@/layouts/PartsSupplierLayout";
import { PartsSupplierOverviewPage } from "@/features/parts/pages/PartsSupplierOverviewPage";
import { PartsSupplierInventoryPage } from "@/features/parts/pages/PartsSupplierInventoryPage";
import { PartsSupplierOrdersPage } from "@/features/parts/pages/PartsSupplierOrdersPage";
import { PartsSupplierUploadPage } from "@/features/parts/pages/PartsSupplierUploadPage";
import { ServiceMarketplacePage } from "@/features/service-booking/pages/ServiceMarketplacePage";
import { ServiceCenterDetailPage } from "@/features/service-booking/pages/ServiceCenterDetailPage";
import { ServiceBookingFlowPage } from "@/features/service-booking/pages/ServiceBookingFlowPage";
import { MyServiceBookingsPage } from "@/features/service-booking/pages/MyServiceBookingsPage";
import { ServiceBookingDetailPage } from "@/features/service-booking/pages/ServiceBookingDetailPage";
import { ServiceHubLayout } from "@/layouts/ServiceHubLayout";
import { ServiceHubOverviewPage } from "@/features/service-booking/pages/ServiceHubOverviewPage";
import { ServiceHubBookingsPage } from "@/features/service-booking/pages/ServiceHubBookingsPage";
import { ServiceHubAnalyticsPage } from "@/features/service-booking/pages/ServiceHubAnalyticsPage";
import { TechnicianDashboardLayout } from "@/layouts/TechnicianDashboardLayout";
import { TechnicianJobsPage } from "@/features/service-booking/pages/TechnicianJobsPage";
import { TechnicianJobDetailPage } from "@/features/service-booking/pages/TechnicianJobDetailPage";
import { CommunityFeedPage } from "@/features/community/pages/CommunityFeedPage";
import { CommunityPostPage } from "@/features/community/pages/CommunityPostPage";
import { CommunityGroupsPage } from "@/features/community/pages/CommunityGroupsPage";
import { CommunityGroupPage } from "@/features/community/pages/CommunityGroupPage";
import { CommunityDealerPage } from "@/features/community/pages/CommunityDealerPage";
import { CommunityInfluencerPage } from "@/features/community/pages/CommunityInfluencerPage";
import { CommunityModerationPage } from "@/features/community/pages/CommunityModerationPage";
import { AIControlCenterPage } from "@/ai/pages/AIControlCenterPage";

const ph = (title: string, desc?: string) => (
  <PlaceholderPage title={title} description={desc} />
);

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "new-cars", element: <NewCarsHubPage /> },
      { path: "new-cars/browse", element: <NewCarsListingPage /> },
      { path: "new-cars/:slug", element: <VehicleDetailPage /> },
      { path: "used-cars", element: <PreownedCarsHubPage /> },
      { path: "used-cars/browse", element: <PreownedCarsListingPage /> },
      { path: "used-cars/:slug", element: <VehicleDetailPage /> },
      { path: "vehicles", element: <VehicleListingPage /> },
      { path: "vehicles/compare", element: <VehicleComparePage /> },
      { path: "vehicles/:category", element: <VehicleListingPage /> },
      { path: "vehicles/:category/:slug", element: <VehicleDetailPage /> },
      { path: "sell", element: ph("Sell Your Vehicle", "List your vehicle to millions of buyers") },
      { path: "auctions", element: <AuctionListingPage /> },
      { path: "auctions/:status/:slug", element: <AuctionRoomPage /> },
      { path: "finance", element: <FinanceMarketplacePage /> },
      { path: "finance/compare", element: <LoanComparePage /> },
      { path: "finance/apply", element: <LoanApplyPage /> },
      { path: "insurance", element: ph("Insurance", "Compare and buy car insurance") },
      { path: "parts", element: <PartsListingPage /> },
      { path: "parts/:category", element: <PartsListingPage /> },
      { path: "parts/:category/:slug", element: <PartDetailPage /> },
      { path: "cart", element: <PartsCartPage /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <PartsCheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <PartsOrdersListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute>
            <PartsOrderDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:id/invoice",
        element: (
          <ProtectedRoute>
            <PartInvoicePage />
          </ProtectedRoute>
        ),
      },
      { path: "services", element: <ServiceMarketplacePage /> },
      { path: "services/centers/:slug", element: <ServiceCenterDetailPage /> },
      {
        path: "services/book/:serviceId",
        element: (
          <ProtectedRoute>
            <ServiceBookingFlowPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "services/my-bookings",
        element: (
          <ProtectedRoute>
            <MyServiceBookingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "services/bookings/:id",
        element: (
          <ProtectedRoute>
            <ServiceBookingDetailPage />
          </ProtectedRoute>
        ),
      },
      { path: "community", element: <CommunityFeedPage /> },
      { path: "community/post/:id", element: <CommunityPostPage /> },
      { path: "community/groups", element: <CommunityGroupsPage /> },
      { path: "community/groups/:slug", element: <CommunityGroupPage /> },
      { path: "community/dealers/:slug", element: <CommunityDealerPage /> },
      { path: "community/u/:userId", element: <CommunityInfluencerPage /> },
      { path: "dealers", element: ph("Dealer Network", "8,500+ verified dealers") },
      { path: "pricing", element: ph("Pricing", "Dealer SaaS plans") },
      { path: "ai", element: <AIControlCenterPage /> },
      { path: "about", element: ph("About Us") },
      { path: "contact", element: ph("Contact Us") },
      { path: "careers", element: ph("Careers") },
      { path: "faqs", element: ph("FAQs") },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/kyc",
        element: (
          <ProtectedRoute>
            <KycPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "auth/callback", element: <AuthCallbackPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute roles={["dealer", "used_car_dealer", "new_car_dealer", "bike_dealer", "truck_dealer", "admin"]}>
        <DealerDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/dealer", element: <DealerOverviewPage /> },
      { path: "dashboard/dealer/inventory", element: <DealerInventoryCRMPage /> },
      { path: "dashboard/dealer/leads", element: <DealerLeadsPage /> },
      { path: "dashboard/dealer/enquiries", element: <DealerEnquiriesPage /> },
      { path: "dashboard/dealer/whatsapp", element: <DealerWhatsAppPage /> },
      { path: "dashboard/dealer/calls", element: <DealerCallsPage /> },
      { path: "dashboard/dealer/analytics", element: <DealerAnalyticsPage /> },
      { path: "dashboard/dealer/team", element: <DealerTeamPage /> },
      { path: "dashboard/dealer/settings", element: ph("Dealer Settings", "Profile, notifications, integrations") },
    ],
  },
  {
    element: (
      <ProtectedRoute roles={["parts_seller", "admin"]}>
        <PartsSupplierLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/parts", element: <PartsSupplierOverviewPage /> },
      { path: "dashboard/parts/inventory", element: <PartsSupplierInventoryPage /> },
      { path: "dashboard/parts/upload", element: <PartsSupplierUploadPage /> },
      { path: "dashboard/parts/orders", element: <PartsSupplierOrdersPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute roles={["service_center", "admin"]}>
        <ServiceHubLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/service", element: <ServiceHubOverviewPage /> },
      { path: "dashboard/service/bookings", element: <ServiceHubBookingsPage /> },
      { path: "dashboard/service/analytics", element: <ServiceHubAnalyticsPage /> },
      { path: "dashboard/service/settings", element: ph("Service hub settings", "Integrations, bays & notifications") },
    ],
  },
  {
    element: (
      <ProtectedRoute roles={["service_technician", "admin"]}>
        <TechnicianDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/technician", element: <TechnicianJobsPage /> },
      { path: "dashboard/technician/booking/:id", element: <TechnicianJobDetailPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Navigate to="/dashboard/customer" replace /> },
      { path: "dashboard/customer", element: <DashboardHome title="Customer Dashboard" /> },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <DashboardHome title="Admin Dashboard" />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/community",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <CommunityModerationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/ai",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AIControlCenterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/auction",
        element: (
          <ProtectedRoute roles={["admin", "auction_partner"]}>
            <AuctionAdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <FinanceDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/customer/loans", element: <CustomerLoansPage /> },
      { path: "dashboard/customer/loans/:id", element: <LoanDetailPage /> },
      {
        path: "dashboard/dsa",
        element: (
          <ProtectedRoute roles={["dsa_agent", "admin"]}>
            <DsaPortalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/dsa/applications",
        element: (
          <ProtectedRoute roles={["dsa_agent", "admin"]}>
            <DsaApplicationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/finance",
        element: (
          <ProtectedRoute roles={["bank_nbfc", "admin"]}>
            <LenderDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/finance/applications",
        element: (
          <ProtectedRoute roles={["bank_nbfc", "admin"]}>
            <LenderApplicationsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "unauthorized", element: ph("Unauthorized", "You don't have permission to access this page.") },
  { path: "*", element: <NotFoundPage /> },
]);
