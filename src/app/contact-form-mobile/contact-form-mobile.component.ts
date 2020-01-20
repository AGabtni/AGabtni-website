import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatBottomSheetRef, MatSnackBar, ErrorStateMatcher} from '@angular/material';
import {APIService} from './../contact/apiService.service';
import * as AOS from 'aos';

import { formCard, shake, fadeIn } from '../../assets/animations';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-contact-form-mobile',
  templateUrl: './contact-form-mobile.component.html',
  providers: [APIService],
  styleUrls: ['./contact-form-mobile.component.css'],
  animations: [ formCard , shake, fadeIn ],

})
export class ContactFormMobileComponent implements OnInit {
    contactForm ;
    formState ;
    message;


  //NEED TO BE FILLED IN
  projectTypes : string[] = [
      "type1",
      "type2",
      "type3",
  ];


	emailFormControl = new FormControl('', [ Validators.required , Validators.email]);
  projectTypeControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder : FormBuilder, private _bottomSheetRef: MatBottomSheetRef<ContactFormMobileComponent>,private _snackBar: MatSnackBar,private _apiservice : APIService) { 
    this.formState = 'shakeend';
  	this.contactForm = this.formBuilder.group({
        'firstName' : this.nameControl,
        'lastName' : '',
        'email' : this.emailFormControl,
        'phone' : '',
        'companyName' : '',
        'projectType' : this.projectTypeControl,
        'description' : '',

    });
    this.message = "";

  }

  ngOnInit() {
      AOS.init();

  }


  onFormSubmit(clientInfo){
    console.log(clientInfo);
    this._apiservice.sendContactRequest(clientInfo).subscribe(
      
      val => {
        console.log("Sucessfully sent email ", val);
        this.message = "Sucessfully sent email ";
        this.openSnackBar();

			},
		  response => {
			  console.log("Error sending mail", response); 
        this.message = this.message = "Sucessfully sent email ";
		  },
      ()=> console.log("put call complete")
    );
    if(this.emailFormControl.status == 'VALID' &&  this.projectTypeControl.status == 'VALID' && this.projectTypeControl.status == 'VALID'){
      this.formState = 'submittedForm';
      this.contactForm.reset();
      this._bottomSheetRef.dismiss();

    }else
      this.formState= (this.formState === 'shakestart' ? 'shakeend' : 'shakestart');

    


  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
    });
  }

  shakeEnd(event) {
    this.formState = 'shakeend';
  }

  
}


//SNACKBAR COMPONENT:

@Component({
  selector: 'snackbar',
  templateUrl: 'snackbar.html',
  styles: [`
    .example-pizza-party {
      color: indigo;
    }
  `],
})
export class SnackBarComponent {}
