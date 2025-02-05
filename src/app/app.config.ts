import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  "projectId":"hotelmanagementwebapp",
  "appId":"1:361532788730:web:7fac3839427e55754e9e43",
  "storageBucket":"hotelmanagementwebapp.firebasestorage.app",
  "apiKey":"AIzaSyA3s0baMSKq8MBaKK5Zp-0gSPtEe4zGXDU",
  "authDomain":"hotelmanagementwebapp.firebaseapp.com",
  "messagingSenderId":"361532788730",
  "measurementId":"G-27HD1592W3"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
