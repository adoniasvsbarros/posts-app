import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Mode } from 'src/app/models/mode.enum';
import { mimeType } from 'src/app/shared/validators/mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;

  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = Mode.CREATE;
  private postId: string;

  imagePreview: string;

  constructor(public postsService: PostsService, private route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = Mode.EDIT;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
        .subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath};
          this.form.setValue({title: postData.title, content: postData.content, image: postData.imagePath});
        });
      } else {
        this.mode = Mode.CREATE;
        this.postId = null;
      }
    });
  }

  onSavePost(): void{
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;


    this.mode === Mode.CREATE ?
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
      : this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);

    this.form.reset();
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
