import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = environment.API.BASE_URL;

  constructor(private http: HttpClient) {
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(token) {
    localStorage.setItem('token', token);
  }

  logOut(){
    localStorage.removeItem('token');
  }

  async login(email, password) {
    const response: any = await this.http.post(`${this.BASE_URL}/v1/users/login`, {
      email, password
    }).toPromise();

    const data = response.data;
    if (data.accessToken) {
      this.token = data.accessToken;
    } else {
      throw new Error('Problem logging you in');
    }
    return data;
  }

  async getHistoryItems(page = 1): Promise<IHistoryResponse> {
    const response: any = await this.http.get(`${this.BASE_URL}/v1/stores/updates?page=${page}`, {
      headers: {
        Authorization: this.token
      }
    }).toPromise();
    return response.data[0];
  }

  async deleteHistoryItem(storeId: string, historyItemId: string): Promise<IHistoryResponse> {
    const response: any = await this.http.delete(`${this.BASE_URL}/v1/stores/${storeId}/history/${historyItemId}`, {
      headers: {
        Authorization: this.token
      }
    }).toPromise();
    return response.data;
  }

}

export enum StoreBusyStatus {
  HIGH_BUSY = 'HIGH_BUSY',
  MEDIUM_BUSY = 'MEDIUM_BUSY',
  LOW_BUSY = 'LOW_BUSY'
}

export interface IHistoryResponse {
  _id: string;
  history: Array<IStoreHistoryItem>;
  resultCount: number;
}

export interface IStoreHistoryItem {
  _id: string;
  status: StoreBusyStatus;
  photos: Array<IFile>;
  createdAt?: Date;
  store: string;
}

export interface IFile {
  _id: string;
  url?: string;
  thumbUrl?: string;
}
