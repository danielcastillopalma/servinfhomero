import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const app = firebase.initializeApp(environment.firebaseConfig);
  const auth = getAuth(app)

  return new Observable<boolean>((observer) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        observer.next(true);
      } else {
        router.navigate(['/login']);
        observer.next(false);
      }
      observer.complete();
    });
  });
};
