import { ChangeRequestService } from './change-request.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { IRequestEdit } from '../models/request-edit';

@Injectable({
  providedIn: 'root'
})
export class RequestResolverService implements Resolve<IRequestEdit> {

  constructor(
    private requestService: ChangeRequestService,
    private router: Router

  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequestEdit> | Observable<never> {
    const requestId = route.paramMap.get('id');

    return this.requestService.getRequest(requestId).pipe(
      take(1),
      mergeMap(request => {
        if (request) {
          return of(request);
        } else {
          this.router.navigate(['/request-log']);
          return EMPTY;
        }
      })
    );
  }
}
