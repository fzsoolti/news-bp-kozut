import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  editorContent: string = '';
  fileImage!: File;

  constructor(private sanitizer: DomSanitizer, private newsfeedService: NewsfeedService) {}

  onSubmitCreateNewsFeedPost(form:NgForm){
    const newsFeedPost = form.value;
    const formData = new FormData();
    formData.append('title', newsFeedPost.title);
    formData.append('image', this.fileImage);
    formData.append('content', this.editorContent);

    this.newsfeedService.createNewsFeedPost(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onFileSelected(event: any) {
    this.fileImage = event.target.files[0];
  }

  sanitizeContent(content: string) {
    if (content) {
      return this.sanitizer.bypassSecurityTrustHtml(content.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    }
    return '';
  }

}
