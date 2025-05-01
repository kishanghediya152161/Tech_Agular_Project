import { Component, Inject, Input, OnInit, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [MatTableModule, MatCardModule, CommonModule],
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooklistComponent implements OnInit {
  @Input() listData: any[] = [];


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  columnsToDisplay = ['section', 'subsection', 'title', 'byline', 'publishedDate']; // Add your columns here
  expandedElement: any | null;


  ngOnChanges(changes: SimpleChanges): void {
    debugger
    console.log('BooklistComponent received listData:', this.listData);

  }

  gridOptions : any;
  ngOnInit(): void {

  }

  expandedIndex: number | null = null;

  toggleExpand(index: number): void {
    this.listData[index].isExpanded = !this.listData[index].isExpanded;
  }

  expandedItem: any = null;
  data = [/* paste your JSON here */];

  toggle(item: any) {
    this.expandedItem = this.expandedItem === item ? null : item;
  }


}
