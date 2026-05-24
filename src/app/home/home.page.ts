import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular'; // Tambahkan NavController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  username: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController // Masukkan ke constructor
  ) {}

  ngOnInit() {
    const savedName = localStorage.getItem('username');

    if (!savedName) {
      this.navCtrl.navigateRoot('/profile');
      return;
    }

    this.username = savedName;
  }

  goToPage(pageName: string) {
    this.router.navigate(['/' + pageName]);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Yakin mau logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            // 1. Hapus data
            localStorage.removeItem('username');
            
            // 2. Arahkan ke '/profile' (karena rute login sudah ganti nama)
            // Pakai navigateRoot supaya history bersih
            this.navCtrl.navigateRoot('/profile').then(() => {
              // Paksa reload agar halaman Profile muncul dalam keadaan 'fresh' (input nama)
              window.location.reload();
            });
          }
        }
      ]
    });

    await alert.present();
  }
}