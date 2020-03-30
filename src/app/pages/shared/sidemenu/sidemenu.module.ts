import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SidemenuComponent } from './sidemenu.component';

@NgModule({
  declarations: [SidemenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [SidemenuComponent],
})
export class SideMenuModule { }
