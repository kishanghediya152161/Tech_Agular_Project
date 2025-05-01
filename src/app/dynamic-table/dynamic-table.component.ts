import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent {
  @Input() currentPage: number = 1;    // Current page
  @Input() totalPages: number = 1;      // Total pages available
  @Input() itemsPerPage: number = 10;   // Items per page (optional)

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  maxPagesToShow = 5; // Max number of pages to show in the pagination bar

  // Method to navigate between pages
  goToPage(page: number | 'prev' | 'next') {
    if (page === 'prev' && this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);  // Emit page change to previous
    } else if (page === 'next' && this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);  // Emit page change to next
    } else if (typeof page === 'number') {
      this.pageChange.emit(page);  // Emit the selected page number
    }
  }

  // Calculate which pages should be shown based on currentPage and totalPages
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = this.maxPagesToShow;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);  // Adjust start if there are fewer pages
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
