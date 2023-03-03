
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map,BehaviorSubject, Observable,} from 'rxjs';
import { Product } from '../product';
@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  //cart item count start
  ProductCount = new BehaviorSubject(0)
  //cart item count end

  productList = new BehaviorSubject<any>([]);
  cartDataList: Product[] = [];
  cart: Product[] = [];
  countdata!:number;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  private countCartval = new BehaviorSubject<number>(0);

  public getcountCartval(): Observable<number> {
   return this.countCartval.asObservable();
 }

   setcountCartval(Num: number): void {
    this.countCartval.next(Num);
 }

  constructor(private http: HttpClient) { }
  productNames: string[] = [
    "Bamboo Watch",
    "Black Watch",
    "Blue Band",
    "Blue T-Shirt",
    "Bracelet",
    "Brown Purse",
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
  ];

  getProducts() {
    return this.http.get<any>('assets/i18n/products.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }
  
   generatePrduct(): Product {
    const product: Product = {
      id: this.generateId(),
      IID: 0,
      name: this.generateName(),
      description: "Product Description",
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: "Product Category",
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating(),
      qty: 0,
      num: 0,
      cartTotal: 0,
      favouriteTotal: 0
    };

    product.image = product.name?.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
    return product;
  }

  generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }

  addToCart(product: any) {
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
  }
  getTotalAmount() {
    let grandTotal = 0;
    this.cartDataList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal
  }

  getCountCart(){
 
    let rdata={
      "UserID": 1
    }
    this.postRequestUrl01(rdata, "EcartCustomerCart/CartCount").subscribe(res=>{
      //this.countdata=res[0].totalcart;
      this.setcountCartval(res[0].totalcart);
      //console.log(res[0].totalcart)
    })
    return this.countdata;
  }

  postAddCart(data: any) {
    return this.http.post<any>("http://localhost:3000/Cart", data).pipe(map((res: any) => {
      return res;
    }))
  }

  getCartList() {
    return this.http.get<any>("http://localhost:3000/Cart/").pipe(map((res: any) => {
      return res;
    }))

  }
  UpadateCart(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/Cart/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  deleteCart(id: number) {
    return this.http.delete<any>("http://10.130.34.149/Ekart/api/EcartCustomerCart/DeleteCart" + id).pipe(map((res: any) => {
      return res;
    }))
  }
  deleteCartAll() {
    return this.http.delete("http://localhost:3000/Cart/").pipe(map((res: any) => {
      return res;
    }))
  }

  postAddhistory(data: any) {
    return this.http.post<any>("http://localhost:3000/orderHistory/", data).pipe(map((res: any) => {
      return res;
    }))
  }
  getCartItemCount(){
    let rdata={
      "UserID": 1
    }
   return this.postRequestUrl01(rdata,'EcartCustomerCart/CartCount').pipe(map((res:any)=>{
    return res;
  }))
  }
  // api calling start
  baseUrl01 = environment.baseUrl01;
  postRequestUrl01(data: any, ACTION: string) { 
    debugger
    ACTION = `${this.baseUrl01}` + ACTION; 
  
  var  result = this.http.post<any>(ACTION, data); 
  return result;
}
}
