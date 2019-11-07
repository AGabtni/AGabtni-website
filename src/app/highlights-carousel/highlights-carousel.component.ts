import { Input, Component, OnInit,ViewChildren, ViewEncapsulation, QueryList, AfterViewInit  } from '@angular/core';
import { highlights} from '../static/carousel_highlights';
import  { NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { carouselSlide } from '../../assets/animations';


@Component({
  selector: 'app-highlights-carousel',
  templateUrl: './highlights-carousel.component.html',
  styleUrls: ['./highlights-carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    
      carouselSlide
  ]

  })
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
