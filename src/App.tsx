import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WhatsAppFloat } from "./components/ui/WhatsAppFloat";
import { CustomerProtectedRoute } from "./components/CustomerProtectedRoute";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import { CustomerAuthProvider } from "./hooks/useCustomerAuth";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { SpeedTest } from "./pages/SpeedTest";
import { CustomerLogin } from "./pages/CustomerLogin";
import { CustomerPortal } from "./pages/CustomerPortal";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { useThemeVars } from "./hooks/useThemeVars";

function App() {
  useThemeVars();

  return (
    <CustomerAuthProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daftar" element={<Register />} />
            <Route path="/speedtest" element={<SpeedTest />} />
            <Route path="/pelanggan/login" element={<CustomerLogin />} />
            <Route element={<CustomerProtectedRoute />}>
              <Route path="/pelanggan" element={<CustomerPortal />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </BrowserRouter>
    </CustomerAuthProvider>
  );
}

export default App;
