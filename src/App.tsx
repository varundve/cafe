import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ProductDetails } from './pages/ProductDetails';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Offers } from './pages/Offers';
import { Reservations } from './pages/Reservations';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-espresso-900 text-cream-100 selection:bg-amber-400 selection:text-espresso-950">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Overlay Cart Drawer */}
            <CartDrawer />

            {/* Quick Floating WhatsApp Ordering Button */}
            <FloatingWhatsApp />

            {/* Mobile Bottom Fixed Bar */}
            <MobileBottomBar />

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
