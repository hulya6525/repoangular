import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Router servisinin bir sahte (mock) nesnesini oluştur
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Test modülünü yapılandır: Firebase ve Auth servisi sağlanıyor
    TestBed.configureTestingModule({
      providers: [
        // Firebase uygulamasını başlatmak için yapılandırma
        provideFirebaseApp(() =>
          initializeApp({
            apiKey: "AIzaSyBEaidVaZ60d39kKIoUZ-5Ky8m78vhg2Hw",
            authDomain: "taskmanager-ff578.firebaseapp.com",
            projectId: "taskmanager-ff578",
            storageBucket: "taskmanager-ff578.firebasestorage.app",
            messagingSenderId: "170552619280",
            appId: "1:170552619280:web:957820346b422b9e4eb595"
          })
        ),
        // Firebase Authentication modülünü sağla
        provideAuth(() => getAuth()),
      ],
    });

    // Test edilecek AuthService örneğini oluştur
    service = TestBed.inject(AuthService);
  });

  // Servisin başarılı şekilde oluşturulup oluşturulmadığını test et
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Aşağıdaki testler yorum satırına alınmış. Geliştirildikten sonra kullanılabilir:

  /*
  // Yeni kullanıcı başarılı şekilde kayıt olduğunda logout metodunun çağrıldığını test et
  it('should register a new user successfully', async () => {
    const authData: AuthData = {
      email: 'test@example.com',
      password: 'test123',
    };

    await service.registerUser(authData);

    expect(service.logout).toHaveBeenCalled();
  });

  // Kullanıcı başarılı şekilde giriş yaptığında yönlendirme yapılıp yapılmadığını test et
  it('should log in a user successfully', async () => {
    const authData: AuthData = {
      email: 'test@example.com',
      password: 'test123',
    };
    await service.login(authData);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/todo-list']);
  });

  // Geçersiz kullanıcı bilgileriyle giriş yapıldığında hata yakalanıp yakalanmadığını test et
  it('should handle invalid login credentials', async () => {
    const authData: AuthData = {
      email: 'invalid@example.com',
      password: 'invalid123',
    };

    await service.login(authData);
  });
  */
});
