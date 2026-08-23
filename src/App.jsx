import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SkipLink from './components/SkipLink';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import MobileBottomBar from './components/MobileBottomBar';
import Toast from './components/Toast';
import AudioPlayer, { audioTracks } from './components/AudioPlayer';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import ScrollToTop from './components/ScrollToTop';

// Direct imports for all pages
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import CuisinePage from './pages/CuisinePage';
import MenuPage from './pages/MenuPage';
import PrivateDiningPage from './pages/PrivateDiningPage';
import GalleryPage from './pages/GalleryPage';
import JournalPage from './pages/JournalPage';
import ArticlePage from './pages/ArticlePage';
import ReservationsPage from './pages/ReservationsPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedInitialMenu, setSelectedInitialMenu] = useState('');
  const [selectedInitialSpace, setSelectedInitialSpace] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [toast, setToast] = useState(null);

  const handleOpenBooking = (spaceName = '') => {
    setSelectedInitialSpace(spaceName);
    setSelectedInitialMenu('');
    setIsBookingOpen(true);
  };

  const handleSelectMenuForBooking = (menuName) => {
    setSelectedInitialMenu(menuName);
    setSelectedInitialSpace('');
    setIsBookingOpen(true);
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % audioTracks.length);
    if (!isAudioPlaying) setIsAudioPlaying(true);
  };

  // Arrêt automatique du son dès que l'utilisateur quitte l'onglet ou le site
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAudioPlaying(false);
      }
    };

    const handlePageHide = () => {
      setIsAudioPlaying(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, []);

  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-nero text-ivoire flex flex-col selection:bg-or selection:text-nero">
            {/* Luxury Splash Loading Screen */}
            <LoadingScreen />
            {/* Accessible Skip to Content Link */}
            <SkipLink />
            {/* Custom Contextual Cursor for Desktop */}
            <CustomCursor />

            {/* Ambient Italian Audio Player (Sérénade / Jazz Lounge / Salsa) */}
            <AudioPlayer 
              isPlaying={isAudioPlaying} 
              currentTrackIndex={currentTrackIndex} 
              onTrackEnd={handleNextTrack}
            />

            {/* Minimalist Top Navigation */}
            <Navigation
              onOpenBooking={() => handleOpenBooking()}
              isAudioPlaying={isAudioPlaying}
              onToggleAudio={toggleAudio}
              currentTrackIndex={currentTrackIndex}
              onNextTrack={handleNextTrack}
            />

            {/* Main Content with Route Transitions */}
            <main id="main-content" tabIndex="-1" role="main" className="flex-grow flex flex-col focus:outline-none">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                  <Route path="/story" element={<StoryPage onOpenBooking={handleOpenBooking} />} />
                  <Route path="/cuisine" element={<CuisinePage onOpenBooking={handleOpenBooking} onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                  <Route path="/menu" element={<MenuPage onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                  <Route path="/private-dining" element={<PrivateDiningPage onOpenBooking={handleOpenBooking} />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/galerie" element={<GalleryPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:slug" element={<ArticlePage />} />
                  <Route path="/reservations" element={<ReservationsPage onOpenBooking={handleOpenBooking} />} />
                  <Route path="/contact" element={<ContactPage onShowToast={showToast} />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/legal" element={<LegalPage />} />
                  <Route path="/privacy" element={<LegalPage />} />
                  <Route path="/confidentialite" element={<LegalPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </PageTransition>
            </main>

            {/* Floating Luxury Back to Top Button */}
            <ScrollToTop />

            {/* Mobile Floating Concierge Action Bar */}
            <MobileBottomBar onOpenBooking={() => handleOpenBooking()} />

            {/* Monumental Footer */}
            <Footer onOpenBooking={() => handleOpenBooking()} />

            {/* Multi-step Concierge Reservation Modal */}
            <ReservationModal
              isOpen={isBookingOpen}
              onClose={() => setIsBookingOpen(false)}
              initialMenu={selectedInitialMenu}
              initialSpace={selectedInitialSpace}
            />

            {/* Luxury Toast Notification */}
            <Toast toast={toast} onClose={() => setToast(null)} />
          </div>
        </Router>
      </ErrorBoundary>
    </LanguageProvider>
  );
}
