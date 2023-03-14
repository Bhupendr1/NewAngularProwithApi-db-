import { Component} from '@angular/core';
import {MessageService } from 'primeng/api';
declare var google: any;
@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],
  providers: [MessageService],
})
export class DummyComponent {
  
}