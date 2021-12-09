import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {

  public show: boolean = true
  constructor() { }

  ngOnInit(): void {
  }
  showing() {
    this.show = !this.show
  }
}
