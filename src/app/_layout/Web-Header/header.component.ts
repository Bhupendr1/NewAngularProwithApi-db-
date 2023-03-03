import { Component, ContentChild, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { PrimeNGConfig } from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None

})
export class HeaderComponent {
  cartTotal: any;
  subscription!: Subscription;
  items: MenuItem[]=[];
  selectedveg:any;
  switchlang:string='products'
  countSub:any=[];
  cartCount:any=[]; 
  location: any;
  constructor(
    private messageService: MessageService,
    private router:Router,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private _Api: ProductserviceService,
    public translate: TranslateService,
     ){
    translate.addLangs(['products', 'tamil']);
    translate.setDefaultLang('products');
    }
cartvalue:any=[]
  ngOnInit() {
    this._Api.ProductCount.subscribe(res=>{
      this.cartCount=res;
    })
    // this._Api.getCartItemCount().subscribe(res=>{
    //   this.cartCount=res[0].totalcart;
    // });
}  
dropdownVisible = false;
isMenuOpen = false;
toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
toggleDropdown() {
  this.dropdownVisible = !this.dropdownVisible;
}  
  useLanguage(language: string) {
    this.translate.use(language)
    this.switchlang=language;
}

// getCartItemCount(){
//     debugger
//     this.productService.getCartList().subscribe(d=>{
//     this.cartcountval=d.length
//       })
//     }+
cart:any[]=[]
// loadCart(){
//   this._Api.getCartList().subscribe(res=>{
//     this.cart=res;
//     })
// }
ngOnDestroy() {
  this.subscription.unsubscribe();
}
massage:string='your cart is Empty';
massage1:string='Item is added click me';
}
  