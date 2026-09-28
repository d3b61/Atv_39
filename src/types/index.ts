export type TabType = 'home' | 'produtos' | 'cesta' | 'login' | 'cadastro' | 'troca_senha' | 'finalizacao';

export interface Product {
  id: string;
  nome: string;
  categoria: 'xicaras' | 'biscoitos';
  descricao: string;
  detalhes?: string;
  valor: number; // numeric value for calculations (e.g. 318.42)
  valorFormatado: string; // "R$ 318,42"
  condicoes?: string; // "à vista com 27% OFF ou em 6x de R$ 55,86 sem juros"
  image: string;
  fallbackColor?: string;
}

export interface CartItem {
  product: Product;
  quantidade: number;
}

export interface User {
  nome: string;
  email: string;
  senha: string;
  nova_senha?: string;
  RG: string;
  CPF: string;
  CEP: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  data_nasc: string;
  cadastradoEm?: string;
}

export interface Order {
  id: string; // e.g. "13422"
  itens: CartItem[];
  subtotal: number;
  frete: number;
  total: number;
  emailCliente: string;
  data: string;
}
