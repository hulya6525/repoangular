import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let guard: CanActivateFn;                   // Test edilecek CanActivate fonksiyonu (guard)
  let routerSpy: jasmine.SpyObj<Router>;     // Router için casus (spy) nesnesi, navigate metodunu izlemek için

  // Guard fonksiyonunu TestBed injection context içinde çalıştıran yardımcı fonksiyon
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(async () => {
    // Router'ın navigate metodunu taklit eden spy objesi oluştur
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Test modülünü konfigüre et ve authGuard sağlayıcısını ekle
    await TestBed.configureTestingModule({
      providers: [authGuard],
    });

    // Guard fonksiyonunu TestBed'den al
    guard = TestBed.inject(authGuard);

    // localStorage.getItem fonksiyonunu taklit et
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return null; // Varsayılan olarak kullanıcı oturumu açık değil
      }
      return null;
    });
  });

  // Guard fonksiyonunun oluşturulduğunu test eder
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  // Aşağıdaki testler yorum satırında, kullanıcı giriş yaptıysa erişimin izinli olup olmadığını test eder
  /*
  it('should allow access if user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({})); // Kullanıcının giriş yaptığı simülasyonu
    const result = authGuard(null, null);
    expect(result).toBeTrue();
  });
  */

  // Kullanıcı giriş yapmadıysa login sayfasına yönlendirme yapılıp yapılmadığını test eder
  /*
  it('should navigate to login page if user is not logged in', () => {
    const result = authGuard(null, null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeUndefined(); // navigate fonksiyonu Promise döndürebilir
  });
  */
});
