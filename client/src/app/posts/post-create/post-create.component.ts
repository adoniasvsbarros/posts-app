import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  @Output() postCreated: EventEmitter<Post> = new EventEmitter();

  constructor(){}

  onAddPost(form: NgForm): void{
    if(form.invalid){
      return;
    }

    const post = {
      title: form.value.title,
      content: form.value.content
    };

    this.postCreated.emit(post);
  }

}
