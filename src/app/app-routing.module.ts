import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticate/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { TodoComponent } from './todo/todo.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SignupComponent } from './authenticate/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {
    path: 'auth', component: AuthenticateComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ]
  },
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'welcome/:username', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'todos', component: TodoListComponent, canActivate: [AuthGuard]},
  {path: 'todos/new', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 'todos/:id/edit', component: TodoComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
