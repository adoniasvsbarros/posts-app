import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mode } from 'src/app/models/mode.enum';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  private mode = Mode.CREATE;
  private postId: string;

  constructor(public postsService: PostsService, private route: ActivatedRoute){}


  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = Mode.EDIT;
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = Mode.CREATE;
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm): void{
    if (form.invalid) {
      return;
    }

    const post: Post = {
      id: this.postId,
      title: form.value.title,
      content: form.value.content
    };

    this.mode === Mode.CREATE ? this.postsService.addPost(post) : this.postsService.updatePost(this.postId, post);

    form.resetForm();
  }
}
