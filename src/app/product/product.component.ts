import { Component, OnInit } from '@angular/core';
import{ services } from '../static/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	
  services = services;
  constructor() { }

  ngOnInit() {
  }

}
