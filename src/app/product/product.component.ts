import { Component, OnInit,HostBinding, ViewChildren, ElementRef, QueryList } from '@angular/core';
import{ services } from '../static/services';
import {ProductHighlightComponent} from '../product-highlight/product-highlight.component'
import {cardHover} from '../../assets/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

  animations : [
  	
    cardHover

  ]
})
export class ProductComponent implements OnInit {
	   
    @ViewChildren(ProductHighlightComponent) productHighlights: QueryList<ProductHighlightComponent>;
 

  	services = services;
  	states: Array<boolean> = [true,true,true];


     
      

  	
  	
  	constructor() { 
  		
  	}

    ngOnInit() {
    
    }

    
    public scroll(index) {

        
      this.productHighlights.toArray()[index].scroll();

    }
    
    toggle(x){

      this.states[x] = !this.states[x];

    }

  	

}
