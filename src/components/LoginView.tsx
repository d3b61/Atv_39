import React, { useState } from 'react';
import { TabType, User } from '../types';
import { getSavedUsers, setActiveUser } from '../utils/storage';
import { ArrowLeft, User as UserIcon, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  currentUser,
  onLoginSuccess,
  onLogout,
  setActiveTab,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Recupera a lista do localStorage conforme login.js
    const usuariosSalvos = getSavedUsers();

    // 2. Procura por um usuário com o mesmo e-mail e senha
    const usuarioEncontrado = usuariosSalvos.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        (user.senha === password || user.nova_senha === password)
    );

    // 3. Se encontrar, salva login e redireciona; se não, mostra erro
    if (usuarioEncontrado) {
      setSuccessMessage(`Login realizado com sucesso! Bem-vindo(a), ${usuarioEncontrado.nome}`);
      setActiveUser(usuarioEncontrado);
      onLoginSuccess(usuarioEncontrado);
      setTimeout(() => {
        setActiveTab('home');
      }, 1200);
    } else {
      setErrorMessage(
        usuariosSalvos.length === 0
          ? 'Nenhum usuário cadastrado ainda. Clique em "Não tenho cadastro" abaixo para se registrar.'
          : 'E-mail ou senha incorretos. Verifique suas credenciais.'
      );
    }
  };

  // If already logged in, show user profile details
  if (currentUser) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 space-y-8">
        <header className="flex items-center justify-between pb-6 border-b border-[#DBE4A9]/40">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
              Sessão Ativa
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
              Minha Conta
            </h1>
          </div>
          <button
            onClick={() => setActiveTab('home')}
            className="text-xs text-[#5C674E] hover:text-[#1F2416] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ir para Início</span>
          </button>
        </header>

        <section className="bg-white border border-[#DBE4A9]/60 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#EAEFC8] flex items-center justify-center text-[#5C674E]">
              <UserIcon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1F2416]">{currentUser.nome}</h2>
              <p className="text-xs text-[#5C674E]">{currentUser.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-[#DBE4A9]/30">
            <div>
              <span className="text-[#5C674E] block">CPF:</span>
              <span className="font-medium text-[#1F2416]">{currentUser.CPF || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-[#5C674E] block">RG:</span>
              <span className="font-medium text-[#1F2416]">{currentUser.RG || 'Não informado'}</span>
            </div>
            <div>
              <span className="text-[#5C674E] block">Cidade / Estado:</span>
              <span className="font-medium text-[#1F2416]">
                {currentUser.cidade ? `${currentUser.cidade} - ${currentUser.estado}` : 'Não informado'}
              </span>
            </div>
            <div>
              <span className="text-[#5C674E] block">Endereço:</span>
              <span className="font-medium text-[#1F2416]">{currentUser.endereco || 'Não informado'}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveTab('produtos')}
              className="flex-1 py-3 px-4 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              Continuar Comprando
            </button>
            <button
              onClick={onLogout}
              className="py-3 px-4 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Conta</span>
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-8">
      {/* Header bar matching login.html */}
      <header className="flex items-center justify-between pb-6 border-b border-[#DBE4A9]/40">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
            Acesso ao Sistema
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
            LOGIN
          </h1>
        </div>

        <nav>
          <button
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAEFC8] text-xs font-semibold text-[#1F2416] hover:bg-[#DBE4A9] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>HOME</span>
          </button>
        </nav>
      </header>

      <main className="space-y-6">
        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-[#EAEFC8] border border-[#DBE4A9] text-[#1F2416] text-xs flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#3b4c1e]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form matching login.html */}
        <section className="bg-white border border-[#DBE4A9]/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="e_mail" className="block text-xs font-medium text-[#1F2416]">
                Entre com email:
              </label>
              <input
                id="e_mail"
                type="email"
                required
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Coloque seu email"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] placeholder:text-[#5C674E]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="pass_word" className="block text-xs font-medium text-[#1F2416]">
                Senha (mínimo 10 caracteres):
              </label>
              <input
                id="pass_word"
                type="password"
                required
                minLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Coloque sua senha"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] placeholder:text-[#5C674E]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9] transition-all"
              />
            </div>

            <button
              id="but_buy"
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-xs cursor-pointer text-center"
            >
              Seja bem-vindo(a)
            </button>
          </form>

          {/* Navigation links matching login.html */}
          <nav
            id="nav"
            className="pt-4 border-t border-[#DBE4A9]/30 flex flex-col sm:flex-row gap-2.5 text-center text-xs"
          >
            <button
              type="button"
              onClick={() => setActiveTab('troca_senha')}
              className="flex-1 py-2 px-3 rounded-lg bg-[#EAEFC8]/50 hover:bg-[#EAEFC8] text-[#1F2416] transition-colors"
            >
              Esqueci a senha
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cadastro')}
              className="flex-1 py-2 px-3 rounded-lg bg-[#EAEFC8]/50 hover:bg-[#EAEFC8] text-[#1F2416] transition-colors"
            >
              Não tenho cadastro
            </button>
          </nav>
        </section>
      </main>

      {/* Footer phrase from login.html */}
      <footer className="text-center">
        <div id="frase" className="text-xs text-[#5C674E]">
          Entre com sua conta para realizar suas compras!
        </div>
      </footer>
    </div>
  );
};
