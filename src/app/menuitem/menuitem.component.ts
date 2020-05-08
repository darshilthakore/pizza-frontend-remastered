import { Component, OnInit, Input } from '@angular/core';
import { Topping } from '../shared/topping';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/cartitem';


@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss']
})
export class MenuitemComponent implements OnInit {
  @Input() category;
  @Input() item;
  @Input() toppings;
  public chosenToppingPrice = 0;
  public chosenSizePrice = 0;
  public selected = 0;
  public selectedToppings: Topping[] = [];

  cartitems: CartItem[];


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    if (this.item.price_large == 0) {
      this.selected = this.item.price_small;      
    } else {
      this.selected = this.item.price_large;
    }

    this.chosenSizePrice = this.selected;

    // this.loadCart();
  }

  onToppingSelect(event) {
    console.log(event.value);
    this.chosenToppingPrice = 0;
    var i;
    for (i of event.value) {
      this.chosenToppingPrice += i.rate;
    }
    // this.chosenToppingPrice += 
    console.log(this.chosenToppingPrice);
  }

  onSizeSelect(event) {
    console.log(event.value);
    this.chosenSizePrice = event.value;

  }

  // loadCart() {
  //   this.cartitems = this.cartService.getItems();
  //   console.log("loading cart");
  //   console.log(this.cartitems);
  // }

  addToCart() {
    console.log("Item Name:", this.item.name);
    console.log("selected toppings:", this.selectedToppings);
    console.log("selected size price:", this.selected);
    let newCartItem = new CartItem();
    newCartItem.name = this.item.name;
    newCartItem.baseprice = this.chosenSizePrice;
    newCartItem.extraprice = this.chosenToppingPrice;
    newCartItem.toppings = this.selectedToppings;
    newCartItem.total = newCartItem.baseprice + newCartItem.extraprice;
    newCartItem.total *= newCartItem.quantity;
    // this.cartitems.push(newCartItem);

    this.cartService.addToCart(newCartItem);
    console.log("adding item to cart");
    // console.log(this.cartitems);
    this.cartService.getItems()
      .subscribe(response => {
        console.log("Response in menuitem comp:",response);
      })
    
      this.cartService.mysubject.next('Data Changed');




    // this.cartService.addItemToCart()
  }

}
