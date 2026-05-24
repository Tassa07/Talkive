import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  name: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      this.name = savedName;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  continue() {
    if (!this.name || this.name.trim() === '') {
      alert('Masukkan nama dulu ya!');
      return;
    }

    localStorage.setItem('username', this.name);
    this.isLoggedIn = true;
    
    // Setelah input nama, biasanya langsung diarahkan ke Home
    this.navCtrl.navigateRoot('/home');
  }

  logout() {
    // Hapus data
    localStorage.removeItem('username');
    this.name = '';
    this.isLoggedIn = false;

    // Reset navigasi agar kembali ke state awal profile (input nama)
    this.navCtrl.navigateRoot('/profile');
    
    console.log('Logout berhasil');
  }
}