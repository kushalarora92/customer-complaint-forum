import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(identifier) {
    return JSON.parse(localStorage.getItem(identifier));
  }

  setItem(identifier, object) {
    localStorage.setItem(identifier, JSON.stringify(object));
  }
}
