
// Fixed: Imported MenuItem, Order, and Testimonial types from the correct types.ts file instead of constants.tsx.
import { MenuItem, Order, Testimonial } from '../types';
import { INITIAL_MENU, INITIAL_TESTIMONIALS } from '../constants';

const KEYS = {
  MENU: 'arsy_menu',
  ORDERS: 'arsy_orders',
  TESTIMONIALS: 'arsy_testimonials',
  AUTH: 'arsy_auth'
};

export const storage = {
  getMenu: (): MenuItem[] => {
    const data = localStorage.getItem(KEYS.MENU);
    return data ? JSON.parse(data) : INITIAL_MENU;
  },
  saveMenu: (menu: MenuItem[]) => {
    localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
  },
  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },
  getTestimonials: (): Testimonial[] => {
    const data = localStorage.getItem(KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : INITIAL_TESTIMONIALS;
  },
  saveTestimonials: (testimonials: Testimonial[]) => {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },
  getAuth: () => {
    const data = localStorage.getItem(KEYS.AUTH);
    return data ? JSON.parse(data) : { isAuthenticated: false, user: null };
  },
  setAuth: (auth: { isAuthenticated: boolean; user: string | null }) => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(auth));
  }
};