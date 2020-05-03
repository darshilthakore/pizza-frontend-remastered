import { Component, OnInit, Input } from '@angular/core';


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
  public selected;
  constructor() { }

  ngOnInit(): void {
    this.selected = this.item.price_large;
    this.chosenSizePrice = this.selected;
  }

  onToppingSelect(event) {
    console.log(event.value);
    this.chosenToppingPrice = 0;
    var i;
    for (i of event.value) {
      this.chosenToppingPrice += i;
    }
    // this.chosenToppingPrice += 
    console.log(this.chosenToppingPrice);
  }

  onSizeSelect(event) {
    console.log(event.value);
    this.chosenSizePrice = event.value;

  }

}
