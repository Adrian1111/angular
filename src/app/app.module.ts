import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing }        from './app.routing';


import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, ProductService } from './_services/index';
import { LoginComponent } from './login/index';
import { ProductsComponent } from './products/index';


@NgModule({
  declarations: [
        AppComponent,
        LoginComponent,
        ProductsComponent
  ],
  imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
  ],
  providers: [
        AuthGuard,
        AuthenticationService,
        ProductService
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
