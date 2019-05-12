import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
  
})
export class PostService {
 private posts:Post[]=[];
 private postUpdateListener=new Subject<{posts:Post[]}>();
  constructor(private http:HttpClient,private router:Router) { }
  createPost(title:string,content:string,imagePath:string){
  const postData=new FormData();
  postData.append("content",content);
  postData.append("title",title);
  postData.append("image",imagePath,title);


    this.http.post <{message:string} >('http://localhost:3000/api/posts',postData)
    .subscribe(responseData=>{
      this.router.navigate(['/']);
    });
    

  }
  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(
      map(postData => {
        return {
          posts: postData.posts.map(post => {
            return {id:post._id,
              title: post.title,
              content: post.content,
              imagePath:post.imagePath
            
            };
          }),
       
        };
      })
    )
    .subscribe(transformedData=>{
      this.posts=transformedData.posts;
      this.postUpdateListener.next({posts:[...this.posts]});
    });
  }
  getPostUpdateListener()
  {
    return this.postUpdateListener.asObservable();
  }

  Delete(id:string){
    return this.http.delete('http://localhost:3000/api/posts/' +id); 
    
  }

  editPost(id:string,title:string,content:string,imagePath:string){
    let post: Post = {id:id,title:title,content: content,imagePath:imagePath};
console.log(post);
    this.http
.put
('http://localhost:3000/api/posts/' + id,post)
.subscribe(response=>{
  this.router.navigate(['/']);
});

  }

  getPost(id:string){
    return this.http.get
    <{_id:string,
    title:string,
  content:string,
imagePath:string}>
  ('http://localhost:3000/api/posts/' +id);
  }
}
