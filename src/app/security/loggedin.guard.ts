import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginService } from './login/login.service'


@Injectable()
export class LoggedInGard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string) {
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }

        return loggedIn
    }
    canLoad(router: Route): boolean {
        return this.checkAuthentication(router.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

} 