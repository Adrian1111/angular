import { Component, OnInit } from '@angular/core';

import { Product } from '../_models/index';
import { ProductService } from '../_services/index';
import 'style-loader!./products.scss';

@Component({
    moduleId: module.id,
    templateUrl: 'products.html'
})

export class ProductsComponent implements OnInit {
    products: Product[] = [];
    clickedUser: Product;
    addProduct: Product = {
    productID: null,
    name: "",
    price: null,
    description: ""
  };
    name: string;
    price: number;
    description: string;

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.productService.getProducts()
        .subscribe(products => {
          this.products = products;
      });
    }

    clickToEdit(id: number){
      this.productService.getProduct(id)
        .subscribe(user => {
          if(this.clickedUser){
            this.clickedUser = null;
          } else {
            this.clickedUser = user;
          }
      });
    }

    modifyProductSave(productID, name, price, description){
    let model = {
        productID:null,
        name:"",
        price: null,
        description: ""
    };
    model.productID = productID;
    model.name = name;
    model.price = price;
    model.description = description;

    this.productService.modifyProduct( model)
      .subscribe(response => {
      });
    this.clickToEdit(productID);

    }

    addNewProduct(productID, name, price, description){
      let model = {
          name:"",
          price: null,
          description: ""
      };
      model.name = name;
      model.price = price;
      model.description = description;

      this.productService.addNewProduct( model)
        .subscribe(response => {
          location.reload();
      });
    }

    onEvent(event) {
       event.stopPropagation();
    }

  onRemove(id: number, event: any) {
    event.stopPropagation();
    if (confirm('Are you sure you want to remove this product from database?')) {
      this.productService.removeProduct( id )
        .subscribe(response => {
          location.reload();
      });
    }
  }

}
