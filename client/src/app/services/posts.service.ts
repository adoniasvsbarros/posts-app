import { Post } from '../models/post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(): void {
    this.http.get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
      .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string): Post {
    return {...this.posts.find(p => p.id === id)};
  }

  addPost(post: Post): void {
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe(responseData => {
      post.id = responseData.postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, post: Post): void {
    this.http.put('http://localhost:3000/api/posts/' + id, post)
    .subscribe(responseData => {
      console.log(responseData);
    });
  }

  deletePost(postId: string): void {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

}
