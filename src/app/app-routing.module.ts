import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermconditionComponent } from './termcondition/termcondition.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'privacypolicy', component: PrivacypolicyComponent },
  { path: 'termcondition', component: TermconditionComponent },
  { path: 'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
