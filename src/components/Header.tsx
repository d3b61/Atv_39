import React, { useState } from 'react';
import { TabType, User } from '../types';
import { ShoppingBag, User as UserIcon, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  currentUser: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'produtos') {
      setTimeout(() => {
        const el = document.getElementById('vitrine-produtos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DBE4A9]/40 transition-colors">
      {/* Top micro-bar: Minimal monthly note */}
      <aside className="bg-[#EAEFC8]/50 border-b border-[#DBE4A9]/20 px-4 py-1.5 text-center text-xs text-[#1F2416]/80 font-normal">
        <span>Curadoria especial de Primavera</span>
        <span className="mx-2 text-[#DBE4A9]">·</span>
        <span>Novas recomendações de xícaras e chás todo mês</span>
      </aside>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleNav('home')}
            className="text-left group focus:outline-none"
            aria-label="Hora do Chá - Página Inicial"
          >
            <span className="block font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1F2416] group-hover:text-[#5C674E] transition-colors">
              Hora do Chá
            </span>
            <span className="block text-[11px] tracking-widest uppercase text-[#5C674E]/80 font-sans -mt-0.5">
              Xícaras, Chás & Biscoitos
            </span>
          </button>

          {/* Zone 2: Horizontal Navigation Tabs (Clean typography with active indicator) */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-[#1F2416]/80"
          >
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-[#1F2416] font-semibold bg-[#EAEFC8]/70 border border-[#DBE4A9]/50'
                  : 'hover:text-[#1F2416] hover:bg-[#EAEFC8]/30'
              }`}
            >
              Início
            </button>

            <button
              onClick={() => handleNav('produtos')}
              className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                activeTab === 'produtos'
                  ? 'text-[#1F2416] font-semibold bg-[#EAEFC8]/70 border border-[#DBE4A9]/50'
                  : 'hover:text-[#1F2416] hover:bg-[#EAEFC8]/30'
              }`}
            >
              Vitrine
            </button>

            <a
              href="https://www.belaherbal.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md hover:text-[#1F2416] hover:bg-[#EAEFC8]/30 transition-all inline-flex items-center gap-1 text-[#5C674E] whitespace-nowrap"
              title="Acessar site Bela Herbal (abre em nova aba)"
            >
              <span>Chás Bela Herbal</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            {currentUser ? (
              <button
                onClick={() => handleNav('login')}
                className={`px-3 py-2 rounded-md transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'text-[#1F2416] font-semibold bg-[#EAEFC8]/70 border border-[#DBE4A9]/50'
                    : 'hover:text-[#1F2416] hover:bg-[#EAEFC8]/30'
                }`}
              >
                <UserIcon className="w-4 h-4 text-[#5C674E]" />
                <span className="truncate max-w-[120px]">
                  {currentUser.nome.split(' ')[0]}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNav('login')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    activeTab === 'login'
                      ? 'text-[#1F2416] font-semibold bg-[#EAEFC8]/70 border border-[#DBE4A9]/50'
                      : 'hover:text-[#1F2416] hover:bg-[#EAEFC8]/30'
                  }`}
                >
                  Login
                </button>

                <button
                  onClick={() => handleNav('cadastro')}
                  className={`px-3 py-2 rounded-md transition-all whitespace-nowrap ${
                    activeTab === 'cadastro'
                      ? 'text-[#1F2416] font-semibold bg-[#EAEFC8]/70 border border-[#DBE4A9]/50'
                      : 'hover:text-[#1F2416] hover:bg-[#EAEFC8]/30'
                  }`}
                >
                  Cadastro
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Horizontal Menu Shopping Bag / Cart Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNav('cesta')}
              aria-label={`Cesta de compras, ${cartCount} itens`}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all ${
                activeTab === 'cesta'
                  ? 'bg-[#DBE4A9] border-[#DBE4A9] text-[#1F2416] shadow-sm font-semibold'
                  : 'bg-white border-[#DBE4A9]/70 text-[#1F2416] hover:bg-[#EAEFC8]/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#1F2416]" />
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">
                Cesta
              </span>
              <span
                className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold tabular-nums rounded-full ${
                  activeTab === 'cesta'
                    ? 'bg-white text-[#1F2416]'
                    : 'bg-[#DBE4A9] text-[#1F2416]'
                }`}
              >
                {cartCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1F2416] hover:bg-[#EAEFC8]/40 rounded-lg transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer / dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="md:hidden border-t border-[#DBE4A9]/30 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg"
        >
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-[#DBE4A9]/40 text-[#1F2416] font-semibold'
                : 'text-[#1F2416]/80 hover:bg-[#EAEFC8]/30'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleNav('produtos')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'produtos'
                ? 'bg-[#DBE4A9]/40 text-[#1F2416] font-semibold'
                : 'text-[#1F2416]/80 hover:bg-[#EAEFC8]/30'
            }`}
          >
            Vitrine de Produtos
          </button>
          <a
            href="https://www.belaherbal.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium text-[#5C674E] hover:bg-[#EAEFC8]/30"
          >
            <span>Curadoria de Chás (Bela Herbal)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => handleNav('cesta')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cesta'
                ? 'bg-[#DBE4A9] text-[#1F2416] font-semibold'
                : 'text-[#1F2416]/80 hover:bg-[#EAEFC8]/30'
            }`}
          >
            <span>Cesta de Compras</span>
            <span className="bg-[#DBE4A9] text-[#1F2416] text-xs px-2 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          </button>

          {currentUser ? (
            <div className="pt-2 border-t border-[#DBE4A9]/30 mt-2">
              <div className="px-3 py-1.5 text-xs text-[#5C674E]">
                Logado como: <strong>{currentUser.nome}</strong> ({currentUser.email})
              </div>
              <button
                onClick={() => handleNav('login')}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-[#1F2416] hover:bg-[#EAEFC8]/30"
              >
                Minha Conta
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-red-700 hover:bg-red-50"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DBE4A9]/30 mt-2">
              <button
                onClick={() => handleNav('login')}
                className="text-center px-3 py-2 rounded-md text-sm font-medium bg-[#EAEFC8] text-[#1F2416] hover:bg-[#DBE4A9] transition-colors"
              >
                Entrar / Login
              </button>
              <button
                onClick={() => handleNav('cadastro')}
                className="text-center px-3 py-2 rounded-md text-sm font-medium bg-[#DBE4A9] text-[#1F2416] hover:bg-[#DBE4A9]/80 transition-colors"
              >
                Cadastre-se
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
