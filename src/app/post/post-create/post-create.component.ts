import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType} from './mime-type.validator';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
private mode='create';
private postId:string;
private post :Post;
private imagePreview:string;
  constructor(private postService: PostService,private route:ActivatedRoute) { }
form:FormGroup;
  ngOnInit() {
    this.form =new FormGroup({
      title:new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
      content:new FormControl(null,{validators:[Validators.required, Validators.minLength(10)]}),
      image:new FormControl(null,{validators:[Validators.required, Validators.minLength(10)], asyncValidators: [mimeType]}

    
      )
    });

this.route.paramMap.subscribe((paramMap:ParamMap)=>{
  if(paramMap.has("postId")){
    this.mode="edit";
    this.postId=paramMap.get("postId");
    this.postService.getPost(this.postId)
    .subscribe(postData=>{
      this.post ={
        id:postData._id,
        title:postData.title,
        content:postData.content,
        imagePath:postData.imagePath

      };

    
    this.form.setValue({
      title:this.post.title,
      content:this.post.content,
      image:this.post.imagePath
    });
  });

  }

  else {
    this.mode = "create";
    this.postId = null;
  }
});
  }
onAddPost(){
  if(this.form.invalid){
    return ;
  }
  console.log(this.mode);
  if(this.mode==="create"){
this.postService.createPost
(this.form.value.title,this.form.value.content,this.form.value.image);
  }
  else{
  this.postService.editPost(this.postId,
    this.form.value.title,
    this.form.value.content,
    this.form.value.image);

}
this.form.reset();
}

onImagePicked(event:Event){
  const file=(event.target as  HTMLInputElement).files[0];
  this.form.patchValue({image:file});
  this.form.get("image").updateValueAndValidity();
  const reader=new FileReader();
  reader.onload=()=>{
this.imagePreview=reader.result as string;
  }
  reader.readAsDataURL(file);
}


}
