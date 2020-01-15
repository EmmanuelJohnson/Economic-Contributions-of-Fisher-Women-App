import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SibobsService {

  private csvDataObs = new BehaviorSubject([]);
  newCSVData = this.csvDataObs.asObservable();

  constructor() { }

  updateCSVData(newCSVData: any) {
    this.csvDataObs.next(newCSVData);
  }
}
