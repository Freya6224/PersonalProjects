import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/Services/store.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy{

  //@Input() product: Product | undefined;
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeService: StoreService){};

  ngOnInit(): void 
  {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((response) => {this.categories = response;});
  }

  onShowCategory(category: string):void
  {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void 
  {
    if(this.categoriesSubscription)
    {
      this. categoriesSubscription.unsubscribe();
    }
  }
}