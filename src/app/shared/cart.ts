import { CartItem } from './cartitem';

export class Cart {
    id: string;
    user: string;
    cartitems: CartItem[];
    grand_total: 0;
}