import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink: string ='';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any ;
  categories: Array<Object> | undefined;
  postForm!: FormGroup;
  isTextAreaDisabled=true;

  post: any;

  formStatus: string = 'Add New';
  docId: string | undefined;

  constructor(private categoryService: CategoriesService,
     private fb: FormBuilder,
     private postService: PostsService,
     private route: ActivatedRoute){

      this.route.queryParams.subscribe(val=>{
        this.docId = val.id;

        if(this.docId){
          this.postService.loadOneData(val.id).subscribe(post => {
            console.log(post);
            this.post = post;
            console.log("permalink",this.post['permalink']);
  
            this.postForm = this.fb.group({
              title: [this.post['title'],[Validators.required, Validators.minLength(10)]],
              permalink: [this.post['permalink'],Validators.required],
              excerpt: [this.post['excerpt'],[Validators.required, Validators.minLength(10)]],
              category: [`${this.post['category'].categoryId}-${this.post['category'].category}`,Validators.required],
              postImg: [,Validators.required],
              content: [this.post['content'],Validators.required]
            })
            this.imgSrc = this.post['postImgPath'];
            this.formStatus = 'Edit';
          })
        }
        //console.log(val);
        
      })


  }
  ngOnInit(): void{
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,"-");
  }

  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }

    reader.readAsDataURL($event?.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    //console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');
    //console.log(splitted);

    const postData: Post ={
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    //console.log(postData);
    this.postService.uploadImage(this.selectedImage,postData,this.formStatus,this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
