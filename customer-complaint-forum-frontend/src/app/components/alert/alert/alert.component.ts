import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../../services/alert/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => {
        if (typeof message !== 'string') {
          try {
            this.message = { text: message.text[message.type].message, type: message.type };
          } catch (e) {
            this.message = message;
          }
        } else {
          this.message = message;
        }
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
