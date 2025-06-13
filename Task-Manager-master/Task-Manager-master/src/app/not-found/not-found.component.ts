import { Component } from '@angular/core';

// Angular bileşen tanımı
@Component({
  selector: 'app-not-found',   // Bu bileşenin HTML'de kullanılacağı etiket adı
  standalone: true,            // Bağımsız bileşen olduğunu belirtir 
  imports: [],                 // Eğer başka modül/bileşen kullanılacaksa burada listelenir
  templateUrl: './not-found.component.html',  // Bileşenin HTML şablon dosyası yolu
  styleUrl: './not-found.component.scss'      // Bileşenin stil dosyası yolu
})
export class NotFoundComponent {
  // Bileşenle ilgili işlevsellik burada yazılır
  // Şu anda boş, sadece statik içerik gösteriyor
}
