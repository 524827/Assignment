import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuModule } from '../shared/sidemenu/sidemenu.module';


@NgModule({

 declarations: [HomeComponent],
 imports: [
  IonicModule,
   CommonModule,
   FormsModule,
  SideMenuModule,
  RouterModule.forChild([
  {
   path: '',
   component: HomeComponent
   }
 ])],
})

export class HomeModule { }
