/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartItem, Order, Product, TabType, User } from './types';
import {
  getActiveUser,
  getSavedCart,
  getLastOrder,
  saveCart,
  setActiveUser,
  setLastOrder,
} from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CartView } from './components/CartView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { PasswordResetView } from './components/PasswordResetView';
import { CheckoutView } from './components/CheckoutView';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [cart, setCart] = useState<CartItem[]>(() => getSavedCart());
  const [currentUser, setCurrentUser] = useState<User | null>(() => getActiveUser());
  const [lastOrder, setOrderState] = useState<Order | null>(() => getLastOrder());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart changes to localStorage
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantidade, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantidade: item.quantidade + quantity }
            : item
        );
      }
      return [...prev, { product, quantidade: quantity }];
    });
    setToastMessage(`"${product.nome}" adicionado à cesta!`);
  };

  const handleQuickBuy = (product: Product) => {
    handleAddToCart(product, 1);
    setActiveTab('cesta');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, quantidade: number) => {
    if (quantidade <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantidade } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.product.valor * item.quantidade,
      0
    );
    const frete = subtotal > 150 || subtotal === 0 ? 0 : 25.0;
    const total = subtotal + frete;

    const newOrder: Order = {
      id: (13420 + Math.floor(Math.random() * 20)).toString(),
      itens: [...cart],
      subtotal,
      frete,
      total,
      emailCliente: currentUser ? currentUser.email : 'cliente@horadocha.com.br',
      data: new Date().toLocaleDateString('pt-BR'),
    };

    setLastOrder(newOrder);
    setOrderState(newOrder);
    setCart([]);
    setActiveTab('finalizacao');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setActiveUser(null);
    setCurrentUser(null);
    setToastMessage('Sessão encerrada com sucesso.');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setToastMessage(`Bem-vindo(a) de volta, ${user.nome.split(' ')[0]}!`);
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUser(user);
    setToastMessage(`Cadastro efetuado! Seja muito bem-vindo(a), ${user.nome.split(' ')[0]}.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2416]">
      {/* Horizontal Nav Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Semantic Content */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {(activeTab === 'home' || activeTab === 'produtos') && (
          <HomeView
            onAddToCart={handleAddToCart}
            onQuickBuy={handleQuickBuy}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'cesta' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            setActiveTab={setActiveTab}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {activeTab === 'login' && (
          <LoginView
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'cadastro' && (
          <RegisterView
            onRegisterSuccess={handleRegisterSuccess}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'troca_senha' && (
          <PasswordResetView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'finalizacao' && (
          <CheckoutView
            order={lastOrder}
            setActiveTab={setActiveTab}
            onResetOrder={() => setOrderState(null)}
          />
        )}
      </main>

      {/* Semantic Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Action Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          onViewCart={
            activeTab !== 'cesta' && cart.length > 0
              ? () => {
                  setActiveTab('cesta');
                  setToastMessage(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
