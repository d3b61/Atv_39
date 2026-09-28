import React from 'react';
import { Order, TabType } from '../types';
import { CheckCircle2, ArrowLeft, Mail, Package, Calendar } from 'lucide-react';

interface CheckoutViewProps {
  order: Order | null;
  setActiveTab: (tab: TabType) => void;
  onResetOrder: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  order,
  setActiveTab,
  onResetOrder,
}) => {
  const orderNumber = order?.id || '13422';
  const emailCliente = order?.emailCliente || 'cliente@horadocha.com.br';
  const orderTotal = order?.total || 335.18;

  const handleReturnHome = () => {
    onResetOrder();
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-10">
      {/* Top semantic header from finalizacao.html */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DBE4A9]/40">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
            Etapa Concluída
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
            FINALIZAÇÃO
          </h1>
        </div>

        <nav>
          <button
            onClick={handleReturnHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EAEFC8] hover:bg-[#DBE4A9] text-[#1F2416] text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar à Página Inicial</span>
          </button>
        </nav>
      </header>

      {/* Main confirmation card */}
      <main>
        <section className="bg-white border border-[#DBE4A9]/60 rounded-3xl p-8 sm:p-12 text-center shadow-xs space-y-8">
          {/* Confirmed Icon / Graphic */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#EAEFC8] flex items-center justify-center text-[#5C674E] ring-8 ring-[#EAEFC8]/40 animate-pulse">
              <CheckCircle2 className="w-14 h-14 text-[#3e4f20]" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
              Compra realizada com sucesso!
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-[#EAEFC8] text-xs font-bold text-[#1F2416] tracking-wider uppercase">
              Pedido #{orderNumber}
            </div>
            <p className="text-sm sm:text-base text-[#5C674E] max-w-md mx-auto leading-relaxed">
              Em breve enviaremos no seu e-mail um link para acompanhar seu pedido!
            </p>
          </div>

          {/* Order Details Accordion / Summary Box */}
          <div className="bg-[#FAFAF8] border border-[#DBE4A9]/40 rounded-2xl p-6 text-left space-y-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 pb-3 border-b border-[#DBE4A9]/30">
              <Mail className="w-4 h-4 text-[#5C674E] shrink-0" />
              <div>
                <span className="text-[#5C674E] block text-[11px]">E-mail de confirmação:</span>
                <span className="font-medium text-[#1F2416]">{emailCliente}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-[#DBE4A9]/30">
              <Package className="w-4 h-4 text-[#5C674E] shrink-0" />
              <div>
                <span className="text-[#5C674E] block text-[11px]">Preparação do pacote:</span>
                <span className="font-medium text-[#1F2416]">
                  Embalagem com proteção reforçada para porcelana
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#5C674E] shrink-0" />
              <div>
                <span className="text-[#5C674E] block text-[11px]">Previsão de entrega:</span>
                <span className="font-medium text-[#1F2416]">
                  3 a 5 dias úteis com código de rastreamento
                </span>
              </div>
            </div>

            {order?.itens && order.itens.length > 0 && (
              <div className="pt-4 border-t border-[#DBE4A9]/30">
                <span className="text-[11px] uppercase tracking-wider text-[#5C674E] font-semibold block mb-2">
                  Itens Confirmados:
                </span>
                <ul className="space-y-2">
                  {order.itens.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between items-center text-xs text-[#1F2416]"
                    >
                      <span>
                        {item.quantidade}x {item.product.nome}
                      </span>
                      <span className="font-medium tabular-nums">
                        {(item.product.valor * item.quantidade).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 mt-3 border-t border-[#DBE4A9]/30 flex justify-between font-semibold text-sm text-[#1F2416]">
                  <span>Total Pago:</span>
                  <span className="tabular-nums">
                    {orderTotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleReturnHome}
              className="px-8 py-3.5 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              Voltar à Página Inicial
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-[#5C674E]">
        <p>Agradecemos por escolher a Hora do Chá para o seu momento de paz.</p>
      </footer>
    </div>
  );
};
