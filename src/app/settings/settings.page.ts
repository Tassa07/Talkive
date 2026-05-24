import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  username: string = '';

  darkMode: boolean = false;
  reminder: boolean = true;
  sound: boolean = true;

  // Variabel baru untuk mengontrol accordion About Talkive
  isAboutOpen: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';

    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.reminder = localStorage.getItem('reminder') !== 'false';
    this.sound = localStorage.getItem('sound') !== 'false';

    // 🔥 APPLY DARK MODE SAAT MASUK
    this.applyDarkMode();
  }

  /* =========================
      ℹ️ ABOUT ACCORDION
  ========================= */
  toggleAbout() {
    this.isAboutOpen = !this.isAboutOpen;
  }

  /* =========================
      🌙 DARK MODE REAL
  ========================= */
  applyDarkMode() {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  /* SAVE SEMUA SETTING */
  saveSettings() {
    localStorage.setItem('darkMode', this.darkMode.toString());
    localStorage.setItem('reminder', this.reminder.toString());
    localStorage.setItem('sound', this.sound.toString());

    this.applyDarkMode(); // 🔥 langsung apply
  }

  /* =========================
      👤 EDIT USERNAME
  ========================= */
  async editUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Username',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: this.username
        }
      ],
      buttons: [
        'Cancel',
        {
          text: 'Save',
          handler: async (data) => {

            if (!data.username || data.username.trim() === '') {
              const toast = await this.toastCtrl.create({
                message: 'Username tidak boleh kosong',
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
              return false; // ❌ jangan close alert
            }

            this.username = data.username;
            localStorage.setItem('username', this.username);

            const toast = await this.toastCtrl.create({
              message: 'Username updated ✅',
              duration: 2000,
              color: 'success'
            });

            await toast.present();

            return true; // ✅ FIX ERROR DI SINI
          }
        }
      ]
    });

    await alert.present();
  }

  /* =========================
      🔄 RESET PROGRESS (AMAN)
  ========================= */
  async resetProgress() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Progress',
      message: 'Are you sure you want to reset?',
      buttons: [
        'Cancel',
        {
          text: 'Yes',
          role: 'destructive',
          handler: async () => {

            // ❌ JANGAN clear semua
            localStorage.removeItem('progress');
            localStorage.removeItem('records');

            const toast = await this.toastCtrl.create({
              message: 'Progress berhasil direset 🔄',
              duration: 2000,
              color: 'warning'
            });

            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }
}