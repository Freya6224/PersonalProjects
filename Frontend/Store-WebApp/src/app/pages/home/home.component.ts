import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/Services/cart.service';
import { StoreService } from 'src/app/Services/store.service';
import { Product } from 'src/app/models/product.model';

const ROWS_HEIGHT: {[id: number]: number} = {1:400, 3:335, 4:350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService){}

  ngOnInit(): void 
  {
    this.getProducts();

  }

  getProducts(): void
  {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => 
    {
      this.products = _products;
    });
  }

  onColumnsCountChnage(colsNum: number): void
  {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string):void
  {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void
  {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
    
  }

  onItemsCountChange(newCount: number): void{
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string):void
  {
    this.sort=newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productSubscription)
    {
      this.productSubscription.unsubscribe();
    }
  }
}
