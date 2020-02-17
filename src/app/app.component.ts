import { Component, OnInit } from '@angular/core';
import { Posts } from './posts';
import { AuthetificationService } from './authetification.service';
import { ServerHistoryService } from './server-history.service';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit {
  title = 'projectThree';

  posts: Posts[] = [];

  isRoot: boolean;

  previousRoute: string;

  constructor(
    private auth: AuthetificationService,
    // private serverhistrory: ServerHistoryService,
    private location: Location,
    private router: Router
  ) {
    // serverhistrory.loadRouting();
  }

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }

  getPath() {
    console.log(this.location.path());
  }

  ngOnInit() {
    this.auth.autoAutheticate();
    // this.previousRoute = this.serverhistrory.getPreviousUrl();

    this.router.events.subscribe(event => {
      if (this.location.path() !== '') {
        this.isRoot = false;
      } else {
        this.isRoot = true;
      }
    });
  }

  onEmitValue(data) {
    this.posts.push(data);
  }
}
