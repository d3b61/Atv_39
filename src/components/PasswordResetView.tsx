import React, { useState } from 'react';
import { TabType } from '../types';
import { updateUserPassword } from '../utils/storage';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface PasswordResetViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const PasswordResetView: React.FC<PasswordResetViewProps> = ({
  setActiveTab,
}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword.length < 10) {
      setStatusMessage({
        type: 'error',
        text: 'A nova senha precisa ter no mínimo 10 caracteres.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({
        type: 'error',
        text: 'A confirmação de senha não confere.',
      });
      return;
    }

    const updated = updateUserPassword(email.trim(), newPassword);

    if (updated) {
      setStatusMessage({
        type: 'success',
        text: 'Senha atualizada *(^o^)* Você já pode fazer login com sua nova senha!',
      });
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } else {
      setStatusMessage({
        type: 'error',
        text: 'E-mail não encontrado na base de dados. Cadastre-se ou verifique a digitação.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-8">
      {/* Header section matching troca_senha.html */}
      <section id="hd_nv">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DBE4A9]/40">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
              Recuperação (..)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
              Troque sua senha aqui
            </h1>
          </div>
        </header>

        {/* Navigation links matching troca_senha.html */}
        <nav id="nav" className="pt-4 flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className="bot_nav px-3 py-1.5 rounded-lg bg-[#EAEFC8] text-[#1F2416] hover:bg-[#DBE4A9] font-medium transition-colors"
          >
            Tem cadastro? Aqui é o login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cadastro')}
            className="bot_nav px-3 py-1.5 rounded-lg bg-[#EAEFC8] text-[#1F2416] hover:bg-[#DBE4A9] font-medium transition-colors"
          >
            Não tem cadastro? Cadastre-se
          </button>
        </nav>
      </section>

      <main className="space-y-6">
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
              statusMessage.type === 'success'
                ? 'bg-[#EAEFC8] border border-[#DBE4A9] text-[#1F2416]'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-[#3b4c1e] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form
          id="formu"
          onSubmit={handleSubmit}
          className="bg-white border border-[#DBE4A9]/60 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
        >
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#1F2416]">
              Coloque aqui seu email de cadastro:
            </label>
            <input
              type="email"
              required
              maxLength={200}
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#1F2416]">
              Coloque aqui a nova senha (mínimo 10 caracteres):
            </label>
            <input
              type="password"
              required
              minLength={10}
              placeholder="Nova Senha!"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#1F2416]">
              Confirmar nova senha:
            </label>
            <input
              type="password"
              required
              minLength={10}
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
            />
          </div>

          <div className="pt-2">
            <button
              id="but_buy"
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-xs cursor-pointer text-center"
            >
              Enviar nova senha :)
            </button>
          </div>
        </form>
      </main>

      {/* Footer phrase from troca_senha.html */}
      <footer className="text-center">
        <div id="frase" className="text-xs text-[#5C674E]">
          Troque a senha e volte às compras!
        </div>
      </footer>
    </div>
  );
};
