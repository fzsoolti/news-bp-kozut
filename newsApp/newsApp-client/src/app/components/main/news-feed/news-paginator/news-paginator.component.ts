import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-news-paginator',
  templateUrl: './news-paginator.component.html',
  styleUrls: ['./news-paginator.component.css']
})
export class NewsPaginatorComponent implements OnInit{
  @Input() numOfAllPosts!:number;
  currentPage:number = 1;
  currentLimit:number = 20;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      params["page"] ? this.currentPage = +params["page"] : "";
      params["limit"] ? this.currentLimit = +params["limit"] : "";
    });
  }

  onChangePages(page:number, limit:number){
    this.router.navigate(["/newsfeed"], {
      queryParams: {page: page, limit: limit},
    });
  }

  onChangeLimit(page:number, target:EventTarget|null){
    const limit = (target as HTMLSelectElement).value;
    this.router.navigate(["/newsfeed"], {
      queryParams: {page: page, limit: limit},
    });
  }
}
