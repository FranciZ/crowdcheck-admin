import { Component, OnInit } from '@angular/core';
import { ApiService, IStoreHistoryItem } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<IStoreHistoryItem> = [];
  resultCount = 0;

  constructor(private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {

    if (!this.apiService.token) {
      this.router.navigate(['login']);
    }

    this.fetchItems();
  }

  onLogoutClick() {
    this.apiService.logOut();
    this.router.navigate(['login']);
  }

  async fetchItems(page = 1) {

    const result = await this.apiService.getHistoryItems(page);
    this.items = result.history;
    this.resultCount = result.resultCount;

    console.log('this.items: ', this.items);

  }

  onPageChanged(event) {
    console.log('Event: ', event);
    this.fetchItems(event.page);
  }

  async onDeleteClick(item: IStoreHistoryItem, index) {

    const c = confirm('So prepričan/a?');

    if (!c) {
      return;
    }

    const result = await this.apiService.deleteHistoryItem(item.store, item._id);
    if (result) {
      this.items.splice(index, 1);
    }

  }

}
