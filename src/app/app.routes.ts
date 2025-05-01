import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooklistComponent } from './booklist/booklist.component';

export const routes: Routes = [
  { path: "", component: AppComponent, title: "Story", },
  { path: "storylist", component: BooklistComponent, title: "Story-List", },
];
