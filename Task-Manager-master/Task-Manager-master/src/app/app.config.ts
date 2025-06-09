import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
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
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
};
