import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   

})


export class AppComponent{
   

	prepareRoute(outlet: RouterOutlet) {
	  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}

}
