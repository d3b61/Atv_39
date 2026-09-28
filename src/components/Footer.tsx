import React from 'react';
import { TabType } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-[#DBE4A9]/40 mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote / Editorial rest section from documents */}
        <section
          aria-label="Frase de inspiração"
          className="bg-[#EAEFC8]/40 border border-[#DBE4A9]/40 rounded-2xl p-8 sm:p-12 mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium block mb-2">
            Aproveite nossas ofertas
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl text-[#1F2416] font-normal leading-relaxed italic">
            “Reserve um tempo para tomar um chá com biscoitos, juntos aos amigos ou em sua própria companhia.”
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#5C674E]">
            <span>Hora do Chá</span>
            <span>·</span>
            <span>Ritual & Serenidade</span>
          </div>
        </section>

        {/* 3-column minimal footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#DBE4A9]/30 text-sm">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-serif text-2xl text-[#1F2416] font-medium">Hora do Chá</h2>
            <p className="text-[#5C674E] text-xs sm:text-sm max-w-md leading-relaxed">
              Curadoria artesanal de xícaras de porcelana, vidros orientais, chás puros e biscoitos selecionados. Criando momentos de pausa consciente para o seu dia.
            </p>
            <div className="pt-2 text-xs text-[#5C674E]/80">
              Atendimento: contato@horadocha.com.br
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Links rápidos do rodapé" className="space-y-2.5">
            <h3 className="font-sans font-semibold text-xs tracking-wider uppercase text-[#1F2416]">
              Navegação
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C674E]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('produtos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Jogos de Xícaras & Biscoitos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('cesta');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Cesta de Compras
                </button>
              </li>
              <li>
                <a
                  href="https://www.belaherbal.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1F2416] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Chás Bela Herbal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Account / Support */}
          <nav aria-label="Área do cliente" className="space-y-2.5">
            <h3 className="font-sans font-semibold text-xs tracking-wider uppercase text-[#1F2416]">
              Área do Cliente
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5C674E]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('login');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Acessar Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('cadastro');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Criar Cadastro
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('troca_senha');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1F2416] transition-colors"
                >
                  Esqueci a Senha
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C674E]/80 gap-3">
          <p>© {new Date().getFullYear()} Hora do Chá. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>60% Branco</span>
            <span>·</span>
            <span>30% #DBE4A9</span>
            <span>·</span>
            <span>10% #EAEFC8</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
