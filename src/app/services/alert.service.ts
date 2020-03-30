import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  /**
   * function for present alert message
   * @param header -
   * @param message -
   */
  async presentAlert(header: string, message="server not respond"): Promise<void> {
    const alert = await this.alertController.create({
      header: '' + header ,
      message: '' + message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
