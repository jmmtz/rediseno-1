import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import type { Service } from './types';

import Header from './components/layout/Header';
import Hero from './components/larue/Hero';
import Services from './components/larue/Services';
import Gallery from './components/larue/Gallery';
import Footer from './components/larue/Footer';
import BookingWizard from './components/larue/BookingWizard';
import ValmSection from './components/valm/ValmSection';
import AdminDashboard from './components/admin/AdminDashboard';
import AuthModal from './components/auth/AuthModal';
import CustomerDashboard from './components/auth/CustomerDashboard';

type AppTab = 'larue' | 'admin';

interface CustomerSession {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('larue');
  const [isAdmin, setIsAdmin] = useState(false);
  const [customer, setCustomer] = useState<CustomerSession | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const authResolved = useRef(false);

  const [showBooking, setShowBooking] = useState(false);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const [showCustomerDash, setShowCustomerDash] = useState(false);

  async function resolveUserRole(userId: string, email: string) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .maybeSingle();

    if (error) console.error('[App] resolveUserRole error:', error);

    if (profile?.role === 'admin') {
      setIsAdmin(true);
      setCustomer(null);
      setActiveTab('admin');
    } else {
      setIsAdmin(false);
      setCustomer({
        id: userId,
        email,
        name: profile?.full_name || email.split('@')[0],
      });
    }
    // Only flip checkingAuth once — getSession and onAuthStateChange both call
    // this function on initial load; the ref prevents a double-render flash.
    if (!authResolved.current) {
      authResolved.current = true;
      setCheckingAuth(false);
    }
  }

  // Session restore + live auth listener
  useEffect(() => {
    // onAuthStateChange fires INITIAL_SESSION synchronously before getSession
    // resolves, so we rely solely on the listener for the initial state.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          await resolveUserRole(session.user.id, session.user.email ?? '');
        } else {
          setIsAdmin(false);
          setCustomer(null);
          if (!authResolved.current) {
            authResolved.current = true;
            setCheckingAuth(false);
          }
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleTabChange(tab: AppTab) {
    if (tab === 'admin' && !isAdmin) {
      setAuthModalView('login');
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleScrollToValm() {
    const el = document.getElementById('valm');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleAuthSuccess(_role: 'admin' | 'customer') {
    // resolveUserRole (triggered by onAuthStateChange) handles all state updates
    // including setting activeTab='admin' for admins. Just close the modal.
    setShowAuthModal(false);
  }

  function handleBookService(service: Service) {
    setPreselectedService(service);
    setShowBooking(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setCustomer(null);
    setActiveTab('larue');
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2B2823]/20 border-t-[#2B2823] rounded-full animate-spin" />
      </div>
    );
  }

  // Admin panel — only rendered when fully authenticated as admin
  if (activeTab === 'admin' && isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="bg-[#FBFBF9]">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isAdmin={isAdmin}
        customer={customer}
        onLoginClick={() => { setAuthModalView('login'); setShowAuthModal(true); }}
        onSignUpClick={() => { setAuthModalView('signup'); setShowAuthModal(true); }}
        onCustomerDashClick={() => setShowCustomerDash(true)}
        onValmClick={handleScrollToValm}
      />

      <div className="pt-0">
        <Hero onBookClick={() => setShowBooking(true)} />
        <Services onBookService={handleBookService} />
        <Gallery />
        <ValmSection />
        {isAdmin && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => handleTabChange('admin')}
              className="bg-[#8A7A5C] hover:bg-[#71624A] text-[#2B2823] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg transition-colors"
            >
              Admin Panel
            </button>
          </div>
        )}
        <Footer />
      </div>

      {showBooking && (
        <BookingWizard
          onClose={() => { setShowBooking(false); setPreselectedService(null); }}
          preselectedService={preselectedService}
          customerSession={customer}
        />
      )}

      {showAuthModal && (
        <AuthModal
          initialView={authModalView}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {showCustomerDash && customer && (
        <CustomerDashboard
          userId={customer.id}
          userEmail={customer.email}
          userName={customer.name}
          onClose={() => setShowCustomerDash(false)}
          onLogout={() => { setShowCustomerDash(false); handleLogout(); }}
          onBookNow={() => setShowBooking(true)}
        />
      )}
    </div>
  );
}
