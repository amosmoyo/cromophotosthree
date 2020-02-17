import { Component, OnInit } from '@angular/core';
import { Posts } from './posts';
import { AuthetificationService } from './authetification.service';
import { ServerHistoryService } from './server-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projectThree';

  posts: Posts[] = [];

  previousRoute: string;

  constructor(
    private auth: AuthetificationService,
    private serverhistrory: ServerHistoryService
  ) {
    serverhistrory.loadRouting();
  }

  ngOnInit() {
    this.auth.autoAutheticate();
    this.previousRoute = this.serverhistrory.getPreviousUrl();
  }

  onEmitValue(data) {
    this.posts.push(data);
  }
}
