import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-23dd3","appId":"1:493243599874:web:2c3138b628ed9d6125eb1b","storageBucket":"ring-of-fire-23dd3.appspot.com","apiKey":"AIzaSyCxA6zadEpkDVksaobe3RonsEyxYYu8wrE","authDomain":"ring-of-fire-23dd3.firebaseapp.com","messagingSenderId":"493243599874"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
