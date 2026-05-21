import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/guards/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { KycPage } from "@/pages/KycPage";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { CareersPage } from "@/pages/CareersPage";
import { PressPage } from "@/pages/PressPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { FaqsPage } from "@/pages/FaqsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { AccountSuspendedPage } from "@/pages/AccountSuspendedPage";
import { RoleDashboardRedirect } from "@/components/routing/RoleDashboardRedirect";
import { CustomerDashboardPage } from "@/pages/dashboard/CustomerDashboardPage";
import { AdminOpsHomePage } from "@/pages/dashboard/AdminOpsHomePage";
import { VehicleListingPage } from "@/features/vehicles/pages/VehicleListingPage";
import { BuyHubPage } from "@/features/marketplace/pages/BuyHubPage";
import { SellHubPage } from "@/features/marketplace/pages/SellHubPage";
import { SellListingPage } from "@/features/marketplace/pages/SellListingPage";
import { BuyCategoryListingPage } from "@/features/marketplace/pages/BuyCategoryListingPage";
import { VehicleDetailPage } from "@/router/lazy-pages";
import { VehicleComparePage } from "@/features/vehicles/pages/VehicleComparePage";
import { WishlistPage } from "@/features/vehicles/pages/WishlistPage";
import { SearchResultsPage } from "@/features/search/pages/SearchResultsPage";
import { NewCarsHubPage } from "@/features/new-cars/pages/NewCarsHubPage";
import { NewCarsListingPage } from "@/features/new-cars/pages/NewCarsListingPage";
import { PreownedCarsHubPage } from "@/features/preowned-cars/pages/PreownedCarsHubPage";
import { PreownedCarsListingPage } from "@/features/preowned-cars/pages/PreownedCarsListingPage";
import { DealerDashboardLayout } from "@/layouts/DealerDashboardLayout";
import {
  DealerOverviewPage,
  DealerInventoryCRMPage,
  DealerLeadsPage,
  DealerEnquiriesPage,
  DealerAnalyticsPage,
  DealerWhatsAppPage,
  DealerTeamPage,
  DealerBulkUploadPage,
  DealerVerificationPage,
  DealerSubscriptionPage,
  DealerFinancePage,
  DealerAuctionsPage,
  DealerStorefrontPage,
  DealerSettingsPage,
  DealerCallsPage,
} from "@/router/lazy-pages";
import { AuctionHubPage } from "@/features/auctions/pages/AuctionHubPage";
import { AuctionListingPage } from "@/features/auctions/pages/AuctionListingPage";
import { AuctionRoomPage, AuctionAdminPage } from "@/router/lazy-pages";
import { FinanceHubPage } from "@/features/finance/pages/FinanceHubPage";
import { FinanceMarketplacePage } from "@/features/finance/pages/FinanceMarketplacePage";
import { LoanComparePage } from "@/features/finance/pages/LoanComparePage";
import { LoanApplyPage } from "@/features/finance/pages/LoanApplyPage";
import { CustomerLoansPage } from "@/features/finance/pages/CustomerLoansPage";
import { LoanDetailPage } from "@/features/finance/pages/LoanDetailPage";
import { FinanceToolsPage } from "@/features/finance/pages/FinanceToolsPage";
import {
  DsaPortalPage,
  DsaApplicationsPage,
  LenderDashboardPage,
  LenderApplicationsPage,
  FinanceManagerDashboardPage,
  FinanceManagerApplicationsPage,
  FinanceManagerCommissionsPage,
} from "@/router/lazy-pages";
import { FinanceDashboardLayout } from "@/layouts/FinanceDashboardLayout";
import { PartsHubPage } from "@/features/parts/pages/PartsHubPage";
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
import { ServicesHubPage } from "@/features/service-booking/pages/ServicesHubPage";
import { ServiceMarketplacePage } from "@/features/service-booking/pages/ServiceMarketplacePage";
import { ServiceCenterDetailPage } from "@/features/service-booking/pages/ServiceCenterDetailPage";
import { ServiceBookingFlowPage } from "@/features/service-booking/pages/ServiceBookingFlowPage";
import { MyServiceBookingsPage } from "@/features/service-booking/pages/MyServiceBookingsPage";
import { ServiceBookingDetailPage } from "@/features/service-booking/pages/ServiceBookingDetailPage";
import { ServiceHubLayout } from "@/layouts/ServiceHubLayout";
import { ServiceHubOverviewPage } from "@/features/service-booking/pages/ServiceHubOverviewPage";
import { ServiceHubBookingsPage } from "@/features/service-booking/pages/ServiceHubBookingsPage";
import { ServiceHubAnalyticsPage } from "@/features/service-booking/pages/ServiceHubAnalyticsPage";
import { ServiceWorkshopPage } from "@/features/service-booking/pages/ServiceWorkshopPage";
import { CustomerServiceHistoryPage } from "@/features/service-booking/pages/CustomerServiceHistoryPage";
import { TechnicianDashboardLayout } from "@/layouts/TechnicianDashboardLayout";
import { TechnicianJobsPage } from "@/features/service-booking/pages/TechnicianJobsPage";
import { TechnicianJobDetailPage } from "@/features/service-booking/pages/TechnicianJobDetailPage";
import { CommunityFeedPage } from "@/features/community/pages/CommunityFeedPage";
import { CommunityPostPage } from "@/features/community/pages/CommunityPostPage";
import { CommunityGroupsPage } from "@/features/community/pages/CommunityGroupsPage";
import { CommunityGroupPage } from "@/features/community/pages/CommunityGroupPage";
import { CommunityDealerPage } from "@/features/community/pages/CommunityDealerPage";
import { CommunityInfluencerPage } from "@/features/community/pages/CommunityInfluencerPage";
import { CommunityMeRedirect } from "@/features/community/pages/CommunityMeRedirect";
import { CommunityLayout } from "@/layouts/CommunityLayout";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import {
  SuperAdminOverviewPage,
  UsersManagementPage,
  DealerApprovalsPage,
  KycVerificationPage,
  PlatformAnalyticsPage,
  SubscriptionsPage,
  ReportsPage,
  CmsPage,
  NotificationsPage,
  BannersPage,
  SuperAdminAIPage,
  FraudDetectionPage,
  SupportTicketsPage,
  AIControlCenterPage,
  CommunityModerationPage,
} from "@/router/lazy-pages";
import { DealersHubPage } from "@/features/dealer-network/pages/DealersHubPage";
import { DealersBrowsePage } from "@/features/dealer-network/pages/DealersBrowsePage";
import { DealerProfilePage } from "@/features/dealer-network/pages/DealerProfilePage";
import { VehicleHubPage } from "@/features/ecosystem/pages/VehicleHubPage";

