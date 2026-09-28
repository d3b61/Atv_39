import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickBuy?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickBuy,
}) => {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#DBE4A9]/50 rounded-xl overflow-hidden hover:border-[#DBE4A9] transition-all hover:shadow-md">
      {/* Product Image Slot (65-75% visual weight, neutral backdrop) */}
      <div className="relative aspect-[4/3] w-full bg-[#FAFAF8] overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.nome}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#EAEFC8]/30 text-center">
            <span className="font-serif text-lg text-[#1F2416]">{product.nome}</span>
            <span className="text-xs text-[#5C674E] mt-1">Hora do Chá Seleção</span>
          </div>
        )}

        {/* Category subtle unboxed text */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-medium uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#1F2416] px-2.5 py-1 rounded border border-[#DBE4A9]/40">
            {product.categoria === 'xicaras' ? 'Jogo Exclusivo' : 'Biscoito Artesanal'}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1F2416] leading-snug">
            {product.nome}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C674E] leading-relaxed line-clamp-3">
            {product.descricao}
          </p>
          {product.detalhes && (
            <p className="text-[11px] text-[#5C674E]/80 italic">
              {product.detalhes}
            </p>
          )}
        </div>

        {/* Pricing & CTA Module */}
        <div className="pt-3 border-t border-[#DBE4A9]/30 space-y-3">
          <div>
            <div className="text-lg sm:text-xl font-semibold tabular-nums text-[#1F2416]">
              {product.valorFormatado}
            </div>
            {product.condicoes && (
              <div className="text-[11px] text-[#5C674E] leading-tight mt-0.5">
                {product.condicoes}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                added
                  ? 'bg-[#DBE4A9] text-[#1F2416] font-semibold'
                  : 'bg-[#EAEFC8] hover:bg-[#DBE4A9] text-[#1F2416]'
              }`}
              aria-label={`Adicionar ${product.nome} à cesta`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1F2416]" />
                  <span>Adicionado</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>+ Cesta</span>
                </>
              )}
            </button>

            <button
              onClick={() => onQuickBuy && onQuickBuy(product)}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] transition-colors cursor-pointer text-center"
            >
              Compre Aqui
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
