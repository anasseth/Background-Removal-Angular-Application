import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showSideBar: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSideBarMethod() {
    this.showSideBar = !this.showSideBar
  }
  Gotoprice() {
    this.router.navigate(['/pricing']);
  }
  Gotoprivacy() {
    this.router.navigate(['/privacypolicy']);
  }
  Gototermcondition() {
    this.router.navigate(['/termcondition']);
  }
  Gotocontactus() {
    this.router.navigate(['/contactus']);
  }
  Gotohomepage() {
    this.router.navigate(['']);
  }
  Gotouploadimage() {
    this.router.navigate(['/imageupload']);
  }
}

