import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AppAuthGuard  {

    constructor(
        protected router: Router,
        protected location: Location) { }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      if (this.isAccessAllowed()) {
        return true;
      }
      const state = this.location.getState() as any;
      if (state && Object.keys(state).length > 0) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['login']);
      }
      return false;
    }

    isAccessAllowed(): boolean {
      let storedUser = sessionStorage.getItem('connected_user');
      if (storedUser) {
        return true;
      }
        return false;
    }

}


