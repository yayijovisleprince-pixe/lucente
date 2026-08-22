import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SkipLink from './components/SkipLink';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import MobileBottomBar from './components/MobileBottomBar';
import Toast from './components/Toast';
import AudioPlayer, { audioTracks } from './components/AudioPlayer';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';

// Direct import for Critical Path (HomePage)
import HomePage from './pages/HomePage';

// Code Splitting / Lazy Loading for Secondary Routes
const StoryPage = lazy(() => import('./pages/StoryPage'));
const CuisinePage = lazy(() => import('./pages/CuisinePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const PrivateDiningPage = lazy(() => import('./pages/PrivateDiningPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Minimalist Luxury Fallback for Lazy Loaded Route Chunks
function RouteLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-nero animate-fadeIn">
      <div className="w-8 h-8 rounded-full border border-or/30 border-t-or animate-spin" />
      <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-or/80">
        Chargement de la page...
      </span>
    </div>
  );
}

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

  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  return (
    <Router>
      <div className="min-h-screen bg-nero text-ivoire flex flex-col selection:bg-or selection:text-nero">
        {/* Accessible Skip to Content Link */}
        <SkipLink />
        {/* Custom Contextual Cursor for Desktop */}
        <CustomCursor />

        {/* Loading Screen */}
        <LoadingScreen />

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

        {/* Main Content with Route Transitions & Code Splitting */}
        <main id="main-content" tabIndex="-1" role="main" className="flex-grow flex flex-col focus:outline-none">
          <PageTransition>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                <Route path="/story" element={<StoryPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/cuisine" element={<CuisinePage onOpenBooking={handleOpenBooking} onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                <Route path="/menu" element={<MenuPage onSelectMenuForBooking={handleSelectMenuForBooking} />} />
                <Route path="/private-dining" element={<PrivateDiningPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/journal/:slug" element={<ArticlePage />} />
                <Route path="/reservations" element={<ReservationsPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/contact" element={<ContactPage onShowToast={showToast} />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>

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
  );
}
