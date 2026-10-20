import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Work } from './pages/Work';
import { CaseStudy } from './pages/CaseStudy';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { Atelier3D } from './pages/Atelier3D';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { useLocation } from 'react-router-dom';

function AppContent({
  isQuoteModalOpen,
  handleOpenQuoteModal,
  handleCloseQuoteModal,
}: {
  isQuoteModalOpen: boolean;
  handleOpenQuoteModal: () => void;
  handleCloseQuoteModal: () => void;
}) {
  const location = useLocation();
  const is3DStudio = location.pathname === '/atelier' || location.pathname === '/3d-studio';

  return (
    <>
      <ScrollToTop />
      {!is3DStudio && <ScrollProgressBar />}
      <CustomCursor />
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col font-sans-clean selection:bg-[var(--gold-primary)]/30 selection:text-[var(--gold-primary)] transition-colors duration-300">
        {/* Sticky Luxury Navbar (hidden on full-bleed 3D studio) */}
        {!is3DStudio && <Navbar onOpenQuoteModal={handleOpenQuoteModal} />}

        {/* Global Instant Quote Request Modal */}
        <QuoteModal isOpen={isQuoteModalOpen} onClose={handleCloseQuoteModal} />

        {/* Route Viewport */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/about" element={<About onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/services" element={<Services onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/services/:serviceId" element={<ServiceDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/work" element={<Work onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/work/:caseStudyId" element={<CaseStudy onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/atelier" element={<Atelier3D onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/3d-studio" element={<Atelier3D onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Cinematic Footer (hidden on full-bleed 3D studio) */}
        {!is3DStudio && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent
            isQuoteModalOpen={isQuoteModalOpen}
            handleOpenQuoteModal={handleOpenQuoteModal}
            handleCloseQuoteModal={handleCloseQuoteModal}
          />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
