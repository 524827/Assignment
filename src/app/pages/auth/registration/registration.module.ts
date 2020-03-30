import {NgModule } from '@angular/core';
import { ngModuleJitUrl } from '@angular/compiler';
import { RegistrationComponent } from './registration.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
 declarations: [RegistrationComponent],
 imports: [
  CommonModule,
   IonicModule,
   ReactiveFormsModule,
  FormsModule,
  RouterModule.forChild([
   {
    path: '',
    component: RegistrationComponent,
   }
  ])]
})

export class RegistrationModule { }
