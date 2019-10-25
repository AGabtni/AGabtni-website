import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { categories } from '../static/categories';




@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
 
})
export class TopNavbarComponent implements OnInit {

  title = 'Website Title';

  categories = categories ;

   isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  constructor() { 


  }

  ngOnInit() {
  }

}
