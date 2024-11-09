import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  filterTerm: string = '';
  sortAscending: boolean = true;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = data;
      },
      (error) => {
        console.error('Error fetching data', error);
        
      }
    );
  }

  sortItems(): void {
    this.sortAscending = !this.sortAscending;
    this.filteredItems = this.filteredItems.sort((a, b) =>
      this.sortAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  filterItems(): void {
    this.filteredItems = this.items.filter((item) =>
      item.title.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }
}
