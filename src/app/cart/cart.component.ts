import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { Product } from '../product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent {
  checkoutform !: FormGroup;
  allProduct: number = 0;
  productvalue: number = 0;
  quantitydata: any;
  quantitysingle: any = [];
  constructor(private _Api: ProductserviceService, private formBuilder: FormBuilder, private route: Router, private messageService: MessageService) { }
  cart: any = []
  checkoutForm = this.formBuilder.group({
    Price: ['', Validators.required],
  });
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {let rdata = {"UserID": 1}
    this._Api.postRequestUrl01(rdata, 'EcartCustomerCart/GetCartValue').subscribe(res => {
      this.cart = res;
    })
  }
    //prduct Total funcation
  getTotal() {
    return this.cart.reduce((i: number, j: { Price: number; Qunatity: number; }) => i + j.Price * j.Qunatity, 0);
  }
  //prduct decuted funcation
  decreaseCartItem(data:any){
    let rdata={
      "IID":data.IID,
      "Qunatity": data.Qunatity-1,
      "cartId": data.CartID
      }
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/IncrementAndDecrementItem').subscribe(res=>{
    this.loadCart()
  })
  }
  //prduct add funcation
  increaseCartItem(data:any){
    let rdata={
      "IID":data.IID,
      "Qunatity": data.Qunatity+1,
      "cartId": data.CartID
      }
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/IncrementAndDecrementItem').subscribe(res=>{
    this.loadCart()
  })
  }
   //prduct remove funcation
  removeCartItem(data:any){
    let rdata={
      "cartId": data.CartID,
      "UserID":1,
      }
  this._Api.postRequestUrl01(rdata,'EcartCustomerCart/DeleteCart').subscribe(res=>{
    this.loadCart()
    this._Api.getCountCart();
    this.messageService.add({key:'s',severity:'success', summary: 'Success', detail: res.Message.toString()});
  })
  }
   //prduct Checkout funcation
  checkOut() {
    console.log(this.getTotal());
    sessionStorage.setItem('totalPrice', this.getTotal());
    sessionStorage.setItem('itemsPerPage', JSON.stringify(this.cart));
    this.route.navigateByUrl('/Checkout')
  }

}