import { Component, EventEmitter,Input,Output} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { Product } from 'src/app/product';
import { PrimeNGConfig } from 'primeng/api';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { outputAst } from '@angular/compiler';
import { FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ProductComponent {
  sortKey:any;
  sortKeyCat:any;
  sortKeystock:any;
  sortOptions:SelectItem[]=[];
  sortCategory:SelectItem[]=[];
  sortStock:SelectItem[]=[];
  sortOrder!: number;
  sortField!: string;
 products!:Product[];
 responsiveOptions:any;
 discount:number=15;
 discountprice:any[]=[];
  constructor(
    private productService: ProductserviceService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _Api:ProductserviceService
     ) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
     }
  getEventValue($event:any){
   return $event.target.value
  } 
  onSortChange(event:any) {
 
    let value = event.value;
    if (value.indexOf('!') === 0) {
      
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

ngOnInit():void {
  // this.productService.getProducts().then(products => {
  //   this.products = products;
  // });
  
  this.GetProduct()
  // this.getCartItemCount();
  this.sortOptions = 
  [
      {label: 'Price High to Low', value: '!Price'},
      {label: 'Price Low to High', value: 'Price'}
  ];
  this.sortCategory = 
  [
    {label: 'Vegetables', value: '!CName'},
    {label: 'Fruits', value: 'CName'}
];
  this.sortStock = 
  [
    {label: 'In-Stock', value: 'Qnt'},
    {label: 'less or Out of Stock', value: '!Qnt'}
];
  this.primengConfig.ripple = true;
}

status:any=[]
  addToCart(product:any) { 
    let data={
         "UserID" : 1,
         "Qunatity": 1,
         "ItemID" : product.IID,
         "InStock" : 1
       }
    this.productService.postRequestUrl01(data,"EcartCustomerCart/AddToCart")
    .subscribe(
    {
      next: (res) => {
       console.log(res.Message)
        if (res) {
          this._Api.getCountCart();
          this.messageService.add({key:'s',severity:'success', summary: 'Success', detail: res.Message.toString()});

        }
      },
      error: (err)=> {
       this.messageService.add({key:'e',severity:'error', summary: 'Error', detail: err.error.Message.toString()});
      },

    })
}
TotalPrice(Price:any,discount:any){
  let totalPrice=(Price-(Price*discount/100)).toFixed(2);
  return totalPrice
}
GetProduct(){
  this._Api.postRequestUrl01("",'EcartAddProduct/GetProduct').subscribe(res=>{
    this.products=res;
    console.log(res)
  })
}
}



