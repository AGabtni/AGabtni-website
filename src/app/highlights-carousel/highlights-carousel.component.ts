import { Input, Component, OnInit,ViewChildren, ViewEncapsulation, QueryList, AfterViewInit  } from '@angular/core';

import { highlights} from '../static/carousel_highlights';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as $ from 'jquery';
import  { NgbSlide } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-highlights-carousel',
  templateUrl: './highlights-carousel.component.html',
  styleUrls: ['./highlights-carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('simpleTranslation', [
      state('outright', style({ transform: `translateX(100%)` })),
      state('outleft', style({ transform: `translateX(-100%)` })),
      transition('*=>inright',[
        style({transform:`translateX(-100%)`}),
        animate('260ms ease-in',style({ transform: `translateX(0)` }))
      ]),
      transition('*=>inleft',[
        style({transform:`translateX(100%)`}),
        animate('260ms ease-in',style({ transform: `translateX(0)` }))
      ]),
      transition('*=>outleft', [
        animate('260ms ease-in', style({ transform: `translateX(-100%)` }))
      ]),
      transition('*=>outright', [
        animate('260ms ease-in',style({ transform: `translateX(100%)` }))
      ]),
    ])
  ]})
export class HighlightsCarouselComponent implements AfterViewInit {

  	highlights = highlights;  
    @ViewChildren(NgbSlide) slides: QueryList<NgbSlide>


    slideControl: any[] = []
    

    onSlide(event) {
      this.slides.forEach((x, index) => {
        if (x.id == event.current) {
          this.slideControl[index] = 'in' + event.direction
        }
        if (x.id == event.prev) {
          this.slideControl[index] = 'out' + event.direction
        }
      })
    }
    ngAfterViewInit() {
      setTimeout(() => {
        this.slides.forEach((x, index) => {
          this.slideControl[index] = index ? 'outleft' : 'inleft'
        })
      })
    }

  	constructor() { }
  	ngOnInit() {
  	}

	


}
