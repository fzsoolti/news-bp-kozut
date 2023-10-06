import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading:boolean=false;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.getLoaderState().subscribe({
      next: (isLoading: boolean)=>{
        this.isLoading = isLoading;
      }
    });
  }

}
