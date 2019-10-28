import { Component, OnInit,OnChanges, Input } from '@angular/core';
import{ services } from '../static/services';

@Component({
  selector: 'app-product-highlight',
  templateUrl: './product-highlight.component.html',
  styleUrls: ['./product-highlight.component.css']
})
export class ProductHighlightComponent implements OnChanges {

	services = services;
	returnedString: string;


	@Input() containerIndex : number;


	constructor() { 
			

	}

	ngOnInit(){
					this.returnedString = services[Number(this.containerIndex)].description;


	}
	ngOnChanges() {

			this.returnedString = services[Number(this.containerIndex)].description;

			console.log(this.returnedString);


	}

}
