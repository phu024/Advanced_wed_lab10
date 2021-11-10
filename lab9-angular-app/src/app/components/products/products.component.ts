import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  token!: string

  constructor(private ps: ProductsService, public local: LocalStorageService, private router: Router) {
    try {
      this.token = this.local.get('user').token
      this.ps.getAllProducts(this.token).subscribe(
        data => {
          console.log(data);
          
          this.products = data;
        },
        err => {
          this.router.navigate(['/signin'])
        }
      );
    } catch (error) {
      console.log(error)
      this.router.navigate(['/signin'])
    }
  }

  ngOnInit(): void {
  }

  signout(){
    this.local.clear();
    this.router.navigate(['/signin'])
  }



}
