import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import BrowseFields from "./pages/BrowseFields";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookField from "./pages/customer/BookField";
import NotFound from "./pages/NotFound";
import Fields from "./pages/admin/Fields";
import Bookings from "./pages/admin/Bookings";
import Customers from "./pages/admin/Customers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AuthWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<BrowseFields />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/fields"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Fields />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Bookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/customers"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Customers />
                  </ProtectedRoute>
                }
              />

              {/* Customer Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/book"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <BookField />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Placeholder routes for future development */}
              <Route path="/field/:id" element={<NotFound />} />
              <Route path="/signup" element={<NotFound />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthWrapper>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
