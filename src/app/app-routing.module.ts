import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component'


const routes: Routes = [
	{ path : '',component : HomeComponent},
	{ path : 'home',component : HomeComponent, data: {animation: 'isRight'}},
	{ path : 'contact',component : ContactComponent, data: {animation: 'isLeft'}},
	{ path : 'services', component : ServicesComponent, data : {animation : 'isRight'}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

	
 }
