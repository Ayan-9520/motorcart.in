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

const ph = (title: string, desc?: string) => (
  <PlaceholderPage title={title} description={desc} />
);

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "vehicles", element: ph("Vehicle Marketplace", "Browse new & used cars, bikes, trucks, EVs") },
      { path: "sell", element: ph("Sell Your Vehicle", "List your vehicle to millions of buyers") },
      { path: "auctions", element: ph("Live Auctions", "Bid on repo, dealer & government auctions") },
      { path: "finance", element: ph("Finance Marketplace", "Compare loans from top banks & NBFCs") },
      { path: "insurance", element: ph("Insurance", "Compare and buy car insurance") },
      { path: "parts", element: ph("Auto Parts", "OEM & aftermarket parts marketplace") },
      { path: "services", element: ph("Services", "Book car wash, repair, detailing & more") },
      { path: "dealers", element: ph("Dealer Network", "8,500+ verified dealers") },
      { path: "pricing", element: ph("Pricing", "Dealer SaaS plans") },
      { path: "ai", element: ph("AI Automation", "7 AI agents for your business") },
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
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Navigate to="/dashboard/customer" replace /> },
      { path: "dashboard/customer", element: <DashboardHome title="Customer Dashboard" /> },
      { path: "dashboard/dealer", element: <DashboardHome title="Dealer Dashboard" /> },
      { path: "dashboard/dsa", element: <DashboardHome title="DSA Dashboard" /> },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <DashboardHome title="Admin Dashboard" />
          </ProtectedRoute>
        ),
      },
      { path: "dashboard/auction", element: <DashboardHome title="Auction Dashboard" /> },
    ],
  },
  { path: "unauthorized", element: ph("Unauthorized", "You don't have permission to access this page.") },
  { path: "*", element: <NotFoundPage /> },
]);
