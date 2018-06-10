import {Component, ViewEncapsulation} from '@angular/core';
import {OutputService} from "./output.service";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ask ERA';
  constructor(public outputService: OutputService) {

  }
}
