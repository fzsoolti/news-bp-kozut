import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsFeedPost } from 'src/app/models/NewsFeedPost';
import { NewsfeedService } from 'src/app/services/newsfeed.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.css']
})
export class CreateUpdatePostComponent implements OnInit{
  imageHost = environment.host+"/images";
  editMode:boolean=false;

  postToUpdate!: NewsFeedPost
  title: string = '';
  editorContent: string = '';
  fileImage!: File;
  currentImage!: string;
  selectedImage!: string | ArrayBuffer | null;

  constructor(private newsfeedService: NewsfeedService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      if (segments[0] && segments[0].path === 'update') {
        this.getPostDataForUpdate();
      }
    });
  }

  onSubmitCreateNewsFeedPost(){
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('image', this.fileImage);
    formData.append('content', this.editorContent);

    this.newsfeedService.createNewsFeedPost(formData).subscribe({
      next: (res) => {
        this.router.navigate(["/newsDetail"], {
          queryParams: {id: res.data.post._id},
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onFileSelected(event: any) {
    this.fileImage = event.target.files[0];
    this.displaySelectedImage();
  }

  displaySelectedImage(){
    const reader = new FileReader();
    reader.onload = e => this.selectedImage = reader.result;
    reader.readAsDataURL(this.fileImage);
  }

  sanitizeContent(content: string){
    return this.newsfeedService.sanitizeContent(content);
  }

  getPostDataForUpdate(){
    this.route.queryParams.subscribe(params => {
      const postId = params["postId"]

      if (params["postId"]) {
        this.newsfeedService.getNewsFeedPostById(postId).subscribe({
          next: (res) => {
            this.editMode = true;
            this.postToUpdate = res.data.post;
            this.title = this.postToUpdate.title;
            this.editorContent = this.postToUpdate.content;
            this.currentImage = this.postToUpdate.image;
          },
          error: (err) => {
            this.router.navigate(["./add"]);
          }
        })
      } else{
        this.router.navigate(["./add"]);
      }

    });
  }

  onUpdatePost(){
    const updatedFormData = new FormData();
    updatedFormData.append('title', this.title);
    updatedFormData.append('content', this.editorContent);

    this.fileImage ? updatedFormData.append('image', this.fileImage) : null;

    this.newsfeedService.updateNewsFeedPostById(this.postToUpdate._id, updatedFormData).subscribe({
      next: (res) => {
        this.router.navigate(["./newsDetail"], {
          queryParams: {id: this.postToUpdate._id},
        });
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
