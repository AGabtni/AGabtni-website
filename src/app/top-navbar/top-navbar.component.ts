import { Component,Input, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
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

  @Input()
  hasBackdrop: false;

  constructor() { 


  }

  ngOnInit() {
  }

}
