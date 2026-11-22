import React, { useState, useEffect, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { CustomerBottomNav } from './components/layout/CustomerBottomNav';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/storefront/CartDrawer';
import { AuthModal } from './pages/public/AuthModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { HomePage } from './pages/public/HomePage';
import { ShopPage } from './pages/public/ShopPage';
import { ProductDetailPage } from './pages/public/ProductDetailPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { BecomeSellerPage } from './pages/public/BecomeSellerPage';

import { CustomerPortal } from './pages/customer/CustomerPortal';
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { SellerSupportChatPage } from './pages/seller/SellerSupportChatPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { Product } from './types';
import { purgeLegacyLocalStorageCredentials } from './services/adminAuth';
import { MessageSquare, X, ArrowRight, ShieldCheck } from 'lucide-react';

purgeLegacyLocalStorageCredentials();

// Views that REQUIRE a logged-in user (guest gets redirected to auth modal)
const AUTH_REQUIRED_VIEWS = new Set<string>(['checkout', 'customer']);

function isUrlAdminRoute(): boolean {
  try {
    const hostname = window.location.hostname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    return (
      hostname.startsWith('admin.') ||
      pathname === '/admin' ||
      pathname.startsWith('/admin/') ||
      hash === '#/96274' ||
      hash === '#96274' ||
      hash.includes('96274') ||
      hash === '#admin' ||
      hash === '#/admin' ||
      search.includes('admin=true') ||
      search.includes('admin=1') ||
      search.includes('view=admin')
    );
  } catch {
    return false;
  }
}

function getViewFromLocation(): string {
  try {
    if (isUrlAdminRoute()) return 'admin';
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (hash === '#seller' || hash === '#/seller' || pathname === '/seller' || search.includes('view=seller')) return 'seller';
    if (hash === '#become-seller' || hash === '#/become-seller' || pathname === '/become-seller' || search.includes('view=become-seller')) return 'become-seller';
    if (hash === '#seller-login' || hash === '#/seller-login' || pathname === '/seller-login' || search.includes('view=seller-login')) return 'seller-login';
    if (hash === '#seller-support' || hash === '#/seller-support' || pathname === '/seller-support' || pathname === '/seller-support/' || search.includes('view=seller-support')) return 'seller-support';
    if (hash === '#shop' || hash === '#/shop' || pathname === '/shop' || search.includes('view=shop')) return 'shop';
    if (hash === '#checkout' || hash === '#/checkout' || pathname === '/checkout' || search.includes('view=checkout')) return 'checkout';
    if (hash === '#customer' || hash === '#/customer' || pathname === '/customer' || search.includes('view=customer')) return 'customer';
  } catch {}
  return 'home';
}

function MainAppContent() {
  const { currentUser, isAuthenticated, sellers, chatPopupNotice, setChatPopupNotice } = useStore();

  const [currentView, setCurrentView] = useState<string>(() => {
    try {
      if (isUrlAdminRoute()) return 'admin';

      const locView = getViewFromLocation();
      if (locView && locView !== 'home') {
        // Guard: If it's a protected view and user is not authenticated, fall back to home
        if (AUTH_REQUIRED_VIEWS.has(locView)) {
          // Let the effect below open the auth modal
          return 'home';
        }
        return locView;
      }

      const hash = window.location.hash.trim();
      const search = window.location.search.trim();
      if (!hash && !search) return 'home';

      const savedView = localStorage.getItem('nexus_active_view');
      const savedUserStr = localStorage.getItem('nexus_current_user');
      let isSellerUser = false;
      try {
        if (savedUserStr) {
          const parsedU = JSON.parse(savedUserStr);
          if (parsedU?.role === 'SELLER') isSellerUser = true;
        }
      } catch {}

      if (isSellerUser && (savedView === 'seller' || savedView === 'seller-support')) {
        return 'seller';
      }

      if (savedView && savedView !== 'admin' && savedView !== 'product' && !AUTH_REQUIRED_VIEWS.has(savedView)) {
        return savedView;
      }
    } catch {}
    return 'home';
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_active_view', currentView);
    } catch {}
  }, [currentView]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [pendingCheckoutAfterAuth, setPendingCheckoutAfterAuth] = useState(false);

  useEffect(() => {
    try {
      if (!window.history.state || typeof window.history.state.view !== 'string') {
        const initialView = isUrlAdminRoute() ? 'admin' : (getViewFromLocation() || 'home');
        window.history.replaceState({ view: initialView }, '', window.location.href);
      }
    } catch {}

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.view === 'string') {
        setCurrentView(e.state.view);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }
      const hash = window.location.hash.trim();
      const search = window.location.search.trim();
      if (!hash && !search && (window.location.pathname === '/' || window.location.pathname === '')) {
        setCurrentView(isUrlAdminRoute() ? 'admin' : 'home');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }
      const targetView = getViewFromLocation();
      setCurrentView(targetView);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    const handleHashChange = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        try { window.history.pushState({ view: 'admin' }, '', '#/96274'); }
        catch { window.location.hash = '#/96274'; }
        setCurrentView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeSellerProfile = useMemo(() => {
    if (currentUser && currentUser.id && currentUser.id !== 'guest_visitor') {
      const match = sellers.find(
        (s) =>
          s &&
          (s.userId === currentUser.id ||
            s.id === currentUser.id ||
            (s.email && currentUser.email && s.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim()))
      );
      if (match) return match;
    }
    return null;
  }, [currentUser, sellers]);

  const isSellerUnverified = Boolean(
    currentUser.role === 'SELLER' &&
    activeSellerProfile &&
    activeSellerProfile.applicationStatus === 'PENDING'
  );

  const isSellerFrozen = Boolean(
    currentUser.role !== 'ADMIN' &&
    activeSellerProfile &&
    (activeSellerProfile.applicationStatus === 'FROZEN' ||
      (activeSellerProfile as any).isFrozen === true ||
      (activeSellerProfile as any).status === 'FROZEN' ||
      (currentUser as any).isFrozen === true ||
      (currentUser as any).status === 'FROZEN')
  );

  useEffect(() => {
    if (isSellerFrozen && currentView !== 'seller-support' && currentView !== 'admin') {
      setCurrentView('seller-support');
      try { window.history.replaceState({ view: 'seller-support' }, '', '#/seller-support'); } catch {}
    }
  }, [isSellerFrozen, currentView]);

    // SAFETY NET: If user logs out while on any protected view, auto-redirect to home.
  // This catches logout buttons in dashboards that don't self-navigate.
  useEffect(() => {
    const PROTECTED_VIEWS = new Set(['checkout', 'customer', 'seller', 'seller-support']);
    if (!isAuthenticated && PROTECTED_VIEWS.has(currentView)) {
      setCurrentView('home');
      try {
        window.history.replaceState({ view: 'home' }, '', window.location.pathname);
      } catch {}
    }
  }, [isAuthenticated, currentView]);

  const handleNavigate = (view: string, id?: string) => {
    if (isSellerFrozen && view !== 'seller-support' && view !== 'admin') {
      setCurrentView('seller-support');
      try { window.history.replaceState({ view: 'seller-support' }, '', '#/seller-support'); } catch {}
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // AUTH GUARD: protected views require login
    if (AUTH_REQUIRED_VIEWS.has(view) && !isAuthenticated) {
      setPendingCheckoutAfterAuth(view === 'checkout');
      setIsAuthOpen(true);
      return;
    }

    try { localStorage.setItem('nexus_active_view', view); } catch {}

    let targetHash = '';
    if (view === 'admin') targetHash = '#/96274';
    else if (view === 'seller') targetHash = '#/seller';
    else if (view === 'become-seller') targetHash = '#/become-seller';
    else if (view === 'seller-login') targetHash = '#/seller-login';
    else if (view === 'home') targetHash = '';
    else if (view === 'shop') targetHash = '#/shop';
    else if (view === 'checkout') targetHash = '#/checkout';
    else if (view === 'customer') targetHash = '#/customer';
    else if (view === 'seller-support') targetHash = '#/seller-support';

    try {
      const currentHash = window.location.hash;
      const targetUrl = targetHash ? `${window.location.pathname}${targetHash}` : window.location.pathname;
      if (currentHash !== targetHash) {
        window.history.pushState({ view }, '', targetUrl);
      }
    } catch {
      if (targetHash) window.location.hash = targetHash;
    }

    if (view === 'admin') {
      setCurrentView('admin');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (view.startsWith('shop?cat=')) {
      const catId = view.split('=')[1];
      setCategoryFilter(catId);
      setSearchQuery('');
      setCurrentView('shop');
    } else if (view.startsWith('shop?q=')) {
      const q = decodeURIComponent(view.split('=')[1] || '');
      setSearchQuery(q);
      setCategoryFilter('ALL');
      setCurrentView('shop');
    } else {
      if (view === 'shop') { setCategoryFilter('ALL'); setSearchQuery(''); }
      setCurrentView(view);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart checkout with auth guard
  const handleCartCheckout = () => {
    setIsCartOpen(false);
    if (!isAuthenticated) {
      setPendingCheckoutAfterAuth(true);
      setIsAuthOpen(true);
      return;
    }
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      {currentView !== 'become-seller' &&
        currentView !== 'seller-login' &&
        currentView !== 'seller-support' &&
        currentView !== 'seller' &&
        currentView !== 'admin' && (
          <CustomerBottomNav
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

      {currentView !== 'become-seller' &&
        currentView !== 'seller-login' &&
        currentView !== 'seller-support' &&
        currentView !== 'seller' &&
        currentView !== 'admin' && (
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

      <main className={`flex-1 ${currentView === 'admin' || currentView === 'seller' ? 'flex flex-col w-full min-h-0' : ''}`}>
        <ErrorBoundary>
          {isSellerFrozen && currentView !== 'admin' ? (
            <SellerSupportChatPage onNavigate={handleNavigate} />
          ) : (
            <>
              {currentView === 'home' && <HomePage onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />}
              {currentView === 'shop' && <ShopPage initialCategory={categoryFilter} initialQuery={searchQuery} onSelectProduct={handleSelectProduct} />}
              {currentView === 'product' && (
                selectedProduct ? (
                  <ProductDetailPage product={selectedProduct} onBack={() => setCurrentView('shop')} onNavigate={handleNavigate} />
                ) : (
                  <HomePage onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />
                )
              )}
              {currentView === 'checkout' && isAuthenticated && <CheckoutPage onNavigate={handleNavigate} />}
              {currentView === 'become-seller' && <BecomeSellerPage onNavigate={handleNavigate} initialMode="register" />}
              {currentView === 'seller-login' && <BecomeSellerPage onNavigate={handleNavigate} initialMode="login" />}
              {currentView === 'seller-support' && <SellerSupportChatPage onNavigate={handleNavigate} />}
              {currentView === 'customer' && isAuthenticated && <CustomerPortal />}
              {currentView === 'seller' && (currentUser.role === 'SELLER' || currentUser.role === 'ADMIN') && (
                <SellerDashboard onNavigate={handleNavigate} />
              )}
              {currentView === 'seller' && currentUser.role !== 'SELLER' && currentUser.role !== 'ADMIN' && (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-center">
                  <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-8 max-w-md">
                    <h2 className="text-xl font-black text-white mb-2">Access Denied</h2>
                    <p className="text-sm text-slate-400 mb-4">Seller dashboard requires seller login.</p>
                    <button
                      onClick={() => handleNavigate('home')}
                      className="px-6 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                    >
                      Return Home
                    </button>
                  </div>
                </div>
              )}
              {currentView === 'admin' && <AdminDashboard onNavigate={handleNavigate} />}
              {![
                'home', 'shop', 'product', 'checkout', 'become-seller',
                'seller-login', 'seller-support', 'customer', 'seller', 'admin',
              ].includes(currentView) && (
                <HomePage onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />
              )}
            </>
          )}
        </ErrorBoundary>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCartCheckout}
      />

      {/* Real-time Customer Care / Support Message Popup Toast */}
      {chatPopupNotice && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-slate-900 border border-amber-400/50 text-white rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-4 duration-300 backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-xl shrink-0 mt-0.5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-white">{chatPopupNotice.title || 'Customer Care Desk'}</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed font-medium">
                  {chatPopupNotice.message}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const targetConvId = chatPopupNotice.conversationId;
                      setChatPopupNotice(null);
                      if (currentUser?.role === 'ADMIN' || localStorage.getItem('nexus_admin_session')) {
                        sessionStorage.setItem('nexus_admin_target_tab', 'conversations');
                        if (targetConvId) {
                          sessionStorage.setItem('nexus_admin_target_conv_id', targetConvId);
                        }
                        window.dispatchEvent(
                          new CustomEvent('nexus_admin_navigate_tab', {
                            detail: { tab: 'conversations', convId: targetConvId },
                          })
                        );
                        handleNavigate('admin');
                      } else if (currentUser?.role === 'SELLER') {
                        handleNavigate('seller-support');
                      } else {
                        handleNavigate('customer');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <span>Open Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatPopupNotice(null)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-semibold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setChatPopupNotice(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingCheckoutAfterAuth(false);
        }}
        onNavigate={handleNavigate}
        initialMessage={pendingCheckoutAfterAuth ? 'Please sign in to place your order.' : undefined}
        successRedirect={pendingCheckoutAfterAuth ? 'checkout' : undefined}
      />

      {currentView !== 'become-seller' &&
        currentView !== 'seller-login' &&
        currentView !== 'seller-support' &&
        currentView !== 'seller' &&
        currentView !== 'admin' && (
          <Footer onNavigate={handleNavigate} />
        )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <MainAppContent />
      </ErrorBoundary>
    </StoreProvider>
  );
}