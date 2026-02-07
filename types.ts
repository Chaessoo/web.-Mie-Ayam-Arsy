
export type Category = 'Makanan' | 'Minuman';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  options?: string[]; // e.g., ["Level 1", "Level 2"] or ["Hot", "Ice"]
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
  approved: boolean;
}

export type OrderStatus = 'Menunggu' | 'Diproses' | 'Selesai';

export interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  address: string;
  items: {
    menuId: string;
    name: string;
    quantity: number;
    price: number;
    option?: string;
  }[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}
