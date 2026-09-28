import React, { useState } from 'react';
import { TabType, User } from '../types';
import { saveUser, setActiveUser } from '../utils/storage';
import { CheckCircle } from 'lucide-react';

interface RegisterViewProps {
  onRegisterSuccess: (user: User) => void;
  setActiveTab: (tab: TabType) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  onRegisterSuccess,
  setActiveTab,
}) => {
  const [formData, setFormData] = useState({
    input_nome: '',
    input_email: '',
    input_pass: '',
    input_passw: '',
    input_RG: '',
    input_CPF: '',
    input_CEP: '',
    input_end: '',
    input_cid: '',
    input_est: '',
    input_pais: 'Brasil',
    input_nasc: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Smart CEP lookup using ViaCEP for convenience
  const handleCepBlur = async () => {
    const cepClean = formData.input_CEP.replace(/\D/g, '');
    if (cepClean.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            input_end: data.logradouro ? `${data.logradouro}, ` : prev.input_end,
            input_cid: data.localidade || prev.input_cid,
            input_est: data.uf || prev.input_est,
          }));
        }
      } catch (err) {
        // Silently continue if offline
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation: Senhas devem conferir
    if (formData.input_pass !== formData.input_passw) {
      setErrorMsg('A confirmação de senha não confere com a senha digitada.');
      return;
    }

    if (formData.input_pass.length < 10) {
      setErrorMsg('A senha precisa ter no mínimo 10 caracteres.');
      return;
    }

    // Follows exact fields from cadastro.js
    const newUser: User = {
      nome: formData.input_nome.trim(),
      email: formData.input_email.trim(),
      senha: formData.input_pass,
      nova_senha: formData.input_passw,
      RG: formData.input_RG.trim(),
      CPF: formData.input_CPF.trim(),
      CEP: formData.input_CEP.trim(),
      endereco: formData.input_end.trim(),
      cidade: formData.input_cid.trim(),
      estado: formData.input_est.trim(),
      pais: formData.input_pais.trim(),
      data_nasc: formData.input_nasc,
      cadastradoEm: new Date().toISOString(),
    };

    const saved = saveUser(newUser);

    if (saved) {
      setActiveUser(newUser);
      onRegisterSuccess(newUser);
      setSuccessMsg('Cadastro realizado com sucesso! Muito obrigada pelo seu cadastro!');
      setTimeout(() => {
        setActiveTab('home');
      }, 1500);
    } else {
      setErrorMsg('Não foi possível salvar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      {/* Header section matching cadastro.html */}
      <section id="hd_nv">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DBE4A9]/40">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#5C674E] font-medium">
              Hora do Chá (u_u)
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F2416] font-normal">
              CADASTRO
            </h1>
          </div>

          <nav id="nav">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className="bot_nav inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EAEFC8] text-xs font-semibold text-[#1F2416] hover:bg-[#DBE4A9] transition-colors"
            >
              Tem cadastro? Aqui é o login
            </button>
          </nav>
        </header>
      </section>

      <main className="space-y-6">
        {/* Messages */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-[#EAEFC8] border border-[#DBE4A9] text-[#1F2416] text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#3b4c1e] shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Semantic Form matching cadastro.html */}
        <form
          onSubmit={handleRegister}
          className="bg-white border border-[#DBE4A9]/60 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xs"
        >
          {/* Section 1: Dados Pessoais & Senha */}
          <section className="cad_log space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DBE4A9]/30">
              <span className="w-2 h-2 rounded-full bg-[#5C674E]"></span>
              <h2 className="text-xs uppercase tracking-wider font-semibold text-[#1F2416]">
                Identificação & Acesso
              </h2>
            </div>

            <div className="space-y-1">
              <label htmlFor="input_nome" className="text-xs font-medium text-[#1F2416]">
                Nos conte seu nome:
              </label>
              <input
                id="input_nome"
                required
                type="text"
                placeholder="Nome Completo"
                maxLength={200}
                value={formData.input_nome}
                onChange={handleChange}
                className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="input_email" className="text-xs font-medium text-[#1F2416]">
                Coloque seu melhor email:
              </label>
              <input
                id="input_email"
                required
                type="email"
                placeholder="Seu email aqui"
                maxLength={200}
                value={formData.input_email}
                onChange={handleChange}
                className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="input_pass" className="text-xs font-medium text-[#1F2416]">
                  Crie sua senha com no mínimo 10 caracteres:
                </label>
                <input
                  id="input_pass"
                  required
                  type="password"
                  placeholder="Mínimo 10 caracteres"
                  minLength={10}
                  value={formData.input_pass}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="input_passw" className="text-xs font-medium text-[#1F2416]">
                  Confirme sua senha:
                </label>
                <input
                  id="input_passw"
                  required
                  type="password"
                  placeholder="Confirmando Senha"
                  minLength={10}
                  value={formData.input_passw}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Documentos & Endereço */}
          <section className="cad_log space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DBE4A9]/30">
              <span className="w-2 h-2 rounded-full bg-[#5C674E]"></span>
              <h2 className="text-xs uppercase tracking-wider font-semibold text-[#1F2416]">
                Documentos & Localização
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="input_RG" className="text-xs font-medium text-[#1F2416]">
                  Informe seu RG:
                </label>
                <input
                  id="input_RG"
                  required
                  type="text"
                  placeholder="RG com Dígito"
                  minLength={9}
                  value={formData.input_RG}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="input_CPF" className="text-xs font-medium text-[#1F2416]">
                  Informe seu CPF:
                </label>
                <input
                  id="input_CPF"
                  required
                  type="text"
                  placeholder="CPF completo"
                  minLength={11}
                  value={formData.input_CPF}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="input_CEP" className="text-xs font-medium text-[#1F2416]">
                  Informe seu CEP (8 dígitos):
                </label>
                {loadingCep && (
                  <span className="text-[11px] text-[#5C674E] animate-pulse">Buscando endereço...</span>
                )}
              </div>
              <input
                id="input_CEP"
                required
                type="text"
                placeholder="Código Postal aqui (ex: 01310100)"
                minLength={8}
                maxLength={8}
                value={formData.input_CEP}
                onChange={handleChange}
                onBlur={handleCepBlur}
                className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="input_end" className="text-xs font-medium text-[#1F2416]">
                Coloque seu Endereço:
              </label>
              <input
                id="input_end"
                required
                type="text"
                placeholder="Seu endereço com número e complemento"
                maxLength={200}
                value={formData.input_end}
                onChange={handleChange}
                className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
              />
            </div>
          </section>

          {/* Section 3: Cidade, Estado, País e Data de Nascimento */}
          <section className="cad_log space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DBE4A9]/30">
              <span className="w-2 h-2 rounded-full bg-[#5C674E]"></span>
              <h2 className="text-xs uppercase tracking-wider font-semibold text-[#1F2416]">
                Região & Nascimento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="input_cid" className="text-xs font-medium text-[#1F2416]">
                  Sua Cidade:
                </label>
                <input
                  id="input_cid"
                  required
                  type="text"
                  placeholder="Sua Cidade"
                  maxLength={200}
                  value={formData.input_cid}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="input_est" className="text-xs font-medium text-[#1F2416]">
                  Estado:
                </label>
                <input
                  id="input_est"
                  required
                  type="text"
                  placeholder="Seu Estado"
                  maxLength={200}
                  value={formData.input_est}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="input_pais" className="text-xs font-medium text-[#1F2416]">
                  País:
                </label>
                <input
                  id="input_pais"
                  required
                  type="text"
                  placeholder="Seu País"
                  maxLength={200}
                  value={formData.input_pais}
                  onChange={handleChange}
                  className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="input_nasc" className="text-xs font-medium text-[#1F2416]">
                Nos conte sua data de nascimento:
              </label>
              <input
                id="input_nasc"
                required
                type="date"
                value={formData.input_nasc}
                onChange={handleChange}
                className="inp_dat w-full px-4 py-2.5 rounded-xl border border-[#DBE4A9]/70 bg-white text-[#1F2416] text-sm focus:outline-none focus:ring-2 focus:ring-[#DBE4A9]"
              />
            </div>

            <div className="pt-4">
              <button
                id="but_buy"
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#DBE4A9] hover:bg-[#c8d390] text-[#1F2416] font-semibold text-sm transition-all shadow-xs cursor-pointer text-center"
              >
                Envie o Cadastro
              </button>
            </div>
          </section>
        </form>
      </main>

      {/* Footer phrase from cadastro.html */}
      <footer className="text-center">
        <div id="frase" className="text-xs text-[#5C674E]">
          Muito Obrigada pelo seu cadastro!
        </div>
      </footer>
    </div>
  );
};
