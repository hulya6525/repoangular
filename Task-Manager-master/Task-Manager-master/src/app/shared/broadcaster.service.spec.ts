import { TestBed } from '@angular/core/testing';
import { BroadcasterService } from './broadcaster.service';

describe('BroadcasterService', () => {
  let service: BroadcasterService;

  // Her testten önce çalışacak setup bloğu
  beforeEach(() => {
    // Test ortamı için gerekli modül yapılandırması
    TestBed.configureTestingModule({});

    // Servisin test ortamında enjekte edilmesi
    service = TestBed.inject(BroadcasterService);
  });

  /**
   * Servisin başarıyla oluşturulup oluşturulmadığını test eder.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
