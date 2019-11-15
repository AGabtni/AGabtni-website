import { Component, OnInit,OnDestroy, Inject, SimpleChanges } from '@angular/core';
import { technologiesCardHover } from '../../assets/animations';
import{ technologies } from '../static/services';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [technologiesCardHover]
})
export class ServicesComponent implements OnInit, OnDestroy {
 
  technologies = technologies
  states: Array<boolean> = [false,false,false,false,false,false];

  constructor() { }

  ngOnInit() {
  	
  }


  ngOnDestroy(){
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)

    console.log(this.states);
  }


}
