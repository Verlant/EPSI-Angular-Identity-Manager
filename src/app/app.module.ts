import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
// import { LdapListComponent } from './ldap-management/ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppMaterialModule } from './app-material.module';
// import { NavbarComponent } from './ldap-management/navbar/navbar.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatFormFieldModule} from "@angular/material/form-field";
// import { MatSlideToggleModule } from "@angular/material/slide-toggle";
// import { MatInputModule} from "@angular/material/input";
// import { LdapDetailsComponent } from './ldap-management/ldap-details/ldap-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { LdapEditComponent } from './ldap-management/ldap-edit/ldap-edit.component';
// import { LdapAddComponent } from './ldap-management/ldap-add/ldap-add.component';
// import { AlertComponent } from './share/alert/alert.component';
import { LdapManagementModule } from './ldap-management/ldap-management.module';
import {HttpClientModule} from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryUsersService} from "./service/in-memory-users.service";
import { LoginComponent } from './security/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryUsersService, {dataEncapsulation: false}
    ),
    MatCardModule,
    MatInputModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatSlideToggleModule,
    // MatInputModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
