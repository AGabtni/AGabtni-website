import { Component, OnInit } from '@angular/core';
import {Lobby} from './interactive-lobby/Lobby'



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	lobby ;
	constructor() { 
		
		this.lobby = Lobby.getInstance();
	}

	ngOnInit() {


		this.lobby.init()
		
	}

	ngAfterViewInit() {

	}

}
