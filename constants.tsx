
import React from 'react';

import { MenuItem, Testimonial } from './types';

export const COLORS = {
  primary: '#FBBF24', // Amber-400 (Yellow)
  secondary: '#78350F', // Brown-900
  accent: '#B45309', // Amber-700
  light: '#FFFBEB', // Amber-50
  white: '#FFFFFF',
};

export const ADMIN_CREDENTIALS = {
  username: 'akhdan123crew',
  password: 'Rondom675',
};

export const WHATSAPP_NUMBER = '081413535650';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Mie Ayam Original',
    price: 15000,
    description: 'Mie ayam klasik dengan bumbu rahasia Arsy dan topping ayam melimpah.',
    category: 'Makanan',
    image: 'https://images.tokopedia.net/img/KRMmCm/2022/8/15/a4b7d013-9438-46b2-906b-4c374ec82236.jpg',
  },
  {
    id: '2',
    name: 'Mie Ayam Bakso',
    price: 20000,
    description: 'Mie ayam original ditambah dengan bakso sapi kenyal.',
    category: 'Makanan',
    image: 'https://asset.kompas.com/crops/ch0yi1w4X2Ss1c8R84Al838WNa8=/0x0:1000x667/1200x800/data/photo/2022/04/29/626b9789cdf4e.jpg',
  },
  {
    id: '3',
    name: 'Mie Ayam Pangsit',
    price: 18000,
    description: 'Mie ayam dengan tambahan pangsit goreng renyah atau pangsit rebus lembut.',
    category: 'Makanan',
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/99/MTA-7900747/bakmi-oma-lian_bakmi-oma-lian_full01.jpg',
  },
  {
    id: '4',
    name: 'Mie Jebew',
    price: 17000,
    description: 'Mie pedas dengan bumbu chili oil khas Arsy yang nagih banget.',
    category: 'Makanan',
    image: 'https://img-global.cpcdn.com/recipes/29fd46b130c758a1/1200x630cq70/photo.jpg',
    options: ['Level 1', 'Level 2', 'Level 3']
  },
  {
    id: '5',
    name: 'Mie Pedazo',
    price: 19000,
    description: 'Mie super pedas bagi pecinta tantangan ekstrem.',
    category: 'Makanan',
    image: 'https://cdn.idntimes.com/content-images/post/20220705/108316953-1503393646529728-5337680339707599378-n-9250b4659458d4a3e63e023db04661fa.jpg',
    options: ['Level Keles', 'Level Woles', 'Level Super Hot']
  },
  {
    id: '6',
    name: 'Es Teh',
    price: 5000,
    description: 'Segarnya teh pilihan untuk melepas dahaga.',
    category: 'Minuman',
    image: 'https://nilaigizi.com/assets/images/produk/produk_1578041377.jpg',
    options: ['Es', 'Panas']
  },
  {
    id: '7',
    name: 'Es Teh Tarik',
    price: 10000,
    description: 'Perpaduan teh dan susu yang ditarik hingga berbusa.',
    category: 'Minuman',
    image: 'https://2.bp.blogspot.com/-xxKlM841XPA/WJ6gm0pJbvI/AAAAAAAAAJ4/rHKNvw0hwbIQkUS2ikyWynXqizFjfGyWACLcB/s1600/5d568e5e31714982aced52cf345cd28e.jpg',
    options: ['Es', 'Panas']
  },
  {
    id: '8',
    name: 'Es Jeruk Nutrisari',
    price: 7000,
    description: 'Kesegaran sari jeruk yang kaya vitamin C.',
    category: 'Minuman',
    image: 'https://goldenlamian.com/assets/img/items/drinkanddesserts/menu-drinkanddesserts-esjeruk.png',
  },
  {
    id: '9',
    name: 'Mie Ayam Spesial',
    price: 18000,
    description: 'Mie ayam dengan topping pangsit 1 dan baso 1.',
    category: 'Makanan',
    image: 'https://asset.kompas.com/crops/0UaKVhdG8uQRDiCMh3a9qBJpBPY=/0x0:1000x667/750x500/data/photo/2021/03/26/605d538c24900.jpeg',
  },
  {
    id: '10',
    name: 'Mie Ayam Super Spesial',
    price: 20000,
    description: 'Mie ayam dengan topping super spesial dan bumbu premium.',
    category: 'Makanan',
    image: 'https://ik.imagekit.io/nibble/public/uploads/mie_ayam_ari_karep_c2cf392ec7_20MzunBe0.jfif',
  },
  {
    id: '11',
    name: 'Pangsit Rebus Spesial',
    price: 15000,
    description: 'Pangsit rebus dengan isian spesial dan kuah kaldu.',
    category: 'Makanan',
    image: 'https://1.bp.blogspot.com/-tAS2KTpaqTw/VGtcXyOM1xI/AAAAAAAAASs/DYTF1A6jhk4/s1600/IMG_0406.JPG',
  },
  {
    id: '12',
    name: 'Pangsit Rebus Biasa',
    price: 12000,
    description: 'Pangsit rebus klasik dengan kuah sederhana.',
    category: 'Makanan',
    image: 'https://1.bp.blogspot.com/-AVijDT5djtI/Xd1jjIypZQI/AAAAAAAACBU/DYU8YBMwPW4leEvd0E4k3TbZEItAzSBAQCLcBGAsYHQ/s640/Screenshot_3.png',
  },
  {
    id: '13',
    name: 'Bakso Polos',
    price: 10000,
    description: 'Bakso sapi polos tanpa tambahan.',
    category: 'Makanan',
    image: 'https://i.pinimg.com/originals/0d/c1/ce/0dc1ce3f9f122a0088c20feec16679c5.png',
  },
  {
    id: '14',
    name: 'Mie Yamin Original',
    price: 16000,
    description: 'Mie Yamin klasik dengan bumbu asli.',
    category: 'Makanan',
    image: 'https://img.qraved.co/v2/image/data/2017/03/07/mieayam_cover_2-640x426-x.jpg',
  },
  {
    id: '15',
    name: 'Mie Yamin Bakso',
    price: 21000,
    description: 'Mie Yamin dengan tambahan bakso.',
    category: 'Makanan',
    image: 'https://imgsrv2.paragram.id/xduxNNtl5JbBXDcZIAf-m2op0OM=/smart/filters:strip_icc():quality(80):format(jpeg)/entries/2022-12/16/42919-1-942fc9a24f69264cc10c17d722828b1a.jpg',
  },
  {
    id: '16',
    name: 'Mie Yamin Pangsit',
    price: 19000,
    description: 'Mie Yamin dengan tambahan pangsit.',
    category: 'Makanan',
    image: 'https://img-global.cpcdn.com/recipes/a3ea98c7d9163d50/680x482cq70/mie-yamin-mie-ayam-kering-foto-resep-utama.jpg',
  },
  {
    id: '17',
    name: 'Mie Yamin Spesial',
    price: 22000,
    description: 'Mie Yamin dengan topping spesial.',
    category: 'Makanan',
    image: '/mie yamin spesial.jpeg',
  },
  {
    id: '18',
    name: 'Mie Yamin Super Spesial',
    price: 25000,
    description: 'Mie Yamin dengan topping super spesial.',
    category: 'Makanan',
    image: 'https://cdn0-production-images-kly.akamaized.net/SAAaE9di7SBwD-QpbQKlRyvdkIk=/0x0:1000x563/1200x675/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3291970/original/095962400_1604981057-shutterstock_1827452876.jpg',
  },
  {
    id: '19',
    name: 'Es Good Day',
    price: 8000,
    description: 'Minuman Good Day yang menyegarkan.',
    category: 'Minuman',
    image: 'https://1.bp.blogspot.com/-0vakR6a75-0/V3TIBnfJ0EI/AAAAAAAABCg/CLNlEWaKZY4bkayiyz4upwMenvx4VOE0QCLcB/s1600/iced-coffee.jpg',
    options: ['Ice', 'Panas']
  },
  {
    id: '20',
    name: 'Es Milo',
    price: 9000,
    description: 'Minuman Milo yang energik.',
    category: 'Minuman',
    image: 'https://burgerking.com.my/upload/image/Product/28/Ice%20Milo.png',
    options: ['Ice', 'Panas']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    comment: 'Mie Ayam paling enak di daerah sini! Porsinya banyak dan ayamnya kerasa banget.',
    rating: 5,
    date: '2024-03-20',
    approved: true
  },
  {
    id: 't2',
    name: 'Siti Aminah',
    comment: 'Mie Jebew level 3 beneran bikin berkeringat tapi nagih parah.',
    rating: 4,
    date: '2024-03-18',
    approved: true
  }
];
