import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { asyncScheduler, scheduled } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Firebase Authentication servisi enjeksiyon yoluyla alınır
  readonly auth: Auth = inject(Auth);

  // Router servisi sayfa yönlendirmeleri için kullanılır
  router = inject(Router);

  /**
   * Yeni bir kullanıcıyı email ve şifre ile Firebase üzerinden kayıt eder.
   * @param authData Kullanıcının email ve şifresini içeren nesne
   * @returns Observable şeklinde kayıt işlemi
   */
  registerUser(authData: AuthData) {
    return scheduled(
      createUserWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      ),
      asyncScheduler
    );
  }

  /**
   * Var olan kullanıcıyı email ve şifre ile giriş yapmasını sağlar.
   * @param authData Kullanıcının email ve şifresini içeren nesne
   * @returns Observable şeklinde giriş işlemi
   */
  login(authData: AuthData) {
    return scheduled(
      signInWithEmailAndPassword(this.auth, authData.email, authData.password),
      asyncScheduler
    );
  }

  /**
   * Kullanıcının oturumunu sonlandırır ve login sayfasına yönlendirir.
   */
  logout() {
    // Tarayıcı yerel deposundan kullanıcıyı sil
    localStorage.removeItem('user');

    // Firebase oturumunu kapat
    signOut(this.auth);

    // Kullanıcıyı giriş sayfasına yönlendir
    this.router.navigate(['/login']);
  }
}
