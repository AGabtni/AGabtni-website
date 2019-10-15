import { Input, Component, OnInit,ViewEncapsulation  } from '@angular/core';

import { highlights} from '../static/carousel_highlights';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';

import * as $ from 'jquery';



@Component({
  selector: 'app-highlights-carousel',
  templateUrl: './highlights-carousel.component.html',
  styleUrls: ['./highlights-carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [
        animate('300ms', style({ opacity:  0 }))])



  	])

  ]
})
export class HighlightsCarouselComponent implements OnInit {

	@Input() activePane = 'left';
  	highlights = highlights;  


  	constructor() { }
  	ngOnInit() {
  	}

	


}
