import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;               // Test edilecek bileşen örneği
  let fixture: ComponentFixture<NotFoundComponent>; // Bileşenin test ortamı (DOM + Component)

  // Her testten önce çalışacak hazırlık fonksiyonu
  beforeEach(async () => {
    // Test modülünü yapılandır ve bileşeni import et
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    }).compileComponents();

    // Bileşen örneği oluştur
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;

    // Angular değişiklik algılamayı tetikle (template güncelle)
    fixture.detectChanges();
  });

  // Bileşenin başarıyla oluşturulup oluşturulmadığını test eden birim testi
  it('should create', () => {
    expect(component).toBeTruthy();  // component nesnesinin varlığını doğrular
  });
});
