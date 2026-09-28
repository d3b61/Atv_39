import React from 'react';
import { CartItem, TabType } from '../types';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  setActiveTab: (tab: TabType) => void;
  onProceedToCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setActiveTab,
  onProceedToCheckout,
}) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.valor * item.quantidade,
    0
  );
  // Free shipping above R$ 150
  const frete = subtotal > 150 || subtotal === 0 ? 0 : 25.0;
  const total = subtotal + frete;

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EAEFC8] flex items-center justify-center text-[#5C674E]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-[#1F2416]">Sua cesta está vazia</h1>
          <p className="text-sm text-[#5C674E]">
            Aproveite nossa seleção de jogos de xícaras artesanais e biscoitos refinados para uma pausa serena.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('produtos')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explorar Vitrine</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header bar matching resumo.html */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DBE4A9]/40">
        <div>
          <button
            onClick={() => setActiveTab('produtos')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C674E] hover:text-[#1F2416] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar às compras</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
            Resumo da Compra
          </h1>
        </div>

        <button
          onClick={onClearCart}
          className="text-xs text-[#5C674E] hover:text-red-700 transition-colors self-start sm:self-auto"
        >
          Esvaziar cesta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Itemized List Column */}
        <section aria-label="Itens na cesta" className="lg:col-span-7 space-y-4">
          {cart.map((item) => {
            const itemTotal = item.product.valor * item.quantidade;
            return (
              <article
                key={item.product.id}
                className="flex gap-4 p-4 sm:p-5 bg-white border border-[#DBE4A9]/50 rounded-xl hover:border-[#DBE4A9] transition-all"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#FAFAF8] shrink-0 border border-[#DBE4A9]/30">
                  <img
                    src={item.product.image}
                    alt={item.product.nome}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details & Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[#1F2416] leading-snug">
                        {item.product.nome}
                      </h3>
                      <p className="text-xs text-[#5C674E]">
                        {item.product.valorFormatado} cada
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#5C674E] hover:text-red-600 p-1 transition-colors"
                      title="Remover item da cesta"
                      aria-label={`Remover ${item.product.nome}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#DBE4A9]/20">
                    <div className="flex items-center border border-[#DBE4A9]/60 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantidade - 1)
                        }
                        className="p-1.5 hover:bg-[#EAEFC8]/50 text-[#1F2416] transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantidade}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 1) {
                            onUpdateQuantity(item.product.id, val);
                          }
                        }}
                        className="w-10 text-center text-xs font-semibold tabular-nums text-[#1F2416] focus:outline-none"
                        aria-label="Quantidade"
                      />
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantidade + 1)
                        }
                        className="p-1.5 hover:bg-[#EAEFC8]/50 text-[#1F2416] transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold tabular-nums text-[#1F2416]">
                      {formatCurrency(itemTotal)}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Purchase Summary Column */}
        <aside
          aria-label="Resumo dos valores"
          className="lg:col-span-5 h-fit p-6 sm:p-7 bg-[#EAEFC8]/30 border border-[#DBE4A9]/60 rounded-2xl space-y-6"
        >
          <h2 className="font-serif text-xl text-[#1F2416] font-medium border-b border-[#DBE4A9]/40 pb-3">
            Totais da Cesta
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-[#1F2416]">
            <div className="flex justify-between">
              <span className="text-[#5C674E]">Subtotal dos itens</span>
              <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#5C674E]">Frete estimado</span>
              <span className="font-medium tabular-nums">
                {frete === 0 ? (
                  <span className="text-[#3b4c1e] font-semibold">Grátis (acima de R$ 150)</span>
                ) : (
                  formatCurrency(frete)
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-[#DBE4A9]/40 flex justify-between items-baseline">
              <span className="font-serif text-lg font-medium text-[#1F2416]">Valor Total</span>
              <span className="text-xl sm:text-2xl font-bold tabular-nums text-[#1F2416]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Finalizar a Compra</span>
            </button>

            <button
              onClick={() => setActiveTab('produtos')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#5C674E] hover:text-[#1F2416] hover:bg-white/60 transition-colors text-center"
            >
              Continuar comprando
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#5C674E]">
            <ShieldCheck className="w-4 h-4 text-[#5C674E]" />
            <span>Compra 100% segura com suporte dedicado</span>
          </div>
        </aside>
      </div>
    </div>
  );
};
