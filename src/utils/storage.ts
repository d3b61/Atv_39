import { CartItem, Order, User } from '../types';

const USERS_KEY = 'usuarios';
const ACTIVE_USER_KEY = 'usuario_ativo';
const CART_KEY = 'hora_do_cha_carrinho';
const LAST_ORDER_KEY = 'hora_do_cha_ultimo_pedido';

export const getSavedUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Erro ao ler usuários:', error);
    return [];
  }
};

export const saveUser = (newUser: User): boolean => {
  try {
    const users = getSavedUsers();
    // Check if user with same email exists
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...newUser };
    } else {
      users.push(newUser);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
};

export const updateUserPassword = (email: string, novaSenha: string): boolean => {
  try {
    const users = getSavedUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex >= 0) {
      users[userIndex].senha = novaSenha;
      users[userIndex].nova_senha = novaSenha;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return false;
  }
};

export const getActiveUser = (): User | null => {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setActiveUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch (error) {
    console.error('Erro ao definir usuário ativo:', error);
  }
};

export const getSavedCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};

export const getLastOrder = (): Order | null => {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setLastOrder = (order: Order): void => {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch (error) {
    console.error('Erro ao salvar último pedido:', error);
  }
};
