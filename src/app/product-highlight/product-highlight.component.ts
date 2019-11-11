import { Component, OnInit,OnChanges, Input, HostListener, ElementRef,ViewChild } from '@angular/core';
import{ services } from '../static/services';


import * as AOS from 'aos';


@Component({
  selector: 'app-product-highlight',
  templateUrl: './product-highlight.component.html',
  styleUrls: ['./product-highlight.component.css'],
  animations : []
})
export class ProductHighlightComponent implements OnChanges {
	
	@Input() containerIndex : number;
	@ViewChild('highLight', {static: true}) titleWrapper : ElementRef;



	services = services;
	serviceDescription: string;



	constructor() {}

	



	 public scroll() {

      this.titleWrapper.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});

    }


	ngOnInit(){
			
		this.serviceDescription = services[Number(this.containerIndex)].description;
		AOS.init();


	}
	ngOnChanges() {

			this.serviceDescription = services[Number(this.containerIndex)].description;


	}

}
