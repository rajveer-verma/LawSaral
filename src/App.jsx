import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AskAI from "./pages/AskAI";
import EmergencyHelp from "./pages/EmergencyHelp";
import DocumentExplainer from "./pages/DocumentExplainer";
import MythBuster from "./pages/MythBuster";
import StateLaws from "./pages/StateLaws";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/ask" element={
                <ProtectedRoute>
                  <AskAI />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/emergency" element={
                <ProtectedRoute>
                  <EmergencyHelp />
                </ProtectedRoute>
              } />
              <Route path="/document" element={
                <ProtectedRoute>
                  <DocumentExplainer />
                </ProtectedRoute>
              } />
              <Route path="/myths" element={
                <ProtectedRoute>
                  <MythBuster />
                </ProtectedRoute>
              } />
              <Route path="/states" element={
                <ProtectedRoute>
                  <StateLaws />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
