import { Component, OnInit } from '@angular/core';
const axios = require('axios');
import { Papa } from 'ngx-papaparse';
import { SibobsService } from './../../services/sibobs.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {

  private _csvURL = 'assets/master.csv';
  csvRecords: any[] = [];

  constructor(private papa: Papa, private _so: SibobsService) {
    axios.get(this._csvURL)
    .then(response => {
      this.papa.parse(response['data'], {
        complete: (result) => {
            this._so.updateCSVData(result['data']);
        },
        header: true
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }


  ngOnInit() { }
}
