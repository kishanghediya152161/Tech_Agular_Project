import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonService } from './services/apiServices/common.service';
import { HttpClientModule } from '@angular/common/http';
import { BooklistComponent } from './booklist/booklist.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    DynamicTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CommonService],
})
export class AppComponent implements OnInit, OnDestroy {
  public saveStoryForm: FormGroup;
  title = 'sample_project_Techcronus';

  columnsToDisplay = [
    'section',
    'subsection',
    'title',
    'byline',
    'publishedDate',
  ]; // Add your columns here
  expandedElement: any | null;

  data: number[] = [...Array(100).keys()]; // Sample data
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.data.length / this.itemsPerPage);
  paginatedData: number[] = [];
  maxPagesToShowOnPage = 5;

  gridOptions: any;

  constructor(
    private Service: CommonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.saveStoryForm = new FormGroup({
      key: new FormControl(null),
      section: new FormControl(null, Validators.required),
      pageNumber: new FormControl(this.currentPage - 1),
      numberOfElements: new FormControl(this.itemsPerPage),
    });
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  get pageNumbers(): (number | 'prev' | 'next')[] {
    debugger;
    const pages: (number | 'prev' | 'next')[] = [];
    const maxPagesToShow = this.maxPagesToShowOnPage; // Only show 3 pages
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(newPage: number) {
    debugger;
    this.currentPage = newPage; // Update the current page
    this.saveStoryForm.patchValue({
      pageNumber: this.currentPage - 1,
      numberOfElements: this.itemsPerPage,
    });
    this.onSubmit(); // Fetch data for the new page
  }

  goToPage(page: number | 'prev' | 'next') {
    debugger;
    if (page === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    } else if (page === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (typeof page === 'number') {
      this.currentPage = page;
    }
  }

  storyList: any[] = [];
  totalCount: any;
  filterCount: any;
  onSubmit() {
    if (this.saveStoryForm.valid) {
      const formValues = this.saveStoryForm.value;

      this.Service.commonPoint(formValues).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.totalCount = res['recordsTotal'];
            this.filterCount = res['recordsFiltered'];

            this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);

            this.storyList = res['data'];
          }
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
    }
  }

  expandedItem: any = null;
  toggle(item: any) {
    this.expandedItem = this.expandedItem === item ? null : item;
  }
}
