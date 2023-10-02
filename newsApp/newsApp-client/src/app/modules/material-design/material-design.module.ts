import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatButtonModule,MatPaginatorModule,MatSidenavModule,BrowserAnimationsModule,MatToolbarModule,MatIconModule,MatSlideToggleModule,MatListModule
  ],
  exports:[
    MatButtonModule,MatPaginatorModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatSlideToggleModule,MatListModule
  ]
})
export class MaterialDesignModule { }
