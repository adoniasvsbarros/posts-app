import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'first post', content: 'first post content'},
  //   {title: 'second post', content: 'second post content'},
  //   {title: 'third post', content: 'third post content'},
  // ];
  posts = [];
}
