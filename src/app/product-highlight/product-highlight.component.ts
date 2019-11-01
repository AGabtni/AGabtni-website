import { Component, OnInit,OnChanges, Input, HostListener, ElementRef,ViewChild } from '@angular/core';
import{ services } from '../static/services';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import * as AOS from 'aos';


@Component({
  selector: 'app-product-highlight',
  templateUrl: './product-highlight.component.html',
  styleUrls: ['./product-highlight.component.css'],
  animations : [
  	trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])

  ]
})
export class ProductHighlightComponent implements OnChanges {
	
	@Input() containerIndex : number;
	@ViewChild('myElem', {static: true}) titleWrapper : ElementRef;



	services = services;
	returnedString: string;



	constructor() {}

	



	 public scroll() {

      this.titleWrapper.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});

    }


	ngOnInit(){
			
		this.returnedString = services[Number(this.containerIndex)].description;
		AOS.init();


	}
	ngOnChanges() {

			this.returnedString = services[Number(this.containerIndex)].description;


	}

}
