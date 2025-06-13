import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { SnackbarService } from '../shared/snackbar.service';
import { SpinnerService } from '../shared/spinner.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  // Router, AuthService, SnackbarService ve SpinnerService için Jasmine spy objeleri oluşturuluyor
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;
  let spinnerSpy: jasmine.SpyObj<SpinnerService>;
  
  beforeEach(async () => {
    // Router'ın navigate metodunun izlenebilmesi için spy objesi
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // AuthService login metodunun izlenebilmesi için spy objesi
    authSpy = jasmine.createSpyObj('AuthService', ['login']);
    // SnackbarService showSnackbar metodunun izlenebilmesi için spy objesi
    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['showSnackbar']);
    // SpinnerService showSpinner metodunun izlenebilmesi için spy objesi
    spinnerSpy = jasmine.createSpyObj('SpinnerService', ['showSpinner']);

    // Test modülü yapılandırılıyor
    await TestBed.configureTestingModule({
      imports: [ LoginComponent, BrowserAnimationsModule ],
      providers: [
        // Firebase app ve auth servislerinin sağlanması
        provideFirebaseApp(() =>
          initializeApp({
            projectId: 'to-do-app-3569d',
            appId: '1:665738202763:web:c08911a6f36c6c3bbbce8e',
            storageBucket: 'to-do-app-3569d.appspot.com',
            apiKey: 'AIzaSyDmWSsxJJAlzt60_hMRcT9JGGm4EiWqkbw',
            authDomain: 'to-do-app-3569d.firebaseapp.com',
            messagingSenderId: '665738202763',
            measurementId: 'G-0B32KQX4NF',
          })
        ),
        provideAuth(() => getAuth()),
      ]
    }).compileComponents();

    // LoginComponent oluşturuluyor
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Angular değişikliklerini algıla ve uygula
  });

  // Component'in başarıyla oluşturulup oluşturulmadığını test eder
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // navigateToSignUp() fonksiyonunun çağrılması durumunda Router.navigate('/signup') çağrılır mı testi
  it('should navigate to signup page when navigateToSignUp() is called', () => {
    component.navigateToSignUp();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
  });

  // Formun email ve password alanları ile doğru şekilde oluşturulup oluşturulmadığını kontrol eder
  it('should initialize the form with two controls', () => {
    component.ngOnInit();
    expect(component.userLoginForm.contains('email')).toBeTrue();
    expect(component.userLoginForm.contains('password')).toBeTrue();
  });

  // Giriş yapma sırasında geçersiz kimlik bilgisi hatasının doğru şekilde işlendiğini test eder
  it('should handle login error with invalid credentials', () => {
    component.ngOnInit();
    const errorResponse = { message: 'Firebase: Error (auth/invalid-login-credentials).' };
    authSpy.login.and.returnValue(throwError(() => new Error(errorResponse.message)));

    component.login(component.userLoginForm);

    // Spinner gösterilip gizlenmeli
    expect(spinnerSpy.showSpinner).toHaveBeenCalledWith(true);
    expect(spinnerSpy.showSpinner).toHaveBeenCalledWith(false);

    // Snackbar ile doğru hata mesajı gösterilmeli
    expect(snackbarSpy.showSnackbar).toHaveBeenCalledWith('Invalid login credentials', null, 3000);
  });

  // Giriş yapma sırasında diğer genel hataların doğru şekilde işlendiğini test eder
  it('should handle generic login error', () => {
    component.ngOnInit();
    const errorResponse = 'Some other error occurred.';
    authSpy.login.and.returnValue(throwError(() => new Error(errorResponse)));

    component.login(component.userLoginForm);

    // Spinner gösterilip gizlenmeli
    expect(spinnerSpy.showSpinner).toHaveBeenCalledWith(true);
    expect(spinnerSpy.showSpinner).toHaveBeenCalledWith(false);

    // Snackbar ile hata mesajı gösterilmeli
    expect(snackbarSpy.showSnackbar).toHaveBeenCalledWith('Some other error occurred.', null, 3000);
  });
});