const ph = (title: string, desc?: string) => (
  <PlaceholderPage title={title} description={desc} />
);

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <VehicleHubPage /> },
      { path: "bikes", element: <VehicleHubPage /> },
      { path: "trucks", element: <VehicleHubPage /> },
      { path: "buses", element: <VehicleHubPage /> },
      { path: "ev", element: <VehicleHubPage /> },
      { path: "auto", element: <VehicleHubPage /> },
      { path: "new-cars", element: <NewCarsHubPage /> },
      { path: "new-cars/browse", element: <NewCarsListingPage /> },
      { path: "new-cars/:slug", element: <VehicleDetailPage /> },
      { path: "used-cars", element: <PreownedCarsHubPage /> },
      { path: "used-cars/browse", element: <PreownedCarsListingPage /> },
      { path: "used-cars/:slug", element: <VehicleDetailPage /> },
      { path: "buy", element: <BuyHubPage /> },
      { path: "buy/:category/:condition", element: <BuyCategoryListingPage /> },
      { path: "vehicles", element: <Navigate to="/buy" replace /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "vehicles/compare", element: <VehicleComparePage /> },
      { path: "vehicles/:category", element: <VehicleListingPage /> },
      { path: "vehicles/:category/:slug", element: <VehicleDetailPage /> },
      { path: "sell", element: <SellHubPage /> },
      { path: "sell/:category", element: <SellListingPage /> },
      { path: "auctions", element: <AuctionHubPage /> },
      { path: "auctions/browse", element: <AuctionListingPage /> },
      { path: "auctions/:status/:slug", element: <AuctionRoomPage /> },
      { path: "finance", element: <FinanceHubPage /> },
      { path: "finance/offers", element: <FinanceMarketplacePage /> },
      { path: "finance/compare", element: <LoanComparePage /> },
      { path: "finance/apply", element: <LoanApplyPage /> },
      { path: "finance/tools", element: <FinanceToolsPage /> },
      { path: "finance/eligibility", element: <Navigate to="/finance/tools" replace /> },
      { path: "finance/emi", element: <Navigate to="/finance/tools" replace /> },
      { path: "insurance", element: ph("Insurance", "Compare and buy car insurance") },
      { path: "parts", element: <PartsHubPage /> },
      { path: "parts/browse", element: <PartsListingPage /> },
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
      { path: "services", element: <ServicesHubPage /> },
      { path: "services/browse", element: <ServiceMarketplacePage /> },
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
        path: "services/history",
        element: (
          <ProtectedRoute>
            <CustomerServiceHistoryPage />
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
      {
        path: "community",
        element: <CommunityLayout />,
        children: [
          { index: true, element: <CommunityFeedPage /> },
          { path: "me", element: <CommunityMeRedirect /> },
          { path: "post/:id", element: <CommunityPostPage /> },
          { path: "groups", element: <CommunityGroupsPage /> },
          { path: "groups/:slug", element: <CommunityGroupPage /> },
          { path: "dealers/:slug", element: <CommunityDealerPage /> },
          { path: "u/:userId", element: <CommunityInfluencerPage /> },
        ],
      },
      { path: "dealers", element: <DealersHubPage /> },
      { path: "dealers/browse", element: <DealersBrowsePage /> },
      { path: "dealers/:slug", element: <DealerProfilePage /> },
      { path: "pricing", element: ph("Pricing", "Dealer SaaS plans") },
      { path: "ai", element: <AIControlCenterPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "press", element: <PressPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "faqs", element: <FaqsPage /> },
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
      { path: "unauthorized", element: <UnauthorizedPage /> },
      { path: "account-suspended", element: <AccountSuspendedPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
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
      { path: "dashboard/dealer/inventory/excel", element: <DealerBulkUploadPage /> },
      { path: "dashboard/dealer/finance", element: <DealerFinancePage /> },
      { path: "dashboard/dealer/auctions", element: <DealerAuctionsPage /> },
      { path: "dashboard/dealer/verification", element: <DealerVerificationPage /> },
      { path: "dashboard/dealer/subscription", element: <DealerSubscriptionPage /> },
      { path: "dashboard/dealer/storefront", element: <DealerStorefrontPage /> },
      { path: "dashboard/dealer/leads", element: <DealerLeadsPage /> },
      { path: "dashboard/dealer/enquiries", element: <DealerEnquiriesPage /> },
      { path: "dashboard/dealer/whatsapp", element: <DealerWhatsAppPage /> },
      { path: "dashboard/dealer/calls", element: <DealerCallsPage /> },
      { path: "dashboard/dealer/analytics", element: <DealerAnalyticsPage /> },
      { path: "dashboard/dealer/team", element: <DealerTeamPage /> },
      { path: "dashboard/dealer/settings", element: <DealerSettingsPage /> },
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
      { path: "dashboard/service/calendar", element: <ServiceWorkshopPage /> },
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
      { path: "dashboard", element: <RoleDashboardRedirect /> },
      { path: "dashboard/customer", element: <CustomerDashboardPage /> },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminOpsHomePage />
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
        path: "dashboard/admin/users",
        element: (
          <ProtectedRoute roles={["admin"]}>
            {ph("User management", "Directory, roles, KYC & access reviews")}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/dealers",
        element: (
          <ProtectedRoute roles={["admin"]}>
            {ph("Dealer approvals", "Verification queue & storefront governance")}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/finance",
        element: (
          <ProtectedRoute roles={["admin", "finance_manager", "super_admin"]}>
            <FinanceManagerDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/crm",
        element: (
          <ProtectedRoute roles={["admin"]}>
            {ph("CRM", "Support queues & escalation workflows")}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/analytics",
        element: (
          <ProtectedRoute roles={["admin"]}>
            {ph("Analytics", "Revenue, funnels & cohort intelligence")}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin/settings",
        element: (
          <ProtectedRoute roles={["admin"]}>
            {ph("Platform settings", "Feature flags, integrations & compliance")}
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/auction",
        element: (
          <ProtectedRoute roles={["admin", "auction_partner", "super_admin"]}>
            <AuctionAdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute roles={["super_admin"]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard/super-admin", element: <SuperAdminOverviewPage /> },
      { path: "dashboard/super-admin/users", element: <UsersManagementPage /> },
      { path: "dashboard/super-admin/dealers", element: <DealerApprovalsPage /> },
      { path: "dashboard/super-admin/kyc", element: <KycVerificationPage /> },
      { path: "dashboard/super-admin/analytics", element: <PlatformAnalyticsPage /> },
      { path: "dashboard/super-admin/subscriptions", element: <SubscriptionsPage /> },
      { path: "dashboard/super-admin/reports", element: <ReportsPage /> },
      { path: "dashboard/super-admin/cms", element: <CmsPage /> },
      { path: "dashboard/super-admin/notifications", element: <NotificationsPage /> },
      { path: "dashboard/super-admin/banners", element: <BannersPage /> },
      { path: "dashboard/super-admin/ai", element: <SuperAdminAIPage /> },
      { path: "dashboard/super-admin/fraud", element: <FraudDetectionPage /> },
      { path: "dashboard/super-admin/tickets", element: <SupportTicketsPage /> },
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
      {
        path: "dashboard/finance-manager",
        element: (
          <ProtectedRoute roles={["finance_manager", "admin", "super_admin"]}>
            <FinanceManagerDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/finance-manager/applications",
        element: (
          <ProtectedRoute roles={["finance_manager", "admin", "super_admin"]}>
            <FinanceManagerApplicationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/finance-manager/applications/:id",
        element: (
          <ProtectedRoute roles={["finance_manager", "admin", "super_admin"]}>
            <FinanceManagerApplicationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/finance-manager/commissions",
        element: (
          <ProtectedRoute roles={["finance_manager", "admin", "super_admin"]}>
            <FinanceManagerCommissionsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <Navigate to="/dashboard/admin" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/dashboard",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <Navigate to="/dashboard/admin" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "super-admin",
    element: (
      <ProtectedRoute roles={["super_admin"]}>
        <Navigate to="/dashboard/super-admin" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "super-admin/dashboard",
    element: (
      <ProtectedRoute roles={["super_admin"]}>
        <Navigate to="/dashboard/super-admin" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "dealer",
    element: (
      <ProtectedRoute
        roles={["dealer", "used_car_dealer", "new_car_dealer", "bike_dealer", "truck_dealer", "admin"]}
      >
        <Navigate to="/dashboard/dealer" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "dealer/dashboard",
    element: (
      <ProtectedRoute
        roles={["dealer", "used_car_dealer", "new_car_dealer", "bike_dealer", "truck_dealer", "admin"]}
      >
        <Navigate to="/dashboard/dealer" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "customer",
    element: (
      <ProtectedRoute roles={["customer"]}>
        <Navigate to="/dashboard/customer" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "customer/dashboard",
    element: (
      <ProtectedRoute roles={["customer"]}>
        <Navigate to="/dashboard/customer" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "dsa",
    element: (
      <ProtectedRoute roles={["dsa_agent", "admin"]}>
        <Navigate to="/dashboard/dsa" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "dsa/dashboard",
    element: (
      <ProtectedRoute roles={["dsa_agent", "admin"]}>
        <Navigate to="/dashboard/dsa" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "finance/dashboard",
    element: (
      <ProtectedRoute roles={["dsa_agent", "admin"]}>
        <Navigate to="/dashboard/dsa" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "service-partner",
    element: (
      <ProtectedRoute roles={["service_center", "admin"]}>
        <Navigate to="/dashboard/service" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "service-partner/dashboard",
    element: (
      <ProtectedRoute roles={["service_center", "admin"]}>
        <Navigate to="/dashboard/service" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "parts-seller",
    element: (
      <ProtectedRoute roles={["parts_seller", "admin"]}>
        <Navigate to="/dashboard/parts" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "parts-seller/dashboard",
    element: (
      <ProtectedRoute roles={["parts_seller", "admin"]}>
        <Navigate to="/dashboard/parts" replace />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
]);
