import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonInput, IonButton, ToastController 
} from '@ionic/angular/standalone';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton],
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);
  private toastController = inject(ToastController);

  email = '';
  password = '';

  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.mostrarError(error.message);
    }
  }

  async registrar() {
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.mostrarToast('Usuario registrado y logueado');
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.mostrarError(error.message);
    }
  }

  async mostrarError(msg: string) {
    const toast = await this.toastController.create({ message: msg, duration: 3000, color: 'danger' });
    toast.present();
  }
  
  async mostrarToast(msg: string) {
    const toast = await this.toastController.create({ message: msg, duration: 2000, color: 'success' });
    toast.present();
  }
}