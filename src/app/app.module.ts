import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PricingComponent } from './pricing/pricing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermconditionComponent } from './termcondition/termcondition.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PricingComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PrivacypolicyComponent,
    TermconditionComponent,
    ContactusComponent,
    ImageuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
