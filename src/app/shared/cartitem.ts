import { Topping } from './topping';
export class CartItem {
    name: string;
    baseprice: number;
    toppings: Topping[];
    extraprice: number
    subtotal: number;
}