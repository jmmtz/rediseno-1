import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

interface CustomerSession {
  id: string;
  email: string;
  name: string;
}

interface HeaderProps {
  activeTab: 'larue' | 'admin';
  onTabChange: (tab: 'larue' | 'admin') => void;
  isAdmin: boolean;
  customer: CustomerSession | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onCustomerDashClick: () => void;
  onValmClick: () => void;
}

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Citas', href: '#citas' },
  { label: 'Conócenos', href: '#galeria' },
];

export default function Header({
  activeTab, onTabChange,
  isAdmin, customer, onLoginClick, onSignUpClick, onCustomerDashClick,
}: Omit<HeaderProps, 'onValmClick'> & { onValmClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navBg = scrolled
    ? 'bg-[#FBFBF9] shadow-sm border-b border-[#e8e4de]'
    : 'bg-transparent';

  const isLoggedIn = isAdmin || !!customer;

  function handleNavLink(href: string) {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on admin tab, switch back to larue first then scroll
      if (activeTab !== 'larue') onTabChange('larue');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <button onClick={() => onTabChange('larue')} className="flex items-center shrink-0">
            <img
              src="/IMG_4562.PNG"
              alt="La Rue Salon & Spa"
              className={`h-10 w-auto object-contain transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
            />
          </button>

          {/* Center nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavLink(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 ${
                  scrolled
                    ? 'text-[#2B2823]/70 hover:text-[#2B2823] hover:bg-[#2B2823]/5'
                    : 'text-white/90 hover:text-white hover:bg-[#FBFBF9]/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => onTabChange('admin')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === 'admin'
                    ? 'bg-[#2B2823] text-white shadow-sm'
                    : scrolled
                    ? 'text-[#2B2823]/70 hover:text-[#2B2823] hover:bg-[#2B2823]/5'
                    : 'text-white/90 hover:text-white hover:bg-[#FBFBF9]/10'
                }`}
              >
                Admin
              </button>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Customer logged in */}
            {customer && (
              <button
                onClick={onCustomerDashClick}
                className={`hidden md:flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-200 ${
                  scrolled
                    ? 'border-[#e8e4de] text-[#2B2823] hover:border-[#2B2823] bg-[#FBFBF9]'
                    : 'border-white/40 text-white hover:border-white bg-[#FBFBF9]/10'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  scrolled ? 'bg-[#2B2823]/10 text-[#2B2823]' : 'bg-[#FBFBF9]/20 text-white'
                }`}>
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                {customer.name.split(' ')[0]}
              </button>
            )}

            {/* Not logged in */}
            {!isLoggedIn && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={onLoginClick}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-200 ${
                    scrolled
                      ? 'border-[#e8e4de] text-[#2B2823]/70 hover:border-[#2B2823] hover:text-[#2B2823]'
                      : 'border-white/30 text-white/80 hover:border-white hover:text-white'
                  }`}
                >
                  <LogIn size={13} />
                  Iniciar Sesión
                </button>
                <button
                  onClick={onSignUpClick}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#2B2823] text-white hover:bg-[#3A362F] transition-colors"
                >
                  Crear Cuenta
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className={`md:hidden p-2 transition-colors ${scrolled ? 'text-[#2B2823]' : 'text-white'}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t bg-[#FBFBF9] border-[#e8e4de] shadow-lg px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavLink(link.href)}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#2B2823]/80 hover:bg-[#FBFBF9] transition-colors"
            >
              {link.label}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={() => { onTabChange('admin'); setMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'admin' ? 'bg-[#2B2823] text-white' : 'text-[#2B2823]/80 hover:bg-[#FBFBF9]'
              }`}
            >
              Panel Admin
            </button>
          )}

          {customer && (
            <button
              onClick={() => { onCustomerDashClick(); setMenuOpen(false); }}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#2B2823]/80 hover:bg-[#FBFBF9] border border-[#e8e4de] mt-2"
            >
              <div className="w-7 h-7 rounded-full bg-[#2B2823]/10 flex items-center justify-center text-[#2B2823] font-bold text-xs shrink-0">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-[#2B2823] text-xs">{customer.name}</p>
                <p className="text-[#2B2823]/40 text-[10px]">Ver mis citas</p>
              </div>
            </button>
          )}

          {!isLoggedIn && (
            <div className="pt-2 space-y-2">
              <button
                onClick={() => { onLoginClick(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#2B2823]/80 hover:bg-[#FBFBF9] border border-[#e8e4de]"
              >
                <LogIn size={15} />
                Iniciar Sesión
              </button>
              <button
                onClick={() => { onSignUpClick(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-semibold bg-[#2B2823] text-white hover:bg-[#3A362F]"
              >
                <User size={15} />
                Crear Cuenta
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
