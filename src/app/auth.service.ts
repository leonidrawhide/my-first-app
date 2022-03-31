import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  credential: any = null;
  token: string | undefined;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /**
     * Сохраняем данные в localStorage при входе
     * и вычищаем при выходе
     */
  
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        // JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /**
   * логика для входа с емейлом и паролем
   * @param email 
   * @param password 
   */

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.code);
      });
  }

  /**
   * Сравнивает время с временем смерти токена. Если время токена вышло,
   * возвращает false, иначе true. Также, если время токена вышло, то чистит localStorage
   */

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    const loginStatus = user?.stsTokenManager?.expirationTime > Date.now() ? true : false
    if (!loginStatus) localStorage.removeItem('user');
    return loginStatus
  }

  /**
   * входим через гугл, обращаемся к AuthLogin для этого
   */

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }

  /**
   * здесь логика которая позволяет логиниться, а потом перекидывает 
   * юзера на главную страницу
   * @param provider тут он просит объяснить через какой сервис мы заходим
   */ 

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  /**
   * Выходит, удаляет юзера из localStorage и редиректит на страницу входа (на всякий)
   */
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    });
  }

  /**
   * проверяет на месте ли токен. Если его нет, то возвращает undefined
   * иначе возвращает действительный токен и рефрешит его
   * @returns рефрешутый токен
   */

  
  getCredentials(): string | undefined {
    if (this.isLoggedIn == false) {
      console.log('not logged in')
      return undefined
    }

    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true)
        localStorage.setItem('user', JSON.stringify(user))
      }
    })

    return JSON.parse(localStorage.getItem('user')!)?.stsTokenManager?.accessToken
  }
}
