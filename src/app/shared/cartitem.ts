import { Topping } from './topping';
export class CartItem {
    id: string;
    name: string;
    baseprice: number;
    toppings: Topping[];
    extraprice: number
    quantity: number;
    total: number;
}