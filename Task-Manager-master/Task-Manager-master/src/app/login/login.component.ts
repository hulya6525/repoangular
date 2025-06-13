import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../shared/spinner.service';
import { SnackbarService } from '../shared/snackbar.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // Angular 14+ bağımsız bileşen tanımı
  imports: [
    MatButtonModule,           // Material buton modülü
    MatFormFieldModule,        // Material form alanı modülü
    MatIconModule,             // Material ikon modülü
    MatInputModule,            // Material input modülü
    MatProgressSpinnerModule,  // Material spinner modülü
    ReactiveFormsModule,       // Reactive form modülü
    AsyncPipe                  // Async pipe desteği
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;         // Kullanıcı giriş formu
  hide = true;                      // Şifre gizleme/ gösterme durumu
  isLoadingResults;                 // Spinner göstergesini kontrol eden Observable

  // Servislerin Angular 14+ inject() fonksiyonu ile alınması
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  spinnerService = inject(SpinnerService);
  snackbarService = inject(SnackbarService);

  // Bileşen başlatıldığında form kontrolü ve spinner durumu hazırlanır
  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email zorunlu ve email formatında olmalı
      password: ['', [Validators.required]],                  // Şifre zorunlu
    });

    // Spinner servisinden loading durumunu Observable olarak alıyoruz
    this.isLoadingResults = this.spinnerService.showSpinner$;
  }

  // Form kontrollerine kolay erişim için getter
  get controls() {
    return this.userLoginForm.controls;
  }

  // Giriş işlemi yapılır
  login(formData: FormGroup) {
    this.spinnerService.showSpinner(true);  // Spinner göster

    this.authService
      .login({
        email: formData.value.email,
        password: formData.value.password,
      })
      .subscribe({
        next: (response) => {
          this.spinnerService.showSpinner(false);    // Spinner gizle
          this.router.navigate(['/todo-list']);      // Başarılı giriş sonrası yönlendir
          localStorage.setItem(
            'user',
            JSON.stringify(response.user.uid)         // Kullanıcı ID'sini localStorage'a kaydet
          );
        },
        error: (error) => {
          this.spinnerService.showSpinner(false);    // Spinner gizle
          if (
            error.message ===
            'Firebase: Error (auth/invalid-login-credentials).'
          ) {
            // Geçersiz giriş bilgisi mesajı göster
            this.snackbarService.showSnackbar(
              'Invalid login credentials',
              null,
              3000
            );
          } else {
            // Diğer hatalar için hata mesajını göster
            this.snackbarService.showSnackbar(error.message, null, 3000);
          }
        },
      });
  }

  // Kayıt sayfasına yönlendirme fonksiyonu
  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
