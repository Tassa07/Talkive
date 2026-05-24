import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Pastikan import ini sesuai dengan nama class baru yang kita buat tadi
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule // Ganti ke Profile
  ],
  declarations: [ProfilePage] // Ganti ke Profile
})
export class ProfilePageModule {} // Ganti nama class module-nya juga