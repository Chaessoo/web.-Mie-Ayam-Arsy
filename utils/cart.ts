
import { MenuItem } from '../types';

export interface CartItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  option?: string;
}

const CART_KEY = 'arsy_cart';

export const cartStorage = {
  getCart: (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  addToCart: (item: MenuItem, option?: string) => {
    console.log('addToCart called with:', item.name, option);
    const cart = cartStorage.getCart();
    console.log('Current cart before add:', cart);
    const existingIndex = cart.findIndex(i => i.menuId === item.id && i.option === option);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
      console.log('Increased quantity for existing item');
    } else {
      cart.push({
        menuId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        option
      });
      console.log('Added new item to cart');
    }
    cartStorage.saveCart(cart);
    console.log('Cart after save:', cartStorage.getCart());
  },
  clearCart: () => {
    localStorage.removeItem(CART_KEY);
  }
};
