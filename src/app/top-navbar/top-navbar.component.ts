import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { categories } from '../static/categories';




@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TopNavbarComponent implements OnInit {

  title = 'Shop kf,refl';

  categories = categories ;
  constructor() { 


  }

  ngOnInit() {
  }

}
