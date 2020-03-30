import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
 declarations: [LoginComponent],
 imports: [
  IonicModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule.forChild([
   {
    path: '',
    component: LoginComponent,
   }
  ])
 ]
})

export class LoginModule { }
