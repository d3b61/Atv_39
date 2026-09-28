import React, { useState } from 'react';
import { Product, TabType } from '../types';
import { HERO_IMAGE, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowUpRight, Coffee, Cookie, Leaf } from 'lucide-react';

interface HomeViewProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickBuy: (product: Product) => void;
  setActiveTab: (tab: TabType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onAddToCart,
  onQuickBuy,
  setActiveTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'xicaras' | 'biscoitos'>('all');

  const xicaras = PRODUCTS.filter((p) => p.categoria === 'xicaras');
  const biscoitos = PRODUCTS.filter((p) => p.categoria === 'biscoitos');

  const filteredProducts =
    filter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoria === filter);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. HERO SECTION (1 bold campaign focal point) */}
      <section
        aria-label="Destaque da loja"
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DBE4A9]/40 bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[520px]">
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5C674E]">
              <Leaf className="w-3.5 h-3.5 text-[#5C674E]" />
              <span>Hora do Chá · Curadoria 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2416] tracking-tight leading-[1.15]">
              Xícaras finas, chás puros e biscoitos que confortam a alma.
            </h1>

            <p className="text-sm sm:text-base text-[#5C674E] leading-relaxed max-w-xl">
              Um convite diário para desacelerar. Peças vintage e artesanais de porcelana, vidros orientais soprados e biscoitos preparados com ingredientes naturais.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('vitrine-produtos');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-sm cursor-pointer"
              >
                Explorar Vitrine
              </button>

              <a
                href="https://www.belaherbal.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#EAEFC8] hover:bg-[#DBE4A9]/60 text-[#1F2416] font-medium text-sm transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Conheça a Bela Herbal</span>
                <ArrowUpRight className="w-4 h-4 text-[#5C674E]" />
              </a>
            </div>

            {/* Micro proof note */}
            <div className="pt-4 flex items-center gap-2 text-xs text-[#5C674E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C674E]"></span>
              <span>Embalagens seguras para porcelanas e envio express</span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-[#FAFAF8]">
            <img
              src={HERO_IMAGE}
              alt="Ritual do Chá com bule cerâmico e xícara de porcelana"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Soft decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
      </section>

      {/* 2. RECOMENDAÇÕES MENSAIS & CURADORIA BELA HERBAL */}
      <section
        aria-label="Recomendações e Parceria"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Banner 1: Monthly Recommendations */}
        <article className="p-8 rounded-2xl bg-white border border-[#DBE4A9]/50 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C674E]">
              Novidades da Estação
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2416] font-medium leading-snug">
              Aqui você encontra novos produtos e recomendações para você todos os meses
            </h2>
            <p className="text-xs sm:text-sm text-[#5C674E] leading-relaxed">
              Renovamos nossa prateleira com jogos exclusivos pintados à mão, peças de colecionador e receitas frescas de biscoitos finos.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('vitrine-produtos');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F2416] underline underline-offset-4 hover:text-[#5C674E] transition-colors"
            >
              Ver prateleira do mês ↓
            </button>
          </div>
        </article>

        {/* Banner 2: Bela Herbal Tea Curation */}
        <article className="p-8 rounded-2xl bg-[#EAEFC8]/40 border border-[#DBE4A9]/60 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C674E]">
              Harmonização
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2416] font-medium leading-snug">
              Curadoria de chás naturais e orgânicos
            </h2>
            <p className="text-xs sm:text-sm text-[#5C674E] leading-relaxed">
              Para acompanhar nossas xícaras e biscoitos, recomendamos as infusões puras de camomila, hortelã, flores e especiarias da Bela Herbal.
            </p>
          </div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.belaherbal.com.br/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-xs transition-colors"
            >
              <span>Conheça o site Bela Herbal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      </section>

      {/* 3. VITRINE / PRATELEIRA DE PRODUTOS */}
      <section id="vitrine-produtos" aria-label="Vitrine de Produtos" className="space-y-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#DBE4A9]/40">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
              Prateleira Exclusiva
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
              Jogos de Xícaras & Biscoitos Refinados
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EAEFC8]/50 border border-[#DBE4A9]/40 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-[#1F2416] shadow-xs font-semibold'
                  : 'text-[#5C674E] hover:text-[#1F2416]'
              }`}
            >
              Todos (6)
            </button>
            <button
              onClick={() => setFilter('xicaras')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'xicaras'
                  ? 'bg-white text-[#1F2416] shadow-xs font-semibold'
                  : 'text-[#5C674E] hover:text-[#1F2416]'
              }`}
            >
              Jogos de Xícaras (3)
            </button>
            <button
              onClick={() => setFilter('biscoitos')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'biscoitos'
                  ? 'bg-white text-[#1F2416] shadow-xs font-semibold'
                  : 'text-[#5C674E] hover:text-[#1F2416]'
              }`}
            >
              Biscoitos (3)
            </button>
          </div>
        </div>

        {/* If 'all' is selected, render editorial category sections with specific titles */}
        {filter === 'all' ? (
          <div className="space-y-16">
            {/* Shelf 1: Jogos de xícaras exclusivos */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-[#5C674E]" />
                <h3 className="font-serif text-2xl text-[#1F2416] font-medium">
                  Jogos de Xícaras Exclusivos
                </h3>
                <div className="h-px flex-1 bg-[#DBE4A9]/40"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {xicaras.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={onAddToCart}
                    onQuickBuy={onQuickBuy}
                  />
                ))}
              </div>
            </div>

            {/* Shelf 2: Biscoitos refinados */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Cookie className="w-5 h-5 text-[#5C674E]" />
                <h3 className="font-serif text-2xl text-[#1F2416] font-medium">
                  Biscoitos Refinados
                </h3>
                <div className="h-px flex-1 bg-[#DBE4A9]/40"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {biscoitos.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={onAddToCart}
                    onQuickBuy={onQuickBuy}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={onAddToCart}
                onQuickBuy={onQuickBuy}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
