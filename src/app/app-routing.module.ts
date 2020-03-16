import { RequestResolverService } from './services/request-resolver.service';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RequestListComponent } from './request-list/request-list.component';
import { Routes, RouterModule } from '@angular/router';
import { RequestFormComponent } from './request-form/request-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-request', component: RequestFormComponent },
  { path: 'edit-request/:id', component: RequestFormComponent, resolve: { request: RequestResolverService } },
  { path: 'request-log', component: RequestListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
