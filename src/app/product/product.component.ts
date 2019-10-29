import { Component, OnInit,HostBinding, ViewChildren, ElementRef, QueryList } from '@angular/core';
import{ services } from '../static/services';
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
  	trigger('openClose', [

  		state('stable', style({
  			bottom : '0px'

  		})),
  		state('up', style({
  			bottom : '10px'

  		})),

  		transition('stable => up',[
  			animate('0.1s')
  		]),

  		transition('up => stable',[
  			animate('0.1s')
  		]),

  	


  	]),

  ]
})
export class ProductComponent implements OnInit {
	   
    @ViewChildren('myElem') productHighlights: QueryList<ElementRef>;


  	services = services;
  	states: Array<boolean> = [true,true,true];


     
      

  	
  	
  	constructor() { 
  		
  	}

    ngOnInit() {
    
    }


    public scroll(index) {

        
      this.productHighlights.toArray()[index].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});

    }
    
    toggle(x){

      this.states[x] = !this.states[x];

    }

  	

}
