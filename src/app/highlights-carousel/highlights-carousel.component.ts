import { Component, OnInit } from '@angular/core';

import { highlights} from '../static/carousel_highlights';

@Component({
  selector: 'app-highlights-carousel',
  templateUrl: './highlights-carousel.component.html',
  styleUrls: ['./highlights-carousel.component.css']
})
export class HighlightsCarouselComponent implements OnInit {

 
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  highlights = highlights;  
  constructor() { }

  ngOnInit() {
  }

}
