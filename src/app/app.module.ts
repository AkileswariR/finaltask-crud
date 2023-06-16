import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdduserComponent } from './adduser/adduser.component';
import { HomeuserlistComponent } from './homeuserlist/homeuserlist.component';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
const routes: Routes = [

{ path: '', component: AdduserComponent },
{
  path: 'home', component: HomeuserlistComponent

  } ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdduserComponent,
    HomeuserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,  
        FormsModule
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
