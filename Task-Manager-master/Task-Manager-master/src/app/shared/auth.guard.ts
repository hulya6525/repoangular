import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// authGuard: Kullanıcının yetkilendirilip yetkilendirilmediğini kontrol eden CanActivate fonksiyonu
export const authGuard: CanActivateFn = (route, state) => {
  // Router servisini injection yoluyla al
  const router = inject(Router);

  // localStorage'da 'user' anahtarı varsa (kullanıcı oturumu açıksa) true döndür (erişim izinli)
  // Aksi halde kullanıcı giriş sayfasına yönlendir ve navigate() çağrısının sonucunu döndür
  return localStorage.getItem('user') ? true : router.navigate(['/login']);
};
