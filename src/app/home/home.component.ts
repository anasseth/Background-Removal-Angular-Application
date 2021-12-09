import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  Gotoprice() {
    this.router.navigate(['/pricing']);
  }
  Gotouploadimage() {
    this.router.navigate(['/imageupload']);
  }
}
