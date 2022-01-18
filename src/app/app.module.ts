import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './curso/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http'
import { CartComponent } from './curso/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    CartComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule, //import { FormsModule } from '@angular/forms';
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//ng g c empleado se usa para crear una carpeta con sus respectivas archivos .ts, .html, etc
